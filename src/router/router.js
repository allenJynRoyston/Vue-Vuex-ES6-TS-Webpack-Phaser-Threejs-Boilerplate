// require vue and vue modules
import Vue from 'vue'
import Router from 'vue-router'
import VueResource from 'vue-resource'

// import components
import MainHeader from '../components/MainHeader.vue'
import Navigation from '../components/Navigation.vue'
import Overlay from '../components/Overlay.vue'
import MainFooter from '../components/MainFooter.vue'
// pages
import Home from '../components/Home.vue'
import About from '../components/About.vue'
import Game from '../components/Game.vue'
import Three from '../components/Three.vue'

// components
import GameComponent from '../components/GameComponent.vue'
import ThreeComponent from '../components/Three.vue'

// make components global
Vue.component('Navigation', require('../components/Navigation.vue'))
Vue.component('Overlay', require('../components/Overlay.vue'))
Vue.component('MainHeader', require('../components/MainHeader.vue'))
Vue.component('MainFooter', require('../components/MainFooter.vue'))
Vue.component('GameComponent', require('../components/GameComponent.vue'))
Vue.component('ThreeComponent', require('../components/ThreeComponent.vue'))

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
