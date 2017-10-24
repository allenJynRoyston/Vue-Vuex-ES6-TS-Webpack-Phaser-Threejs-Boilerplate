<template lang="pug">
  #overlay.ui.dimmer.inverse(v-bind:class='store.state.isActive ? "unclickable" : ""')
    .ui.container.loading-container
      .ui.segment
        .ui.active.progress.yellow
          .bar
            .progress
          .label(style='padding: 10px') Loading - one sec!
      .fixed-loader
        .ui.active.dimmer
          .ui.text.loader
</template>

<script>
export default {
  name: 'overlay',
  data() {
    return {
      store: this.$store,
      isActive: null
    }
  },
  mounted(){
    // watch for isActive
    this.store.watch(this.store.getters._isActive, val => {
      this.showOverlay(val)
    })
    this.store.watch(this.store.getters._progressBar, val => {
      this.setProgressBar(val)
    })
  },
  methods: {
    setProgressBar(val){
      $('.progress').progress({
        percent: val
      });
    },
    showOverlay(state) {
      this.isActive = state;
      $('#overlay').dimmer(state ? "show" : 'hide', {closable: false})
    }
  }
}
</script>


<style lang="sass" scoped>
  #overlay
    width: 100%
    height: 100%
    z-index: 100
  .loading-container
    margin-top: 100px
  .fixed-loader
    position: fixed
    bottom: 30px
    right: 30px
  .unclickable
    pointer-events: none
</style>
