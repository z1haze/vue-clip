<template>
    <div class="handles">
        <div v-for="(coord, i) in coords"
             class="handle"
             :data-handle="i"
             @mousedown="mousedown"
             @mouseup="mouseup"
        >
            <div class="delete-point"></div>
        </div>
    </div>
</template>

<script type="text/babel">
  import Draggabilly from 'draggabilly'
  import Event from '../event'

  export default {
    props: ['coords', 'options', 'shape'],

    data () {
      return {
        draggies: []
      }
    },

    mounted () {
      setTimeout(() => {
        this.resetHandles()
      })

      Event.$on('handleAdded', this.handleAdded)
      Event.$on('customizingFinished', () => {
        let handles = document.querySelectorAll('.handle')

        handles.forEach(handle => this.makeDraggable(handle))
      })
      Event.$on('handleRemoved', () => {
        this.$nextTick(() => {
          this.resetHandles()
        })
      })
    },

    watch: {
      shape () {
        this.$nextTick(() => {
          this.clearDraggies()
          this.resetHandles()
          document.querySelectorAll('.handle').forEach(handle => handle.classList.remove('show-delete'))
        })
      },

      'options.width' () {
        this.resetHandles()
      },

      'options.height' () {
        console.log('changed height')
        this.resetHandles()
      }
    },

    methods: {
      placeHandle (coord) {
        return {
          left: Math.round((coord[0] / 100) * this.options.width) + 'px',
          top: Math.round((coord[1] / 100) * this.options.height) + 'px'
        }
      },

      handleAdded (payload) {
        this.$nextTick(() => {
          let handle = document.querySelectorAll('[data-handle="' + payload.index + '"]')[0]
          this.styleHandle(handle, payload.coord)
        })
      },

      resetHandles () {
        let handles = document.querySelectorAll('.handle')

        this.clearDraggies()

        handles.forEach(handle => {
          this.styleHandle(handle, this.coords[handle.dataset.handle])
          this.makeDraggable(handle)
        })
      },

      clearDraggies () {
        this.draggies.forEach(draggie => draggie.destroy())
        this.draggies = []
      },

      styleHandle (handle, coord) {
        Object.assign(handle.style, this.placeHandle(coord))
      },

      makeDraggable (handle) {
        let self = this
        let i = handle.dataset.handle

        handle.classList.add('draggable')

        let draggie = new Draggabilly(handle, {
          containment: true,
          grid: [0, 0]
        }).on('pointerDown', function () {
          document.querySelectorAll('[data-point="' + i + '"]')[0].classList.add('changing')
        }).on('dragMove', function () {
          let x = this.position.x
          let y = this.position.y
          self.$emit('updateHandle', {x, y, i})
        }).on('pointerUp', function () {
          document.querySelectorAll('.point').forEach(point => point.classList.remove('changing'))
        })

        this.draggies.push(draggie)
      },

      mousedown (e) {
        document.querySelectorAll('.handle').forEach(handle => handle.classList.remove('show-delete'))

        if (e.srcElement.classList.contains('delete-point')) {
          this.$emit('removeHandle', parseInt(e.srcElement.parentElement.dataset.handle))
        }

        if (this.coords.length > 3) {
          e.target.classList.add('show-delete')
        }
      },

      mouseup (e) {
        setTimeout(() => {
          e.target.classList.remove('show-delete')
        }, 2500)
      }
    }
  }
</script>

<style lang="scss">
    .handles {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;

        .delete-point, .handle {
            position: absolute;
            width: 20px;
            height: 20px;
        }

        .handle {
            border-radius: 50%;
            box-shadow: inset 0 0 0 10px;
            opacity: .8;
            transition: opacity .25s;

            &.is-dragging,
            &.is-pointer-down { // better than using :hover/:active for touch
                z-index: 100;
                box-shadow: inset 0 0 0 3px;
                cursor: none;
                transition: box-shadow 0s;
            }

            &.draggable {
                cursor: grab
            }

            &.show-delete {
                .delete-point {
                    transform: scale3d(0.9, .9, .9);
                    transition: transform .25s cubic-bezier(0.15, 1, .3, 1.1), opacity .25s;
                    opacity: 1;
                }
            }

            &:after {
                display: block;
                content: "";
                position: absolute;
                top: -8px;
                left: -8px;
                right: -8px;
                bottom: -8px;
            }

            .delete-point {
                position: absolute;
                left: 22px;
                top: 0;
                width: 25px;
                padding-left: 5px;
                border-radius: 3px;
                background: #d3d0c9;
                transform: scale3d(0, 0, 0);
                transform-origin: left center;
                cursor: pointer;
                opacity: .75;
                clip-path: polygon(25% 0, 100% 1%, 100% 100%, 25% 100%, 0 50%);
                transition: transform .25s, opacity .25s;

                &:after {
                    display: block;
                    content: "";
                    position: absolute;
                    top: 4px;
                    left: 9px;
                    right: 4px;
                    bottom: 4px;
                    background: #100a09;
                    clip-path: polygon(20% 10%, 10% 20%, 40% 50%, 10% 80%, 20% 90%, 50% 60%, 80% 90%, 90% 80%, 60% 50%, 90% 20%, 80% 10%, 50% 40%);
                }
            }
        }
    }

    .playground:hover {
        .handle {
            opacity: 1;
        }
    }

    .playground.customizing .handle {
        pointer-events: none;
    }
</style>