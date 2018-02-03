//--------------
__phaser = {

    gameObj: null,
    global:{
      isPaused: false
    },

    //-------------------
    game:{

      //-------------------
      init(canvasEle, vueComponent){

            //----------------------- assign variables
            var assets = {
                app: null,
                preloader: {

                },
                ready:{
                    music:{
                        main: null,
                        intro: null,
                    }
                },
                gameSelection: 0,
                disableInput: true,
                keybufferLR:[],
                keybufferUD:[],
                keybufferStart:[],
                keybufferA:[],
                keybufferB:[],
                keybufferX:[],
                keybufferY:[],
                state: "boot"
            }


            var game = new Phaser.Game(800, 500, Phaser.WEBGL, canvasEle, { preload: preload, create: create, update: update });
            __phaser.gameObj = game;
            vueComponent.game = __phaser;

            var text;
            var index = 0;
            var line = '';

            WebFontConfig = {
                active: function() { game.time.events.add(Phaser.Timer.SECOND, function(){}, this); },
                google: {
                  families: ['Press Start 2P']
                }
            };

            var distance = 300;
            var speed = 4;
            var stars;

            var max = 200;
            var xx = [];
            var yy = [];
            var zz = [];

            var text;
            var index = 0;
            var line = '';


            //-----------------------

            //-----------------------
            function preload() {

                // set canvas color
                game.stage.backgroundColor = '#2f2f2f';

                // images
                game.load.image('star', 'src/assets/game/images/star.png')
                game.load.image('winners', 'src/assets/game/images/winners.jpg')
                game.load.image('ship', 'src/assets/game/images/ship.png')
                game.load.image('gametitle', 'src/assets/game/titles/angular-attack-title.png')
                game.load.image('purewhite', 'src/assets/game/images/purewhite.png')
                game.load.image('pureblack', 'src/assets/game/images/pureblack.png')

                game.load.image('zwcats1', 'src/assets/game/zerowing/zw-cats.jpg')
                game.load.image('zwcats2', 'src/assets/game/zerowing/zw-cats2.jpg')
                game.load.image('zwoperator1', 'src/assets/game/zerowing/zw-operator1.jpg')
                game.load.image('zwoperator2', 'src/assets/game/zerowing/zw-operator2.jpg')
                game.load.image('zwoperator3', 'src/assets/game/zerowing/zw-operator3.jpg')
                game.load.image('zwearth', 'src/assets/game/zerowing/earth.jpg')
                game.load.image('zwcity', 'src/assets/game/zerowing/city.png')

                game.load.image('cyberglow', 'src/assets/game/images/cyberglow.png');
                game.load.image('bullet', 'src/assets/game/images/bullet.png');

                // load music into buffer
                assets.ready.music.main = game.load.audio('music-main', ['src/assets/game/music/random-encounter.ogg']);
                assets.ready.music.intro = game.load.audio('intro-music', ['src/assets/game/music/far-sight.ogg']);
                assets.ready.music.gameplay = game.load.audio('gameplay-music', ['src/assets/game/music/zombies-in-space.ogg']);
                game.load.audio('click', ['src/assets/game/sound/Powerup4.ogg']);
                game.load.audio('select', ['src/assets/game/sound/Pickup_Coin.ogg']);

                // scripts
                game.load.script('webfont', '//ajax.googleapis.com/ajax/libs/webfont/1.4.7/webfont.js');

                //	You can listen for each of these events from Phaser.Loader
                game.load.onLoadStart.add(loadStart, this);
                game.load.onFileComplete.add(fileComplete, this);
                game.load.onLoadComplete.add(loadComplete, this);
                game.load.enableParallel = true;

            }
            //-----------------------

            //-----------------------
            function create() {

                // establish controls
                buttonDelay = game.time.now;
                leftKey = game.input.keyboard.addKey(Phaser.Keyboard.LEFT);
                rightKey = game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);
                upKey = game.input.keyboard.addKey(Phaser.Keyboard.UP);
                downKey = game.input.keyboard.addKey(Phaser.Keyboard.DOWN);

                // estblish buttons
                enterKey = game.input.keyboard.addKey(Phaser.Keyboard.ENTER);
                enterA = game.input.keyboard.addKey(Phaser.Keyboard.A);
                enterB = game.input.keyboard.addKey(Phaser.Keyboard.S);
                enterX = game.input.keyboard.addKey(Phaser.Keyboard.D);
                enterY = game.input.keyboard.addKey(Phaser.Keyboard.F);


                // keypress goes into buffer
                leftKey.onDown.add(function(){
                    assets.keybufferLR[0] = 0
                }, this);
                rightKey.onDown.add(function(){
                    assets.keybufferLR[0] = 1
                }, this);
                upKey.onDown.add(function(){
                    assets.keybufferUD[0] = 0
                }, this);
                downKey.onDown.add(function(){
                    assets.keybufferUD[0] = 1
                }, this);

                enterKey.onDown.add(function(){
                    assets.keybufferStart[0] = true
                }, this);
                enterA.onDown.add(function(){
                    assets.keybufferA[0] = true
                }, this);
                enterB.onDown.add(function(){
                    assets.keybufferB[0] = true
                }, this);
                enterX.onDown.add(function(){
                    assets.keybufferX[0] = true
                }, this);
                enterY.onDown.add(function(){
                    assets.keybufferY[0] = true
                }, this);


                game.input.keyboard.onUpCallback = function(e){
                    buttonDelay = game.time.now;
                    if(e.code == "ArrowLeft" || e.code == "ArrowRight"){
                        assets.keybufferLR.shift();
                    }
                    if(e.code == "ArrowUp" || e.code == "ArrowDown"){
                        assets.keybufferUD.shift();
                    }
                    if(e.code == "Enter"){
                        assets.keybufferStart.shift();
                    }
                    if(e.code == "SPACE"){
                        assets.keybufferA.shift();
                    }
                    if(e.code == "KeyA"){
                        assets.keybufferB.shift();
                    }
                    if(e.code == "KeyS"){
                        assets.keybufferX.shift();
                    }
                    if(e.code == "KeyD"){
                        assets.keybufferY.shift();
                    }
                }


                if (game.renderType === Phaser.WEBGL){
                    max = 2000;
                }

                var sprites = game.add.spriteBatch();

                stars = [];

                for (var i = 0; i < max; i++)
                {
                    xx[i] = Math.floor(Math.random() * 800) - 400;
                    yy[i] = Math.floor(Math.random() * 600) - 300;
                    zz[i] = Math.floor(Math.random() * 1700) - 100;

                    var star = game.make.sprite(0, 0, 'star');
                    star.anchor.set(0.5);

                    sprites.addChild(star);

                    stars.push(star);
                }


                clickSound = game.add.audio('click');
                clickSound.allowMultiple = true;
                selectSound = game.add.audio('select');


            }
            //-----------------------

            //-----------------------
            function start() {

                // start
                game.load.start();

            }
            //-----------------------

            //-----------------------
            function loadStart() {

                /*
                // fragment
                var fragmentSrc = [
                        "precision mediump float;",
                        "uniform float     time;",
                        "uniform vec2      resolution;",
                        "uniform vec2      mouse;",
                        "float noise(vec2 pos) {",
                            "return fract(sin(dot(pos, vec2(12.9898 - time,78.233 + time))) * 43758.5453);",
                        "}",
                        "void main( void ) {",
                            "vec2 normalPos = gl_FragCoord.xy / resolution.xy;",
                            "float pos = (gl_FragCoord.y / resolution.y);",
                            "float mouse_dist = length(vec2((mouse.x - normalPos.x) * (resolution.x / resolution.y) , mouse.y - normalPos.y));",
                            "float distortion = clamp(1.0 - (mouse_dist + 0.1) * 3.0, 0.0, 1.0);",
                            "pos -= (distortion * distortion) * 0.1;",
                            "float c = sin(pos * 400.0) * 0.4 + 0.4;",
                            "c = pow(c, 0.2);",
                            "c *= 0.2;",
                            "float band_pos = fract(time * 0.1) * 3.0 - 1.0;",
                            "c += clamp( (1.0 - abs(band_pos - pos) * 10.0), 0.0, 1.0) * 0.1;",
                            "c += distortion * 0.08;",
                            "// noise",
                            "c += (noise(gl_FragCoord.xy) - 0.5) * (0.09);",
                            "gl_FragColor = vec4( 0.0, c, 0.0, 1.0 );",
                        "}"
                ];

                // filter
                filter = new Phaser.Filter(game, null, fragmentSrc);
                filter.setResolution(800, 600);
                filterContainer = game.add.sprite();
                filterContainer.width = 800;
                filterContainer.height = 600;
                filterContainer.filters = [ filter ];
                */


                // text
                var style = { font: "12px Press Start 2P", fill: "#fff", align: "center" };
                loadingtext = game.add.text(game.world.centerX, game.world.centerY/2, "", style);
                loadingtext.anchor.set(0.5);

                loadingPercentage = game.add.text(game.world.centerX, game.world.centerY, "", style);
                loadingPercentage.anchor.set(0.5);

                // change state
                assets.state = "preload";

            }
            //-----------------------

            //-----------------------
            function fileComplete(progress, cacheKey, success, totalLoaded, totalFiles) {
                // change text
            	loadingtext.setText("LOAD 'AngularAttack_1989.exe', 8, 1...\r\r(╯°□°)╯︵ ┻━┻");
              loadingPercentage.setText(progress + "%")
            }
            //-----------------------

            //-----------------------
            function loadComplete() {
                loadingtext.setText("Angular Attacks loaded!  \rStarting momentarily...");
                loadingPercentage.setText("^__^")

                // start game after slight delay
                setTimeout(function(){
                    clearPreloader();

                    // render game code
                    assets.state = "ready";
                    game.stage.backgroundColor = '#000';


                    splashDelay = game.time.now + 2000;
                    splashScreen = game.add.sprite(game.world.centerX - 15, game.world.centerY, 'winners');
                    splashScreen.anchor.set(0.5);
                    splashScreen.scale.setTo(1.1, 1.1)
                    splashScreen.alpha = 1

                    assets.ready.music.main = game.add.audio('music-main')
                    setTimeout(function(){
                        assets.ready.music.main.loopFull(0.75)
                    }, 2000)

                }, 4000)
            }
            //-----------------------


            //-----------------------
            function update() {
              if(!__phaser.global.isPaused){
                //-----------------
                if(assets.state == "preload"){
                    //filter.update();
                }
                //-----------------

                //-----------------
                if(assets.state == "ready"){
                    if(game.time.now > splashDelay){
                        clearReady();
                    }
                }
                //-----------------

                //-----------------
                if(assets.state == "gamemenu"){

                    //----------- starfield
                    for (var i = 0; i < max; i++){
                        stars[i].perspective = distance / (distance - zz[i]);
                        stars[i].x = game.world.centerX + xx[i] * stars[i].perspective;
                        stars[i].y = game.world.centerY + yy[i] * stars[i].perspective;
                        zz[i] += speed;
                        if (zz[i] > 290)
                        {
                            zz[i] -= 600;
                        }
                        stars[i].alpha = Math.min(stars[i].perspective / 2, 1);
                        stars[i].scale.set(stars[i].perspective / 2);
                        stars[i].rotation += 0.1;

                    }
                    //-----------

                    //----------- flashing text
                    if(game.time.now > pressStartTextDelay){
                        pressStartText.visible = !pressStartText.visible
                        pressStartTextDelay = game.time.now + 700;
                    }
                    //-----------

                    //----------- wait for keypress
                    if(game.time.now > buttonDelay && !assets.disableInput){
                        if(assets.keybufferStart[0]){
                            selectSound.play()
                            startGameIntro();
                            buttonDelay = game.time.now + 250;
                        }
                    }
                    //-----------
                  }
                }
                //-----------------


                //-----------------
                if(assets.state == "gameIntro"){
                    //----------- wait for keypress
                    if(game.time.now > buttonDelay && !assets.disableInput){
                      debugger;
                        if(assets.keybufferStart[0]){
                            selectSound.play()
                            startGameplay();
                            buttonDelay = game.time.now + 250;
                        }
                    }
                    //-----------
                }
                //-----------------


            }
            //-----------------------


            //-----------------------
            function clearPreloader(){
                loadingtext.destroy();
                loadingPercentage.destroy();
            }
            //-----------------------

            //-----------------------
            function clearReady(){
                splashScreen.destroy();
                assets.state = "gamemenu"

                // game title
                gametitleart = game.add.sprite(game.world.centerX, game.world.centerY - 50, 'gametitle');
                gametitleart.anchor.set(.5)
                gametitleart.scale.setTo(5, 5)
                game.add.tween(gametitleart.scale).to( { x: 2, y: 2}, 2000, Phaser.Easing.Bounce.Out, true)

                // text
                pressStartTextDelay = game.time.now + 1500;
                var style = { font: "24px Press Start 2P", fill: "#fff", align: "center" };
                pressStartText = game.add.text(game.world.centerX, game.world.centerY + 250, "Press Enter to Start", style);
                pressStartText.anchor.set(0.5);
                pressStartText.alpha = 0;
                game.add.tween(pressStartText).to( { alpha: 1,  y: game.world.centerY + 200 }, 350, "Linear", true, 1500);
                assets.disableInput = false;
            }
            //-----------------------

            //-----------------------
            function startGameIntro(){
                // disable input
                assets.disableInput = true;

                // fade to black
                pureblack = game.add.sprite(game.world.centerX, game.world.centerY, 'pureblack');
                pureblack.anchor.set(0.5);
                pureblack.alpha = 0;
                game.add.tween(pureblack).to( { alpha: 1 }, 1500, Phaser.Easing.Linear.In, true, 500);

                // destroy text
                pressStartText.destroy();

                // fade music
                assets.ready.music.main.fadeOut(1000)

                // wait for fade
                setTimeout(function(){
                    // destroy stars
                    for (var i = 0; i < max; i++){
                        stars[i].destroy();
                    }

                    // destroy titles
                    gametitleart.destroy()
                    assets.state = "gameIntro"

                    setTimeout(function(){
                        assets.ready.music.intro = game.add.audio('intro-music')
                        assets.ready.music.intro.loopFull(0.75)


                        content = [
                            "      ",
                            "The year was 20XX.",
                            "The world was experience a wave of great change.",
                            "",
                            "",
                            "When all of a sudden.",
                            "...",
                            "...",
                            " ",
                            "Google: \"How are you gentlemen?\"",
                            "Google: \"All your code are belong to us.\"",
                            "Google: \"You have no chance to revert make your time.\"",
                            "Google: \"Ha ha ha ha...\"",
                            "",
                            "PM: \"Take off every dev.\"",
                            "PM: \"You know what you doing.\"",
                            " ",
                            "PM: \"For great justice.\"",
                            " ",
                            " ",
                            " ",
                        ];
                        text = game.add.text(32, 380, '', { font: "14px Press Start 2P", fill: "#19cb65", stroke: "#119f4e", strokeThickness: 2 });

                        nextLine();

                        zwearth = game.add.sprite(game.world.centerX, game.world.centerY, 'zwearth');
                        zwearth.anchor.set(.5)
                        zwearth.scale.setTo(1.75, 1.75)
                        zwearth.visible = false;

                        zwcity = game.add.sprite(game.world.centerX - 50, game.world.centerY, 'zwcity');
                        zwcity.anchor.set(.5)
                        zwcity.scale.setTo(2, 2)
                        zwcity.visible = false;

                        zwcats1 = game.add.sprite(game.world.centerX, game.world.centerY, 'zwcats1');
                        zwcats1.anchor.set(.5)
                        zwcats1.scale.setTo(2, 2)
                        zwcats1.visible = false;

                        zwcats2 = game.add.sprite(game.world.centerX, game.world.centerY, 'zwcats2');
                        zwcats2.anchor.set(.5)
                        zwcats2.scale.setTo(2, 2)
                        zwcats2.visible = false;

                        zwoperator1 = game.add.sprite(game.world.centerX, game.world.centerY, 'zwoperator1');
                        zwoperator1.anchor.set(.5)
                        zwoperator1.scale.setTo(2, 2)
                        zwoperator1.visible = false;

                        zwoperator2 = game.add.sprite(game.world.centerX, game.world.centerY, 'zwoperator2');
                        zwoperator2.anchor.set(.5)
                        zwoperator2.scale.setTo(2, 2)
                        zwoperator2.visible = false;

                        zwoperator3 = game.add.sprite(game.world.centerX, game.world.centerY, 'zwoperator3');
                        zwoperator3.anchor.set(.5)
                        zwoperator3.scale.setTo(2, 2)
                        zwoperator3.visible = false;

                        skiptext = game.add.text(30, 30, 'Press Enter to skip intro', { font: "10px Press Start 2P", fill: "#fff", align: "left" });
                        skiptext.visible = false;

                        game.time.events.add(Phaser.Timer.SECOND * 0, function(){
                            zwearth.visible = true;
                            game.add.tween(zwearth.scale).to( { x: 2.5, y: 2.5 }, 20000, Phaser.Easing.Linear.In, true);
                            text.bringToTop()
                        }, this);

                        game.time.events.add(Phaser.Timer.SECOND * 3, function(){
                            assets.disableInput = false;
                            skiptext.visible = true;
                        })

                        game.time.events.add(Phaser.Timer.SECOND * 9, function(){
                            zwearth.visible = false;
                            zwcity.visible = true;
                            game.add.tween(zwcity).to( { x: game.world.centerX + 50 }, 20000, Phaser.Easing.Linear.In, true);
                            text.bringToTop()
                            skiptext.bringToTop()
                        }, this);

                        game.time.events.add(Phaser.Timer.SECOND * 26, function(){
                            zwcity.visible = false;
                            zwcats1.visible = true;
                            text.bringToTop()
                            skiptext.bringToTop()
                        }, this);

                        game.time.events.add(Phaser.Timer.SECOND * 39, function(){
                            zwcats1.visible = false;
                            zwcats2.visible = true;
                            text.bringToTop()
                            skiptext.bringToTop()
                        }, this);

                        game.time.events.add(Phaser.Timer.SECOND * 51, function(){
                            zwcats2.visible = false;
                            zwoperator1.visible = true;
                            text.bringToTop()
                            skiptext.bringToTop()
                        }, this);


                        game.time.events.add(Phaser.Timer.SECOND * 62, function(){
                            zwoperator1.visible = false;
                            zwoperator2.visible = true;
                            text.bringToTop()
                            skiptext.bringToTop()
                        }, this);

                        game.time.events.add(Phaser.Timer.SECOND * 67, function(){
                            startGameplay()
                        }, this);

                    }, 1000)


                }, 2000)


            }

            function updateLine() {
                if(line.length != undefined){
                    if (line.length < content[index].length)
                    {
                        line = content[index].substr(0, line.length + 1);
                        // text.text = line;
                        text.setText(line);
                    }
                    else{
                        //  Wait 2 seconds then start a new line
                        game.time.events.add(Phaser.Timer.SECOND * 2, nextLine, this);
                    }
                }
            }

            function nextLine() {
                index++;
                if (index < content.length){
                    line = '';
                    game.time.events.repeat(80, content[index].length + 1, updateLine, this);
                }
            }
            //-----------------------


            //-----------------------
            function startGameplay(){
                assets.disableInput = true;

                zwearth.destroy()
                zwcity.destroy()
                zwcats1.destroy()
                zwcats2.destroy()
                zwoperator1.destroy()
                zwoperator2.destroy()
                zwoperator3.destroy();
                skiptext.destroy()
                text.destroy();

                //game.add.tween(zwoperator3).to( { alpha: 0 }, 1500, Phaser.Easing.Linear.In, true);
                assets.ready.music.intro.fadeOut(1500)
                game.time.events.add(Phaser.Timer.SECOND * 1, function(){
                    vueComponent.loadGame('angularattack_2.js')
                }, this)

            };
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
