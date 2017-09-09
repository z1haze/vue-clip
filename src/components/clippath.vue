<template>
    <section class="clip-path">
        <div class="css-code code fade-content">
            <code class="block">
                clip-path: <span class="functions">
                {{ clipType(shape) }}(
                <template v-if="shape.name === 'Circle'"><span data-point="0" class="point" v-text="radius + '%'"></span> at <span data-point="1" class="point" v-text="position[0] + '% ' + position[1] + '%'"></span></template>
                <template v-else v-for="(point, i) in clipPoints(coords)"><span :data-point="i" class="point" v-text="point"></span><template v-if="i < coords.length - 1">, </template></template>
                )</span>;
            </code>
        </div>
    </section>
</template>

<script type="text/babel">
    import { clipType, clipPoints } from '../utilities'

    export default {
      props: ['shape', 'coords', 'radius', 'position'],

      methods: {
        clipType,
        clipPoints
      }
    }
</script>

<style lang="scss">
    .clip-path {
        display: flex;
        position: relative;
        font-size: 1.1em;
        overflow-x: hidden;
        font-family: monospace;
        overflow-y: hidden;

        @media (max-width: 800px) {
            margin: 0 .5rem;
        }

        @media (min-width: 800px) {
            margin: .5rem 0 .25rem;
            border-radius: 2px;
        }

        .code {
            background: #100a09;
            color: #9a8297;
            padding: 1.5rem;
            box-shadow: 0 1px 2px rgba(16, 10, 9, .15);
        }

        .css-code {
            flex: 1;

            @media (min-width: 800px) {
                max-height: 160px;
                overflow-y: auto;
            }

            .block {
                padding: .25rem;
                line-height: 1.3;
            }
        }

        .point {
            display: inline-block;
            position: relative;
            vertical-align: baseline;

            &:after {
                $size : 80px;

                display: block;
                position: absolute;
                content: "";
                width: $size;
                height: $size;
                border-radius: 50%;
                background: currentColor;
                top: calc(50% - #{($size/2)});
                left: calc(50% - #{($size/2)});
                transform: scale(0);
                will-change: transform, opacity;
                opacity: 0;
            }

            &.changing {
                font-weight: bold;

                &:after {
                    animation: emph 1.25s;
                    animation-delay: inherit;
                }
            }
        }
    }
</style>