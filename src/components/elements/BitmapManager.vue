<template lang="pug">
  div
    .columns
      .column
        h1 const phaserBitmapdata = new PHASER_BITMAPDATA_MANAGER()
    .columns
      .column
        h2 Available Methods:
        pre
          code
            | phaserBitmapdata.addGradient({name:[string], group:[string](optional), x:[number], y:[number], width:[number], height:[number], start:[#hex], end:[#hex], render[boolean]})
            | phaserBitmapdata.addImage({name:[string], group:[string](optional), reference:[string], x:[number], y:[number], render:[boolean]})
            | phaserBitmapdata.addEmpty({name[string], group:[string](optional), x:[number], y:[number], width:[number], height:[number], render:[boolean]})
            | phaserBitmapdata.get(name[string])
            | phaserBitmapdata.getGroup(name[string])
            | phaserBitmapdata.getAll(type[string|'ARRAY', 'OBJECT', 'BOTH'(default)])
            | phaserBitmapdata.destroy(name[string])
            | phaserBitmapdata.destroyGroup(name[string])

    .columns
      .column
        h2
          | phaserBitmapdata.addGradient({
          |    name:[string],
          |    group:[string](optional),
          |    x:[number],
          |    y:[number],
          |    width:[number],
          |    height:[number],
          |    start:[#hex],
          |    end:[#hex],
          |    render[boolean]
          | })
        pre
          code
            | let newBmpGradient = phaserBitmapdata.addGradient({name: 'b1', group: 'g1', start: '#0000FF', end: '#33B5E5', width: 100, height: 100, x:0, y: 0, render: true})

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
            |  let newBmpImage = phaserBitmapdata.addImage({name: `b2`, group: 'g1', reference: 'demoImage', x:  65, y: 0, render: true})

    .columns
      .column
        h2
          | phaserBitmapdata.addEmpty({
          |    name:[string],
          |    group:[string](optional),
          |    x:[number],
          |    y:[number],
          |    width:[number],
          |    height:[number],
          |    render[boolean]
          | })
        pre
          code
            |  let newBmpEmpty = phaserBitmapdata.addEmpty({name: `b3`, group: 'g1', reference: 'demoImage', x:  65, y: 0, width: 100, height: 100, render: true})

    .columns
      .column
        h2 phaserBitmapdata.get(name[string])
        pre
          code
            | let myBitmap = phaserBitmapdata.get('b1')
            |
            | // convert gradient bitmap into sprite
            | let gradientBox =  phaserSprites.add({x: 0, y: 0, name: `spriteBg1`, reference: phaserBmd.get('b1').cacheBitmapData})
            |      gradientBox.width = game.canvas.width
            |      gradientBox.height = 200
            |
            |  // convert bitmapData into sprite
            | for(let i = 0; i < 5; i++){
            |   let newBlock = phaserSprites.add({x: 200, y: 0, name: `blockSprites${i}`, group: 'blockSpritesGroup', reference: phaserBmd.get('b1').cacheBitmapData})
            | }

    .columns
      .column
        h2 phaserBitmapdata.getGroup(name[string])
        pre
          code
            | let all = [...phaserBitmapdata.getGroup('g1'), ...phaserBitmapdata.getGroup('g2')]
            | // for loop
            | for(let sprite of all){
            |   phaserBitmapdata.get(sprite.name)
            | }
            |
            | // forEach loop
            | all.forEach((sprite, index) => {
            |  // do something
            | })

    .columns
      .column
        h2 phaserBitmapdata.getAll(type[string|'ARRAY','OBJECT','BOTH'(default)](optional))
        pre
          code
            | let allBitmapdata = phaserBitmapdata.getAll()
            | console.log(allBitmapdata)  // will return an object with arrays and objects of all bitmapdata
            |
            | let allBitmapdataArray = phaserBitmapdata.getAll('ARRAY')
            | console.log(allBitmapdataArray)  // will return all bitmapdata in an array
            |
            | let allBitmapdataObject = phaserBitmapdata.getAll('OBJECT')
            | console.log(allBitmapdataObject)  // will return all bitmapdata as an object

    .columns
      .column
        h2 phaserBitmapdata.destroy(name[string])
        pre
          code
            | phaserBitmapdata.destroy('s1')

    .columns
      .column
        h2 phaserBitmapdata.destroyGroup(name[string])
        pre
          code
            | phaserBitmapdata.destroyGroup('g1')
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
