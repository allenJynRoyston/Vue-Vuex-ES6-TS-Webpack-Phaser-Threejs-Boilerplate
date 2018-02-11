<template lang="pug">
  div
    .columns
      .column
        h1 const phaserGroup = new PHASER_GROUP_MANAGER()
    .columns
      .column
        h2 Available Methods:
        pre
          code
            | phaserGroup.assign(game[object], layers[number])
            | phaserGroup.layer(number[1-10])

    .columns
      .column
        h2
          | phaserGroup.assign(game[object], layers[number])
        pre
          code
            | phaserGroup.assign(game, 25)
            | // makes 25 layers available

    .columns
      .column
        h2
          | phaserBitmapdata.addImage({
          |    name:[string],
          |    group:[string](optional),
          |    reference[string],
          |    x:[number],
          |    y:[number],
          |    render[boolean]
          | })
        pre
          code
            | // add a text to a layer
            | let header1 = phaserTexts.add({name: 'header', font: 'gem', size: 18, default: 'I am text!'})
            | phaserTexts.alignToTopCenter('header', 10)
            | phaserGroup.layer(10).add(header1)
            |
            | // add a sprite to a layer
            | let newSprite = phaserSprites.add({name: `sprite_1`, group: 'group_1', reference: 'demoImage', x: game.world.randomX, y: game.world.randomY})
            | phaserGroup.layer(1).add(newSprite)
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
