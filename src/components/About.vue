<template lang="pug">
  .container
    .section
      .box
          article.media
              .media-left
                figure.image.is-64x64
                  img(src='https://bulma.io/images/placeholders/128x128.png', alt='Image')
              |
              .media-content
                .content
                  p
                    strong John Smith
                    |
                    small @johnsmith
                    |
                    small 31m
                    |
                    br
                    |           Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean efficitur sit amet massa fringilla egestas. Nullam condimentum luctus turpis.
                |
                nav.level.is-mobile
                  .level-left
                    a.level-item
                      span.icon.is-small
                        i.fa.fa-reply
                    |
                    a.level-item
                      span.icon.is-small
                        i.fa.fa-retweet
                    |
                    a.level-item
                      span.icon.is-small
                        i.fa.fa-heart
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
