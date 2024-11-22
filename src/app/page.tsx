import { IngredientFrom } from '@/components/ingredient-form';
import { Recipes } from '@/components/recipes';
import { PromptContextProvider } from '@/providers/prompt-provider';

export default function Home() {
  return (
    <main className="w-full max-w-screen-xl mx-auto px-8 sm:px-12 lg:px-16 py-12">
      <PromptContextProvider>
        <IngredientFrom />

        <div className="mt-12">
          <Recipes />
        </div>
      </PromptContextProvider>
    </main>
  );
}
