<template lang="pug">
  div
    .columns
      .column
        h1 const phaserTexts = new PHASER_TEXT_MANAGER()
    .columns
      .column
        h2 Available Methods:
        pre
          code
            | phaserTexts.add({parameters_see_below})
            | phaserTexts.get(name[string])
            | phaserTexts.getGroup(name[string])
            | phaserTexts.getAll(type[string|'ARRAY','OBJECT','BOTH'(default)](optional))
            | phaserTexts.destroy(name[string])
            | phaserTexts.destroyGroup(name[string])
            |
            | phaserTexts.alignToBottomLeftCorner(name[string], offset[number])
            | phaserTexts.alignToBottomCenter(name[string], offset[number])
            | phaserTexts.alignToBottomRightCorner(name[string], offset[number])
            | phaserTexts.alignToTopRightCorner(name[string], offset[number])
            | phaserTexts.alignToTopCenter(name[string], offset[number])
            | phaserTexts.alignToTopLeftCorner(name[string], offset[number])
            | phaserTexts.alignToCenterLeft(name[string], offset[number])
            | phaserTexts.alignToCenter(name[string], offset[number])
            | phaserTexts.center(name[name], offsetX[number], offsetY[number])

    .columns
      .column
        h2
          |  phaserTexts.add({
          |    name:[string],
          |    group:[string](optional),
          |    font:[string|object],
          |    x:[number](optional),
          |    y:[number](optional),
          |    size:[number](optional),
          |    default: [string](optional)
          |  })
        pre
          code
            | let newText = phaserTexts.add({name: 't1', group: 'g1', font: 'gem', size: 18, default: 'Sprite Class Manager Debugger'})
            |     newText.alpha = 0.5

    .columns
      .column
        h2 phaserTexts.get(name[string])
        pre
          code
            |  let myText = phaserTexts.get('t1')
            |      myText.setTexT('I NOW SAY THIS')

    .columns
      .column
        h2 phaserTexts.getGroup(name[string])
        pre
          code
            | let all = [...phaserTexts.getGroup('t1'), ...phaserTexts.getGroup('t2')]
            | // for loop
            | for(let text of all){
            |   phaserTexts.get(text.name).visible = false
            | }
            |
            | // forEach loop
            | all.forEach((text, index) => {
            |   text.y = (5 * index)
            | })

    .columns
      .column
        h2 phaserTexts.getAll(type[string|'ARRAY','OBJECT','BOTH'(default)](optional))
        pre
          code
            | let allTexts = phaserTexts.getAll()
            | console.log(allTexts)  // will return an object with arrays and objects of all sprites
            |
            | let allTextsArray = phaserTexts.getAll('ARRAY')
            | console.log(allTextsArray)  // will return all sprites in an array
            |
            | let allTextsObject = phaserTexts.getAll('OBJECT')
            | console.log(allTextsObject)  // will return all sprites as an object

    .columns
      .column
        h2 phaserTexts.destroy(name[string])
        pre
          code
            | phaserTexts.destroy('s1')

    .columns
      .column
        h2 phaserTexts.destroyGroup(name[string])
        pre
          code
            | phaserTexts.destroyGroup('g1')

    .columns
      .column
        h2 phaserTexts.alignToBottomLeftCorner(name[string], padding[number])
        pre
          code
            | phaserTexts.alignToBottomLeftCorner('s1', 10)

    .columns
      .column
        h2 phaserTexts.alignToBottomCenter(name[string], padding[number])
        pre
          code
            | phaserTexts.alignToBottomCenter('s1', 10)

    .columns
      .column
        h2 phaserTexts.alignToBottomRightCorner(name[string], padding[number])
        pre
          code
            | phaserTexts.alignToBottomRightCorner('s1', 10)

    .columns
      .column
        h2 phaserTexts.alignToTopRightCorner(name[string], padding[number])
        pre
          code
            | phaserTexts.alignToTopRightCorner('s1', 10)

    .columns
      .column
        h2 phaserTexts.alignToTopCenter(name[string], padding[number])
        pre
          code
            | phaserTexts.alignToTopCenter('s1', 10)

    .columns
      .column
        h2 phaserTexts.alignToTopLeftCorner(name[string], padding[number])
        pre
          code
            | phaserTexts.alignToTopLeftCorner('s1', 10)

    .columns
      .column
        h2 phaserTexts.alignToCenterLeft(name[string], padding[number])
        pre
          code
            | phaserTexts.alignToCenterLeft('s1', 10)

    .columns
      .column
        h2 phaserTexts.alignToCenter(name[string], padding[number])
        pre
          code
            | phaserTexts.alignToCenter('s1', 10)

    .columns
      .column
        h2 phaserTexts.center(name[string], offsetX[number], offsetY[number])
        pre
          code
            | phaserTexts.center('s1', 100, 100)
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
