<template lang="pug">
    #animateme.ui.row.nav-bar
      a.left-link(@click='setHeader(true)')
        router-link(to="/" )
          img(v-bind:src='logo.default' style='height: 80px; width: auto; margin-top: -30px')
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

<script src='./navigation.js'></script>


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
