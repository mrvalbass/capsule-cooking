const recipes = [
  { image:"../style/images/pasta.png", stars:5, name:"Spinach and Cheese Pasta" },
  { image:"../style/images/donut.png", stars:4, name:"Fancy Glazed Donuts" },
  { image:"../style/images/burger.png", stars:5, name:"Mighty Cheesy Breakfast Burger" },
];

function createRecipe(image, starsNum, name) {
  const recipe = document.createElement('div')
  recipe.classList.add('recipe')
  const recipeImg = document.createElement('img')
  recipeImg.src = image
  recipeImg.alt = name + 'image'
  const stars = document.createElement('div')
  stars.classList.add('stars')
  for (let i = 0; i < starsNum; i++) {
    const star = document.createElement('img')
    star.src = "./style/images/star.svg"
    star.alt = 'star'
    stars.appendChild(star)
  }
  const title = document.createElement('p')
  title.textContent = name
  recipe.appendChild(recipeImg)
  recipe.appendChild(stars)
  recipe.appendChild(title)
  return recipe
}

const recipeContainer = document.querySelector('.recipe-container')

function resizeContainer () {
  const rowNum = Math.floor((recipeContainer.children.length - 1) / 3) + 1
  if (window.screen.width > 640) {
    recipeContainer.style.gridTemplate = `repeat(${rowNum}, 1fr) / repeat(3, 1fr)`
  } else {
    recipeContainer.style.gridTemplate = `repeat(${recipeContainer.children.length}, 1fr) / repeat(1, 1fr)`
  }
}

for (let recipe of recipes) {
  recipeContainer.appendChild(createRecipe(recipe.image, recipe.stars, recipe.name))
}

const windowResizeObserver = new ResizeObserver(resizeContainer)
windowResizeObserver.observe(window)
