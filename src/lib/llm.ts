import { CURRENT_LMM_MODEL } from '@/constants';
import { getEnv } from '@/lib/env';
import { CuisineType, MealPlan, MealType, Serve } from '@/types/recipe';
import { BaseLanguageModelInput } from '@langchain/core/language_models/base';
import { ChatGroq } from '@langchain/groq';

export interface PromptInput {
  mealPlan?: MealPlan;
  serves?: Serve;
  mealType?: MealType;
  preferredCuisines: CuisineType[];
  ingredients: string[];
}

export const llm = new ChatGroq({
  apiKey: getEnv().GROQ_API_KEY,
  model: CURRENT_LMM_MODEL,
  temperature: 0.5,
  maxRetries: 4,
}).bind({
  response_format: {
    type: 'json_object',
  },
});

export const getPrompt = ({
  mealPlan,
  serves,
  mealType,
  preferredCuisines = [],
  ingredients = [],
}: PromptInput): BaseLanguageModelInput => [
  {
    role: 'system',
    content:
      `As an international culinary AI assistant, your task is to generate recipes for ${mealPlan} days (which means ${mealPlan} recipes), ideally including at least 1 given ingredient (if the given ingredient exists) in 1 of the generated recipes. Those generated recipes must be based on the given serves (${serves}) persons and type of meal (${mealType}) from user's input. Additionally, the recipes should cater to the user's preferred cuisines (${preferredCuisines?.toString()}) and include the specified ingredients (${ingredients?.toString()}) if provided.` +
      "Please filter out inappropriate words from the user's input." +
      'The recipe should include a title, serve (persons), prep time and cook time (time is in minutes), a list of ingredients with their measurements, nutrition (value per serving in gram & isHighIntake checks the intake is more than average daily per serving), and step-by-step & easy-to-follow instructions. Please make output in JSON format in the format below. (recipe list in data)' +
      `{
        "data": {
            "title": string;
            "serve": string;
            "prepTime": number;
            "cookTime": number;
            "ingredients": {
              "name": string;
              "measurement": string;
            }[];
            "steps": string[];
            "nutrition": {
              "kcal": {
                "value": number;
                "isHighIntake": boolean;
              };
              "fat": {
                "value": number;
                "isHighIntake": boolean;
              };
              "saturates": {
                "value": number;
                "isHighIntake": boolean;
              };
              "carbs": {
                "value": number;
                "isHighIntake": boolean;
              };
              "sugars": {
                "value": number;
                "isHighIntake": boolean;
              };
              "protein": {
                "value": number;
                "isHighIntake": boolean;
              };
              "salt": {
                "value": number;
                "isHighIntake": boolean;
              };
            };
          }[];
      }`,
  },
  {
    role: 'user',
    content: JSON.stringify({
      mealPlan,
      serves,
      mealType,
      preferredCuisines,
      ingredients,
    }),
  },
];
