export interface Ingredient {
  name: string;
  measurement: string;
}

export interface Recipe {
  title: string;
  prepTime: number;
  cookTime: number;
  ingredients: Ingredient[];
  steps: string[];
}
