<template>
    <div id="playground_container" class="playground-container flex">
        <section @click="addHandle" class="playground"
                 :class="{ 'customizing': customizing, 'start': !coords.length }">
            <div class="sandbox"
                 :style="{ width: options.width + 20 + 'px', height: options.height + 20 + 'px' }">
                <div class="shadowboard"
                     :class="{'on': options.shadowBoard}"
                     :style="background"
                ></div>
                <div class="clipboard"
                     :style="[{'clip-path': clipCSS({ shape, coords: shape.coords, position, radius })}, {'-webkit-clip-path': clipCSS({ shape, coords: shape.coords, position, radius })}, background]"></div>
                <handles @updateHandle="updateHandle"
                         @removeHandle="removeHandle"
                         @setStartRadius="setStartRadius"
                         :shape="shape"
                         :coords="coords"
                         :options="options"></handles>
            </div>

            <div class="custom-notice">
                <div>
                    <span class="touchy"></span> to add points<br>to custom polygon.
                </div>
            </div>
        </section>
    </div>
</template>

<script type="text/babel">
  import { clipCSS } from '../utilities'
  import handles from './handles.vue'

  export default {
    props: ['shape', 'coords', 'options', 'customizing', 'position', 'radius'],

    components: {
      'handles': handles
    },

    computed: {
      background () {
        let background = this.options.customBackground ? this.options.customBackground : this.options.selectedBackground
        return {'background-image': 'url(' + background + ')'}
      }
    },

    methods: {
      clipCSS,

      updateHandle (payload) {
        this.$emit('updateHandle', payload)
      },

      addHandle (e) {
        if (this.customizing) {
          this.$emit('addHandle', e)
        }
      },

      removeHandle (i) {
        this.$emit('removeHandle', i)
      },

      setStartRadius () {
        this.$emit('setStartRadius')
      }
    }
  }
</script>

<style lang="scss">
    .playground-container {
        justify-content: center;
        flex: 1;
        background: #fbfcf7;
        box-shadow: 0 1px 2px rgba(16, 10, 9, .15);
        position: relative;
        z-index: 100;
        padding-top: .5rem;
        user-select: none;
        -webkit-tap-highlight-color: transparent;
        -webkit-touch-callout: none;

        @media (min-width: 800px) {
            border-radius: 0 0 2px 2px;
        }

        .playground {
            position: relative;
            padding: 0 0 1rem;

            &.customizing {
                cursor: crosshair
            }

            &.start {
                .custom-notice {
                    opacity: 1;
                }
            }

            .custom-notice {
                display: flex;
                align-items: center;
                justify-content: center;
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                bottom: 1rem;
                pointer-events: none;
                opacity: 0;
                transition: background .25s;
                background: rgba(255, 255, 255, 0);
                div {
                    width: 100%;
                    text-align: center;
                    background: rgba(255, 255, 255, .9);
                    padding: 1rem;
                    margin: 0 2rem;
                    transition: opacity .25s;
                    border-radius: 2px;
                    box-shadow: 0 1px 2px rgba(16, 10, 9, .15);
                    opacity: 1;

                    .touchy {
                        &:after {
                            content: 'Click'
                        }
                    }
                }
            }

            .sandbox {
                position: relative;
                box-shadow: inset 0 0 0 10px #fbfcf7, inset 0 0 0 11px #d3d0c9;
                touch-action: none;

                .clipboard, .shadowboard {
                    position: absolute;
                    top: 10px;
                    left: 10px;
                    right: 10px;
                    bottom: 10px;
                    background: #d3d0c9 url(/static/img/pittsburgh.jpg) center center;
                    background-size: cover;
                }

                .shadowboard {
                    pointer-events: none;
                    opacity: 0;
                    transition: opacity .375s;

                    &.on {
                        opacity: .25;
                    }
                }
            }
        }
    }
</style>