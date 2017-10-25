<template lang="pug">
  .u-full-width.demo-panel
    h3 Footer
    img(v-bind:src='shortParagraph1')
</template>

<script>
import shortParagraph1 from "../assets/images/site/short-paragraph.png"

export default {
  name: 'main-footer',
  data () {
    return {
      store: this.$store,
      shortParagraph1: shortParagraph1
    }
  },
  created: function () {

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
