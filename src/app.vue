<template>
    <div id="app">
        <main>
            <header>
                <h1>CSS clip-path generator</h1>
            </header>

            <playground @addHandle="addHandle"
                        @updateHandle="updateHandle"
                        @removeHandle="removeHandle"
                        @setStartRadius="setStartRadius"
                        :coords="coords"
                        :options="options"
                        :shape="shapes[selectedIndex]"
                        :position="position"
                        :radius="radius"
                        :customizing="customizing"
            ></playground>

            <shapes class="horizontal"
                    :shapes="shapes"
                    :selectedIndex="selectedIndex"
                    @changeShape="changeShape">
            </shapes>

            <clip-path :shape="shapes[selectedIndex]"
                       :coords="coords"
                       :radius="radius"
                       :position="position"
            ></clip-path>

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
  import Shapes from './shapes'
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
          selectedBackground: 'static/img/pittsburgh.jpg',
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
        radius: 50,
        startRadius: undefined,
        radHandle: undefined,
        position: [50, 50],
        coords: [[50, 0], [0, 100], [100, 100]],
        shapes: Shapes
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

    methods: {
      changeShape (index) {
        this.selectedIndex = index
        let shape = this.shapes[this.selectedIndex]
        this.coords = shape.coords.slice(0)

        if (shape.name === 'Custom') {
          this.coords = []
        }

        if (shape.name === 'Circle') {
          this.radHandle = document.querySelectorAll('[data-handle="0"]')[0]
        }

        this.customizing = !this.coords.length
      },

      addHandle (e) {
        let x = Math.round(((e.offsetX - 10) / this.options.width) * 100)
        let y = Math.round(((e.offsetY - 10) / this.options.height) * 100)

        this.coords.push([x, y])

        Event.$emit('handleAdded', {index: this.coords.length - 1, coord: [x, y]})
      },

      setStartRadius () {
        let x = Math.round(this.radHandle.offsetLeft / this.options.width * 100)
        let y = Math.round(this.radHandle.offsetTop / this.options.height * 100)

        this.$set(this, 'startRadius', this.getRadius(x, this.position[0], y, this.position[1]) / 100)
      },

      updateHandle (payload) {
        let x = Math.round(payload.x / this.options.width * 100)
        let y = Math.round(payload.y / this.options.height * 100)

        this.$set(this.coords, payload.i, [x, y])

        if (this.shapes[this.selectedIndex].name === 'Circle') {
          if (parseInt(payload.i) === 0) {
            let radius = this.getRadius(x, this.position[0], y, this.position[1])
            this.$set(this, 'radius', parseFloat(radius))
          }

          if (parseInt(payload.i) === 1) {
            this.$set(this, 'position', [x, y])
          }
        }
      },

      getRadius (radX, posX, radY, posY) {
        let distance = Math.sqrt(Math.pow(radX - posX, 2) + Math.pow(radY - posY, 2))

        return parseFloat(distance)
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
