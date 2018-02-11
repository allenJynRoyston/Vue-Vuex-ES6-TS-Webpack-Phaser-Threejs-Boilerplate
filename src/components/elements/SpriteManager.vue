<template lang="pug">
  div
    .columns
      .column
        h1 const phaserSprites = new PHASER_SPRITE_MANAGER()
    .columns
      .column
        h2 Available Methods:
        pre
          code
            | phaserSprites.add({parameters})
            | phaserSprites.get(name[string])
            | phaserSprites.getGroup(name[string])
            | phaserSprites.getAll(type[string|'ARRAY','OBJECT','BOTH'(default)](optional))
            | phaserSprites.destroy(name[string])
            | phaserSprites.destroyGroup(name[string])
            | phasersprites.centerWorld(name[string])
            | phaserSprites.centerOnPoint(name[string], x[number], y[number])

    .columns
      .column
        h2
          | phaserSprites.add({
          | name:[string],
          | group:[string](optional),
          | reference:[string|object],
          | x:[number],
          | y:[number]
          | })
        pre
          code
            | let newSprite = phaserSprites.add({name: `s1`, group: 'g1', reference: 'demoImage', x: game.world.randomX, y: game.world.randomY})
            |     newSprite.alpha = 0.5
            |

    .columns
      .column
        h2 phaserSprites.get(name[string])
        pre
          code
            |  let newSprite = phaserSprites.get('s1')
            |      newSprite.alpha = 0.5
            |

    .columns
      .column
        h2 phaserSprites.getGroup(name[string])
        pre
          code
            | let all = [...phaserSprites.getGroup('spriteGroup1'), ...phaserSprites.getGroup('spriteGroup2')]
            | // for loop
            | for(let sprite of all){
            |   phaserSprites.get(sprite.name).visible = false
            | }
            |
            | // forEach loop
            | all.forEach((sprite, index) => {
            |   sprite.y = (5 * index)
            | })

    .columns
      .column
        h2 phaserSprites.getAll(type[string|'ARRAY','OBJECT','BOTH'(default)](optional))
        pre
          code
            | let allSprites = phaserSprites.getAll()
            | console.log(allSprites)  // will return an object with arrays and objects of all sprites
            |
            | let allSpritesArray = phaserSprites.getAll('ARRAY')
            | console.log(allSpritesArray)  // will return all sprites in an array
            |
            | let allSpritesObject = phaserSprites.getAll('OBJECT')
            | console.log(allSpritesObject)  // will return all sprites as an object

    .columns
      .column
        h2 phaserSprites.destroy(name[string])
        pre
          code
            | phaserSprite.destroy('s1')

    .columns
      .column
        h2 phaserSprites.destroyGroup(name[string])
        pre
          code
            | phaserSprite.destroyGroup('g1')

    .columns
      .column
        h2 phasersprites.centerWorld(name[string])
        pre
          code
            | phaserSprite.centerWorld('s1')


    .columns
      .column
        h2 phasersprites.centerOnPoint(name:[string], x:[number], y:[number])
        pre
          code
            | phaserSprite.centerOnPoint('s1', 100, 200)
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
