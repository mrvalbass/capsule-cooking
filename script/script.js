// DOM elements
const recipeContainer = document.querySelector('.recipe-container')
const addBtn = document.querySelector('.add-btn')
const popupContainer = document.querySelector('.popup-container')
const starContainer = popupContainer.querySelector('.star-container')
const stars = Array.from(starContainer.children)
const addRecipe = popupContainer.querySelector('.add-recipe')
const inputName = popupContainer.querySelector('.input-name')
const trashes = Array.from(document.querySelectorAll('.trash'))


// Data
const recipes = [
  { image:"./style/images/pasta.png", stars:5, name:"Spinach and Cheese Pasta" },
  { image:"./style/images/donut.png", stars:4, name:"Fancy Glazed Donuts" },
  { image:"./style/images/burger.png", stars:5, name:"Mighty Cheesy Breakfast Burger" },
];
const imgPlaceholder = './style/images/placeholder.png'

// Functions
function createRecipe(image, starsNum, name) {
  const recipe = document.createElement('div')
  recipe.classList.add('recipe')
  const recipeImg = document.createElement('img')
  recipeImg.src = image
  recipeImg.alt = name + 'image'
  const banner = document.createElement('div')
  banner.classList.add('recipe-banner')
  const stars = document.createElement('div')
  stars.classList.add('stars')
  for (let i = 0; i < starsNum; i++) {
    const star = document.createElement('img')
    star.src = "./style/images/star.svg"
    star.alt = 'star'
    stars.appendChild(star)
  }
  const trash = document.createElement('img')
  trash.src = "./style/images/trash.svg"
  trash.alt = 'trash image'
  trash.classList.add('trash')
  banner.appendChild(stars)
  banner.appendChild(trash)
  const title = document.createElement('p')
  title.textContent = name
  recipe.appendChild(recipeImg)
  recipe.appendChild(banner)
  recipe.appendChild(title)
  return recipe
}

function resizeContainer () {
  const rowNum = Math.floor((recipeContainer.children.length - 1) / 3) + 1
  if (window.screen.width > 640) {
    recipeContainer.style.gridTemplate = `repeat(${rowNum}, 1fr) / repeat(3, 1fr)`
  } else {
    recipeContainer.style.gridTemplate = `repeat(${recipeContainer.children.length}, 1fr) / repeat(1, 1fr)`
  }
}

// Page initialization
for (let recipe of recipes) {
  recipeContainer.appendChild(createRecipe(recipe.image, recipe.stars, recipe.name))
}
addListenerToTrashes()

// Listeners
 // Call popup
addBtn.addEventListener('click', () => {
  popupContainer.style.display = 'flex'
})

  // Exit popup if clicked outside popup
popupContainer.addEventListener('click', e => {
  if (e.target === popupContainer) {
    popupContainer.style.display = 'none'
  }
})

  // Star filling on hover
for (let star of stars) {
  star.addEventListener('mouseover', function() {
    if (starContainer.dataset.value === '0') {
      for (let star of stars) {
        if (star.dataset.value <= this.dataset.value) {
          star.src = "./style/images/star.svg"
        } else {
          star.src = "./style/images/empty-star.svg"
        }
      }
    }
  })
}

  // Star emptying when hover is done
starContainer.addEventListener('mouseleave', e => {
  if (starContainer.dataset.value === '0') {
    for (let star of stars) {
        star.src = "./style/images/empty-star.svg"
    }
  }
})

  //Save value to container
starContainer.addEventListener('click', e => {
  if (e.target.tagName = 'IMG')
  starContainer.dataset.value = e.target.dataset.value
  for (let star of stars) {
    if (star.dataset.value <= e.target.dataset.value) {
      star.src = "./style/images/star.svg"
    } else {
      star.src = "./style/images/empty-star.svg"
    }
  }
})

  //Add recipe

addRecipe.addEventListener('click', e => {
  recipeContainer.appendChild(createRecipe(imgPlaceholder, +starContainer.dataset.value, inputName.value))
  resizeContainer()
  inputName.value = ''
  starContainer.dataset.value = '0'
  popupContainer.style.display = 'none'
  for (let star of stars) {
    star.src = "./style/images/empty-star.svg"
  }
  addListenerToTrashes ()
})  

  //Remove recipe
function addListenerToTrashes () {
  const trashes = Array.from(document.querySelectorAll('.trash'))
  for (let trash of trashes) {
    trash.addEventListener('click', function() {
      console.log(this)
      this.parentNode.parentNode.remove()
      resizeContainer()
    })
  }
}


  // Resizer depending on the window size
window.onresize = resizeContainer