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

export enum Serve {
  Single = '1',
  Couple = '2',
  Family = '4',
  Group = '8',
}

export enum MealType {
  Breakfast = 'breakfast',
  Lunch = 'lunch',
  Dinner = 'dinner',
  Dessert = 'dessert',
}

export enum CuisineType {
  American = 'american',
  Chinese = 'chinese',
  French = 'french',
  Greek = 'greek',
  Indian = 'indian',
  Japanese = 'japanese',
  Italian = 'italian',
  Mexican = 'mexican',
  Thai = 'thai',
  Korean = 'korean',
  Spanish = 'spanish',
  Vietnamese = 'vietnamese',
}

export enum MealPlan {
  Day = '1',
  Week = '7',
}
