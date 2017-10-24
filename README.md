# Vue + Vuex / ES6 / Webpack / Phaser / SemanticUI / Express4

### Install instructions:
```sh
$ git clone https://github.com/allenRoyston/vue-vuex-webpack-es6-phaser-boilerplate.git
$ cd vue-vuex-webpack-es6-phaser-boilerplate
$ npm install
$ gulp build
$ gulp  
OR
$ npm run dev
```
### Preload assets 
You can preload your images in src/App.vue.  This will automatically trigger the overlay to blur your site until anything contained in the array is fully loaded.  You can also alter the look/feel of the overlay by editing the src/components/Overlay.vue

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

And watching fot changes is equally as easy.  Just place this in your mounted() state:
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


### Build the Phaser file independently
The src/components/GameComponent.vue file will load your phaser file, so you can create/build/test it independently before pushing it live on the site.  Game will be destroyed when leaving the page so you don't need to worry about cleanup.  

### When to use gulp vs npm run dev
Webpack won't instantiate the Express server, so any endpoints you need to access will be returned as a 404.  If you can don't need access to endpoints, I'd recommened npm run dev since it's much faster.  

### Deployment instructions:
```sh
$ gulp build
$ git push heroku master
```

### Deployment preview (what you see is what you'll get):
```sh
$ gulp build
$ npm start
```
