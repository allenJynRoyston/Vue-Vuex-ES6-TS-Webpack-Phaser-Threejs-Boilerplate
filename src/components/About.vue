<template lang="pug">
  .section
    .container
      .columns
        .column.is-2
          ul
            li(v-for="item in items")
              a(@click='active = item.id') {{ item.title }}
        .column
          phaser-master(v-if='active === 0')
          phaser-sprite(v-if='active === 1')
          phaser-text(v-if='active === 2')
          phaser-mouse(v-if='active === 3')
          phaser-bitmap(v-if='active === 4')
          phaser-controls(v-if='active === 5')
          phaser-group(v-if='active === 6')
</template>

<script>
export default {
  name: 'about',
  data () {
    return {
      store: this.$store,
      items: [
        {title: 'MASTER MANAGER', id: 0},
        {title: 'SPRITE MANAGER', id: 1},
        {title: 'TEXT MANAGER', id: 2},
        {title: 'MOUSE MANAGER', id: 3},
        {title: 'BITMAPDATA MANAGER', id: 4},
        {title: 'CONTROL MANAGER', id: 5},
        {title: 'GROUP MANAGER', id: 6},
      ],
      active: null
    }
  },
  mounted:function(){
    this.active = this.items[0].id
  }
}
</script>

<style lang="sass" scoped>

</style>
