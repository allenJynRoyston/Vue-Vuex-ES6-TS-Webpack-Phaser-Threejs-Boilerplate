//--------------
__phaser = {

    gameObj: null,
    global:{
      isPaused: false
    },

    //-------------------
    game:{

      //-------------------
      init(canvasEle, vueComponent, options){


            //----------------------- assign variables
            var game = new Phaser.Game(800, 500, Phaser.WEBGL, canvasEle, { create: create, update: update });
            var filter;
            var sprite;

            __phaser.gameObj = game;
            vueComponent.game = __phaser;
            //-----------------------


            //-----------------------
            function create() {

                  //  From http://glslsandbox.com/e#18918.0
                  // Tenjix",

                  var fragmentSrc = [

                    "precision mediump float;",
                    "uniform vec2      resolution;",
                    "uniform float     time;",

                    "void main( void )",
                    "{",
                        "vec2 p = ( gl_FragCoord.xy / resolution.xy ) * 2.0 - 1.0;",

                        "vec3 c = vec3( 0.0 );",

                        "float amplitude = 0.50;",
                        "float glowT = sin(time) * 0.5 + 0.5;",
                        "float glowFactor = mix( 0.15, 0.25, glowT );",

                        "c += vec3(0.02, 0.03, 0.13) * ( glowFactor * abs( 1.0 / sin(p.x + sin( p.y + time ) * amplitude ) ));",
                        "c += vec3(0.02, 0.10, 0.03) * ( glowFactor * abs( 1.0 / sin(p.x + cos( p.y + time+1.00 ) * amplitude+0.1 ) ));",
                        "c += vec3(0.15, 0.05, 0.20) * ( glowFactor * abs( 1.0 / sin(p.y + sin( p.x + time+1.30 ) * amplitude+0.15 ) ));",
                        "c += vec3(0.20, 0.05, 0.05) * ( glowFactor * abs( 1.0 / sin(p.y + cos( p.x + time+3.00 ) * amplitude+0.3 ) ));",
                        "c += vec3(0.17, 0.17, 0.05) * ( glowFactor * abs( 1.0 / sin(p.y + cos( p.x + time+5.00 ) * amplitude+0.2 ) ));",

                        "gl_FragColor = vec4( c, 1.0 );",
                    "}"
                  ];

                  sprite = game.add.sprite();
                  sprite.width = 2500;
                  sprite.height = 500;

                  filter = new Phaser.Filter(game, null, fragmentSrc);
                  filter.setResolution(800, 600);

                  sprite.filters = [ filter ];
            }
            //-----------------------

            //-----------------------
            function update() {
              if(!__phaser.global.isPaused){
                filter.update();
              }
            }
            //-----------------------

      },
    },
    //-------------------

    //-------------------
    toggle(val){
      __phaser.global.isPaused = !__phaser.global.isPaused
      return __phaser.global.isPaused
    },
    //-------------------

    //-------------------
    pause(val){
      __phaser.global.isPaused = val
      return __phaser.global.isPaused
    },
    //-------------------

    //-------------------
    destroy(){
      this.gameObj.destroy();
      return true
    }
    //-------------------


}
//--------------
