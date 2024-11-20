'use server';

import { getPrompt, llm } from '@/lib/llm';
import { ActionResponse } from '@/types/action';

export const generatePromptResponse = async (
  ingredients: string[] = [],
): Promise<ActionResponse<string>> => {
  const prompt = getPrompt(ingredients);

  try {
    const result = await llm.invoke(prompt);

    const stringified = result.content.toString();

    return {
      success: true,
      data: JSON.parse(stringified),
    };
  } catch (err) {
    console.error(err);

    return {
      success: false,
      message: 'Oops, something went wrong!',
    };
  }
};
