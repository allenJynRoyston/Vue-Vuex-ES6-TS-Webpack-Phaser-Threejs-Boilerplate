<template lang="pug">
    #phaser-example
</template>

<script>


export default {
  name: 'gameComponent',
  props: [],
  data () {
    return {
      game: null,
    }
  },
  mounted(){
    this.init()
  },
  methods: {
    init(){
      this.loadGame('wavey.js')
    },
    loadGame(fileName){
      // remove old game first
      if(this.game !== null){
        this.game.destroy()
      }
      // load new one
      let js = document.createElement("script");
          js.type = "text/javascript";
          js.src = `src/phaser/${fileName}`;
          document.body.appendChild(js);
          js.onload = (() => {
            __phaser.game.init(this.$el, this);
          })
    }
  },
  destroyed() {
    this.game.destroy();
  }
}
</script>


<style lang="sass" scoped>

</style>
