## Core technologies
- [Vue 2.3.3](https://vuejs.org/) 
- [Vuex 3.0](https://github.com/vuejs/vuex)
- [Skeleton CSS](http://getskeleton.com/)
- [AnimeJS](http://animejs.com/)
- [Axios](https://github.com/axios/axios)
- [Express 4.x](https://expressjs.com/) 
- [Webpack 4.x](https://webpack.js.org/)
- [Jasmine](https://jasmine.github.io/)
- ES6/7 support (via Babel) 
- TypeScript support


#### Optionally included
- [Pixi](http://www.pixijs.com/) 
- [Phaser](https://phaser.io/)
- [Threejs](https://threejs.org/)


## Build size
Vue/Vuex/AnimeJS/SkeletonCSS and Axios (basically all nicities you'd need for developing a modern website/webapp) are included by default.  Despite that, the total end result bundle is approximately **~189kb**.  

Phaser/Pixi/ThreeJS files (and their associated dependencies) are loaded independently and only when needed (see more details below).  This ensures that the project is **very fast and shockingly light**.


## Preview
[Click here](https://vue-vuex-es6-webpack-phaser-bp.herokuapp.com/#/)


## Install instructions:
```sh
$ git clone https://github.com/allenRoyston/Vue-Vuex-ES6-TS-Webpack-Phaser-Threejs-Boilerplate.git
$ cd Vue-Vuex-ES6-TS-Webpack-Phaser-Threejs-Boilerplate
$ npm install
$ npm run dev
```


## Autocompile .TS -> .JS 
##### (*optional*)
```sh
// open terminal on seperate instance
$ tsc -w
```
* TypeScript support is included, but if you don't want to use it you can just delete them and utilize edit the .js files directly instead.


## Webpack build instructions:
```sh
$ npm run build
or 
$ gulp build
```


## Test deployment instructions:
```sh
$ gulp

// Opens up a browsers at:  http://localhost:3030/#/
```

## Preload image assets
##### (*optional*)
If your site is going to be visually heavy, you can preload your images in src/App.vue.  This will automatically trigger the overlay to blur your site until anything contained in the array is fully loaded.  You can also alter the look/feel of the overlay by editing the src/components/Overlay.vue

```
import image1 from "./assets/images/misc/image1.png"
import image2 from "./assets/images/misc/image2.jpg"
import image3 from "./assets/images/misc/image3.gif"

export default {
  name: 'app',
  data() {
    return {
      appReady: false,
      store: this.$store,
      images: [
        image1, image2, image3
      ]
    }
  }
 ...
```

You can disable this effect by removing these two lines of code in the src/App.vue file.
```
  data() {
    return {
      appReady: false,
      store: this.$store,
      images: [
        image1, image2, image3
      ]
    }
  },
  mounted(){
    //this.store.commit('overlay_on')
    //this.imageLoader(this.images, this.finishedLoading)
  },
```


## Vuex store
Vuex is included by default. You'll find it located in src/store/store.js
You'll find adding to or removing properties from the Store is easy.  
```
export default new Vuex.Store({
  state: {
    name: null
  },
  getters: {
    _name: state => () => state.name,
  },
  mutations: {
    setName(state, value){
      state.name = value
    },
  }
})

```

Make sure you declare it in a component before using it.  
```
  data() {
    return {
      store: this.$store,
    }
  },
```

Changing a property in the store is easy:
```
 this.store.commit('setName', 'Allen')
```

And watching for changes is equally as easy.  Just place this in your mounted() state:
```
  data () {
    return {
      store: this.$store,
    }
  },
  mounted(){
    this.store.watch(this.store.getters._name, val => {
      console.log(val)  // "Allen"
    })
  }
```


## Unit testing
Simple to start and expand.  
```
$ npm run test
```

## Build the Phaser/ThreeJS file independently
Phaser and ThreeJS files (located in src/phaser and src/threeJS respectively) can be built independently of the app.  Think of it as the app being a console and the file being the cartridge.  This has several benefits:  
- You can use other build tools (like Typescript) to compile to the file you want to use.  This will provide a better dev experience than vanilla javascript (at least for highly complex projects).
- You can load games in sequence, or build smaller segments of games, and launch them in any order you need.  Think intro > cutscene > gameplay > gameover > etc etc.


## When to use gulp vs npm run dev
Webpack won't instantiate the Express server, so any endpoints you build in Express will be returned as a 404.  If you run Gulp, it will start the server and load your app.  However, any changes you make to components will cause Webpack to rerun - and it is quite slow.  You only need this if you're building out endpoints, otherwise stick with npm run dev.
