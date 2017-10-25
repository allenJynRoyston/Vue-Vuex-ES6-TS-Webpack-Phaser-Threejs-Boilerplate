<template lang="pug">
  .container
    .row
      .twelve.columns.demo-panel
        h1 Home
    .row
      .six.columns.demo-panel
        p Content
        img(v-bind:src='shortParagraph1')
      .six.columns.demo-panel
        p Content
        img(v-bind:src='shortParagraph1')
    .row
      .six.columns.demo-panel
        p Content
        img(v-bind:src='shortParagraph1')
      .six.columns.demo-panel
        p Content
        img(v-bind:src='shortParagraph1')
</template>

<script>
import shortParagraph1 from "../assets/images/site/short-paragraph.png"

export default {
  name: 'home',
  data () {
    return {
      store: this.$store,
      shortParagraph1: shortParagraph1
    }
  },
  methods: {

  }
}
</script>

<style lang="sass" scoped>
  .demo-panel
    padding: 20px
    overflow: hidden
</style>
