'use client';

import { RecipeCard } from '@/components/recipe-card';
import { usePromptContext } from '@/providers/prompt-provider';

export function Recipes() {
  const { state } = usePromptContext();

  console.log({ state });

  if (state.loading || !state.result) return;

  return (
    <div className="w-full max-w-screen-sm mx-auto">
      <RecipeCard recipe={state.result} />
    </div>
  );
}
