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
                        main: null
                    }
                },
                gameSelection: 0,
                keybufferLR:[],
                keybufferUD:[],
                keybufferStart:[],
                keybufferA:[],
                keybufferB:[],
                keybufferX:[],
                keybufferY:[],
                state: "boot"
            }
            var game = new Phaser.Game(800, 500, Phaser.AUTO, canvasEle, { preload: preload, create: create, update: update });
            __phaser.gameObj = game;
            vueComponent.game = __phaser;

            WebFontConfig = {
                active: function() { game.time.events.add(Phaser.Timer.SECOND, function(){}, this); },
                google: {
                  families: ['Press Start 2P']
                }
            };

            var player;
            var aliens;
            var bullets;
            var bulletTime = 0;
            var cursors;
            var fireButton;
            var explosions;
            var starfield;
            var score = 0;
            var scoreString = '';
            var scoreText;
            var lives;
            var enemyBullet;
            var firingTimer = 0;
            var stateText;
            var livingEnemies = [];

            var player = {
                bulletSpeed: 1,
                bulletSpeedBonus: 1,
                bulletSize: 2,
                shields: 1,
                movementSpeed: 400,
                nukes: 0
            }


            //-----------------------

            //-----------------------
            function preload() {

                // set canvas color
                game.stage.backgroundColor = '#000000';

                // images
                game.load.image('winners', 'src/assets/game/images/winners.jpg')
                game.load.image('bullet', 'src/assets/game/images/bullet.png');
                game.load.image('enemyBullet', 'src/assets/game/images/enemy-bullet.png');
                game.load.spritesheet('invader', 'src/assets/game/images/invader32x32x4.png', 32, 32);
                game.load.image('ship', 'src/assets/game/images/player.png');
                game.load.spritesheet('kaboom', 'src/assets/game/images/explode.png', 128, 128);
                game.load.image('starfield', 'src/assets/game/images/starfield.png');
                game.load.image('cyberglow', 'src/assets/game/images/tron.png');


                // load music into buffer
                assets.ready.music.main = game.load.audio('music-main', ['src/assets/game/music/zombies-in-space.ogg']);
                game.load.audio('powerupfx', ['src/assets/game/sound/Powerup4.ogg']);
                game.load.audio('select', ['src/assets/game/sound/Pickup_Coin.ogg']);
                game.load.audio('smallExplosion', ['src/assets/game/sound/quietExplosion.ogg'])
                game.load.audio('bigExplosion', ['src/assets/game/sound/Explosion3.ogg'])
                game.load.audio('laser', ['src/assets/game/sound/Laser_Shoot78.ogg'])
                game.load.audio('hit', ['src/assets/game/sound/Hit_Hurt11.ogg'])

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

                // estblish buttons
                enterKey = game.input.keyboard.addKey(Phaser.Keyboard.ENTER);

                // keypress goes into buffer
                enterKey.onDown.add(function(){
                    assets.keybufferStart[0] = true
                }, this);



                game.input.keyboard.onUpCallback = function(e){
                    buttonDelay = game.time.now;
                    if(e.code == "Enter"){
                        assets.keybufferStart.shift();
                    }
                }



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

                // text
                var style = { font: "25px Courier New", fill: "#fff", align: "center" };
                loadingtext = game.add.text(game.world.centerX, game.world.centerY/2, "", style);
                loadingtext.anchor.set(0.5);

                var style = { font: "50px Courier New", fill: "#fff", align: "center" };
                loadingPercentage = game.add.text(game.world.centerX, game.world.centerY, "", style);
                loadingPercentage.anchor.set(0.5);

                // change state
                assets.state = "preload";

            }
            //-----------------------

            //-----------------------
            function fileComplete(progress, cacheKey, success, totalLoaded, totalFiles) {



            }
            //-----------------------

            //-----------------------
            function loadComplete() {

                    clearPreloader();

                    // render game code
                    assets.state = "ready";


                    assets.ready.music.main = game.add.audio('music-main')

                        loadingPercentage.destroy();

                        game.physics.startSystem(Phaser.Physics.ARCADE);



                        var fragmentSrc = [

                            "precision mediump float;",

                            "uniform float     time;",
                            "uniform vec2      resolution;",
                            "uniform sampler2D iChannel0;",

                            "void main( void ) {",

                                "float t = time;",

                                "vec2 uv = gl_FragCoord.xy / resolution.xy;",
                                "vec2 texcoord = gl_FragCoord.xy / vec2(resolution.y);",

                                "texcoord.y -= t*0.2;",

                                "float zz = 1.0/(1.0-uv.y*1.7);",
                                "texcoord.y -= zz * sign(zz);",

                                "vec2 maa = texcoord.xy * vec2(zz, 1.0) - vec2(zz, 0.0) ;",
                                "vec2 maa2 = (texcoord.xy * vec2(zz, 1.0) - vec2(zz, 0.0))*0.3 ;",
                                "vec4 stone = texture2D(iChannel0, maa);",
                                "vec4 blips = texture2D(iChannel0, maa);",
                                "vec4 mixer = texture2D(iChannel0, maa2);",

                                "float shade = abs(1.0/zz);",

                                "vec3 outp = mix(shade*stone.rgb, mix(1.0, shade, abs(sin(t+maa.y-sin(maa.x))))*blips.rgb, min(1.0, pow(mixer.g*2.1, 2.0)));",
                                "gl_FragColor = vec4(outp,1.0);",

                            "}"
                        ];

                        //  Texture must be power-of-two sized or the filter will break
                        sprite = game.add.sprite(0, 0, 'cyberglow');
                        sprite.width = 800;
                        sprite.height = 600;

                        var customUniforms = {
                            iChannel0: { type: 'sampler2D', value: sprite.texture, textureData: { repeat: true } }
                        };

                        filter = new Phaser.Filter(game, customUniforms, fragmentSrc);
                        filter.setResolution(800, 600);

                        sprite.filters = [ filter ];


                        //  An explosion pool
                        explosions = game.add.group();
                        explosions.createMultiple(30, 'kaboom');
                        explosions.forEach(setupInvader, this);

                        //  And some controls to play the game with
                        cursors = game.input.keyboard.createCursorKeys();
                        fireButton = game.input.keyboard.addKey(Phaser.Keyboard.A);

                        //  Our bullet group
                        bullets = game.add.group();
                        bullets.enableBody = true;
                        bullets.physicsBodyType = Phaser.Physics.ARCADE;
                        bullets.createMultiple(30, 'bullet');
                        bullets.setAll('anchor.x', 0.5);
                        bullets.setAll('anchor.y', 1);
                        bullets.setAll('outOfBoundsKill', true);
                        bullets.setAll('checkWorldBounds', true);

                        // The enemy's bullets
                        enemyBullets = game.add.group();
                        enemyBullets.enableBody = true;
                        enemyBullets.physicsBodyType = Phaser.Physics.ARCADE;
                        enemyBullets.createMultiple(30, 'enemyBullet');
                        enemyBullets.setAll('anchor.x', 0.5);
                        enemyBullets.setAll('anchor.y', 1);
                        enemyBullets.setAll('outOfBoundsKill', true);
                        enemyBullets.setAll('checkWorldBounds', true);



                        //  The baddies!
                        aliens = game.add.group();
                        aliens.enableBody = true;
                        aliens.physicsBodyType = Phaser.Physics.ARCADE;

                        assets.ready.music.main.loopFull(.75)


                        laserSound = game.add.audio('laser');
                        laserSound.allowMultiple = true;

                        smallExplosion = game.add.audio('smallExplosion');
                        smallExplosion.allowMultiple = true;

                        hitSound = game.add.audio('hit')
                        hitSound.allowMultiple = true;

                        bigExplosion = game.add.audio('bigExplosion')
                        bigExplosion.allowMultiple = false;

                        powerupfx = game.add.audio('powerupfx')


                        //  The score
                        scoreText = game.add.text(10, 10, "Score:" + score, { font: '14px Press Start 2P', fill: '#fff' });

                        //  Lives
                        lives = game.add.group();
                        game.add.text(game.world.width - 100, 10, 'Lives', { font: '14px Press Start 2P', fill: '#fff' });

                        //  Text
                        stateText = game.add.text(game.world.centerX,game.world.centerY -100,' ', { font: '25px Press Start 2P', fill: '#fff', align: 'center' });
                        stateText.anchor.setTo(0.5, 0.5);
                        stateText.visible = false;

                        subText = game.add.text(game.world.centerX,game.world.centerY,' ', { font: '14px Press Start 2P', fill: '#ffae00', align: 'center' });
                        subText.anchor.setTo(0.5, 0.5);
                        subText.visible = false;


                        restartGame();

            }
            //-----------------------


            //-----------------------
            function update() {

                //-----------------
                if(assets.state == "preload"){
                    filter.update();
                }
                //-----------------

                //-----------------
                if(assets.state == "ready"){
                    if(game.time.now > splashDelay){
                        clearReady();
                        assets.state = "showmenu"
                    }
                }
                //-----------------

                //-----------------
                if(assets.state == "gamestart"){
                    //  Scroll the background
                    filter.update();

                    // if invincible
                    if(playerStats.isInvincible){
                        player.alpha = .5
                    }
                    else{
                        player.alpha = 1
                    }

                    if (player.alive)
                    {
                        //  Reset the player, then check for movement keys
                        player.body.velocity.setTo(0, 0);

                        if (cursors.left.isDown){
                            player.body.velocity.x = -200;
                        }
                        else if (cursors.right.isDown){
                            player.body.velocity.x = 200;
                        }

                        //  Firing?
                        if (fireButton.isDown){
                            fireBullet();
                        }

                        if (game.time.now > firingTimer){
                            enemyFires();
                        }

                        //  Run collision
                        game.physics.arcade.overlap(bullets, aliens, collisionHandler, null, this);
                        game.physics.arcade.overlap(enemyBullets, player, enemyHitsPlayer, null, this);
                    }
                }
                //-----------------

                if(assets.state == 'gameover'){
                    if(assets.keybufferStart[0]){
                        stateText.visible = false;
                        aliens.removeAll();
                        restartGame();
                        buttonDelay = game.time.now + 500;
                    }
                }

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

                assets.state = "showmenu"
            }
            //-----------------------




            function createAliens () {

                for (var y = 0; y < enemyBehavior.columns; y++)
                {
                    for (var x = 0; x < enemyBehavior.rows; x++)
                    {
                        var alien = aliens.create(x * 48, y * 50, 'invader');
                        alien.anchor.setTo(0.5, 0.5);
                        alien.scale.setTo(enemyBehavior.enemySize, enemyBehavior.enemySize)
                        alien.animations.add('fly', [ 0, 1, 2, 3 ], 20, true);
                        alien.play('fly');
                        alien.body.moves = false;
                        alien.hp = enemyBehavior.hitpoints + Math.floor(playerStats.waveCleared/5);
                    }
                }

                aliens.x = 100;
                aliens.y = -400;
                var tween = game.add.tween(aliens).to( { y: 50 }, 800, Phaser.Easing.Linear.None, true, 0, 0, false);

                //  All this does is basically start the invaders moving. Notice we're moving the Group they belong to, rather than the invaders directly.
                game.add.tween(aliens).to( { x: 300 }, enemyBehavior.movementSpeed, enemyBehavior.movementType, true, 0, enemyBehavior.movementDelay, true);




            }

            function setupInvader (invader) {

                invader.anchor.x = 0.5;
                invader.anchor.y = 0.5;
                invader.animations.add('kaboom');

            }




            function render() {

                // for (var i = 0; i < aliens.length; i++)
                // {
                //     game.debug.body(aliens.children[i]);
                // }

            }


            function collisionHandler (bullet, alien) {

                alien.hp -= playerStats.weapon.power + playerStats.weapon.powerBonus;
                if(!playerStats.weapon.pierce){
                    bullet.kill();
                }

                var healthLeft = (alien.hp/enemyBehavior.hitpoints)*100

                    if(healthLeft > 0 && healthLeft < 20){
                            alien.tint =  0xff0000
                    }
                    else if(healthLeft >= 20 && healthLeft < 40){
                            alien.tint =  0xff6349
                    }
                    else if(healthLeft >= 40 && healthLeft < 60){
                            alien.tint =  0xff8549
                    }
                    else if(healthLeft >= 60 && healthLeft < 80){
                            alien.tint =  0xffc97a
                    }
                    else if(healthLeft >= 80 && healthLeft < 100){
                            alien.tint = 0xffe2b9
                    }



                if(alien.hp <= 0){
                    //  When a bullet hits an alien we kill them both

                    alien.kill();
                    smallExplosion.play()


                    //  Increase the score
                    score += 20;
                    scoreText.text = "Score:" + score;

                    //  And create an explosion :)
                    var explosion = explosions.getFirstExists(false);
                    explosion.reset(alien.body.x, alien.body.y);
                    explosion.play('kaboom', 30, false, true);

                    if (aliens.countLiving() == 0){
                        score += 1000;
                        scoreText.text = "Score:" + score;
                        enemyBullets.callAll('kill',this);
                        restart()
                    }
                }
                else{
                    hitSound.play();
                }

            }

            function enemyHitsPlayer (player,bullet) {

                // if not isInvincible
                if(!playerStats.isInvincible){

                    bullet.kill();
                    live = lives.getFirstAlive();
                    if (live && !playerStats.isInvincible){
                        live.kill();
                    }

                    // freeze bullets
                    playerStats.canFire = false;
                    playerStats.isInvincible = true;

                    //  And create an explosion :)
                    var explosion = explosions.getFirstExists(false);

                    explosion.reset(player.body.x, player.body.y);
                    explosion.play('kaboom', 30, false, true);
                    bigExplosion.play()

                    player.x = game.world.centerX
                    player.y = game.world.centerY + 500
                    game.add.tween(player).to( { y: 460 }, 1000, Phaser.Easing.Exponential.InOut, true, 0, 0, false);

                    setTimeout(function(){
                        playerStats.canFire = true;
                        playerStats.isInvincible = false;
                    }, 1200)

                    // When the player dies
                    if (lives.countLiving() < 1){
                        player.kill();
                        enemyBullets.callAll('kill');
                        setTimeout(function(){
                            stateText.text="Oh no!\r(Press Enter to try again!)";
                            stateText.visible = true;
                            stateText.bringToTop();
                        }, 1000)
                        assets.state  = "gameover"
                    }
                }

            }

            function enemyFires () {

                if(playerStats.canFire && enemyBehavior.canFire){
                    //  Grab the first bullet we can from the pool
                    enemyBullet = enemyBullets.getFirstExists(false);

                    livingEnemies.length=0;

                    aliens.forEachAlive(function(alien){
                        // put every living enemy in an array
                        livingEnemies.push(alien);
                    });


                    if (enemyBullet && livingEnemies.length > 0){

                        var random = game.rnd.integerInRange(0,livingEnemies.length-1);

                        // randomly select one of them
                        var shooter = livingEnemies[random];
                        // And fire the bullet from this enemy
                        enemyBullet.reset(shooter.body.x, shooter.body.y);

                        game.physics.arcade.moveToObject(enemyBullet,player, 100 + (playerStats.waveCleared * 10));
                        var delay = 1200 - (playerStats.waveCleared * 10) ;
                        if(delay < 100){ delay = 100 }
                        if(enemyBehavior.bullethell){
                            delay = 0
                        }
                        firingTimer = game.time.now + delay;
                    }
                }
            }




            function fireBullet () {

                //  To avoid them being allowed to fire too fast we set a time limit
                if (game.time.now > bulletTime)
                {
                    //  Grab the first bullet we can from the pool
                    bullet = bullets.getFirstExists(false);

                    if (bullet && playerStats.canFire){

                        //  And fire it
                        bullet.reset(player.x, player.y + 8);
                        bullet.scale.setTo(playerStats.bulletSize, playerStats.bulletSize)
                        bullet.body.velocity.y = -(playerStats.bulletSpeed);
                        bulletTime = game.time.now + playerStats.fireSpeedDelay;

                        laserSound.play();
                    }
                }

            }

            function resetBullet (bullet) {

                //  Called if the bullet goes out of the screen
                bullet.kill();

            }

            /*
            playerStats = {
                canFire: true,
                isInvincible: false,
                bulletSpeed: 800,
                bulletSpeedBonus: 1,
                bulletSize: .5,
                shields: 1,
                movementSpeed: 400,
                nukes: 0,
                fireSpeedDelay: 50,
                weapon: {
                    power: .5,
                    pierce: false,
                },
                waveCleared: 0
            }
            */


            function assignRandom(){

                // reset enemy behavior
                enemyBehavior = {
                    hitpoints: 1,
                    columns: 3,
                    enemySize: 1.5,
                    rows: 10,
                    movementType: Phaser.Easing.Elastic.InOut,
                    movementSpeed: 2000,
                    movementDelay: 500,
                    canFire: true,
                    bullethell: false
                }
                playerStats.weapon.pierce = false;
                playerStats.weapon.powerBonus = 0;

                var type = "";
                var randomPowerup = game.rnd.integerInRange(0,5);

                if(randomPowerup == 0){
                    type = "Bullet speed increased"
                    playerStats.bulletSpeed += 50;
                    playerStats.fireSpeedDelay -= 20;
                }

                if(randomPowerup == 1){
                    type = "Bullet size increased"
                    playerStats.bulletSize += 0.5;
                }

                if(randomPowerup == 2){
                    type = "Movement speed increased"
                    playerStats.movementSpeed += 50;
                }

                if(randomPowerup == 3){
                    type = "Improved weapons"
                    playerStats.bulletSize += 0.5;
                    playerStats.weapon.power += .5
                }

                if(randomPowerup == 4){
                    type = "Bullet damage increased"
                    playerStats.weapon.power += .5
                }

                if(randomPowerup == 5){
                    type = "All stats increased"
                    playerStats.bulletSpeed += 50;
                    playerStats.bulletSize += 0.5;
                    playerStats.fireSpeedDelay -= 20;
                    playerStats.weapon.power += .5
                }


                var enemyBonus = game.rnd.integerInRange(0,10);
                var etype = null;

                if(enemyBonus == 0){
                    etype = "Armored"
                    enemyBehavior.hitpoints = 3
                }

                if(enemyBonus == 1){
                    etype = "Gigantic"
                    enemyBehavior.enemySize = 2
                }

                if(enemyBonus == 2){
                    etype = "Small But Mighty!"
                    enemyBehavior.enemySize = 1
                }

                if(enemyBonus == 3){
                    etype = "Frail"
                    enemyBehavior.columns = 4
                    playerStats.weapon.pierce = true;
                }

                if(enemyBonus == 4){
                    etype = "Broken weapons?!"
                    enemyBehavior.canFire = false
                }

                if(enemyBonus == 5){
                    etype = "Swarming!"
                    enemyBehavior.columns = 5;
                    enemyBehavior.enemySize = 1.5;
                    enemyBehavior.rows = 10;
                    playerStats.weapon.powerBonus = 10;
                    enemyBehavior.canFire = true;
                }

                if(enemyBonus == 6){
                    etype = "Bullet hell..."
                    enemyBehavior.bullethell = true;
                    enemyBehavior.canFire = true;
                }

                return {type: type, etype: etype};
            }




            function restartGame(){

                //  The hero!
                player = game.add.sprite(400, 450, 'ship');
                player.anchor.setTo(0.5, 0.5);
                game.physics.enable(player, Phaser.Physics.ARCADE);
                player.x = game.world.centerX
                player.y = game.world.centerY + 500
                game.add.tween(player).to( { y: 460 }, 1000, Phaser.Easing.Exponential.InOut, true, 0, 0, false);

                stateText.setText("Take 'um out!")
                stateText.visible = true;
                subText.setText("A Key to Fire")
                subText.visible = true;

                setTimeout(function(){
                    stateText.visible = false;
                    subText.visible = false;
                }, 2000)

                assets.state  = "gamestart"
                score = 0;
                scoreText.text = "Score:" + score;
                enemyBehavior = {
                    hitpoints: 1,
                    columns: 2,
                    enemySize: 1.5,
                    rows: 10,
                    movementType: Phaser.Easing.Elastic.InOut,
                    movementSpeed: 2000,
                    movementDelay: 500,
                    canFire: false,
                    bullethell: false
                }

                playerStats = {
                    canFire: true,
                    isInvincible: false,
                    bulletSpeed: 600,
                    bulletSpeedBonus: 1,
                    bulletSize: 1,
                    shields: 1,
                    movementSpeed: 400,
                    nukes: 0,
                    fireSpeedDelay: 250,
                    weapon: {
                        power: 1,
                        powerBonus: 0,
                        pierce: false,
                    },
                    waveCleared: 0
                }



                createAliens();

                for (var i = 0; i < 3; i++)
                {
                    var ship = lives.create(game.world.width - 100 + (30 * i), 60, 'ship');
                    ship.anchor.setTo(0.5, 0.5);
                    ship.angle = 90;
                    ship.alpha = 0.4;
                }


            }

            function restart () {

                powerupfx.play();
                playerStats.waveCleared ++
                var perks = assignRandom(),
                    powerup = perks.type,
                    enemyPerk = perks.etype;

                stateText.setText("Wave " + playerStats.waveCleared + " cleared!\r" + powerup)
                stateText.bringToTop();
                stateText.visible = true;
                playerStats.canFire = false;

                if(enemyPerk != null){
                    subText.setText(enemyPerk)
                    subText.bringToTop();
                    subText.visible = true;
                }


                game.time.events.add(Phaser.Timer.SECOND * 1, function(){
                    aliens.removeAll();
                    createAliens();

                    setTimeout(function(){
                        playerStats.canFire = true;
                        stateText.visible = false;
                        subText.visible = false;
                        //resets the life count
                        lives.callAll('revive');
                        //  And brings the aliens back from the dead :)

                        //revives the player
                        player.revive();
                        //hides the text
                        stateText.visible = false;
                    }, 2000)

                }, this);


            }


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
