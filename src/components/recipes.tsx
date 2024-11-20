'use client';

import { Icon } from '@/components/icon';
import { Skeleton } from '@/components/ui/skeleton';
import { usePromptContext } from '@/providers/prompt-provider';

export function Recipes() {
  const { state } = usePromptContext();

  console.log({ state });

  if (state.loading) {
    return (
      <div className="flex flex-col justify-center items-center space-y-8 mx-auto max-w-screen-sm">
        <Skeleton className="w-[50%] h-8 rounded-lg" />

        <div className="flex flex-row justify-center items-center gap-4 w-full max-w-[200px] rounded-lg">
          {new Array(3).fill(null).map((_, index) => (
            <Skeleton key={index} className="w-full h-6 rounded-lg" />
          ))}
        </div>

        <div className="flex flex-col space-y-4 w-full">
          <Skeleton className="w-[20%] h-8 rounded-lg" />

          <div className="flex flex-col space-y-4 w-full">
            {new Array(3).fill(null).map((_, index) => (
              <Skeleton
                key={index}
                className="w-full max-w-[300px] h-6 rounded-lg"
              />
            ))}
          </div>
        </div>

        <div className="flex flex-col space-y-4 w-full">
          <Skeleton className="w-[20%] h-8 rounded-lg" />

          <div className="flex flex-col space-y-4 w-full">
            {new Array(3).fill(null).map((_, index) => (
              <Skeleton
                key={index}
                className="w-full max-w-[300px] h-6 rounded-lg"
              />
            ))}
          </div>
        </div>
      </div>
    );
  } else if (!state.result) {
    return;
  }

  const { title, prepTime, cookTime, ingredients } = state.result;

  const totalTime = prepTime + cookTime;

  return (
    <div className="flex flex-col justify-center items-center space-y-8 mx-auto max-w-screen-sm">
      <h1 className="text-lg font-semibold">{title}</h1>

      <div className="flex flex-row justify-center items-center gap-12 w-full max-w-[350px] rounded-lg">
        <Icon name="Clock" className="w-8 h-8" />

        <div className="flex flex-col justify-center items-center">
          <p className="text-sm font-semibold mb-2">Prep</p>

          <p className="flex flex-row text-gray-600">{prepTime} min</p>
        </div>

        <div className="flex flex-col justify-center items-center">
          <p className="text-sm font-semibold mb-2">Cook</p>

          <p className="flex flex-row text-gray-600">{cookTime} min</p>
        </div>

        <div className="flex flex-col justify-center items-center">
          <p className="text-sm font-semibold mb-2">Ready in</p>

          <p className="flex flex-row text-gray-600">{totalTime} min</p>
        </div>
      </div>

      <div className="flex flex-col gap-4 w-full">
        <p className="text-md font-semibold">Ingredients</p>

        {ingredients.map(item => (
          <div key={item.name}>
            {item.name} - {item.measurement}
          </div>
        ))}
      </div>

      <div className="flex flex-col gap-4 w-full">
        <p className="text-md font-semibold">Steps</p>

        <ol className="">
          {ingredients.map(item => (
            <li key={item.name}>
              {item.name} - {item.measurement}
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}
