'use client';

import { Icon } from '@/components/icon';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';
import { NutritionItem, Recipe } from '@/types/recipe';

type RecipeCardProps = React.ComponentProps<typeof Card> & {
  recipe: Recipe;
};

export function RecipeCard({ recipe, className, ...props }: RecipeCardProps) {
  const { title, serve, prepTime, cookTime, ingredients, steps, nutrition } =
    recipe;

  const hasHighIntakeNutrition = Object.entries(nutrition).some(
    ([key, item]: [string, NutritionItem]) => item.isHighIntake,
  );

  return (
    <Card className={cn('w-full', className)} {...props}>
      <CardHeader>
        <CardTitle className="text-3xl">{title}</CardTitle>

        <Separator />
      </CardHeader>

      <CardContent className="grid gap-6">
        <div className="grid grid-cols-2 sm:grid-cols-3 rounded-lg w-full max-w-[350px] mx-auto gap-4 sm:gap-12">
          <div className="flex flex-col justify-center items-center">
            <p className="flex flex-row justify-center items-center gap-2 text-md text-teal-900 mb-2">
              <Icon name="HandPlatter" /> Serve
            </p>

            <p className="flex flex-row flex-wrap text-md">{serve}</p>
          </div>

          <div className="flex flex-col justify-center items-center">
            <p className="flex flex-row justify-center items-center gap-2 text-md text-teal-900 mb-2">
              <Icon name="Hourglass" className="text-teal-900" /> Prep
            </p>

            <p className="text-md">{prepTime} min</p>
          </div>

          <div className="flex flex-col justify-center items-center">
            <p className="flex flex-row justify-center items-center gap-2 text-md text-teal-900 mb-2">
              <Icon name="Clock9" className="text-teal-900" /> Cook
            </p>

            <p className="text-md">{cookTime} min</p>
          </div>
        </div>

        <div className="flex flex-col gap-4 w-full">
          <p className="text-lg font-semibold">Ingredients</p>

          <div className="border rounded-lg grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-4 p-4">
            {ingredients.map(item => (
              <div key={item.name} className="grid grid-cols-2 gap-2">
                <p className="capitalize">{item.name}</p>

                <p className="text-gray-600 text-right">{item.measurement}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-4 w-full">
          <p className="text-lg font-semibold">Steps</p>

          <ul className="flex flex-col space-y-6">
            {steps.map((step, index) => (
              <li
                key={index}
                className="flex flex-row justify-start items-start gap-4"
              >
                <div className="flex shrink-0 justify-center items-center w-6 h-6 rounded-full bg-teal-900 text-white font-semibold p-1">
                  {index + 1}
                </div>

                <p>{step}</p>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-col gap-4 w-full">
          <div className="flex flex-col">
            <p className="text-lg font-semibold">Nutrition</p>

            <p className="text-gray-600 text-sm">per serving in gram (g)</p>
          </div>

          <div className="grid gap-2">
            <div className="border rounded-lg grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-4 p-4">
              {Object.entries(nutrition).map(
                ([key, { value, isHighIntake }]) => (
                  <div key={key} className="grid grid-cols-2 gap-2">
                    <p className="capitalize">{key}</p>

                    <div className="flex flex-row justify-end items-center gap-1">
                      {isHighIntake && (
                        <Icon name="ChevronsUp" className="text-teal-900" />
                      )}

                      <p className="text-right gap-1">{value}g</p>
                    </div>
                  </div>
                ),
              )}
            </div>

            {hasHighIntakeNutrition && (
              <div className="flex flex-row justify-start items-start gap-1">
                <Icon name="ChevronsUp" className="text-teal-900" />
                <p className="text-gray-600 text-sm">
                  indicates the intake is more than average daily
                </p>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
