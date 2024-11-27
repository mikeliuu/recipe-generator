import { GenerationFrom } from '@/components/generation-form';
import { Icon } from '@/components/icon';
import { Recipes } from '@/components/recipes';
import { PromptContextProvider } from '@/providers/prompt-provider';

export default function Home() {
  return (
    <main className="w-full max-w-screen-xl mx-auto px-4 sm:px-12 lg:px-16 py-12">
      <PromptContextProvider>
        <div className="w-full max-w-screen-sm mx-auto text-center mb-8">
          <Icon name="ChefHat" className="mx-auto h-12 w-12 text-primary" />
          <h1 className="mt-2 text-3xl font-extrabold text-zinc-900 dark:text-zinc-200">
            AI Recipe Generator
          </h1>
          <p className="mt-2 text-base text-gray-600">
            Discover easy recipes that turn your leftovers into delicious meals,
            promoting a zero-waste lifestyle
          </p>
        </div>

        <GenerationFrom />

        <div className="mt-12">
          <Recipes />
        </div>
      </PromptContextProvider>
    </main>
  );
}
