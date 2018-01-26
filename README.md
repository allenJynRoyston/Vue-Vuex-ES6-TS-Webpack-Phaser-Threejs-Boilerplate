### Technologies included
- Vue + Vuex (with ES6)
- Webpack
- [Bulma CSS](https://bulma.io/)
- [Velocity](http://velocityjs.org/)
- [Phaser](https://phaser.io/)
- [Threejs](https://threejs.org/)
- Express
- Font Awesome
- Jasmine (Unit testing)

### Preview
[Click here](https://vue-vuex-es6-webpack-phaser-bp.herokuapp.com/#/fun)

### Install instructions:
```sh
$ git clone https://github.com/allenRoyston/vue-vuex-webpack-es6-phaser-boilerplate.git
$ cd vue-vuex-webpack-es6-phaser-boilerplate
$ npm install
$ npm run dev (USE THIS WHEN DEVELOPING)
```

### Deployment instructions:
```sh
$ gulp build

// TO PREVIEW WITH BUILD SCRIPT
$ npm start
OR 
$ gulp
```


### Preload image assets -*optional*-
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

### Vuex store
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

### Unit testing
Simple to start and expand.  
```
$ npm run test
```

### Build the Phaser/ThreeJS file independently
Phaser and ThreeJS files (located in src/phaser and src/threeJS respectively) can be built independently of the app.  Think of it as the app being a console and the file being the cartridge.  This has several benefits:  
- You can use other build tools (like Typescript) to compile to the file you want to use.  This will provide a better dev experience than vanilla javascript (at least for highly complex projects).
- You can load games in sequence, or build smaller segments of games, and launch them in any order you need.  Think intro > cutscene > gameplay > gameover > etc etc.


### When to use gulp vs npm run dev
Webpack won't instantiate the Express server, so any endpoints you build in Express will be returned as a 404.  If you run Gulp, it will start the server and load your app.  However, any changes you make to components will cause Webpack to rerun - and it is quite slow.  You only need this if you're building out endpoints, otherwise stick with npm run dev.

### Build size
Final size is ~945kb, which admittedly sounds a little big, but not bad considering you're getting jQuery/Phaser/Velocity/SemanticUI/Vue/Vuex all included.  

Games built in the Phaser folder are loaded independently of the site it will not be added to the build.  You can build your own preloaders in Phaser.  
