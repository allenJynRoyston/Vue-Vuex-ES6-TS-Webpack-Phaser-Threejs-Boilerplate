<template lang='pug'>
  #app-layout.ui.blurring.content
    overlay
    main-header
    navigation
    .ui.container
      router-view
    main-footer
</template>

<script>
import './assets/js/global.js'

import aurelia_logo from "./assets/images/skills/aurelia_logo.png"
import angular_logo from "./assets/images/skills/angular_logo.png"
import angular2_logo from "./assets/images/skills/angular2_logo.png"
import bootstrap_logo from "./assets/images/skills/bootstrap_logo.png"
import bower_logo from "./assets/images/skills/bower_logo.png"
import css3_logo from "./assets/images/skills/css3.jpg"
import ember_logo from "./assets/images/skills/ember.png"
import es6_logo from "./assets/images/skills/es6_logo.png"
import express_logo from "./assets/images/skills/express_logo.png"
import firebase_logo from "./assets/images/skills/firebase_logo.png"
import foundation_logo from "./assets/images/skills/foundation_logo.png"
import git_logo from "./assets/images/skills/git_logo.png"
import grunt_logo from "./assets/images/skills/grunt_logo.png"
import gulp_logo from "./assets/images/skills/gulp_logo.png"
import heroku_logo from "./assets/images/skills/heroku_logo.png"
import html_logo from "./assets/images/skills/html.png"
import ionic_logo from "./assets/images/skills/ionic_logo.png"
import jasmine_logo from "./assets/images/skills/jasmine_logo.png"
import jquery_logo from "./assets/images/skills/jquery.png"
import js_logo from "./assets/images/skills/js.jpg"
import knockout_logo from "./assets/images/skills/knockout.png"
import less_logo from "./assets/images/skills/less_logo.png"
import lumx_logo from "./assets/images/skills/lumx_logo.jpg"
import mongo_logo from "./assets/images/skills/mongo_logo.jpg"
import mysql_logo from "./assets/images/skills/mysql_logo.jpg"
import node_logo from "./assets/images/skills/node_logo.png"
import npm_logo from "./assets/images/skills/npm_logo.png"
import phaser_logo from "./assets/images/skills/phaser_logo.png"
import photoshop_logo from "./assets/images/skills/photoshop.png"
import php_logo from "./assets/images/skills/php_logo.png"
import pug_logo from "./assets/images/skills/pug_logo.png"
import react_logo from "./assets/images/skills/react.png"
import redux_logo from "./assets/images/skills/redux_logo.png"
import sass_logo from "./assets/images/skills/sass_logo.png"
import semantic_logo from "./assets/images/skills/semantic_logo.png"
import threejs_logo from "./assets/images/skills/threejs.png"
import typescript_logo from "./assets/images/skills/typescript_logo.png"
import vue_logo from "./assets/images/skills/vue.png"

export default {
  name: 'app',
  data() {
    return {
      appReady: false,
      store: this.$store,
      images: [
        aurelia_logo, angular_logo, angular2_logo, bootstrap_logo, bower_logo, css3_logo, ember_logo, es6_logo, express_logo,
        firebase_logo, foundation_logo, git_logo, grunt_logo, gulp_logo, heroku_logo, html_logo, ionic_logo,
        jasmine_logo, jquery_logo, js_logo, knockout_logo, less_logo, lumx_logo, mongo_logo, mysql_logo, node_logo,
        npm_logo, phaser_logo, php_logo, pug_logo, react_logo, redux_logo, sass_logo, semantic_logo, threejs_logo,
        typescript_logo, vue_logo,
      ]
    }
  },
  mounted(){
    this.store.commit('overlay_on')
    this.imageLoader(this.images, this.finishedLoading)
  },
  methods:{
    imageLoader(Images, Callback){
        let store = this.store;
        let allLoaded = 0;
        let _log = {
            success: [],
            error: []
        };
        let verifier = function(){
            allLoaded++;
            if(allLoaded == Images.length){
              store.commit('setProgressBar', 100);
              Callback.call(undefined, _log);
            }
        };
        for (let index = 0; index < Images.length; index++) {
            (function(i){
                let imgSource = Images[i];
                let img = new Image();
                img.addEventListener("load", function(){
                    store.commit('setProgressBar', (index/Images.length * 100).toFixed(0));
                    _log.success.push(imgSource);
                    verifier();
                }, false);
                img.addEventListener("error", function(){
                    _log.error.push(imgSource);
                    verifier();
                }, false);
                img.src = imgSource;
            })(index);
        }
    },
    finishedLoading(res){
      // commit to store
      this.store.commit('setImages', res.success);
      // toggle off overlay
      setTimeout(() => {
        this.appReady = true;
        this.store.commit('setAppState', true)
        this.store.commit('overlay_off')
      }, 500)
    }
  }
}
</script>

<style lang="scss">
  @import './assets/css/global.css';
</style>

<style lang="sass" scoped>
  .container
    max-width: 1200px
    margin-left: auto
    margin-right: auto
  .content
    min-height: 1000px
    //min-width: 1200px
</style>
