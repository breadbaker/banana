const Promise = require('bluebird')
const fs = require('fs')

const readProductData = (files) => {
  return Promise.map(files, function(fileName) {
    return JSON.parse(fs.readFileSync(fileName, 'utf8'))
  }, { concurrency: 2 });
}

const lookupProductsByIngredient = async(searchIngredientName) => {
  const [ingredients, products]= await readProductData(['ingredients.json','products.json'])
  
  const ingredient = ingredients.ingredients.find(ing => ing.name === searchIngredientName)

  if (!ingredient) {
    throw new Error(`we dont have that ingredient! ${searchIngredientName}`)
  }

  const {
    id: ingredientId
  } = ingredient

  // approach 1 brute!

  const matchProductsBrute = products.products.reduce((memo, prod) => {
    if (prod.ingredient_ids.includes(ingredientId)) {
      memo.push(prod)
    }
    return memo
  }, [])

  console.log('brute')
  console.log(matchProductsBrute)

  // approach 2 create ingredients index

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

  console.log('index')
  console.log(ingredientIndex[ingredientId])
}

const ingArgument = process.argv.slice(2).length ? process.argv.slice(2).join(' ') : null

const desiredLookup = ingArgument || 'Organic Banana'

console.log(`looking up ${desiredLookup}`)
lookupProductsByIngredient(desiredLookup)