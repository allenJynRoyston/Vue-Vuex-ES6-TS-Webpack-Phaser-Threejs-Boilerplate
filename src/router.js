// require vue and vue modules
import Vue from 'vue'
import Router from 'vue-router'
import VueResource from 'vue-resource'

// pages
import Home from './components/Home.vue'
import About from './components/About.vue'
import Game from './components/Game.vue'
import Three from './components/Three.vue'

// components
import GameComponent from './components/GameComponent.vue'
import ThreeComponent from './components/Three.vue'
import Navigation from './components/elements/Navigation.vue'
import Overlay from './components/elements/Overlay.vue'
import MainHeader from './components/elements/Header.vue'
import MainFooter from './components/elements/Footer.vue'
import Test from './components/elements/Test.vue'

// phaser elements
import SpriteManager from './components/elements/SpriteManager.vue'

// elements
Vue.component('game-component', require('./components/GameComponent.vue'))
Vue.component('three-component', require('./components/ThreeComponent.vue'))
Vue.component('site-navigation', require('./components/elements/Navigation.vue'))
Vue.component('site-overlay', require('./components/elements/Overlay.vue'))
Vue.component('site-header', require('./components/elements/Header.vue'))
Vue.component('site-footer', require('./components/elements/Footer.vue'))

// phaser elements
Vue.component('phaser-master', require('./components/elements/MasterManager.vue'))
Vue.component('phaser-controls', require('./components/elements/ControllerManager.vue'))
Vue.component('phaser-bitmap', require('./components/elements/BitmapManager.vue'))
Vue.component('phaser-sprite', require('./components/elements/SpriteManager.vue'))
Vue.component('phaser-text', require('./components/elements/TextManager.vue'))
Vue.component('phaser-mouse', require('./components/elements/MouseManager.vue'))
Vue.component('phaser-bitmap', require('./components/elements/BitmapManager.vue'))
Vue.component('phaser-group', require('./components/elements/GroupManager.vue'))

Vue.use(Router)
Vue.use(VueResource);

// set routes
export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/about',
      name: 'About',
      component: About
    },
    {
      path: '/phaser',
      name: 'Phaser',
      component: Game
    },
    {
      path: '/three',
      name: 'Three',
      component: Three
    }
  ]
})
