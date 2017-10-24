import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    appReady: false,
    isActive: false,
    progressBar: 0,
    images: [],
    count: 0,
    cards: [],
    headerIsOpen: true
  },
  getters: {
    _appReady: state => () => state.appReady,
    _isActive: state => () => state.isActive,
    _images: state => () => state.images,
    _progressBar: state => () => state.progressBar,
    _count: state => () => state.count,
    _cards: state => () => state.cards,
    _headerIsOpen: state => () => state.headerIsOpen
  },
  mutations: {
    setAppState(state, value){
      state.appReady = value
    },
    overlay_on(state) {
      state.isActive = true;
    },
    overlay_off(state) {
      state.isActive = false;
    },
    toggleOverlay(state) {
      state.isActive = !state.isActive
    },
    addCard(state, data){
      state.cards.push(data)
    },
    editCard(state, data){
      state.cards[data.index] = data;
    },
    setProgressBar(state, value){
      state.progressBar = value;
    },
    setImages(state, images){
      state.images = images
    },
    increment (state) {
      state.count++
    },
    setHeader (state, value) {
      state.headerIsOpen = value
    }
  }
})
