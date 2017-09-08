<template>
    <section class="shapes">
        <ul>
            <shape v-for="(shape, index) in shapes"
                   :key="index"
                   :shape="shape"
                   :class="{ 'is-selected': selectedIndex === index }"
                   @click.native="changeShape(index)"
            >

            </shape>
        </ul>
    </section>
</template>

<script type="text/babel">
  import shape from './shape.vue'

  export default {
    props: ['selectedIndex', 'shapes'],

    components: {
      'shape': shape
    },

    methods: {
      changeShape (index) {
        if (index !== this.selectedIndex) {
          this.$emit('changeShape', index)
        }
      }
    }
  }
</script>

<style lang="scss">
    .shapes {
        position: relative;
        max-width: 100%;
        background: #d3d0c9;
        white-space: nowrap;

        &.horizontal {
            display: block;
            overflow-x: scroll;

            @media (min-width: 800px) {
                display: none;
            }
        }

        &.vertical {
            display: none;
            overflow-x: hidden;

            @media (min-width: 800px) {
                display: block;
                white-space: normal;

                &:hover,
                &:focus {
                    + .options {
                        transform: none;

                        &:before {
                            transform: scale3d(1, 0, 1);
                        }
                    }
                }
            }
        }

        ul {
            width: 100%;
            padding: .25rem;

            @media (min-width: 800px) {
                display: flex;
                flex-wrap: wrap;
                padding: 0;
                perspective: 400px;
                overflow-x: hidden;
            }

            @media (max-width: 800px) {
                white-space: nowrap;
            }
        }
    }
</style>
