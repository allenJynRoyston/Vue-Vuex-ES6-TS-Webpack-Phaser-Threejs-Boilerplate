<template lang="pug">
  .ui.container.game-container
    center
      game-component
</template>

<script>


export default {
  name: 'game',
  data () {
    return {
      store: this.$store,
    }
  },
  methods: {

  },
  mounted(){
    this.isReady = true
  },
  destroyed(){

  }
}
</script>

<style lang="sass" scoped>
  .game-container
    min-height: 800px
    margin-top: 50px
    padding-bottom: 50px
</style>
