<template>
    <section class="panel dark flex">
        <h2>Custom shape</h2>
        <button @click="finish">Finish</button>
    </section>
</template>

<script type="text/babel">
    export default {
      methods: {
        finish () {
          this.$emit('finishCustom')
        }
      }
    }
</script>