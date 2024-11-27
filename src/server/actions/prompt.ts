'use server';

import { getPrompt, llm, PromptInput } from '@/lib/llm';
import { ActionResponse } from '@/types/action';
import { Recipe } from '@/types/recipe';

export const generatePromptResponse = async (
  input: PromptInput): Promise<ActionResponse<Recipe[]>> => {
  const prompt = getPrompt(input);

  try {
    const result = await llm.invoke(prompt);

    const stringified = result.content.toString();

    return {
      success: true,
      data: JSON.parse(stringified).data as unknown as Recipe[],
    };
  } catch (err) {
    console.error(err);

    return {
      success: false,
      message: 'Oops, something went wrong!',
    };
  }
};
