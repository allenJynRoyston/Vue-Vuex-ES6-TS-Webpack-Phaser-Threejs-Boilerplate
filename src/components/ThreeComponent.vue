<template lang="pug">
    #three-example
</template>

<script>


export default {
  name: 'threeComponent',
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
      this.loadGame('demo.js')
    },
    loadGame(fileName){
      // remove old game first
      if(this.game !== null){
        this.game.destroy()
      }
      // load new one
      let js = document.createElement("script");
          js.type = "text/javascript";
          js.src = `src/threeJS/${fileName}`;
          document.body.appendChild(js);
          js.onload = (() => {
            __three.main.init(this.$el, this, {width: 800, height: 600});
          })
    }
  },
  destroyed() {
    this.game.destroy();
  }
}
</script>


<style lang="sass" scoped>
  #three-example
    width: 800px
    height: 600px
</style>
