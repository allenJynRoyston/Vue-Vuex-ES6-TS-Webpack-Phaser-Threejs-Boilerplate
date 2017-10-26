<template lang="pug">
  .section
    .container
      .columns
        .column.is-four-fifths is-four-fifths
        .column Auto
        .column Auto
      .columns
        .column.is-three-quarters is-three-quarters
        .column Auto
        .column Auto
      .columns
        .column.is-two-thirds is-two-thirds
        .column Auto
        .column Auto
      .columns
        .column.is-three-fifths is-three-fifths
        .column Auto
        .column Auto
      .columns
        .column.is-half is-half
        .column Auto
        .column Auto
      .columns
        .column.is-two-fifths is-two-fifths
        .column Auto
        .column Auto
      .columns
        .column.is-one-third is-one-third
        .column Auto
        .column Auto
      .columns
        .column.is-one-quarter is-one-quarter
        .column Auto
      .columns
        .column.is-one-fifth is-one-fifth
        .column Auto
        .column Auto
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
  .column
    border: 1px solid white
    background-color: lightgray
    color: white
    margin-top: 10px
</style>
