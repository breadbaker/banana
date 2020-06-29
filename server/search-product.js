const Promise = require('bluebird')
const fs = require('fs')

// async read file data into mem
const readProductData = (files) => {
  return Promise.map(files, function(fileName) {
    return JSON.parse(fs.readFileSync(fileName, 'utf8'))
  }, { concurrency: 2 });
}

module.exports = async() => {
  const [ingredients, products]= await readProductData(['ingredients.json','products.json'])

  const ingredientIndex = {}
  products.products.forEach(prod => {
    prod.ingredient_ids.forEach(ing_id => {
      if (!ingredientIndex[ing_id]) {
        ingredientIndex[ing_id] = [prod]
      } else {
        ingredientIndex[ing_id].push(prod)
      }
    })
  })

  const lookupProductsByIngredient = (searchIngredientName) => {
  
    const ingredient = ingredients.ingredients.find(ing => ing.name === searchIngredientName)
  
    if (!ingredient) {
      throw new Error(`we dont have that ingredient! ${searchIngredientName}`)
    }
  
    const {
      id: ingredientId
    } = ingredient
  
    return ingredientIndex[ingredientId]
  }
  return lookupProductsByIngredient
}
  