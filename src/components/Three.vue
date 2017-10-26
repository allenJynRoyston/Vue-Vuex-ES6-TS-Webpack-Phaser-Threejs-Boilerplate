<template lang="pug">
  .ui.container.game-container
    center
      three-component
</template>

<script>


export default {
  name: 'three',
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
