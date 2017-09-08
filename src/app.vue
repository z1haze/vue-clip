<template>
    <div id="app">
        <main>
            <header>
                <h1>CSS clip-path generator</h1>
            </header>

            <playground @addHandle="addHandle"
                        @updateHandle="updateHandle"
                        @removeHandle="removeHandle"
                        :coords="coords"
                        :options="options"
                        :shape="shapes[selectedIndex]"
                        :customizing="customizing"
            ></playground>

            <shapes class="horizontal"
                    :shapes="shapes"
                    :selectedIndex="selectedIndex"
                    @changeShape="changeShape">
            </shapes>

            <clip-path :shape="shapes[selectedIndex]" :coords="coords"></clip-path>

        </main>
        <aside>
            <!--custom shape panel-->
            <custom @finishCustom="finishCustom" v-if="customizing"></custom>

            <shapes class="vertical"
                    :shapes="shapes"
                    :selectedIndex="selectedIndex"
                    @changeShape="changeShape">
            </shapes>

            <options @changeBackground="changeBackground" :options="options"></options>
        </aside>
    </div>
</template>

<script type="text/babel">
  import shapes from './components/shapes.vue'
  import playground from './components/playground.vue'
  import options from './components/options.vue'
  import custom from './components/custom.vue'
  import clippath from './components/clippath.vue'
  import Event from './event'

  export default {
    components: {
      'shapes': shapes,
      'playground': playground,
      'options': options,
      'custom': custom,
      'clip-path': clippath
    },

    data () {
      return {
        options: {
          width: 280,
          height: 280,
          customBackground: '',
          selectedBackground: '',
          shadowBoard: false,
          imgs: [
            'static/img/pittsburgh.jpg',
            'static/img/fierenze.jpg',
            'static/img/sparkler.jpg',
            'static/img/miami.jpg'
          ]
        },
        selectedIndex: 0,
        customizing: false,
        coords: [],
        shapes: [
          {
            name: 'Triangle',
            coords: [[50, 0], [0, 100], [100, 100]]
          },
          {
            name: 'Trapezoid',
            coords: [[20, 0], [80, 0], [100, 100], [0, 100]]
          },
          {
            name: 'Parallelogram',
            coords: [[25, 0], [100, 0], [75, 100], [0, 100]]
          },
          {
            name: 'Rhombus',
            coords: [[50, 0], [100, 50], [50, 100], [0, 50]]
          },
          {
            name: 'Pentagon',
            coords: [[50, 0], [100, 38], [82, 100], [18, 100], [0, 38]]
          },
          {
            name: 'Hexagon',
            coords: [[50, 0], [100, 25], [100, 75], [50, 100], [0, 75], [0, 25]]
          },
          {
            name: 'Heptagon',
            coords: [[50, 0], [90, 20], [100, 60], [75, 100], [25, 100], [0, 60], [10, 20]]
          },
          {
            name: 'Octagon',
            coords: [[30, 0], [70, 0], [100, 30], [100, 70], [70, 100], [30, 100], [0, 70], [0, 30]]
          },
          {
            name: 'Nonagon',
            coords: [[50, 0], [83, 12], [100, 43], [94, 78], [68, 100], [32, 100], [6, 78], [0, 43], [17, 12]]
          },
          {
            name: 'Decagon',
            coords: [[50, 0], [80, 10], [100, 35], [100, 70], [80, 90], [50, 100], [20, 90], [0, 70], [0, 35], [20, 10]]
          },
          {
            name: 'Bevel',
            coords: [[20, 0], [80, 0], [100, 20], [100, 80], [80, 100], [20, 100], [0, 80], [0, 20]]
          },
          {
            name: 'Rabbet',
            coords: [[0, 15], [15, 15], [15, 0], [85, 0], [85, 15], [100, 15], [100, 85], [85, 85], [85, 100], [15, 100], [15, 85], [0, 85]]
          },
          {
            name: 'Left arrow',
            coords: [[40, 0], [40, 20], [100, 20], [100, 80], [40, 80], [40, 100], [0, 50]]
          },
          {
            name: 'Right arrow',
            coords: [[0, 20], [60, 20], [60, 0], [100, 50], [60, 100], [60, 80], [0, 80]]
          },
          {
            name: 'Left Point',
            coords: [[25, 0], [100, 1], [100, 100], [25, 100], [0, 50]]
          },
          {
            name: 'Right Point',
            coords: [[0, 0], [75, 0], [100, 50], [75, 100], [0, 100]]
          },
          {
            name: 'Left Chevron',
            coords: [[100, 0], [75, 50], [100, 100], [25, 100], [0, 50], [25, 0]]
          },
          {
            name: 'Right Chevron',
            coords: [[75, 0], [100, 50], [75, 100], [0, 100], [25, 50], [0, 0]]
          },
          {
            name: 'Star',
            coords: [[50, 0], [61, 35], [98, 35], [68, 57], [79, 91], [50, 70], [21, 91], [32, 57], [2, 35], [39, 35]]
          },
          {
            name: 'Cross',
            coords: [[10, 25], [35, 25], [35, 0], [65, 0], [65, 25], [90, 25], [90, 50], [65, 50], [65, 100], [35, 100], [35, 50], [10, 50]]
          },
          {
            name: 'Message',
            coords: [[0, 0], [100, 0], [100, 75], [75, 75], [75, 100], [50, 75], [0, 75]]
          },
          {
            name: 'Close',
            coords: [[20, 0], [0, 20], [30, 50], [0, 80], [20, 100], [50, 70], [80, 100], [100, 80], [70, 50], [100, 20], [80, 0], [50, 30]]
          },
          {
            name: 'Frame',
            coords: [[0, 0], [0, 100], [25, 100], [25, 25], [75, 25], [75, 75], [25, 75], [25, 100], [100, 100], [100, 0]]
          },
          {
            name: 'Custom',
            coords: [[10, 75], [10, 25], [35, 0], [100, 10], [90, 30], [50, 30], [40, 40], [40, 60], [50, 70], [90, 70], [100, 90], [35, 100]]
          }
        ]
      }
    },

    watch: {
      'options.width' (value) {
        let maxWidth = document.getElementById('playground_container').offsetWidth - 42

        if (value > maxWidth) {
          this.options.width = maxWidth
        }
      },

      'options.height' (value) {
        let maxHeight = document.getElementById('playground_container').offsetHeight - 42

        if (value > maxHeight) {
          this.options.height = maxHeight
        }
      }
    },

    mounted () {
      this.coords = this.shapes[this.selectedIndex].coords.slice(0)
      this.options.selectedBackground = this.options.imgs[0]
    },

    methods: {
      changeShape (index) {
        this.selectedIndex = index
        let shape = this.shapes[this.selectedIndex]
        this.coords = shape.coords.slice(0)

        if (shape.name === 'Custom') {
          this.coords = []
        }

        this.customizing = !this.coords.length
      },

      addHandle (e) {
        console.log(e)
        let x = Math.round(((e.offsetX - 10) / this.options.width) * 100)
        let y = Math.round(((e.offsetY - 10) / this.options.height) * 100)

        this.coords.push([x, y])

        Event.$emit('handleAdded', {index: this.coords.length - 1, coord: [x, y]})
      },

      updateHandle (payload) {
        let x = Math.round(payload.x / this.options.width * 100)
        let y = Math.round(payload.y / this.options.height * 100)

        this.$set(this.coords, payload.i, [x, y])
      },

      removeHandle (i) {
        this.coords.splice(i, 1)

        Event.$emit('handleRemoved')
      },

      finishCustom () {
        this.customizing = false

        Event.$emit('customizingFinished')
      },

      changeBackground (img) {
        this.options.customBackground = ''
        this.options.selectedBackground = img
      }
    }
  }
</script>

<style lang="scss">
    @import "assets/scss/utilities";
    @import "assets/scss/animations";
    @import "assets/scss/globals";
    @import "assets/scss/panels";
    @import "assets/scss/forms";

    main {
        display: flex;
        flex-direction: column;

        @media (min-width: 800px) {
            position: fixed;
            top: 0;
            left: 0;
            height: 100%;
            right: 23.625rem;
            padding: .25rem .25rem .25rem .75rem;
            touch-action: none;

            .panel.dark {
                display: none;
            }

        }

        header {
            justify-content: space-between;
            background: rgba(251, 252, 247, .75);
            box-shadow: inset 0 -1px rgba(211, 208, 201, .25);
            padding: .75rem 1rem;

            @media (min-width: 800px) {
                font-size: larger;
                padding: .75rem 1rem;
                border-radius: 2px 2px 0 0;
            }

            h1 {
                padding: .25rem;
                font-size: 1rem;
                font-weight: 400;
            }
        }
    }
</style>
