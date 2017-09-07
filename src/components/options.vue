<template>
    <section class="options">
        <div class="panel flex">
            <h2>Clip Size</h2>
            <input v-model.lazy.number="options.width" name="width" type="number">
            <h2>x</h2>
            <input v-model.lazy.number="options.height" name="height" type="number">
        </div>

        <div class="panel">
            <h2>Backgrounds</h2>
            <div class="backgrounds">
                <img @click="changeBackground(img)" v-for="img in options.imgs" :src="img">
            </div>

            <input v-model.lazy="options.customBackground" name="url" type="url" placeholder="Custom URL...">

            <div class="flex shadowboard-toggle">
                <h2>Show outside clip-path</h2>
                <input id="shadowboard-toggle" v-model="options.shadowBoard" name="shadowboard-toggle" type="checkbox">
                <label for="shadowboard-toggle"></label>
            </div>
        </div>

        <div class="panel">
            <h2>About Clip Paths</h2>
            <p>The <code>clip-path</code>
                property allows you to make complex shapes in CSS by clipping an element to a basic shape (circle, ellipse, polygon, or inset), or to an SVG source.
            </p>
            <p>
                CSS Animations and transitions are possible with two or more clip-path shapes with the same number of points.</p>
        </div>

        <div class="panel">
            <p>Find this project on <a href="https://github.com/z1haze/vue-clip">Github</a>.</p>
        </div>
    </section>
</template>

<script type="text/babel">
  export default {
    props: ['options'],

    methods: {
      changeBackground (img) {
        this.$emit('changeBackground', img)
      }
    }
  }
</script>

<style lang="scss">
    .options {
        @media (min-width: 800px) {
            position: relative;
            background: #d3d0c9;
            transform: translate3d(0, -18.375rem, 0);
            transition: transform .25s .125s cubic-bezier(0.15, 1, .3, 1.1);

            &:before {
                display: block;
                position: absolute;
                content: "";
                pointer-events: none;
                left: 0;
                right: 0;
                bottom: 100%;
                height: 4rem;
                background: linear-gradient(rgba(211, 208, 201, 0), #d3d0c9 90%);
                transition: inherit;
                transition-timing-function: ease;
                transform-origin: center bottom;
            }
        }

        .backgrounds {
            overflow: hidden;
            position: relative;
            padding: .5rem 0 .75rem .375rem;

            img {
                cursor: pointer;
                border-radius: .25rem;
                float: left;
                width: calc(25% - .25rem);
                height: auto;
                outline: .25rem solid #fff;
                margin: .125rem;
                transition: .5s;
                -webkit-user-drag: none;

                &:hover {
                    opacity: .9;
                }
            }

            + input {
                font: inherit;
                font-size: 1rem;
                line-height: 2;
                width: calc(100% - .375rem);
                margin-left: .375rem;
                text-align: left;
                padding: .25rem 1rem;
            }
        }

        .shadowboard-toggle {
            margin-top: 1rem;
        }

        input[type=number][for=shadowboard-toggle]:before, input[type=url][for=shadowboard-toggle]:before, label[for=shadowboard-toggle]:before {
            content: "Off";
        }

        input:checked + input[type=number][for=shadowboard-toggle]:before, input:checked + input[type=url][for=shadowboard-toggle]:before, input:checked + label[for=shadowboard-toggle]:before {
            content: "On";
        }

        p {
            a {
                text-decoration: none;
                color: inherit;
                transition: color .25s;

                &:hover {
                    color: #0B7FDA;
                }
            }
        }
    }
</style>