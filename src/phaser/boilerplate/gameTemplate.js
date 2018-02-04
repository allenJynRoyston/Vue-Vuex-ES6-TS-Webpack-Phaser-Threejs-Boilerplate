var PhaserGameObject = (function () {
    function PhaserGameObject() {
        this.game = null;
        this.global = {
            updatePause: false
        };
    }
    PhaserGameObject.prototype.init = function (el, parent, options) {
        var game = new Phaser.Game(options.width, options.height, Phaser.WEBGL, el, { preload: preload, create: create, update: update });
        var _IO_CONTROLS = new IO_CONTROLS();
        var IO;
        var gameStates = {
            BOOT: 'BOOT',
            PRELOAD: 'PRELOAD',
            READY: 'READY',
            TITLE: 'TITLE',
            INTRO: 'INTRO',
            GAMEPLAY: 'GAMEPLAY',
        };
        var properties = {
            input: {
                delay: 0,
                delayValue: 100
            }
        };
        var text, index = 0, line = '', distance = 300, speed = 4, stars = null, max = 200, xx = [], yy = [], zz = [], buttonDelay, leftKey, rightKey, upKey, downKey, enterKey, enterA, enterB, enterX, enterY, clickSound, selectSound, style, loadingtext, loadingPercentage, splashDelay, splashScreen, gametitleart, pressStartTextDelay, pressStartText, content, zwearth, zwcity, zwoperator1, zwoperator2, zwoperator3, zwcats1, zwcats2, skiptext, pureblack;
        var assets = {
            app: null,
            preloader: {},
            ready: {
                music: {
                    main: null,
                    intro: null,
                    gameplay: null
                }
            },
            gameSelection: 0,
            state: gameStates.BOOT
        };
        function preload() {
            game.load.enableParallel = true;
            game.stage.backgroundColor = '#2f2f2f';
            game.load.image('gametitle', 'src/assets/game/demo1/titles/angular-attack-title.png');
            game.load.audio('intro-music', ['src/assets/game/demo1/music/far-sight.ogg']);
            game.load.audio('select', ['src/assets/game/demo1/sound/Pickup_Coin.ogg']);
            game.load.script('webfont', '//ajax.googleapis.com/ajax/libs/webfont/1.4.7/webfont.js');
            window.WebFontConfig = {
                active: function () { },
                google: {
                    families: ['Press Start 2P']
                }
            };
            preloadHelper();
        }
        function preloadHelper() {
            game.load.onLoadStart.add(function () {
                assets.state = gameStates.PRELOAD;
                loadingtext = game.add.text(game.world.centerX, game.world.centerY / 2, "", { font: "18px Impact", fill: "#fff", align: "center" });
                loadingtext.anchor.set(0.5);
                loadingPercentage = game.add.text(game.world.centerX, game.world.centerY, "", { font: "32px Impact", fill: "#fff", align: "center" });
                loadingPercentage.anchor.set(0.5);
            }, this);
            game.load.onFileComplete.add(function (progress, cacheKey, success, totalLoaded, totalFiles) {
                loadingtext.setText("Please wait...");
                loadingPercentage.setText(progress + "%");
            }, this);
            game.load.onLoadComplete.add(function () {
                loadingtext.setText("File loaded!");
                loadingPercentage.setText("");
                setTimeout(function () {
                    loadingtext.destroy();
                    loadingPercentage.destroy();
                    assets.state = gameStates.READY;
                    game.stage.backgroundColor = '#000';
                    splashDelay = game.time.now + 2000;
                    splashScreen = game.add.sprite(game.world.centerX - 15, game.world.centerY, 'winners');
                    splashScreen.anchor.set(0.5);
                    splashScreen.scale.setTo(1.1, 1.1);
                    splashScreen.alpha = 1;
                    assets.ready.music.main = game.add.audio('music-main');
                    setTimeout(function () {
                        assets.ready.music.main.loopFull(0.75);
                    }, 2000);
                }, 2000);
            }, this);
        }
        function create() {
            IO = _IO_CONTROLS.assignButtons(game);
        }
        function clearReady() {
            splashScreen.destroy();
            assets.state = gameStates.TITLE;
            gametitleart = game.add.sprite(game.world.centerX, game.world.centerY - 50, 'gametitle');
            gametitleart.anchor.set(.5);
            gametitleart.scale.setTo(5, 5);
            game.add.tween(gametitleart.scale).to({ x: 1, y: 1 }, 2000, Phaser.Easing.Bounce.Out, true);
            pressStartTextDelay = game.time.now + 1500;
            pressStartText = game.add.text(game.world.centerX, game.world.centerY + 250, "Press Enter to Start", { font: "24px Press Start 2P", fill: "#fff", align: "center" });
            pressStartText.anchor.set(0.5);
            pressStartText.alpha = 0;
            game.add.tween(pressStartText).to({ alpha: 1, y: game.world.centerY + 200 }, 350, "Linear", true, 1500);
        }
        function startGameIntro() {
            pureblack = game.add.sprite(game.world.centerX, game.world.centerY, 'pureblack');
            pureblack.anchor.set(0.5);
            pureblack.alpha = 0;
            game.add.tween(pureblack).to({ alpha: 1 }, 1500, Phaser.Easing.Linear.In, true, 500);
            pressStartText.destroy();
            assets.ready.music.main.fadeOut(1000);
            setTimeout(function () {
                for (var i = 0; i < max; i++) {
                    stars[i].destroy();
                }
                gametitleart.destroy();
                assets.state = gameStates.INTRO;
                setTimeout(function () {
                    assets.ready.music.intro = game.add.audio('intro-music');
                    assets.ready.music.intro.loopFull(0.75);
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
                    text = game.add.text(15, game.world.centerY + 200, '', { font: "14px Press Start 2P", fill: "#fff" });
                    nextLine();
                    zwearth = game.add.sprite(game.world.centerX, game.world.centerY, 'zwearth');
                    zwearth.anchor.set(.5);
                    zwearth.scale.setTo(1.75, 1.75);
                    zwearth.visible = false;
                    zwcity = game.add.sprite(game.world.centerX - 50, game.world.centerY, 'zwcity');
                    zwcity.anchor.set(.5);
                    zwcity.scale.setTo(2, 2);
                    zwcity.visible = false;
                    zwcats1 = game.add.sprite(game.world.centerX, game.world.centerY, 'zwcats1');
                    zwcats1.anchor.set(.5);
                    zwcats1.scale.setTo(2, 2);
                    zwcats1.visible = false;
                    zwcats2 = game.add.sprite(game.world.centerX, game.world.centerY, 'zwcats2');
                    zwcats2.anchor.set(.5);
                    zwcats2.scale.setTo(2, 2);
                    zwcats2.visible = false;
                    zwoperator1 = game.add.sprite(game.world.centerX, game.world.centerY, 'zwoperator1');
                    zwoperator1.anchor.set(.5);
                    zwoperator1.scale.setTo(2, 2);
                    zwoperator1.visible = false;
                    zwoperator2 = game.add.sprite(game.world.centerX, game.world.centerY, 'zwoperator2');
                    zwoperator2.anchor.set(.5);
                    zwoperator2.scale.setTo(2, 2);
                    zwoperator2.visible = false;
                    zwoperator3 = game.add.sprite(game.world.centerX, game.world.centerY, 'zwoperator3');
                    zwoperator3.anchor.set(.5);
                    zwoperator3.scale.setTo(2, 2);
                    zwoperator3.visible = false;
                    skiptext = game.add.text(30, 30, 'Press Enter to skip intro', { font: "10px Press Start 2P", fill: "#fff", align: "left" });
                    skiptext.visible = false;
                    game.time.events.add(Phaser.Timer.SECOND * 0, function () {
                        zwearth.visible = true;
                        game.add.tween(zwearth.scale).to({ x: 2.5, y: 2.5 }, 20000, Phaser.Easing.Linear.In, true);
                        text.bringToTop();
                    }, this);
                    game.time.events.add(Phaser.Timer.SECOND * 3, function () {
                        skiptext.visible = true;
                    });
                    game.time.events.add(Phaser.Timer.SECOND * 9, function () {
                        zwearth.visible = false;
                        zwcity.visible = true;
                        game.add.tween(zwcity).to({ x: game.world.centerX + 50 }, 20000, Phaser.Easing.Linear.In, true);
                        text.bringToTop();
                        skiptext.bringToTop();
                    }, this);
                    game.time.events.add(Phaser.Timer.SECOND * 26, function () {
                        zwcity.visible = false;
                        zwcats1.visible = true;
                        text.bringToTop();
                        skiptext.bringToTop();
                    }, this);
                    game.time.events.add(Phaser.Timer.SECOND * 39, function () {
                        zwcats1.visible = false;
                        zwcats2.visible = true;
                        text.bringToTop();
                        skiptext.bringToTop();
                    }, this);
                    game.time.events.add(Phaser.Timer.SECOND * 51, function () {
                        zwcats2.visible = false;
                        zwoperator1.visible = true;
                        text.bringToTop();
                        skiptext.bringToTop();
                    }, this);
                    game.time.events.add(Phaser.Timer.SECOND * 62, function () {
                        zwoperator1.visible = false;
                        zwoperator2.visible = true;
                        text.bringToTop();
                        skiptext.bringToTop();
                    }, this);
                    game.time.events.add(Phaser.Timer.SECOND * 67, function () {
                        startGameplay();
                    }, this);
                }, 1000);
            }, 2000);
        }
        function updateLine() {
            if (line.length != undefined) {
                if (line.length < content[index].length) {
                    line = content[index].substr(0, line.length + 1);
                    text.setText(line);
                }
                else {
                    game.time.events.add(Phaser.Timer.SECOND * 2, nextLine, this);
                }
            }
        }
        function nextLine() {
            index++;
            if (index < content.length) {
                line = '';
                game.time.events.repeat(80, content[index].length + 1, updateLine, this);
            }
        }
        function startGameplay() {
            zwearth.destroy();
            zwcity.destroy();
            zwcats1.destroy();
            zwcats2.destroy();
            zwoperator1.destroy();
            zwoperator2.destroy();
            zwoperator3.destroy();
            skiptext.destroy();
            text.destroy();
            assets.ready.music.intro.fadeOut(1500);
            game.time.events.add(Phaser.Timer.SECOND * 1, function () {
            }, this);
        }
        ;
        function checkButtonDelay() {
            return game.time.now > properties.input.delay;
        }
        function updateButtonDelay() {
            properties.input.delay = properties.input.delayValue + game.time.now;
        }
        function update() {
            if (_IO_CONTROLS.isDebuggerEnabled()) {
                _IO_CONTROLS.updateDebugger();
            }
            if (_IO_CONTROLS.read('A').active && checkButtonDelay()) {
                console.log(_IO_CONTROLS.read('A'));
                updateButtonDelay();
            }
            if (!__phaser.global.isPaused) {
                if (assets.state === gameStates.PRELOAD) {
                }
                if (assets.state === gameStates.READY) {
                    if (game.time.now > splashDelay) {
                        clearReady();
                    }
                }
                if (assets.state === gameStates.TITLE) {
                }
                if (assets.state === gameStates.INTRO) {
                    if (game.time.now > buttonDelay) {
                    }
                }
            }
        }
        parent.game = this;
        this.game = game;
    };
    PhaserGameObject.prototype.destroy = function () {
        this.game.destroy();
    };
    return PhaserGameObject;
}());
var __phaser = new PhaserGameObject();
var IO_CONTROLS = (function () {
    function IO_CONTROLS() {
        this.IO = null;
        this.buttonSensitivity = { TAP: 1, SHORT: 50, LONG: 150, SUPERLONG: 300 };
        this.properties = {
            isReady: false,
            allowDebugger: true,
            buttonDelay: 50,
            timingRefreshRate: 1
        };
        this.directionalButtons = ['UP', 'DOWN', 'LEFT', 'RIGHT'];
        this.actionButtons = ['A', 'B', 'X', 'Y'];
        this.triggerButtons = ['L1', 'L2', 'R1', 'R2', 'L3', 'R3'];
        this.systemButtons = ['START', 'BACK'];
        this.buttonArray = this.directionalButtons.concat(this.actionButtons, this.triggerButtons, this.systemButtons);
        this.buttonMap = {
            UP: { name: 'UP', code: 'ArrowUp' },
            DOWN: { name: 'DOWN', code: 'ArrowDown' },
            LEFT: { name: 'LEFT', code: 'ArrowLeft' },
            RIGHT: { name: 'RIGHT', code: 'ArrowRight' },
            A: { name: 'A', code: 'KeyA' },
            B: { name: 'S', code: 'KeyS' },
            X: { name: 'D', code: 'KeyD' },
            Y: { name: 'F', code: 'KeyF' },
            L1: { name: 'Q', code: 'KeyQ' },
            L2: { name: 'W', code: 'KeyW' },
            R1: { name: 'E', code: 'KeyE' },
            R2: { name: 'R', code: 'KeyR' },
            L3: { name: 'O', code: 'KeyO' },
            R3: { name: 'P', code: 'KeyP' },
            START: { name: 'ENTER', code: 'Enter' },
            BACK: { name: 'BACKSPACE', code: 'Backspace' },
        };
        this.disabledButtons = {
            ALL: false,
            DIRECTIONAL: false,
            TRIGGER: false,
            ACTION: false,
            SYSTEM: true
        };
        this.debugger = {
            enabled: false,
            text: {}
        };
    }
    IO_CONTROLS.prototype.assignButtons = function (game) {
        var _this = this;
        var style = { font: "12px Courier New", fill: "#fff", align: "left" };
        this.buttonArray.forEach(function (btn, index) {
            _this.debugger.text[btn] = null;
            _this.debugger.text[btn] = game.add.text(10, 10 + (index * 15), "", style);
            _this.disabledButtons[btn] = false;
        });
        var IO = {
            buttons: {},
            sensitivityPress: {},
            sensitivityBuffer: {},
            timedPress: {},
            timedBuffer: {},
            timedTrigger: {},
            state: {}
        };
        var _loop_1 = function (btn) {
            IO.buttons[btn] = game.input.keyboard.addKey(Phaser.Keyboard[this_1.buttonMap[btn].name]);
            IO.sensitivityPress[btn] = null;
            IO.sensitivityBuffer[btn] = 0;
            IO.state[btn] = function () {
                return _this.getBtnPressType(_this.IO.sensitivityBuffer[btn]);
            };
        };
        var this_1 = this;
        for (var _i = 0, _a = this.buttonArray; _i < _a.length; _i++) {
            var btn = _a[_i];
            _loop_1(btn);
        }
        var _loop_2 = function (btn) {
            IO.buttons[btn].onDown.add(function (e) {
                clearInterval(IO.sensitivityPress[btn]);
                var btnType, btnName;
                var buttonTypes = ['DIRECTIONAL', 'ACTION', 'TRIGGER', 'SYSTEM'];
                Object.keys(_this.buttonMap).forEach(function (key, value) {
                    if (_this.buttonMap[key].code === e.event.code) {
                        for (var _i = 0, buttonTypes_1 = buttonTypes; _i < buttonTypes_1.length; _i++) {
                            var _type = buttonTypes_1[_i];
                            if (_this[_type.toLowerCase() + "Buttons"].indexOf(key) + 1) {
                                btnType = _type;
                                btnName = key;
                            }
                        }
                    }
                });
                var isDisabled = false;
                if (_this.disabledButtons.ALL) {
                    isDisabled = true;
                }
                for (var _i = 0, buttonTypes_2 = buttonTypes; _i < buttonTypes_2.length; _i++) {
                    var name_1 = buttonTypes_2[_i];
                    if (_this.disabledButtons[name_1] && btnType === name_1) {
                        isDisabled = true;
                    }
                }
                Object.keys(_this.buttonMap).forEach(function (key, value) {
                    if (_this.disabledButtons[key] && btnName === key) {
                        isDisabled = true;
                    }
                });
                if (!isDisabled) {
                    IO.sensitivityPress[btn] = setInterval(function () {
                        IO.sensitivityBuffer[btn] += 1;
                    }, _this.properties.timingRefreshRate);
                }
            }, this_2);
        };
        var this_2 = this;
        for (var _b = 0, _c = this.buttonArray; _b < _c.length; _b++) {
            var btn = _c[_b];
            _loop_2(btn);
        }
        game.input.keyboard.onUpCallback = function (e) {
            for (var _i = 0, _a = _this.buttonArray; _i < _a.length; _i++) {
                var btn = _a[_i];
                if (e.code === _this.buttonMap[btn].code) {
                    clearInterval(IO.sensitivityPress[btn]);
                    IO.sensitivityBuffer[btn] = 0;
                }
            }
            if (e.code === 'Backquote' && _this.properties.allowDebugger) {
                _this.setDebugger(!_this.debugger.enabled);
                _this.updateDebugger();
            }
        };
        this.properties.isReady = true;
        this.IO = IO;
        return IO;
    };
    IO_CONTROLS.prototype.isReady = function () {
        return this.properties.isReady;
    };
    IO_CONTROLS.prototype.isDebuggerEnabled = function () {
        return this.debugger.enabled;
    };
    IO_CONTROLS.prototype.setDebugger = function (state) {
        if (state === void 0) { state = true; }
        this.debugger.enabled = state;
    };
    IO_CONTROLS.prototype.updateDebugger = function () {
        if (this.properties.isReady) {
            for (var _i = 0, _a = this.buttonArray; _i < _a.length; _i++) {
                var btn = _a[_i];
                this.debugger.text[btn].setText(this.debugger.enabled ? this.debuggerString(btn) : '').bringToTop();
            }
        }
    };
    IO_CONTROLS.prototype.disableAllInput = function () {
        this.disabledButtons.ALL = true;
    };
    IO_CONTROLS.prototype.enableAllInput = function () {
        this.disabledButtons.ALL = false;
    };
    IO_CONTROLS.prototype.disableAllDirectionalButtons = function () {
        this.disabledButtons.DIRECTIONAL = true;
    };
    IO_CONTROLS.prototype.enableAllDirectionalButtons = function () {
        this.disabledButtons.DIRECTIONAL = false;
    };
    IO_CONTROLS.prototype.disableAllTriggerButtons = function () {
        this.disabledButtons.TRIGGER = true;
    };
    IO_CONTROLS.prototype.enableAllTriggerButtons = function () {
        this.disabledButtons.TRIGGER = false;
    };
    IO_CONTROLS.prototype.disableAllActionButtons = function () {
        this.disabledButtons.ACTION = true;
    };
    IO_CONTROLS.prototype.enableAllActionButtons = function () {
        this.disabledButtons.ACTION = false;
    };
    IO_CONTROLS.prototype.disableAllSystemButtons = function () {
        this.disabledButtons.SYSTEM = true;
    };
    IO_CONTROLS.prototype.enableAllSystemButtons = function () {
        this.disabledButtons.SYSTEM = false;
    };
    IO_CONTROLS.prototype.setDisableKeyProperty = function (name, value) {
        if (value === void 0) { value = true; }
        if (this.properties.isReady) {
            this.disabledButtons[name.toUpperCase()] = value;
        }
    };
    IO_CONTROLS.prototype.getKeyDisabledValue = function (name) {
        if (this.properties.isReady) {
            return this.disabledButtons[name.toUpperCase()];
        }
        else {
            return null;
        }
    };
    IO_CONTROLS.prototype.clearAllControlIntervals = function () {
        if (this.properties.isReady) {
            for (var _i = 0, _a = this.buttonArray; _i < _a.length; _i++) {
                var btn = _a[_i];
                clearInterval(this.IO.timedPress[btn]);
                clearInterval(this.IO.sensitivityPress[btn]);
            }
        }
    };
    IO_CONTROLS.prototype.read = function (key) {
        if (this.properties.isReady) {
            var _return = {};
            return _return[key] = { active: this.IO.state[key.toUpperCase()]().val > 0 ? true : false, duration: this.IO.state[key.toUpperCase()]().val, state: this.IO.state[key.toUpperCase()]().state, type: this.IO.state[key.toUpperCase()]().type, disabled: this.disabledButtons[key.toUpperCase()] };
        }
    };
    IO_CONTROLS.prototype.readMulti = function (keys, returnAs) {
        if (returnAs === void 0) { returnAs = 'OBJECT'; }
        if (this.properties.isReady) {
            if (returnAs === 'OBJECT') {
                var _return = {};
                for (var _i = 0, keys_1 = keys; _i < keys_1.length; _i++) {
                    var key = keys_1[_i];
                    _return[key] = { active: this.IO.state[key.toUpperCase()]().val > 0 ? true : false, duration: this.IO.state[key.toUpperCase()]().val, state: this.IO.state[key.toUpperCase()]().state, type: this.IO.state[key.toUpperCase()]().type, disabled: this.disabledButtons[key.toUpperCase()] };
                }
                return _return;
            }
            if (returnAs === 'ARRAY') {
                var _return = [];
                for (var _a = 0, keys_2 = keys; _a < keys_2.length; _a++) {
                    var key = keys_2[_a];
                    _return.push({ key: key, active: this.IO.state[key.toUpperCase()]().val > 0 ? true : false, duration: this.IO.state[key.toUpperCase()]().val, state: this.IO.state[key.toUpperCase()]().state, type: this.IO.state[key.toUpperCase()]().type, disabled: this.disabledButtons[key.toUpperCase()] });
                }
                return _return;
            }
        }
    };
    IO_CONTROLS.prototype.debuggerString = function (key) {
        return key.toUpperCase() + " (" + this.buttonMap[key.toUpperCase()].name + "/" + this.buttonMap[key.toUpperCase()].code + ") | duration: " + this.IO.state[key.toUpperCase()]().val + " | state: " + this.IO.state[key.toUpperCase()]().state + " | type: " + this.IO.state[key.toUpperCase()]().type + " | disabled: " + this.disabledButtons[key.toUpperCase()];
    };
    IO_CONTROLS.prototype.getBtnPressType = function (val) {
        var _this = this;
        var _type = 'NONE', _state = 0, state = 0;
        Object.keys(this.buttonSensitivity).forEach(function (key) {
            state++;
            if (val > _this.buttonSensitivity[key]) {
                _type = key;
                _state = state;
            }
        });
        return { val: val, type: _type, state: _state };
    };
    return IO_CONTROLS;
}());
var IO_AUDIO = (function () {
    function IO_AUDIO() {
    }
    return IO_AUDIO;
}());
