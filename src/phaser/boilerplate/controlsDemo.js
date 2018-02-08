var PhaserGameObject = (function () {
    function PhaserGameObject() {
        this.game = null;
        this.global = {
            pause: false
        };
    }
    PhaserGameObject.prototype.init = function (el, parent, options) {
        var phaserMaster = new PHASER_MASTER({ game: new Phaser.Game(options.width, options.height, Phaser.WEBGL, el, { preload: preload, update: update }), resolution: { width: options.width, height: options.height } }), phaserControls = new PHASER_CONTROLS(), phaserMouse = new PHASER_MOUSE({ showDebugger: false }), phaserSprites = new PHASER_SPRITE_MANAGER(), phaserTexts = new PHASER_TEXT_MANAGER(), phaserButtons = new PHASER_BUTTON_MANAGER();
        var button;
        function preload() {
            var game = phaserMaster.game();
            game.load.enableParallel = true;
            game.stage.backgroundColor = '#2f2f2f';
            game.load.image('gameTitle', 'src/assets/game/demo1/titles/100x100.jpg');
            game.load.image('ship', 'src/assets/game/demo1/images/ship.png');
            game.load.image('orangeBtn', 'src/assets/game/demo1/images/orangeBtn.png');
            game.load.audio('intro-music', ['src/assets/game/demo1/music/far-sight.ogg']);
            game.load.audio('select', ['src/assets/game/demo1/sound/Pickup_Coin.ogg']);
            game.load.script('webfont', '//ajax.googleapis.com/ajax/libs/webfont/1.4.7/webfont.js');
            window.WebFontConfig = {
                active: function () { },
                google: {
                    families: ['Press Start 2P']
                }
            };
            game.load.bitmapFont('gem', 'src/assets/fonts/gem.png', 'src/assets/fonts/gem.xml');
            phaserMaster.setState('PRELOAD');
            new PHASER_PRELOADER({ game: game, delayInSeconds: 0, done: function () { preloadComplete(); } });
        }
        function preloadComplete() {
            var game = phaserMaster.game();
            phaserControls.assign({ game: game });
            phaserMouse.assign({ game: game });
            phaserSprites.assign({ game: game });
            phaserTexts.assign({ game: game });
            phaserButtons.assign({ game: game });
            phaserSprites.addSprite({ x: game.world.centerX - 150, y: game.world.centerY + 50, name: 'sprite1', group: 'group1', reference: 'ship' });
            phaserSprites.addSprite({ x: game.world.centerX, y: game.world.centerY + 50, name: 'sprite2', group: 'group1', reference: 'ship' });
            phaserSprites.addSprite({ x: game.world.centerX + 150, y: game.world.centerY + 50, name: 'sprite3', group: 'group1', reference: 'ship' });
            phaserSprites.getGroup('group1').forEach(function (sprite, index) {
                sprite.anchor.set(0.5);
                sprite.scale.setTo(1, 1);
                sprite.alpha = 1;
            });
            var setToRotate = function () {
                phaserMaster.setState('ROTATE');
                phaserTexts.get('state').text = "Current state: " + phaserMaster.getCurrentState();
                phaserTexts.get('instructions').maxWidth = game.canvas.width - 10;
                phaserTexts.get('instructions').text = 'Rotate ships individually with A, S, D or use the directional arrows to move them all.  Pressing ENTER will reset them to their starting location.';
                phaserTexts.get('instructions').y = game.canvas.height - (phaserTexts.get('instructions').height + 15);
            };
            var setToScale = function () {
                phaserMaster.setState('SCALE');
                phaserTexts.get('state').text = "Current state: " + phaserMaster.getCurrentState();
                phaserTexts.get('instructions').maxWidth = game.canvas.width - 10;
                phaserTexts.get('instructions').text = 'Scale ships individually with A, S, D or use the directional arrows to scale them all.  Pressing ENTER will reset them to their original size.';
                phaserTexts.get('instructions').y = game.canvas.height - (phaserTexts.get('instructions').height + 15);
            };
            var setToMove = function () {
                phaserMaster.setState('MOVE');
                phaserTexts.get('state').text = "Current state: " + phaserMaster.getCurrentState();
                phaserTexts.get('instructions').maxWidth = game.canvas.width - 10;
                phaserTexts.get('instructions').text = 'Move each ship individually by holding A, S, D and a directional arrow or move all of them by using just the directional arrows.';
                phaserTexts.get('instructions').y = game.canvas.height - (phaserTexts.get('instructions').height + 15);
            };
            phaserButtons.add({ name: 'btn1', group: 'group1', x: game.world.centerX - 175, y: 100, reference: 'orangeBtn', onclick: function () { setToRotate(); } });
            phaserButtons.add({ name: 'btn2', group: 'group1', x: game.world.centerX, y: 100, reference: 'orangeBtn', onclick: function () { setToScale(); } });
            phaserButtons.add({ name: 'btn3', group: 'group1', x: game.world.centerX + 175, y: 100, reference: 'orangeBtn', onclick: function () { setToMove(); } });
            phaserButtons.getGroup('group1').forEach(function (btn, index) {
                btn.anchor.set(0.5);
                btn.scale.setTo(.5, .5);
            });
            phaserTexts.add({ name: 'label1', group: 'instructions', font: 'gem', x: game.world.centerX - 225, y: 85, size: 32, default: 'ROTATE' });
            phaserTexts.add({ name: 'label2', group: 'instructions', font: 'gem', x: game.world.centerX - 40, y: 85, size: 32, default: 'SCALE' });
            phaserTexts.add({ name: 'label3', group: 'instructions', font: 'gem', x: game.world.centerX + 145, y: 85, size: 32, default: 'MOVE' });
            phaserTexts.add({ name: 'status', group: 'instructions', font: 'gem', x: 10, y: 10, size: 16, default: 'Click on a button to change the action:' });
            phaserTexts.add({ name: 'state', group: 'instructions', font: 'gem', x: 10, y: 30, size: 16, default: '' });
            phaserTexts.add({ name: 'instructions', group: 'instructions', font: 'gem', x: 10, y: game.canvas.height - 80, size: 16, default: '' });
            setToMove();
        }
        function update() {
            if (phaserControls.isDebuggerEnabled()) {
                phaserControls.updateDebugger();
            }
            phaserMouse.updateDebugger();
            if (phaserMaster.checkState('PRELOAD') && !__phaser.global.pause) {
            }
            if (phaserMaster.checkState('ROTATE') && !__phaser.global.pause) {
                rotateLoop();
            }
            if (phaserMaster.checkState('SCALE') && !__phaser.global.pause) {
                scaleLoop();
            }
            if (phaserMaster.checkState('MOVE') && !__phaser.global.pause) {
                moveLoop();
            }
        }
        function rotateLoop() {
            if (phaserControls.read('A').active) {
                phaserSprites.get('sprite1').angle += 5;
            }
            if (phaserControls.read('B').active) {
                phaserSprites.get('sprite2').angle += 5;
            }
            if (phaserControls.read('X').active) {
                phaserSprites.get('sprite3').angle += 5;
            }
            if (phaserControls.read('LEFT').active) {
                for (var _i = 0, _a = phaserSprites.getGroup('group1'); _i < _a.length; _i++) {
                    var sprite = _a[_i];
                    sprite.angle -= 5;
                }
            }
            if (phaserControls.read('RIGHT').active) {
                for (var _b = 0, _c = phaserSprites.getGroup('group1'); _b < _c.length; _b++) {
                    var sprite = _c[_b];
                    sprite.angle += 5;
                }
            }
            if (phaserControls.read('UP').active) {
                for (var _d = 0, _e = phaserSprites.getGroup('group1'); _d < _e.length; _d++) {
                    var sprite = _e[_d];
                    sprite.angle -= 10;
                }
            }
            if (phaserControls.read('DOWN').active) {
                for (var _f = 0, _g = phaserSprites.getGroup('group1'); _f < _g.length; _f++) {
                    var sprite = _g[_f];
                    sprite.angle += 10;
                }
            }
            if (phaserControls.checkWithDelay({ isActive: true, key: 'START', delay: 500 })) {
                var game = phaserMaster.game();
                for (var _h = 0, _j = phaserSprites.getGroup('group1'); _h < _j.length; _h++) {
                    var sprite = _j[_h];
                    game.add.tween(sprite).to({ angle: 0 }, 500, Phaser.Easing.Bounce.Out, true);
                    game.add.tween(sprite.scale).to({ y: 1, x: 1 }, 500, Phaser.Easing.Bounce.Out, true);
                    game.add.tween(sprite).to({ y: sprite.getDefaultPositions().y, x: sprite.getDefaultPositions().x }, 500, Phaser.Easing.Bounce.Out, true);
                }
            }
        }
        function scaleLoop() {
            if (phaserControls.read('A').active) {
                phaserSprites.get('sprite1').scale.setTo(phaserSprites.get('sprite1').scale.x += .025, phaserSprites.get('sprite1').scale.y += .025);
            }
            if (phaserControls.read('B').active) {
                phaserSprites.get('sprite2').scale.setTo(phaserSprites.get('sprite2').scale.x += .025, phaserSprites.get('sprite2').scale.y += .025);
            }
            if (phaserControls.read('X').active) {
                phaserSprites.get('sprite3').scale.setTo(phaserSprites.get('sprite3').scale.x += .025, phaserSprites.get('sprite3').scale.y += .025);
            }
            if (phaserControls.read('UP').active) {
                for (var _i = 0, _a = phaserSprites.getGroup('group1'); _i < _a.length; _i++) {
                    var sprite = _a[_i];
                    sprite.scale.setTo(sprite.scale.x += .05, sprite.scale.y += .05);
                }
            }
            if (phaserControls.read('DOWN').active) {
                for (var _b = 0, _c = phaserSprites.getGroup('group1'); _b < _c.length; _b++) {
                    var sprite = _c[_b];
                    sprite.scale.setTo(sprite.scale.x -= .05, sprite.scale.y -= .05);
                }
            }
            if (phaserControls.checkWithDelay({ isActive: true, key: 'START', delay: 500 })) {
                var game = phaserMaster.game();
                for (var _d = 0, _e = phaserSprites.getGroup('group1'); _d < _e.length; _d++) {
                    var sprite = _e[_d];
                    game.add.tween(sprite).to({ angle: 0 }, 500, Phaser.Easing.Bounce.Out, true);
                    game.add.tween(sprite.scale).to({ y: 1, x: 1 }, 500, Phaser.Easing.Bounce.Out, true);
                    game.add.tween(sprite).to({ y: sprite.getDefaultPositions().y, x: sprite.getDefaultPositions().x }, 500, Phaser.Easing.Bounce.Out, true);
                }
            }
        }
        function moveLoop() {
            if (phaserControls.read('A').active) {
                if (phaserControls.read('UP').active) {
                    phaserSprites.get('sprite1').y -= 5;
                }
                if (phaserControls.read('DOWN').active) {
                    phaserSprites.get('sprite1').y += 5;
                }
                if (phaserControls.read('LEFT').active) {
                    phaserSprites.get('sprite1').x -= 5;
                }
                if (phaserControls.read('RIGHT').active) {
                    phaserSprites.get('sprite1').x += 5;
                }
            }
            if (phaserControls.read('B').active) {
                if (phaserControls.read('UP').active) {
                    phaserSprites.get('sprite2').y -= 5;
                }
                if (phaserControls.read('DOWN').active) {
                    phaserSprites.get('sprite2').y += 5;
                }
                if (phaserControls.read('LEFT').active) {
                    phaserSprites.get('sprite2').x -= 5;
                }
                if (phaserControls.read('RIGHT').active) {
                    phaserSprites.get('sprite2').x += 5;
                }
            }
            if (phaserControls.read('X').active) {
                if (phaserControls.read('UP').active) {
                    phaserSprites.get('sprite3').y -= 5;
                }
                if (phaserControls.read('DOWN').active) {
                    phaserSprites.get('sprite3').y += 5;
                }
                if (phaserControls.read('LEFT').active) {
                    phaserSprites.get('sprite3').x -= 5;
                }
                if (phaserControls.read('RIGHT').active) {
                    phaserSprites.get('sprite3').x += 5;
                }
            }
            if (!phaserControls.read('A').active && !phaserControls.read('B').active && !phaserControls.read('X').active) {
                if (phaserControls.read('UP').active) {
                    for (var _i = 0, _a = phaserSprites.getGroup('group1'); _i < _a.length; _i++) {
                        var sprite = _a[_i];
                        sprite.y -= 5;
                    }
                }
                if (phaserControls.read('DOWN').active) {
                    for (var _b = 0, _c = phaserSprites.getGroup('group1'); _b < _c.length; _b++) {
                        var sprite = _c[_b];
                        sprite.y += 5;
                    }
                }
                if (phaserControls.read('LEFT').active) {
                    for (var _d = 0, _e = phaserSprites.getGroup('group1'); _d < _e.length; _d++) {
                        var sprite = _e[_d];
                        sprite.x -= 5;
                    }
                }
                if (phaserControls.read('RIGHT').active) {
                    for (var _f = 0, _g = phaserSprites.getGroup('group1'); _f < _g.length; _f++) {
                        var sprite = _g[_f];
                        sprite.x += 5;
                    }
                }
            }
            if (phaserControls.checkWithDelay({ isActive: true, key: 'START', delay: 500 })) {
                var game = phaserMaster.game();
                for (var _h = 0, _j = phaserSprites.getGroup('group1'); _h < _j.length; _h++) {
                    var sprite = _j[_h];
                    game.add.tween(sprite).to({ angle: 0 }, 500, Phaser.Easing.Bounce.Out, true);
                    game.add.tween(sprite.scale).to({ y: 1, x: 1 }, 500, Phaser.Easing.Bounce.Out, true);
                    game.add.tween(sprite).to({ y: sprite.getDefaultPositions().y, x: sprite.getDefaultPositions().x }, 500, Phaser.Easing.Bounce.Out, true);
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
var PHASER_AUDIO = (function () {
    function PHASER_AUDIO() {
    }
    return PHASER_AUDIO;
}());
var PHASER_BITMAPDATA_MANAGER = (function () {
    function PHASER_BITMAPDATA_MANAGER() {
        this.game = null;
        this.bmd = {
            array: [],
            object: {}
        };
    }
    PHASER_BITMAPDATA_MANAGER.prototype.assign = function (construct) {
        this.game = construct.game;
    };
    PHASER_BITMAPDATA_MANAGER.prototype.add = function () {
    };
    PHASER_BITMAPDATA_MANAGER.prototype.addImage = function (data) {
        var duplicateCheck = this.bmd.array.filter(function (obj) {
            return obj.key === data.key;
        });
        if (duplicateCheck.length === 0) {
            var newBmd = this.game.make.bitmapData();
            newBmd.load(data.reference);
            newBmd.addToWorld(data.x, data.y);
            newBmd.name = data.name;
            newBmd.group = data.group;
            this.bmd.array.push(newBmd);
            this.bmd.object[data.name] = newBmd;
            return newBmd;
        }
        else {
            console.log("Duplicate key name not allowed: " + data.key);
        }
    };
    PHASER_BITMAPDATA_MANAGER.prototype.destroy = function (key) {
        var keys = [];
        var destroyArray = this.bmd.array.filter(function (obj) {
            return obj.key === key;
        });
        for (var _i = 0, destroyArray_1 = destroyArray; _i < destroyArray_1.length; _i++) {
            var obj = destroyArray_1[_i];
            keys.push(obj.key);
            obj.destroy();
        }
        delete this.bmd.object[key];
        this.bmd.array = this.bmd.array.filter(function (sprite) {
            return sprite.key !== key;
        });
        return keys;
    };
    PHASER_BITMAPDATA_MANAGER.prototype.destroyGroup = function (key) {
        var keys = [];
        var destroyArray = this.bmd.array.filter(function (obj) {
            return obj.group === key;
        });
        for (var _i = 0, destroyArray_2 = destroyArray; _i < destroyArray_2.length; _i++) {
            var obj = destroyArray_2[_i];
            keys.push(obj.key);
            obj.destroy();
        }
        delete this.bmd.object[key];
        this.bmd.array = this.bmd.array.filter(function (sprite) {
            return sprite.group !== key;
        });
        return keys;
    };
    PHASER_BITMAPDATA_MANAGER.prototype.get = function (key) {
        return this.bmd.object[key];
    };
    PHASER_BITMAPDATA_MANAGER.prototype.getGroup = function (key) {
        return this.bmd.array.filter(function (obj) {
            return obj.group === key;
        });
    };
    PHASER_BITMAPDATA_MANAGER.prototype.getAll = function (type) {
        if (type === void 0) { type = 'BOTH'; }
        if (type === 'ARRAY') {
            return this.bmd.array;
        }
        if (type == 'OBJECT') {
            return this.bmd.object;
        }
        return { object: this.bmd.object, array: this.bmd.array };
    };
    PHASER_BITMAPDATA_MANAGER.prototype.center = function (construct) {
        if (this.bmd.object[construct.name] === undefined) {
            console.log('Error centering sprite:  key does not exists.');
            return null;
        }
        var obj = this.bmd.object[construct.name];
        obj.x = construct.x - (obj.width / 2);
        obj.y = construct.y - (obj.height / 2);
        return obj;
    };
    return PHASER_BITMAPDATA_MANAGER;
}());
var PHASER_BUTTON_MANAGER = (function () {
    function PHASER_BUTTON_MANAGER() {
        this.game = null;
        this.resources = {
            array: [],
            object: {}
        };
    }
    PHASER_BUTTON_MANAGER.prototype.assign = function (construct) {
        this.game = construct.game;
    };
    PHASER_BUTTON_MANAGER.prototype.add = function (data) {
        var duplicateCheck = this.resources.array.filter(function (sprite) {
            return sprite.name === data.name;
        });
        if (duplicateCheck.length === 0) {
            var newSprite = this.game.add.button(data.x, data.y, data.reference, data.onclick);
            newSprite.name = data.name;
            newSprite.group = data.group || null;
            this.resources.array.push(newSprite);
            this.resources.object[data.name] = newSprite;
            return newSprite;
        }
        else {
            console.log("Duplicate key name not allowed: " + data.key);
        }
    };
    PHASER_BUTTON_MANAGER.prototype.destroy = function (key) {
        var keys = [];
        var deleteSpriteArray = this.resources.array.filter(function (sprite) {
            return sprite.key === key;
        });
        for (var _i = 0, deleteSpriteArray_1 = deleteSpriteArray; _i < deleteSpriteArray_1.length; _i++) {
            var sprite = deleteSpriteArray_1[_i];
            keys.push(sprite.key);
            sprite.destroy();
        }
        delete this.resources.object[key];
        this.resources.array = this.resources.array.filter(function (sprite) {
            return sprite.key !== key;
        });
        return keys;
    };
    PHASER_BUTTON_MANAGER.prototype.destroyGroup = function (group) {
        var keys = [];
        var deleteSpriteArray = this.resources.array.filter(function (sprite) {
            return sprite.group === group;
        });
        for (var _i = 0, deleteSpriteArray_2 = deleteSpriteArray; _i < deleteSpriteArray_2.length; _i++) {
            var sprite = deleteSpriteArray_2[_i];
            keys.push(sprite.key);
            sprite.destroy();
        }
        delete this.resources.object[group];
        this.resources.array = this.resources.array.filter(function (sprite) {
            return sprite.group !== group;
        });
        return keys;
    };
    PHASER_BUTTON_MANAGER.prototype.get = function (key) {
        return this.resources.object[key];
    };
    PHASER_BUTTON_MANAGER.prototype.getGroup = function (key) {
        return this.resources.array.filter(function (sprite) {
            return sprite.group === key;
        });
    };
    PHASER_BUTTON_MANAGER.prototype.getAll = function (type) {
        if (type === void 0) { type = 'BOTH'; }
        if (type === 'ARRAY') {
            return this.resources.array;
        }
        if (type == 'OBJECT') {
            return this.resources.object;
        }
        return { object: this.resources.object, array: this.resources.array };
    };
    return PHASER_BUTTON_MANAGER;
}());
var PHASER_CONTROLS = (function () {
    function PHASER_CONTROLS() {
        this.IO = null;
        this.game = null;
        this.buttonSensitivity = { QUICK: 1, SHORT: 50, LONG: 150, SUPERLONG: 300 };
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
            SYSTEM: false
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
    PHASER_MASTER.prototype.getCurrentState = function () {
        return this.currentState;
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
var PHASER_MOUSE = (function () {
    function PHASER_MOUSE(construct) {
        this.game = null;
        this.clickSensitvity = { QUICK: 1, SHORT: 50, LONG: 150, SUPERLONG: 300 };
        this.mouseMapping = [0, 1, 2];
        this.mouseMap = {
            LEFT: 0,
            MIDDLE: 1,
            RIGHT: 2
        };
        this.metrics = {
            sensitivityPress: {},
            sensitivityBuffer: {},
            location: {},
            state: {}
        };
        this.properties = {
            allowDebugger: true,
            timingRefreshRate: 1
        };
        this.inputDelay = {
            delay: Array.apply(null, Array(2)).map(function () { return 0; })
        };
        this.debugger = {
            enabled: construct.showDebugger === undefined ? false : construct.showDebugger,
            text: {},
            pointer: null
        };
    }
    PHASER_MOUSE.prototype.assign = function (construct) {
        var _this = this;
        this.game = construct.game;
        var _loop_3 = function (key) {
            this_3.metrics.sensitivityPress[key] = null;
            this_3.metrics.sensitivityBuffer[key] = 0;
            this_3.metrics.location[key] = { x: null, y: null };
            this_3.metrics.state[key] = function () {
                return _this.getBtnPressType(_this.metrics.sensitivityBuffer[key]);
            };
        };
        var this_3 = this;
        for (var _i = 0, _a = this.mouseMapping; _i < _a.length; _i++) {
            var key = _a[_i];
            _loop_3(key);
        }
        this.game.input.onDown.add(function (e) {
            var mouseKey = _this.checkMouseClick();
            clearInterval(_this.metrics.sensitivityPress[mouseKey]);
            _this.metrics.sensitivityPress[mouseKey] = setInterval(function () {
                _this.metrics.sensitivityBuffer[mouseKey] += 1;
                _this.metrics.location[mouseKey] = { x: e.x, y: e.y };
            }, _this.properties.timingRefreshRate);
        });
        this.game.input.onUp.add(function (e) {
            var mouseKey = _this.checkMouseClick();
            _this.clearAllControlIntervals();
            _this.metrics.sensitivityBuffer[mouseKey] = 0;
        });
        var style = { font: "12px Courier New", fill: "#fff", align: "left" };
        this.mouseMapping.forEach(function (btn, index) {
            _this.debugger.text[btn] = null;
            _this.debugger.text[btn] = _this.game.add.text(5, _this.game.height - 35 - (index * 15), "", style);
        });
        this.debugger.pointer = this.game.add.text(5, this.game.height - 20, "", style);
    };
    PHASER_MOUSE.prototype.checkMouseClick = function () {
        var mouseKey = 0;
        if (this.game.input.activePointer.leftButton.isDown) {
            mouseKey = 0;
        }
        if (this.game.input.activePointer.middleButton.isDown) {
            mouseKey = 1;
        }
        if (this.game.input.activePointer.rightButton.isDown) {
            mouseKey = 2;
        }
        return mouseKey;
    };
    PHASER_MOUSE.prototype.debuggerString = function (mouseKey) {
        return "Button_" + mouseKey + " | {x: " + this.metrics.location[mouseKey].x + ", y: " + this.metrics.location[mouseKey].y + "} | active: " + (this.metrics.sensitivityBuffer[mouseKey] > 0 ? true : false) + " | state: " + this.metrics.state[mouseKey]().state + " | duration: " + this.metrics.state[mouseKey]().val + " | type: " + this.metrics.state[mouseKey]().type;
    };
    PHASER_MOUSE.prototype.setDebugger = function (state) {
        if (state === void 0) { state = true; }
        this.debugger.enabled = state;
    };
    PHASER_MOUSE.prototype.updateDebugger = function () {
        for (var _i = 0, _a = this.mouseMapping; _i < _a.length; _i++) {
            var btn = _a[_i];
            this.debugger.text[btn].setText(this.debugger.enabled ? this.debuggerString(btn) : '').bringToTop();
        }
        this.debugger.pointer.setText(this.debugger.enabled ? "Pointer: {x: " + this.game.input.mousePointer.x + ", y: " + this.game.input.mousePointer.y + "}" : '').bringToTop();
    };
    PHASER_MOUSE.prototype.clearAllControlIntervals = function () {
        for (var _i = 0, _a = this.mouseMapping; _i < _a.length; _i++) {
            var key = _a[_i];
            this.metrics.sensitivityBuffer[key] = 0;
            clearInterval(this.metrics.sensitivityPress[key]);
        }
    };
    PHASER_MOUSE.prototype.checkWithDelay = function (params) {
        if (this.read(params.key).active === params.isActive) {
            var mouseKey = this.mouseMap[params.key.toUpperCase()];
            if (this.game.time.now > this.inputDelay.delay[mouseKey]) {
                this.inputDelay.delay[mouseKey] = params.delay + this.game.time.now;
                return true;
            }
            else {
                return false;
            }
        }
        return false;
    };
    PHASER_MOUSE.prototype.read = function (key) {
        if (key === void 0) { key = 'LEFT'; }
        var mouseKey = this.mouseMap[key.toUpperCase()];
        return {
            id: mouseKey,
            x: this.metrics.location[mouseKey].x,
            y: this.metrics.location[mouseKey].y,
            active: this.metrics.sensitivityBuffer[mouseKey] > 0 ? true : false,
            duration: this.metrics.sensitivityBuffer[mouseKey],
            state: this.metrics.state[mouseKey]().state,
            type: this.metrics.state[mouseKey]().type
        };
    };
    PHASER_MOUSE.prototype.getBtnPressType = function (val) {
        var _this = this;
        var _type = 'NONE', _state = 0, state = 0;
        Object.keys(this.clickSensitvity).forEach(function (key) {
            state++;
            if (val > _this.clickSensitvity[key]) {
                _type = key;
                _state = state;
            }
        });
        return { val: val, type: _type, state: _state };
    };
    return PHASER_MOUSE;
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
        this.sprites = {
            array: [],
            object: {}
        };
    }
    PHASER_SPRITE_MANAGER.prototype.assign = function (construct) {
        this.game = construct.game;
    };
    PHASER_SPRITE_MANAGER.prototype.addSprite = function (data) {
        var duplicateCheck = this.sprites.array.filter(function (obj) {
            return obj.name === data.name;
        });
        if (duplicateCheck.length === 0) {
            var newSprite = this.game.add.sprite(data.x, data.y, data.reference);
            newSprite.name = data.name;
            newSprite.group = data.group || null;
            newSprite.defaultPosition = { x: data.x, y: data.y };
            newSprite.setDefaultPositions = function (x, y) { this.defaultPosition.x = x, this.defaultPosition.y = y; };
            newSprite.getDefaultPositions = function () { return this.defaultPosition; };
            this.sprites.array.push(newSprite);
            this.sprites.object[data.name] = newSprite;
            return newSprite;
        }
        else {
            console.log("Duplicate key name not allowed: " + data.key);
        }
    };
    PHASER_SPRITE_MANAGER.prototype.destroy = function (key) {
        var keys = [];
        var deleteArray = this.sprites.array.filter(function (sprite) {
            return sprite.name === name;
        });
        for (var _i = 0, deleteArray_1 = deleteArray; _i < deleteArray_1.length; _i++) {
            var obj = deleteArray_1[_i];
            keys.push(obj.name);
            obj.destroy();
        }
        delete this.sprites.object[key];
        this.sprites.array = this.sprites.array.filter(function (obj) {
            return obj.name !== key;
        });
        return keys;
    };
    PHASER_SPRITE_MANAGER.prototype.destroyGroup = function (key) {
        var keys = [];
        var deleteArray = this.sprites.array.filter(function (obj) {
            return obj.group === key;
        });
        for (var _i = 0, deleteArray_2 = deleteArray; _i < deleteArray_2.length; _i++) {
            var sprite = deleteArray_2[_i];
            keys.push(sprite.key);
            sprite.destroy();
        }
        delete this.sprites.object[key];
        this.sprites.array = this.sprites.array.filter(function (obj) {
            return obj.group !== key;
        });
        return keys;
    };
    PHASER_SPRITE_MANAGER.prototype.get = function (key) {
        return this.sprites.object[key];
    };
    PHASER_SPRITE_MANAGER.prototype.getGroup = function (key) {
        return this.sprites.array.filter(function (sprite) {
            return sprite.group === key;
        });
    };
    PHASER_SPRITE_MANAGER.prototype.getAll = function (type) {
        if (type === void 0) { type = 'BOTH'; }
        if (type === 'ARRAY') {
            return this.sprites.array;
        }
        if (type == 'OBJECT') {
            return this.sprites.object;
        }
        return { object: this.sprites.object, array: this.sprites.array };
    };
    PHASER_SPRITE_MANAGER.prototype.center = function (construct) {
        if (this.sprites.object[construct.name] === undefined) {
            console.log('Error centering sprite:  key does not exists.');
            return null;
        }
        var sprite = this.sprites.object[construct.name];
        sprite.x = construct.x - (sprite.width / 2);
        sprite.y = construct.y - (sprite.height / 2);
        return sprite;
    };
    return PHASER_SPRITE_MANAGER;
}());
var PHASER_TEXT_MANAGER = (function () {
    function PHASER_TEXT_MANAGER() {
        this.game = null;
        this.texts = {
            array: [],
            object: {}
        };
    }
    PHASER_TEXT_MANAGER.prototype.assign = function (construct) {
        this.game = construct.game;
    };
    PHASER_TEXT_MANAGER.prototype.add = function (data) {
        var duplicateCheck = this.texts.array.filter(function (obj) {
            return obj.name === data.name;
        });
        if (duplicateCheck.length === 0) {
            var newText = this.game.add.bitmapText(data.x, data.y, data.font, data.default, data.size);
            newText.name = data.name;
            newText.group = data.group || null;
            this.texts.array.push(newText);
            this.texts.object[data.name] = newText;
            return newText;
        }
        else {
            console.log("Duplicate key name not allowed: " + data.key);
        }
    };
    PHASER_TEXT_MANAGER.prototype.destroy = function (key) {
        var keys = [];
        var deleteArray = this.texts.array.filter(function (obj) {
            return obj.name === name;
        });
        for (var _i = 0, deleteArray_3 = deleteArray; _i < deleteArray_3.length; _i++) {
            var text = deleteArray_3[_i];
            keys.push(text.key);
            text.destroy();
        }
        delete this.texts.object[name];
        this.texts.array = this.texts.array.filter(function (obj) {
            return obj.name !== key;
        });
        return keys;
    };
    PHASER_TEXT_MANAGER.prototype.destroyGroup = function (key) {
        var keys = [];
        var deletearray = this.texts.array.filter(function (obj) {
            return obj.group === key;
        });
        for (var _i = 0, deletearray_1 = deletearray; _i < deletearray_1.length; _i++) {
            var text = deletearray_1[_i];
            keys.push(text.key);
            text.destroy();
        }
        delete this.texts.object[key];
        this.texts.array = this.texts.array.filter(function (obj) {
            return obj.group !== key;
        });
        return keys;
    };
    PHASER_TEXT_MANAGER.prototype.get = function (key) {
        return this.texts.object[key];
    };
    PHASER_TEXT_MANAGER.prototype.getGroup = function (key) {
        return this.texts.array.filter(function (obj) {
            return obj.group === key;
        });
    };
    PHASER_TEXT_MANAGER.prototype.getAll = function (type) {
        if (type === void 0) { type = 'BOTH'; }
        if (type === 'ARRAY') {
            return this.texts.array;
        }
        if (type == 'OBJECT') {
            return this.texts.object;
        }
        return { object: this.texts.object, array: this.texts.array };
    };
    PHASER_TEXT_MANAGER.prototype.center = function (construct) {
        if (this.texts.object[construct.name] === undefined) {
            console.log('Error centering sprite:  key does not exists.');
            return null;
        }
        var text = this.texts.object[construct.name];
        text.x = construct.x - (text.width / 2);
        text.y = construct.y - (text.height / 2);
        return text;
    };
    return PHASER_TEXT_MANAGER;
}());
