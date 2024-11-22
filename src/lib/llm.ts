import { CURRENT_LMM_MODEL } from '@/constants/common';
import { getEnv } from '@/lib/env';
import { BaseLanguageModelInput } from '@langchain/core/language_models/base';
import { ChatGroq } from '@langchain/groq';

export const llm = new ChatGroq({
  apiKey: getEnv().GROQ_API_KEY,
  model: CURRENT_LMM_MODEL,
  temperature: 0.5,
  maxTokens: 2048,
  maxRetries: 4,
}).bind({
  response_format: {
    type: 'json_object',
  },
});

export const getPrompt = (ingredients: string[]): BaseLanguageModelInput => [
  {
    role: 'system',
    content:
      'As an international culinary AI assistant, your task is to generate a recipe based on a list of ingredients provided (ideally includes at least 1 given ingredient in the generated ingredient list).' +
      "The recipe should include a title, serve (persons), prep time and cook time (time is in minutes), a list of ingredients with their measurements, nutrition (value per serving in gram & isHighIntake checks the intake is more than average daily per serving), and step-by-step & easy-to-follow instructions in JSON format. Please adhere to the following JSON format sample to ensure the recipe is clear, concise and easy to follow but filter out inappropriate words from the user's input." +
      `JSON format:\n {
        "title": string;
        serve: string;
        prepTime: number;
        cookTime: number;
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
        }
      }`,
  },
  { role: 'user', content: ingredients.toString() },
];
