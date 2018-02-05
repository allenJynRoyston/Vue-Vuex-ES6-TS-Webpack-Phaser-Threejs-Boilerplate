var PhaserGameObject = (function () {
    function PhaserGameObject() {
        this.game = null;
        this.global = {
            pause: false
        };
    }
    PhaserGameObject.prototype.init = function (el, parent, options) {
        var phaserMaster = new PHASER_MASTER({ game: new Phaser.Game(options.width, options.height, Phaser.WEBGL, el, { preload: preload, update: update }), resolution: { width: options.width, height: options.height } }), phaserControls = new PHASER_CONTROLS(), phaserSprites = new PHASER_SPRITE_MANAGER(), phaserTexts = new PHASER_TEXT_MANAGER();
        function preload() {
            var game = phaserMaster.game();
            game.load.enableParallel = true;
            game.stage.backgroundColor = '#2f2f2f';
            game.load.image('gameTitle', 'src/assets/game/demo1/titles/100x100.jpg');
            game.load.audio('intro-music', ['src/assets/game/demo1/music/far-sight.ogg']);
            game.load.audio('select', ['src/assets/game/demo1/sound/Pickup_Coin.ogg']);
            game.load.bitmapFont('gem', 'src/assets/fonts/gem.png', 'src/assets/fonts/gem.xml');
            phaserMaster.setState('PRELOAD');
            new PHASER_PRELOADER({ game: game, delayInSeconds: 0, done: function () { preloadComplete(); } });
        }
        function preloadComplete() {
            var game = phaserMaster.game();
            phaserControls.assign({ game: game });
            phaserSprites.assign({ game: game });
            phaserTexts.assign({ game: game });
            phaserSprites.addSprite({ x: game.world.centerX - 150, y: game.world.centerY, key: 'sprite1', groupKey: 'group1', reference: 'gameTitle' });
            phaserSprites.addSprite({ x: game.world.centerX, y: game.world.centerY, key: 'sprite2', groupKey: 'group1', reference: 'gameTitle' });
            phaserSprites.addSprite({ x: game.world.centerX + 150, y: game.world.centerY, key: 'sprite3', groupKey: 'group1', reference: 'gameTitle' });
            phaserSprites.getSprite('sprite1').anchor.set(0.5);
            phaserSprites.getSprite('sprite2').anchor.set(0.5);
            phaserSprites.getSprite('sprite3').anchor.set(0.5);
            phaserTexts.addText({ key: 'test1', groupKey: 'group1', font: 'gem', x: 10, y: 10, size: 16, default: 'I am the best in the whole world and the whole world should know it!' });
            phaserTexts.addText({ key: 'test2', groupKey: 'group1', font: 'gem', x: 10, y: 50, size: 16, default: 'I am the second in the whole world and the whole world should know it!' });
            phaserMaster.setState('READY');
        }
        function update() {
            if (phaserControls.isDebuggerEnabled()) {
                phaserControls.updateDebugger();
            }
            if (phaserMaster.checkState('PRELOAD') && !__phaser.global.pause) {
            }
            if (phaserMaster.checkState('READY') && !__phaser.global.pause) {
                if (phaserControls.read('LEFT').active) {
                    for (var _i = 0, _a = phaserSprites.getGroup('group1'); _i < _a.length; _i++) {
                        var sprite = _a[_i];
                        sprite.rotation -= .05;
                    }
                }
                if (phaserControls.read('RIGHT').active) {
                    for (var _b = 0, _c = phaserSprites.getGroup('group1'); _b < _c.length; _b++) {
                        var sprite = _c[_b];
                        sprite.rotation += .05;
                    }
                }
                if (phaserControls.checkWithDelay({ isActive: true, key: 'R1', delay: 100 })) {
                    phaserTexts.getText('test2').text = 'CHANGE ONE';
                }
                if (phaserControls.checkWithDelay({ isActive: true, key: 'R2', delay: 100 })) {
                    for (var _d = 0, _e = phaserTexts.getGroup('group1'); _d < _e.length; _d++) {
                        var text = _e[_d];
                        text.text = 'All changed!';
                    }
                }
                if (phaserControls.checkWithDelay({ isActive: true, key: 'A', delay: 100 })) {
                    phaserSprites.getSprite('sprite1').tint = Math.random() * 0xffffff;
                }
                if (phaserControls.checkWithDelay({ isActive: true, key: 'B', delay: 100 })) {
                    phaserSprites.getSprite('sprite2').tint = Math.random() * 0xffffff;
                }
                if (phaserControls.checkWithDelay({ isActive: true, key: 'X', delay: 250 })) {
                    phaserSprites.getSprite('sprite3').tint = Math.random() * 0xffffff;
                }
                if (phaserControls.checkWithDelay({ isActive: true, key: 'Y', delay: 300 })) {
                    for (var _f = 0, _g = phaserSprites.getGroup('group1'); _f < _g.length; _f++) {
                        var sprite = _g[_f];
                        sprite.tint = Math.random() * 0xffffff;
                    }
                }
            }
        }
        parent.game = this;
        this.game = phaserMaster.game();
    };
    PhaserGameObject.prototype.destroy = function () {
        this.game.destroy();
    };
    return PhaserGameObject;
}());
var __phaser = new PhaserGameObject();
var PHASER_CONTROLS = (function () {
    function PHASER_CONTROLS() {
        this.IO = null;
        this.game = null;
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
        this.buttonMapId = {
            UP: 1,
            DOWN: 2,
            LEFT: 3,
            RIGHT: 4,
            A: 5,
            B: 6,
            X: 7,
            Y: 8,
            L1: 9,
            L2: 10,
            R1: 11,
            R2: 12,
            L3: 13,
            R3: 14,
            START: 15,
            BACK: 16,
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
        this.inputDelay = {
            delay: Array.apply(null, Array(20)).map(function () { return 0; })
        };
    }
    PHASER_CONTROLS.prototype.assign = function (construct) {
        var _this = this;
        this.game = construct.game;
        var style = { font: "12px Courier New", fill: "#fff", align: "left" };
        this.buttonArray.forEach(function (btn, index) {
            _this.debugger.text[btn] = null;
            _this.debugger.text[btn] = construct.game.add.text(10, 10 + (index * 15), "", style);
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
            IO.buttons[btn] = construct.game.input.keyboard.addKey(Phaser.Keyboard[this_1.buttonMap[btn].name]);
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
        construct.game.input.keyboard.onUpCallback = function (e) {
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
    PHASER_CONTROLS.prototype.mapKeys = function (map) {
        var _this = this;
        this.properties.isReady = false;
        this.destroyAll();
        setTimeout(function () {
            _this.buttonMap = map;
            _this.properties.isReady = true;
            _this.assign(_this.game);
        }, 1);
    };
    PHASER_CONTROLS.prototype.isReady = function () {
        return this.properties.isReady;
    };
    PHASER_CONTROLS.prototype.getInputDelay = function () {
        return this.inputDelay;
    };
    PHASER_CONTROLS.prototype.testDelay = function (val) {
        return this.game.time.now > this.inputDelay.delay[val];
    };
    PHASER_CONTROLS.prototype.checkWithDelay = function (params) {
        if (this.read(params.key).active === params.isActive) {
            if (this.game.time.now > this.inputDelay.delay[this.getKeyId(params.key)]) {
                this.inputDelay.delay[this.getKeyId(params.key)] = params.delay + this.game.time.now;
                return true;
            }
            else {
                return false;
            }
        }
        return false;
    };
    PHASER_CONTROLS.prototype.isDebuggerEnabled = function () {
        return this.debugger.enabled;
    };
    PHASER_CONTROLS.prototype.setDebugger = function (state) {
        if (state === void 0) { state = true; }
        this.debugger.enabled = state;
    };
    PHASER_CONTROLS.prototype.updateDebugger = function () {
        if (this.properties.isReady) {
            for (var _i = 0, _a = this.buttonArray; _i < _a.length; _i++) {
                var btn = _a[_i];
                this.debugger.text[btn].setText(this.debugger.enabled ? this.debuggerString(btn) : '').bringToTop();
            }
        }
    };
    PHASER_CONTROLS.prototype.disableAllInput = function () {
        this.disabledButtons.ALL = true;
    };
    PHASER_CONTROLS.prototype.enableAllInput = function () {
        this.disabledButtons.ALL = false;
    };
    PHASER_CONTROLS.prototype.disableAllDirectionalButtons = function () {
        this.disabledButtons.DIRECTIONAL = true;
    };
    PHASER_CONTROLS.prototype.enableAllDirectionalButtons = function () {
        this.disabledButtons.DIRECTIONAL = false;
    };
    PHASER_CONTROLS.prototype.disableAllTriggerButtons = function () {
        this.disabledButtons.TRIGGER = true;
    };
    PHASER_CONTROLS.prototype.enableAllTriggerButtons = function () {
        this.disabledButtons.TRIGGER = false;
    };
    PHASER_CONTROLS.prototype.disableAllActionButtons = function () {
        this.disabledButtons.ACTION = true;
    };
    PHASER_CONTROLS.prototype.enableAllActionButtons = function () {
        this.disabledButtons.ACTION = false;
    };
    PHASER_CONTROLS.prototype.disableAllSystemButtons = function () {
        this.disabledButtons.SYSTEM = true;
    };
    PHASER_CONTROLS.prototype.enableAllSystemButtons = function () {
        this.disabledButtons.SYSTEM = false;
    };
    PHASER_CONTROLS.prototype.setDisableKeyProperty = function (name, value) {
        if (value === void 0) { value = true; }
        if (this.properties.isReady) {
            this.disabledButtons[name.toUpperCase()] = value;
        }
    };
    PHASER_CONTROLS.prototype.getKeyDisabledValue = function (name) {
        if (this.properties.isReady) {
            return this.disabledButtons[name.toUpperCase()];
        }
        else {
            return null;
        }
    };
    PHASER_CONTROLS.prototype.clearAllControlIntervals = function () {
        if (this.properties.isReady) {
            for (var _i = 0, _a = this.buttonArray; _i < _a.length; _i++) {
                var btn = _a[_i];
                clearInterval(this.IO.timedPress[btn]);
                clearInterval(this.IO.sensitivityPress[btn]);
            }
        }
    };
    PHASER_CONTROLS.prototype.getKeyId = function (key) {
        return this.buttonMapId[key.toUpperCase()];
    };
    PHASER_CONTROLS.prototype.read = function (key) {
        if (this.properties.isReady) {
            var _return = {};
            return _return[key] = { id: this.buttonMapId[key.toUpperCase()], active: this.IO.state[key.toUpperCase()]().val > 0 ? true : false, duration: this.IO.state[key.toUpperCase()]().val, state: this.IO.state[key.toUpperCase()]().state, type: this.IO.state[key.toUpperCase()]().type, disabled: this.disabledButtons[key.toUpperCase()] };
        }
        return {};
    };
    PHASER_CONTROLS.prototype.readMulti = function (keys, returnAs) {
        if (returnAs === void 0) { returnAs = 'OBJECT'; }
        if (this.properties.isReady) {
            if (returnAs === 'OBJECT') {
                var _return = {};
                for (var _i = 0, keys_1 = keys; _i < keys_1.length; _i++) {
                    var key = keys_1[_i];
                    _return[key] = { id: this.buttonMapId[key.toUpperCase()], active: this.IO.state[key.toUpperCase()]().val > 0 ? true : false, duration: this.IO.state[key.toUpperCase()]().val, state: this.IO.state[key.toUpperCase()]().state, type: this.IO.state[key.toUpperCase()]().type, disabled: this.disabledButtons[key.toUpperCase()] };
                }
                return _return;
            }
            if (returnAs === 'ARRAY') {
                var _return = [];
                for (var _a = 0, keys_2 = keys; _a < keys_2.length; _a++) {
                    var key = keys_2[_a];
                    _return.push({ id: this.buttonMapId[key.toUpperCase()], key: key, active: this.IO.state[key.toUpperCase()]().val > 0 ? true : false, duration: this.IO.state[key.toUpperCase()]().val, state: this.IO.state[key.toUpperCase()]().state, type: this.IO.state[key.toUpperCase()]().type, disabled: this.disabledButtons[key.toUpperCase()] });
                }
                return _return;
            }
        }
    };
    PHASER_CONTROLS.prototype.debuggerString = function (key) {
        return key.toUpperCase() + " (" + this.buttonMap[key.toUpperCase()].name + "/" + this.buttonMap[key.toUpperCase()].code + ") | id: " + this.buttonMapId[key.toUpperCase()] + " duration: " + this.IO.state[key.toUpperCase()]().val + " | state: " + this.IO.state[key.toUpperCase()]().state + " | type: " + this.IO.state[key.toUpperCase()]().type + " | disabled: " + this.disabledButtons[key.toUpperCase()];
    };
    PHASER_CONTROLS.prototype.getBtnPressType = function (val) {
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
    PHASER_CONTROLS.prototype.destroyAll = function () {
        var _this = this;
        this.clearAllControlIntervals();
        Object.keys(this.debugger.text).forEach(function (key) {
            _this.debugger.text[key].destroy();
        });
    };
    return PHASER_CONTROLS;
}());
var PHASER_AUDIO = (function () {
    function PHASER_AUDIO() {
    }
    return PHASER_AUDIO;
}());
var PHASER_PRELOADER = (function () {
    function PHASER_PRELOADER(construct) {
        this.game = construct.game;
        this.init(construct.delayInSeconds, construct.done);
    }
    PHASER_PRELOADER.prototype.init = function (delay, done) {
        var _this = this;
        var loadingtext, loadingPercentage;
        this.game.load.onLoadStart.add(function () {
            loadingtext = _this.game.add.text(_this.game.world.centerX, _this.game.world.centerY / 2, "", { font: "18px Impact", fill: "#fff", align: "center" });
            loadingtext.anchor.set(0.5);
            loadingPercentage = _this.game.add.text(_this.game.world.centerX, _this.game.world.centerY, "", { font: "32px Impact", fill: "#fff", align: "center" });
            loadingPercentage.anchor.set(0.5);
        }, this);
        this.game.load.onFileComplete.add(function (progress, cacheKey, success, totalLoaded, totalFiles) {
            loadingtext.setText("Please wait...");
            loadingPercentage.setText(progress + "%");
        }, this);
        this.game.load.onLoadComplete.add(function () {
            loadingtext.setText("File loaded!");
            loadingPercentage.setText("");
            _this.game.time.events.add(Phaser.Timer.SECOND * delay, function () {
                loadingtext.destroy();
                loadingPercentage.destroy();
                done();
            }, _this).autoDestroy = true;
        }, this);
    };
    return PHASER_PRELOADER;
}());
var PHASER_SPRITE_MANAGER = (function () {
    function PHASER_SPRITE_MANAGER() {
        this.game = null;
        this.resources = {
            spritesArray: [],
            spritesObject: {}
        };
    }
    PHASER_SPRITE_MANAGER.prototype.assign = function (construct) {
        this.game = construct.game;
    };
    PHASER_SPRITE_MANAGER.prototype.addSprite = function (data) {
        var duplicateCheck = this.resources.spritesArray.filter(function (sprite) {
            return sprite.key === data.key;
        });
        if (duplicateCheck.length === 0) {
            var newSprite = this.game.add.sprite(data.x, data.y, data.reference);
            newSprite.key = data.key;
            newSprite.groupKey = data.groupKey || null;
            this.resources.spritesArray.push(newSprite);
            this.resources.spritesObject[data.key] = newSprite;
            return newSprite;
        }
        else {
            console.log("Duplicate key name not allowed: " + data.key);
        }
    };
    PHASER_SPRITE_MANAGER.prototype.destroySprite = function (key) {
        var keys = [];
        var deleteSpriteArray = this.resources.spritesArray.filter(function (sprite) {
            return sprite.key === key;
        });
        for (var _i = 0, deleteSpriteArray_1 = deleteSpriteArray; _i < deleteSpriteArray_1.length; _i++) {
            var sprite = deleteSpriteArray_1[_i];
            keys.push(sprite.key);
            sprite.destroy();
        }
        delete this.resources.spritesObject[key];
        this.resources.spritesArray = this.resources.spritesArray.filter(function (sprite) {
            return sprite.key !== key;
        });
        return keys;
    };
    PHASER_SPRITE_MANAGER.prototype.destroySpriteGroup = function (groupKey) {
        var keys = [];
        var deleteSpriteArray = this.resources.spritesArray.filter(function (sprite) {
            return sprite.groupKey === groupKey;
        });
        for (var _i = 0, deleteSpriteArray_2 = deleteSpriteArray; _i < deleteSpriteArray_2.length; _i++) {
            var sprite = deleteSpriteArray_2[_i];
            keys.push(sprite.key);
            sprite.destroy();
        }
        delete this.resources.spritesObject[groupKey];
        this.resources.spritesArray = this.resources.spritesArray.filter(function (sprite) {
            return sprite.groupKey !== groupKey;
        });
        return keys;
    };
    PHASER_SPRITE_MANAGER.prototype.getSprite = function (key) {
        return this.resources.spritesObject[key];
    };
    PHASER_SPRITE_MANAGER.prototype.getGroup = function (groupKey) {
        return this.resources.spritesArray.filter(function (sprite) {
            return sprite.groupKey === groupKey;
        });
    };
    PHASER_SPRITE_MANAGER.prototype.getAllSprites = function (type) {
        if (type === void 0) { type = 'BOTH'; }
        if (type === 'ARRAY') {
            return this.resources.spritesArray;
        }
        if (type == 'OBJECT') {
            return this.resources.spritesObject;
        }
        return { object: this.resources.spritesObject, array: this.resources.spritesArray };
    };
    return PHASER_SPRITE_MANAGER;
}());
var PHASER_MASTER = (function () {
    function PHASER_MASTER(construct) {
        this._game = construct.game;
        this.resolution = construct.resolution;
        this.states = {
            BOOT: 'BOOT',
            PRELOAD: 'PRELOAD',
            READY: 'READY',
        };
        this.currentState = this.states[0];
    }
    PHASER_MASTER.prototype.changeState = function (state) {
        if (state === void 0) { state = null; }
        var _state = state.toUpperCase();
        var create = false;
        if (this.states[_state] === undefined) {
            this.states[_state] = _state;
            create = true;
        }
        this.currentState = _state;
        return { created: create, state: this.currentState };
    };
    PHASER_MASTER.prototype.getStates = function () {
        return this.states;
    };
    PHASER_MASTER.prototype.getResolution = function () {
        return this.resolution;
    };
    PHASER_MASTER.prototype.setState = function (state) {
        this.currentState = state.toUpperCase();
    };
    PHASER_MASTER.prototype.checkState = function (state) {
        return this.currentState === state.toUpperCase() ? true : false;
    };
    PHASER_MASTER.prototype.game = function () {
        return this._game;
    };
    return PHASER_MASTER;
}());
var PHASER_TEXT_MANAGER = (function () {
    function PHASER_TEXT_MANAGER() {
        this.game = null;
        this.texts = {
            textsArray: [],
            textsObject: {}
        };
    }
    PHASER_TEXT_MANAGER.prototype.assign = function (construct) {
        this.game = construct.game;
    };
    PHASER_TEXT_MANAGER.prototype.addText = function (data) {
        var duplicateCheck = this.texts.textsArray.filter(function (texts) {
            return texts.key === data.key;
        });
        if (duplicateCheck.length === 0) {
            var newText = this.game.add.bitmapText(data.x, data.y, data.font, data.default, data.size);
            newText.key = data.key;
            newText.groupKey = data.groupKey || null;
            this.texts.textsArray.push(newText);
            this.texts.textsObject[data.key] = newText;
            return newText;
        }
        else {
            console.log("Duplicate key name not allowed: " + data.key);
        }
    };
    PHASER_TEXT_MANAGER.prototype.destroyText = function (key) {
        var keys = [];
        var deleteTextArray = this.texts.textsArray.filter(function (sprite) {
            return sprite.key === key;
        });
        for (var _i = 0, deleteTextArray_1 = deleteTextArray; _i < deleteTextArray_1.length; _i++) {
            var text = deleteTextArray_1[_i];
            keys.push(text.key);
            text.destroy();
        }
        delete this.texts.textsObject[key];
        this.texts.textsArray = this.texts.textsArray.filter(function (text) {
            return text.key !== key;
        });
        return keys;
    };
    PHASER_TEXT_MANAGER.prototype.destroySpriteGroup = function (groupKey) {
        var keys = [];
        var deleteTextsArray = this.texts.textsArray.filter(function (texts) {
            return texts.groupKey === groupKey;
        });
        for (var _i = 0, deleteTextsArray_1 = deleteTextsArray; _i < deleteTextsArray_1.length; _i++) {
            var text = deleteTextsArray_1[_i];
            keys.push(text.key);
            text.destroy();
        }
        delete this.texts.textsObject[groupKey];
        this.texts.textsArray = this.texts.textsArray.filter(function (text) {
            return text.groupKey !== groupKey;
        });
        return keys;
    };
    PHASER_TEXT_MANAGER.prototype.getText = function (key) {
        return this.texts.textsObject[key];
    };
    PHASER_TEXT_MANAGER.prototype.getGroup = function (groupKey) {
        return this.texts.textsArray.filter(function (text) {
            return text.groupKey === groupKey;
        });
    };
    PHASER_TEXT_MANAGER.prototype.getAllTexts = function (type) {
        if (type === void 0) { type = 'BOTH'; }
        if (type === 'ARRAY') {
            return this.texts.textsArray;
        }
        if (type == 'OBJECT') {
            return this.texts.textsObject;
        }
        return { object: this.texts.textsObject, array: this.texts.textsArray };
    };
    return PHASER_TEXT_MANAGER;
}());
