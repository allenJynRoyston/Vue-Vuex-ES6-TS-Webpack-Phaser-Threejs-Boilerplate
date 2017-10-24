<template lang="pug">
  .custom-card(v-on:mouseover="mouseOver" v-on:mouseout="mouseOut" v-bind:class='data.size')
    .custom-card-button-top
      p {{data.title}}
    .custom-card-button-bottom
      a(v-if='data.linktype === "external"' v-bind:href='data.link' target='_blank') Visit
      a(v-if='data.linktype === "internal"' @click='closeHeader()')
        router-link(v-bind:to="data.link"  ) Learn more
</template>

<script>
export default {
  name: 'customCard',
  props: ['data'],
  data () {
    return {
      store: this.$store,
      isReady: false
    }
  },
  mounted(){
    $(this.$el).backstretch(this.data.image)
  },
  methods:{
    closeHeader(){
      this.store.commit('setHeader', false)
    },
    mouseOver(){
      $(this.$el).velocity('stop', true)
      $(this.$el).velocity({scale: 1.025}, 150)
    },
    mouseOut(){
      $(this.$el).velocity('stop', true)
      $(this.$el).velocity({scale: 1}, 150)
    }
  }
}
</script>


<style lang="sass" scoped>
  .custom-card
    width: 100%
  .size-300
    height: 300px
  .size-200
    height: 200px
  .custom-card-button-top
    position: absolute
    top: 0px
    left: 0px
    font-family: 'Dosis', serif
    font-size: 1.15em
    background-color: rgba(27, 27, 27, .8)
    color: white
    padding: 5px
  .custom-card-button-bottom
    position: absolute
    bottom: 10px
    right: 10px
    font-family: 'Dosis', serif
    font-size: 1.25em
</style>
