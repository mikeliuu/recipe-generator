import { getEnv } from '@/lib/env';
import { BaseLanguageModelInput } from '@langchain/core/language_models/base';
import { ChatGroq } from '@langchain/groq';

export const llm = new ChatGroq({
  apiKey: getEnv().GROQ_API_KEY,
  model: 'gemma2-9b-it',
  temperature: 0.7,
  maxTokens: undefined,
  maxRetries: 2,
}).bind({
  response_format: {
    type: 'json_object',
  },
});

export const getPrompt = (ingredients: string[]): BaseLanguageModelInput => [
  {
    role: 'system',
    content:
      "As a culinary AI assistant, your task is to generate a recipe based on a list of ingredients provided. The recipe should include a title, prep and cook time (time is in minutes), a list of ingredients with their measurements (defaulting to 'moderate' if not specified), and step-by-step instructions in JSON format. Please adhere to the following JSON format sample to ensure the recipe is clear, concise and easy to follow but filter out inappropriate words from the user's input." +
      `JSON format:\n {
        "title": string;
        prepTime: number;
        cookTime: number;
        "ingredients": [
          {
            "name": string;
            "measurement": string | "moderate";
          }
        ];
        "steps": string[];
      }`,
  },
  { role: 'user', content: ingredients.toString() },
];
