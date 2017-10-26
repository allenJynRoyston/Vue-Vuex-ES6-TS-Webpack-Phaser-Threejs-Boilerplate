<template lang="pug">
  section.hero.is-primary
    .hero-body
      .container
        h1.title
          | Home
        h2.subtitle
          | Hero Panel
        a.button
          | Get Started
</template>

<script>
import shortParagraph1 from "../assets/images/site/short-paragraph.png"

export default {
  name: 'main-header',
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

</style>
