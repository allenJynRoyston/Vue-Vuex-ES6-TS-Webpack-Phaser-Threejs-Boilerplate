<template lang="pug">
  #overlay(v-bind:class='isActive ? "visible" : "hidden"')
    .loading-container
      p
        span.fa.fa-spinner.fa-pulse.fa-fw
      progress.progress.is-success(v-bind:value="progress" max="100")
</template>

<script>
export default {
  data() {
    return {
      store: this.$store,
      progress: 0,
      isActive: null
    }
  },
  mounted(){
    // watch for isActive
    this.store.watch(this.store.getters._isActive, val => {
      this.isActive = val;
    })
    this.store.watch(this.store.getters._progressBar, val => {
      this.progress = val;
    })
  },
  methods: {

  }
}
</script>


<style lang="sass" scoped>
  #overlay
    position: fixed
    width: 100%
    height: 100%
    z-index: 100
    pointer-events: none
    text-align: center
    background-color: white

  .loading-container
    margin-top: 50px

  .visible
    opacity: 1

  .hidden
    opacity: 0

</style>
