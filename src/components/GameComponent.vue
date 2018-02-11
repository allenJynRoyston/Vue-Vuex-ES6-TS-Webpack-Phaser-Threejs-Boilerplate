<template lang="pug">
  div
    a(v-for='demo in demos' @click='loadFile(demo.file)') {{demo.title}} &nbsp;&nbsp;&nbsp;&nbsp;
    br
    br
    #phaser-example
</template>

<script>


export default {
  name: 'gameComponent',
  props: [],
  data () {
    return {
      game: null,
      demos: [
        {title: 'Sprite Class Manager', file: 'boilerplate/spriteManagerDemo.min.js'},
        {title: 'Controller Class Manager', file: 'boilerplate/controllerManagerDemo.min.js'},
        {title: 'Bitmapdata Layer Demo', file: 'boilerplate/bitmapLayerDemo.min.js'},
        {title: 'Bitmapdata Fill Demo', file: 'boilerplate/bitmapFillDemo.min.js'},
      ]
    }
  },
  mounted(){
    this.init()
  },
  methods: {
    init(){
      this.loadGame('boilerplate/spriteManagerDemo.min.js')
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
            __phaser.init(this.$el, this, {width: 640, height: 640});
          })
    },
    loadFile(file){
      this.loadGame(file)
    }
  },
  destroyed() {
    this.game.destroy();
  }
}
</script>


<style lang="sass" scoped>

</style>
