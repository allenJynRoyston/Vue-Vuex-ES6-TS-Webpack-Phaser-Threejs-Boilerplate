<template lang="pug">
    .ui.row.nav-bar
      a.left-link(@click='setHeader(true)')
        router-link(to="/" )
          img(v-bind:src='logo' style='height: 80px; width: auto; margin-top: -30px')
      a(@click='setHeader(true)')
        router-link(to="/") Home
      a(@click='setHeader(false)')
        router-link(to="/about") About
      a(@click='setHeader(false)')
        router-link(to="/phaser") Phaser
      a(@click='setHeader(false)')
        router-link(to="/three") Three
      a.right-link(@click='setHeader(!headerIsOpen)')
        i(v-bind:class='headerIsOpen  ? "window restore icon" : "maximize icon"')
</template>

<script>
import ninjaIcon from "../../assets/images/misc/ninja-icon.png"


export default {
  data () {
    return {
      logo: ninjaIcon,
      headerIsOpen: null,
      store: this.$store
    }
  },
  created() {

    // get for init
    this.headerIsOpen = this.store.getters._headerIsOpen()

    // then watch for changes
    this.store.watch(this.store.getters._headerIsOpen, val => {
      this.setHeader(val)
    })

  },
  methods:{
    setHeader(val) {
      this.headerIsOpen = val;
      this.store.commit('setHeader', val)

      $(this.$el).velocity("stop", true)
      $(this.$el).velocity({
        padding: this.headerIsOpen ? '15px' : '40px',
        backgroundColor: this.headerIsOpen ? '#2f2f2f' : '#596673'
      }, [ 200, 50 ], 1000)

      $('.left-link').velocity("stop", true)
      $('.left-link').velocity({
        opacity: this.headerIsOpen ? 0 : 1,
      }, [ 200, 50 ], 1000)
    }
  }
}
</script>


<style lang="sass" scoped>
  .nav-bar
    padding: 15px
    background-color: #2f2f2f
    text-align: center
  a
    font-size: 1em
    text-decoration: none
    margin-right: 30px
    color: white
    cursor: pointer
  a:hover
    color: darkgray
  .left-link
    position: absolute
    left: 20px
    opacity: 0
  .right-link
    position: absolute
    right: 20px
</style>
