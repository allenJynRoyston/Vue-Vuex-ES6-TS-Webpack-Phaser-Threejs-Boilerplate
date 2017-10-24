<template lang="pug">
  .ui.container.game-container
    center
      game-component(v-if='isReady')
</template>

<script>


export default {
  name: 'game',
  data () {
    return {
      store: this.$store,
      isReady: false
    }
  },
  methods: {

  },
  mounted(){
    $('#app-layout').velocity('stop', true)
    $('#app-layout').velocity({backgroundColor: '#1e1e1e'}, 2000)
    this.store.commit('setHeader', false)
    setTimeout( () => {
      this.isReady = true
    }, 2000)
  },
  destroyed(){
    $('#app-layout').velocity('stop', true)
    $('#app-layout').velocity({backgroundColor: '#ffffff'}, 0)
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }
}
</script>

<style lang="sass" scoped>
  .game-container
    min-height: 800px
    margin-top: 50px
    padding-bottom: 50px
</style>
