'use client';
import { RecipeCard } from '@/components/recipe-card';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { usePromptContext } from '@/providers/prompt-provider';

export function Recipes() {
  const { state } = usePromptContext();

  if (state.loading || state.result === null) return;

  if (!state.result?.length) {
    return (
      <div className="w-full max-w-screen-sm mx-auto">
        <p className="text-center text-2xl">No recipes found</p>
      </div>
    );
  }

  const isDayReceipe = state.result?.length === 1;

  return (
    <div className="w-full max-w-screen-sm mx-auto">
      {isDayReceipe ? (
        <RecipeCard recipe={state.result[0]} />
      ) : (
        <Accordion className="space-y-4" type="single" collapsible>
          {state.result.map((recipe, index) => {
            return (
              <AccordionItem
                key={recipe.title}
                className="bg-white dark:bg-zinc-600 border-0 rounded-lg p-2 px-4"
                value={`recipe-${recipe.title}`}
              >
                <AccordionTrigger className="text-zinc-900 dark:text-zinc-200 no-underline hover:no-underline font-semibold">
                  {`Day ${index + 1} - ${recipe.title}`}
                </AccordionTrigger>

                <AccordionContent>
                  <RecipeCard recipe={recipe} />
                </AccordionContent>
              </AccordionItem>
            );
          })}
        </Accordion>
      )}
    </div>
  );
}
