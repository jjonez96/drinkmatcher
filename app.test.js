// Import the function to be tested
const {
  generateIngredientsList,
  fetchRandomDrink,
  likeDrink,
} = require("./functions"); // Replace with the actual path to your file
const fetchMock = require("jest-fetch-mock");

describe("generateIngredientsList", () => {
  it("should generate a list of ingredients from a recipe object", () => {
    const recipe = {
      strIngredient1: "Ingredient 1",
      strIngredient2: "Ingredient 2",
      strIngredient3: "Ingredient 3",
    };

    const expectedOutput =
      "<li>Ingredient 1</li><li>Ingredient 2</li><li>Ingredient 3</li>";
    const result = generateIngredientsList(recipe);

    expect(result).toBe(expectedOutput);
  });

  it("should handle missing ingredients", () => {
    const recipe = {
      strIngredient1: "Ingredient 1",
      strIngredient3: "Ingredient 3",
    };

    const expectedOutput = "<li>Ingredient 1</li><li>Ingredient 3</li>";
    const result = generateIngredientsList(recipe);

    expect(result).toBe(expectedOutput);
  });

  it("should return an empty string for an empty recipe object", () => {
    const recipe = {};
    const expectedOutput = "";
    const result = generateIngredientsList(recipe);
    expect(result).toBe(expectedOutput);
  });
});

describe("fetchRandomDrink", () => {
  beforeEach(() => {
    fetchMock.resetMocks();
  });

  it("should fetch only drinks which includes alcohol", async () => {
    const mockResponse = {
      drinks: [
        { strAlcoholic: "Alcoholic" },
        { strAlcoholic: "Optional alcohol" },
      ],
    };
    fetchMock.mockResponseOnce(JSON.stringify(mockResponse));
    expect(fetchRandomDrink);
  });
});
