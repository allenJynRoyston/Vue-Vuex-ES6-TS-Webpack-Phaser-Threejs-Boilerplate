<template lang="pug">
  div
    .columns
      .column
        h1 const phaserMaster = new PHASER_MASTER()
    .columns
      .column
        h2 Available Methods:
        pre
          code
            | phaserMaster.let(key[string], value[any])
            | phaserMaster.forceLet(key[string], value[any])
            | phaserMaster.get(key[string])
            | phaserMaster.game()
            | phaserMaster.delete(key[string])
            | phaserMaster.changeState(state[string])
            | phaserMaster.getCurrentState(state[string])
            | phaserMaster.checkState(state[string])
            | phaserMaster.getStates()
            | phaserMaster.getResolution()


    .columns
      .column
        h2
          |  phaserMaster.let(key[string], value[any])
        pre
          code
            | phaserMaster.let('foo', 'bar')
            | phaserMaster.let('bar', '{foo:true}')
            | phaserMaster.let('foobar', true)
            | phaserMaster.let('boofar', '[1,2,3,4]')

    .columns
      .column
        h2
          |  phaserMaster.forceLet(key[string], value[any])
        pre
          code
            | phaserMaster.let('myName', 'allen')
            | phaserMaster.let('myName', 'fallon')
            | // will return an error
            | phaserMaster.forceLet('myName', 'fallon')
            | // new value will be accepted
            |
            | // you do not need to use let before you can use forceLet
            | phaserMaster.forceLet('alsoAllowed', true)



    .columns
      .column
        h2 phaserMaster.delete(key[string])
        pre
          code
            | phaserMaster.let('foo', 'bar')
            | phaserMaster.get('foo')
            | // will return 'bar'
            |
            | phaserMaster.destroy('foo')
            | phaserMaster.get('foo')
            | // will return an error

    .columns
      .column
        h2 phaserMaster.changeState(state[string])
        pre
          code
            | phaserMaster.changeState('GAMEPLAY')
            | // if state doesn't exist, it will be added and then changed to it

    .columns
      .column
        h2 phaserMaster.getCurrentState(state[string])
        pre
          code
            | phaserMaster.changeState('MENUSCREEN')
            | console.log( phaserMaster.getCurrentState()  ) // will reeturn 'MENUSCREEN'

    .columns
      .column
        h2 phaserMaster.getStates()
        pre
          code
            | let allStates =  phaserMaster.getStates() // will return an array with all the available states
            | console.log( allStates )

    .columns
      .column
        h2 phaserMaster.getResolution()
        pre
          code
            | let resolution =  phaserMaster.getResolution() // will return an array with all the available states
            | console.log( resolution.width, resolution.height )
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
