<template lang="pug">
  section.hero.is-primary
    .hero-body
      .container
        h1.title
          | Vue + Vuex
        h2.subtitle
          | Game Creation Suite
        a.button(@click='toggleModal()')
          | Get Started

    .modal(v-bind:class='modalIsOpen ? "is-active" : ""')
      .modal-background
      .modal-card
        header.modal-card-head
          p.modal-card-title Modal title
          button.delete(aria-label='close' @click='toggleModal()')
        section.modal-card-body
          h1 Content
        footer.modal-card-foot
          button.button.is-success Save changes
          button.button(@click='toggleModal()') Cancel
</template>

<script>
import shortParagraph1 from "../../assets/images/site/short-paragraph.png"

export default {
  name: 'site-header',
  data () {
    return {
      modalIsOpen: false,
      store: this.$store,
      shortParagraph1: shortParagraph1
    }
  },
  created() {

  },
  methods: {
    toggleModal() {
      this.modalIsOpen = !this.modalIsOpen;
    }
  }
}
</script>


<style lang="sass" scoped>

</style>
