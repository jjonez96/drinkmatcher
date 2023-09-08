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

displayRecipe();
