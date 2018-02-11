<template lang="pug">
  div
    .columns
      .column
        h1 const phaserMouse = new PHASER_MOUSE_MANAGER()
    .columns
      .column
        h2 Available Methods:
        pre
          code
            | phaserMouse.setDebugger(isVisible[boolean])
            | phaserMouse.updateDebugger()
            | phaserMouse.clearAllControlIntervals()
            | phaserMouse.checkWithDelay({key: button[string|'LEFT','RIGHT','MIDDLE'], isActive:[boolean], delay:[number]})
            | phaserMouse.read(key[string|'LEFT'(default), 'RIGHT', 'MIDDLE'])

    .columns
      .column
        h2
          |  phaserMouse.setDebugger(isVisible[boolean])
        pre
          code
            | phaserMouse.setDebugger(true)   // mouse debugger information will be visible
            | phaserMouse.setDebugger(false)  // mouse debugger information will be hidden

    .columns
      .column
        h2 phaserMouse.updateDebugger()
        pre
          code
            |  // for constant updates, place in update() function
            |  phaserMouse.updateDebugger()

    .columns
      .column
        h2 phaserMouse.clearAllControlIntervals()
        pre
          code
            | // removes all timer intervals - best to place this when interupting mouse inputs
            | phaserMouse.clearAllControlIntervals()

    .columns
      .column
        h2 phaserMouse.checkWithDelay({key: button[string|'LEFT','RIGHT','MIDDLE'], isActive:[boolean], delay:[number]})
        pre
          code
            | if( phaserMouse.checkWithDelay({key: 'LEFT', isActive:true, delay: 100}) ){
            |   // do something every 100ms while the left key is active
            | }
            |
            | if( phaserMouse.checkWithDelay({key: 'RIGHT', isActive:false, delay: 100}) ){
            |   // do something every 100ms while the right key is inactive
            | }

    .columns
      .column
        h2 phaserMouse.read(key[string|'LEFT'(default), 'RIGHT', 'MIDDLE'])
        pre
          code
            | console.log( phaserMouse.read() )
            |
            | if (phaserMouse.read('RIGHT').active ){
            |   // do something while the right button is down
            | }
            |
            | if (phaserMouse.read('RIGHT').type === 'LONG' ){
            |   // do something while when the right mouse button has been held down a long time
            | }
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
