const generateIngredientsList = (recipe) => {
  let ingredientsList = "";
  for (let i = 1; i <= 15; i++) {
    const ingredient = recipe[`strIngredient${i}`];
    if (ingredient) {
      ingredientsList += `<li>${ingredient}</li>`;
    }
  }
  return ingredientsList;
};
// Function to fetch a random drink from the API
let drinks = [];

const fetchRandomDrink = () => {
  fetch("https://www.thecocktaildb.com/api/json/v1/1/random.php", {
    method: "GET",
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      // Filter out non-alcoholic drinks
      const alcoholicDrinks = data.drinks.filter(
        (drink) =>
          drink.strAlcoholic === "Alcoholic" ||
          drink.strAlcoholic === "Optional alcohol"
      );

      if (alcoholicDrinks.length === 0) {
        // If no alcoholic drinks were found, fetch again
        fetchRandomDrink();
        return;
      }

      // Store the alcoholic drinks in the 'drinks' array
      drinks = alcoholicDrinks;
      // Display the fetched drink
      displayDrink();
    })
    .catch((error) => {
      console.error("Error fetching random drink:", error);
    });
};
// Function to display the current drink details
const displayDrink = () => {
  const drinkName = document.getElementById("drinkName");
  const drinkDescription = document.getElementById("drinkDescription");
  const drinkImage = document.getElementById("drinkImage");
  const drinkCategory = document.getElementById("drinkCategory");
  const drinkGlass = document.getElementById("drinkGlass");
  const drinkIngredients = document.getElementById("drinkIngredients");

  const drink = drinks[0];

  // Populate the elements with drink information
  drinkName.innerText = drink.strDrink;
  drinkDescription.innerText = drink.strInstructions;
  drinkImage.src = drink.strDrinkThumb;
  drinkCategory.innerText = drink.strCategory;
  drinkGlass.innerText = drink.strGlass;

  // Generate and display the ingredients list
  const ingredientsList = generateIngredientsList(drink);
  drinkIngredients.innerHTML = ingredientsList;
};

// Function to add a liked drink to local storage
const likeDrink = () => {
  const likedDrinks = JSON.parse(localStorage.getItem("likedDrinks")) || [];
  const newDrink = drinks[0];

  // Check if the drink is already in the liked drinks list
  if (
    !likedDrinks.some((likedDrink) => likedDrink.idDrink === newDrink.idDrink)
  ) {
    likedDrinks.push(newDrink);
    localStorage.setItem("likedDrinks", JSON.stringify(likedDrinks));
  }
  fetchRandomDrink();
};

// Function to fetch another random drink after disliking
const dislikeDrink = () => {
  fetchRandomDrink();
};

// Function to clear all liked drinks from local storage
const clearAllLikedDrinks = () => {
  localStorage.removeItem("likedDrinks");
  displayLikedDrinks();
};

// Function to delete a liked drink from local storage
const deleteLikedDrink = (index) => {
  const likedDrinks = JSON.parse(localStorage.getItem("likedDrinks")) || [];

  // Check if the index is valid
  if (index >= 0 && index < likedDrinks.length) {
    // Remove the selected liked drink
    likedDrinks.splice(index, 1);
    localStorage.setItem("likedDrinks", JSON.stringify(likedDrinks));

    // After deleting, re-display the liked drinks
    displayLikedDrinks();
  }
};

module.exports = {
  fetchRandomDrink,
  displayDrink,
  likeDrink,
  dislikeDrink,
  clearAllLikedDrinks,
  deleteLikedDrink,
  generateIngredientsList,
};
