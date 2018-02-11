<template lang="pug">
  div
    .columns
      .column
        h1 const phaserControls = new PHASER_CONTROLS();
    .columns
      .column
        h2 Available Methods:
        pre
          code
            | phaserControls.mapKeys({see_below})
            | phaserControls.isReady()
            | phaserControls.isDebuggerEnabled()
            | phaserControls.updateDebugger()
            | phaserControls.disableAllInput()
            | phaserControls.enableAllInput()
            |
            | phaserControls.disableAllDirectionalButtons()
            | phaserControls.disableAllTriggerButtons()
            | phaserControls.disableAllActionButtons()
            | phaserControls.disableAllSystemButtons()
            |
            | phaserControls.enableAllDirectionalButtons()
            | phaserControls.enableAllTriggerButtons()
            | phaserControls.enableAllActionButtons()
            | phaserControls.enableAllSystemButtons()
            |
            | phaserControls.setDisableKeyProperty(button[string],state[boolean])
            | phaserControls.getKeyDisabledValue(button[string])
            |
            | phaserControls.clearAllControlIntervals()
            | phaserControls.read(button[string])
            | phaserControls.readMulti(buttons[string, sting, etc], type[string|'OBJECT','ARRAY'])
            | phaserControls.checkWithDelay({key:[string], isActive:[boolean], delay:[number]})
            | phaserControls.getKeyId(button[string])



    .columns
      .column
        h2 phaserControls.mapKeys(button[string])
        pre
          code
            | // if you want to change from the default control scheme
            | let keyMappings = {
            |    UP: {name: 'UP', code: 'ArrowUp'},
            |    DOWN: {name: 'DOWN', code: 'ArrowDown'},
            |    LEFT: {name: 'LEFT', code: 'ArrowLeft'},
            |    RIGHT: {name: 'RIGHT', code: 'ArrowRight'},
            |    A: {name: 'T', code: 'KeyT'},
            |    B: {name: 'S', code: 'KeyS'},
            |    X: {name: 'D', code: 'KeyD'},
            |    Y: {name: 'F', code: 'KeyF'},
            |    L1: {name: 'Q', code: 'KeyQ'},
            |    L2: {name: 'W', code: 'KeyW'},
            |    R1: {name: 'E', code: 'KeyE'},
            |    R2: {name: 'R', code: 'KeyR'},
            |    L3:{name: 'O', code: 'KeyO'},
            |    R3:{name: 'P', code: 'KeyP'},
            |    START: {name: 'ENTER', code: 'Enter'},
            |    BACK: {name: 'BACKSPACE', code: 'Backspace'}
            |  }
            | phaserControls.mapKeys(keyMappings)

    .columns
      .column
        h2
          |  phaserControls.isReady()
        pre
          code
            | phaserControls.isReady()
            | // returns true/false

    .columns
      .column
        h2 phaserControls.isDebuggerEnabled()
        pre
          code
            | phaserControls.isDebuggerEnabled()
            | // returns true/false

    .columns
      .column
        h2 phaserControls.updateDebugger()
        pre
          code
            | phaserControls.updateDebugger()
            | // best to place this in the update() loop

    .columns
      .column
        h2 phaserControls.disableAllInput()
        pre
          code
            | phaserControls.disableAllInput();
            | // all inputs keys are disabled

    .columns
      .column
        h2 phaserControls.enableAllInput();
        pre
          code
            | phaserControls.enableAllInput();
            | // all inputs keys are enabled

    .columns
      .column
        h2 phaserControls.disableAllDirectionalButtons();
        pre
          code
            | phaserControls.disableAllDirectionalButtons()
            | // disables LEFT,RIGHT,UP,DOWN keys

    .columns
      .column
        h2 phaserControls.disableAllTriggerButtons();
        pre
          code
            | phaserControls.enableAllTriggerButtons();
            | // disables R1,R2,R3,L1,L2,R3 buttons

    .columns
      .column
        h2 phaserControls.disableAllActionButtons()
        pre
          code
            | phaserControls.disableAllActionButtons()
            | // disables A,B,X,Y buttons

    .columns
      .column
        h2 phaserControls.disableAllSystemButtons();
        pre
          code
            | phaserControls.disableAllSystemButtons()
            | // disables START,BACK buttons

    .columns
      .column
        h2 phaserControls.enableAllDirectionalButtons();
        pre
          code
            | phaserControls.enableAllDirectionalButtons()
            | // enables LEFT,RIGHT,UP,DOWN keys

    .columns
      .column
        h2 phaserControls.enableAllTriggerButtons();
        pre
          code
            | phaserControls.enableAllTriggerButtons();
            | // enables R1,R2,R3,L1,L2,R3 buttons

    .columns
      .column
        h2 phaserControls.enableAllActionButtons();
        pre
          code
            | phaserControls.enableAllActionButtons()
            | // enables A,B,X,Y buttons
    .columns
      .column
        h2 phaserControls.enableAllSystemButtons();
        pre
          code
            | phaserControls.enableAllSystemButtons()
            | // enables START,BACK buttons
    .columns
      .column
        h2 phaserControls.setDisableKeyProperty(button[string],state[boolean])
        pre
          code
            | phaserControls.setDisableKeyProperty('A', true)
            | // A button will be disabled
            |
            | phaserControls.setDisableKeyProperty('A', false)
            | // A button will be false
    .columns
      .column
        h2 phaserControls.getKeyDisabledValue(button[string])
        pre
          code
            | let isBtnDisabled = phaserControls.getKeyDisabledValue('A')
            | // returns true/false
    .columns
      .column
        h2 phaserControls.clearAllControlIntervals()
        pre
          code
            | phaserControls.clearAllControlIntervals()
            | // clears all intervals - best used when disabling or transitioning to a new gameState
    .columns
      .column
        h2 phaserControls.read(button[string])
        pre
          code
            | let aBtn = phaserControls.read('A');
            | if( aBtn.active ){
            |   // do something while A button is held down
            | }
            |
            | if( aBtn.type === 'LONG' ){
            |   // do something while the A button is held down for a long time
            | }

    .columns
      .column
        h2 phaserControls.readMulti(button[string],state[boolean])
        pre
          code
            | phaserControls.readMulti(['A', 'X'], 'ARRAY')
            | // returns an array with the button properties

    .columns
      .column
        h2 phaserControls.checkWithDelay(button[string])
        pre
          code
            | if(phaserControls.checkWithDelay({isActive: true, key: 'A', delay: 250})){
            |  /* DO SOMETHING EVERY 250 miliseconds
            | }

    .columns
      .column
        h2 phaserControls.getKeyId()
        pre
          code
            | phaserControls.getKeyId('A')
            | // returns a number with the keyId (i.e. 1-16)
</template>

<script>
export default {

}
</script>


<style lang="sass" scoped>
  .column
    border: 1px solid white
    background-color: lightgray
    color: black
    margin-top: 10px
    max-width: 1200px

  h2
    padding-bottom: 10px
    font-family: courier
    font-weight: bold
  pre
    padding: 50px
  code
    font-family: courier
    font-size: 16px
</style>
