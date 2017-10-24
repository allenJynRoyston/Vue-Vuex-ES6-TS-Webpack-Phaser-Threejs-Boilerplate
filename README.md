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

### Build your Phaser game independently of your site
The src/components/GameComponent.vue file will load your phaser file, so you can create/build/test it independently before making it live on the site.  

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
