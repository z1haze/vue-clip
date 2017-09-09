<template>
    <li>
        <figure class="gallery-cell">
            <div class="shape" :style="[{ 'clip-path': clipCSS({ shape, coords: shape.coords, position: shape.position, radius: shape.radius }) }, { '-webkit-clip-path': clipCSS({ shape, coords: shape.coords, position: shape.position, radius: shape.radius }) }]"></div>
            <figcaption>{{ shape.name }}</figcaption>
        </figure>
    </li>
</template>

<script type="text/babel">
  import { clipCSS } from '../utilities'

  export default {
    props: ['shape'],

    methods: {
      clipCSS
    }
  }
</script>

<style lang="scss">
    .shapes {
        ul {
            li {
                display: inline-block;
                text-align: center;
                padding: .625rem .25rem;
                margin: .25rem;
                background: #fff;
                width: 4.125rem;
                box-shadow: 0 1px 2px rgba(16, 10, 9, .15);
                border-radius: 2px;
                transition: background .25s, transform .5s;
                user-select: none;
                -webkit-tap-highlight-color: transparent;
                -webkit-touch-callout: none;

                @media (min-width: 800px) {
                    flex: 4.625rem;
                    transform-origin: top center;
                }

                &:hover {
                    cursor: pointer;
                    border-color: transparent;
                    box-shadow: 0 2px 3px rgba(16, 10, 9, .3);
                }

                &.is-selected {
                    background: #100a09;

                    figcaption {
                        color: #d3d0c9;
                    }
                }

                .shape {
                    display: inline-block;
                    width: 1.5rem;
                    height: 1.5rem;
                    background: currentColor;
                }

                figcaption {
                    display: block;
                    font-size: .75rem;
                    color: #100a09;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                    margin-top: .5rem;
                    padding: 0 .25rem;
                }
            }
        }

        &.vertical {
            @media (min-width: 800px) {
                ul {
                    li {
                        &:nth-child(n+9) {
                            transform: translateZ(0) rotateX(-18deg);
                        }

                        &:nth-child(n+13) {
                            transform: translateZ(-1.85rem) rotateX(-36deg);
                        }

                        :nth-child(n+17) {
                            transform: translateZ(-6.0125rem) rotateX(-54deg);
                        }

                        &:nth-child(n+21) {
                            transform: translateZ(-9.25rem) rotateX(-72deg);
                        }
                    }
                }

                &:hover,
                &:focus {
                    ul {
                        li {
                            transform: translateZ(0) rotateX(0);
                            transition: background .25s, transform .375s cubic-bezier(0.15, 1, .3, 1.1);

                            &:nth-child(n+9) {
                                transition-delay: .025s;
                            }

                            &:nth-child(n+13) {
                                transition-delay: .05s;
                            }

                            &:nth-child(n+17) {
                                transition-delay: .075s;
                            }

                            &:nth-child(n+21) {
                                transition-delay: .1s;
                            }

                            :nth-child(n+25) {
                                transition-delay: .125s;
                            }
                        }
                    }
                }
            }
        }
    }
</style>