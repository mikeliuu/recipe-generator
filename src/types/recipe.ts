export interface Ingredient {
  name: string;
  measurement: string;
}

export interface NutritionItem {
  value: number;
  isHighIntake: boolean;
}

export interface Nutrition {
  kcal: NutritionItem;
  fat: NutritionItem;
  saturates: NutritionItem;
  carbs: NutritionItem;
  sugars: NutritionItem;
  protein: NutritionItem;
  salt: NutritionItem;
}

export interface Recipe {
  title: string;
  serve: string;
  prepTime: number;
  cookTime: number;
  ingredients: Ingredient[];
  steps: string[];
  nutrition: Nutrition;
}
