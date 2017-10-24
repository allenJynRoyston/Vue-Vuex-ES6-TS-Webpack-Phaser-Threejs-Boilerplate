<template lang="pug">
  #phaser-example
    a.phaser-button-1(@click='reset()')
      i.video.play.icon
    a.phaser-button-2(@click='toggle()')
      i(v-bind:class='!phaserIsPaused ? "pause icon" : "play icon"')
</template>

<script>


export default {
  name: 'phaserComponent',
  data () {
    return {
      store: this.$store,
      game: null,
      phaserIsPaused: false,
      listIndex: 0,
      list:[
        {file: 'src/phaser/lightwave.js', options: {} },
        {file: 'src/phaser/pixel.js', options: {} },
        {file: 'src/phaser/vhs.js', options: {} },
        {file: 'src/phaser/wavey.js', options: {} },
        {file: 'src/phaser/floodFill.js', options: {image: 'src/assets/images/misc/2500x500_1.jpg'} }
      ]
    }
  },
  mounted(){
    this.store.watch(this.store.getters._appReady, val => {
      this.load(this.list[0])

      // get for init
      this.headerIsOpen = this.store.getters._headerIsOpen()

      // then watch for changes
      this.store.watch(this.store.getters._headerIsOpen, val => {
        this.pauseIt(!val);
      })

    })
  },
  methods: {
    load(data){
      let js = document.createElement("script");
          js.type = "text/javascript";
          js.src = data.file;
          document.body.appendChild(js);
          js.onload = (() => {
            __phaser.game.init(this.$el, this, data.options);
          })
    },
    pauseIt(val){
      this.phaserIsPaused = this.game.pause(val)
    },
    toggle(){
      this.phaserIsPaused = this.game.toggle()
    },
    increment(){
      this.listIndex++;
      if(this.listIndex >= this.list.length){
        this.listIndex = 0
      }
      return this.listIndex;
    },
    reset(){
      this.game.destroy();
      this.load(this.list[this.increment()]);
    }
  },
  destroyed() {
    this.game.destroy();
  }
}
</script>


<style lang="sass" scoped>
  .icon
    font-size: 2em
    opacity: 0.25
  .icon:hover
    opacity: 1
  .phaser-button-1
    position: absolute
    top: 15px
    left: 15px
    color: white
    z-index: 999
    cursor: pointer
  .phaser-button-2
    position: absolute
    top: 15px
    right: 15px
    color: white
    z-index: 999
    cursor: pointer
</style>
