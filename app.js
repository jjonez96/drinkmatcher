const recipes = [
  { name: "Recipe 1", description: "This is recipe 1." },
  { name: "Recipe 2", description: "This is recipe 2." },
  { name: "Recipe 3", description: "This is recipe 3." },
];

let currentRecipeIndex = 0;

const displayRecipe = () => {
  const recipeName = document.getElementById("recipeName");
  const recipeDescription = document.getElementById("recipeDescription");
  recipeName.innerText = recipes[currentRecipeIndex].name;
  recipeDescription.innerText = recipes[currentRecipeIndex].description;
};

const likeRecipe = () => {
  const likedRecipes = JSON.parse(localStorage.getItem("likedRecipes")) || [];
  likedRecipes.push(recipes[currentRecipeIndex]);
  localStorage.setItem("likedRecipes", JSON.stringify(likedRecipes));
  nextRecipe();
};

window.addEventListener("load", function () {
  displayMainPage();
});

const dislikeRecipe = () => {
  nextRecipe();
};

const nextRecipe = () => {
  currentRecipeIndex++;
  if (currentRecipeIndex < recipes.length) {
    displayRecipe();
  } else {
    alert("No more recipes!");
    currentRecipeIndex = 0;
    displayRecipe();
  }
};

const deleteLikedRecipe = (index) => {
  const likedRecipes = JSON.parse(localStorage.getItem("likedRecipes")) || [];

  // Check if the index is valid
  if (index >= 0 && index < likedRecipes.length) {
    likedRecipes.splice(index, 1); // Remove the recipe at the specified index
    localStorage.setItem("likedRecipes", JSON.stringify(likedRecipes));

    // After deleting, re-display the liked recipes
    displayLikedRecipes();
  }
};

// Modify the displayLikedRecipes function to add a delete button for each liked recipe
const displayLikedRecipes = () => {
  const container = document.querySelector(".container");

  // Retrieve liked recipes from local storage
  const likedRecipes = JSON.parse(localStorage.getItem("likedRecipes")) || [];

  // Generate HTML for liked recipes with delete buttons
  const likedRecipesHTML = likedRecipes
    .map(
      (recipe, index) => `
    <div class="card mb-3">
      <div class="card-body text-center">
        <h5 class="card-title">${recipe.name}</h5>
        <p class="card-text">${recipe.description}</p>
        <button class="btn btn-danger  btn-sm" onclick="deleteLikedRecipe(${index})">Delete Match</button>
      </div>
    </div>
  `
    )
    .join("");

  // Update the container with liked recipes
  container.innerHTML = `
  <div class="container">
    <h1 class="text-center text-light">Liked Recipes</h1>
    <h4 class="text-center text-light"> Matches: ${likedRecipes.length} </h4>
    <div class="card-columns">
      ${likedRecipesHTML}
    </div>
    </div>
  `;
};

const displayMainPage = () => {
  const container = document.querySelector(".container");
  // Clear the container and display the main page content
  container.innerHTML = `
<div class="container mt-5">
  <h1 class="text-center text-light">Recipe Matcher</h1>
  <div class="card text-center" id="recipeCard">
    <div class="card-body">
      <h5 class="card-title" id="recipeName"></h5>
      <p class="card-text" id="recipeDescription"></p>

      <div class="row ">
        <div class="col-6">
          <button class="btn btn-danger btn-block" onclick="dislikeRecipe()">
            Dislike
          </button>
        </div>
        <div class="col-6">
          <button class="btn btn-success btn-block" onclick="likeRecipe()">Like</button>
        </div>
      </div>
    </div>
  </div>
</div>

  `;
  // Initialize or reset the recipe index
  currentRecipeIndex = 0;
  // Display the first recipe
  displayRecipe();
};
