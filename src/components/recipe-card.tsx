'use client';

import { Icon } from '@/components/icon';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';
import { NutritionItem, Recipe } from '@/types/recipe';
import html2canvas from 'html2canvas';
import { useTheme } from 'next-themes';
import { useRef } from 'react';
import { toast } from 'sonner';

type RecipeCardProps = React.ComponentProps<typeof Card> & {
  recipe: Recipe;
};

export function RecipeCard({ recipe, className, ...props }: RecipeCardProps) {
  const recipeRef = useRef<HTMLDivElement | null>(null);

  const { theme } = useTheme();

  const { title, serve, prepTime, cookTime, ingredients, steps, nutrition } =
    recipe;

  const hasHighIntakeNutrition = Object.entries(nutrition).some(
    ([, item]: [string, NutritionItem]) => item.isHighIntake,
  );

  const downloadImage = () => {
    if (!recipeRef.current) {
      toast.error('Opps! Cannot download the image');
      return;
    }

    html2canvas(recipeRef.current, {
      backgroundColor: theme === 'dark' ? '#5252B' : null,
      ignoreElements: element => element.getAttribute('id') === 'download',
    }).then(canvas => {
      const a = document.createElement('a');
      a.href = canvas.toDataURL('image/jpg');
      a.download = `${title}.jpg`;
      a.click();
    });
  };

  return (
    <Card
      ref={recipeRef}
      className={cn(
        'w-full bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-200',
        className,
      )}
      {...props}
    >
      <CardHeader className="gap-y-2">
        <div className="flex justify-between items-center gap-2">
          <CardTitle className="text-left text-3xl">{title}</CardTitle>

          <Button
            id="download"
            variant="ghost"
            size="icon"
            onClick={downloadImage}
          >
            <Icon name="Download" />
          </Button>
        </div>

        <Separator />
      </CardHeader>

      <CardContent className="grid gap-6">
        <div className="flex flex-row rounded-lg sm:w-full sm:max-w-[350px] mx-auto space-x-4 sm:space-x-12">
          <div className="flex flex-col justify-center items-center">
            <div className="flex flex-row justify-center items-center gap-2 text-md text-teal-900 dark:text-teal-700 font-semibold mb-2">
              <Icon name="Users" /> <p className="hidden sm:block">Serve</p>
            </div>

            <p className="flex flex-row flex-wrap text-md">{serve}</p>
          </div>

          <div className="flex flex-col justify-center items-center">
            <div className="flex flex-row justify-center items-center gap-2 text-md text-teal-900 dark:text-teal-700 font-semibold mb-2">
              <Icon name="Hourglass" /> <p className="hidden sm:block">Prep</p>
            </div>

            <p className="text-md">{prepTime} min</p>
          </div>

          <div className="flex flex-col justify-center items-center">
            <div className="flex flex-row justify-center items-center gap-2 text-md text-teal-900 dark:text-teal-700 font-semibold mb-2">
              <Icon name="Clock9" />
              <p className="hidden sm:block">Cook</p>
            </div>

            <p className="text-md">{cookTime} min</p>
          </div>
        </div>

        <div className="flex flex-col gap-4 w-full">
          <p className="text-lg font-semibold">Ingredients</p>

          <div className="border dark:border-gray-600 rounded-lg grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-4 p-4">
            {ingredients.map(item => (
              <div
                key={item.name}
                className="flex justify-between items-center space-x-2"
              >
                <p className="capitalize">{item.name}</p>

                <p className="text-gray-600 dark:text-gray-400 text-right">
                  {item.measurement}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col space-y-4 w-full">
          <p className="text-lg font-semibold">Steps</p>

          <ul className="flex flex-col flex-nowrap space-y-6">
            {steps.map((step, index) => (
              <li
                key={index}
                className="flex flex-row justify-start items-start space-x-4"
              >
                <p className="w-6 h-6 rounded-[50%] text-center bg-teal-900 text-white font-semibold">
                  {index + 1}
                </p>

                <p>{step}</p>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-col gap-4 w-full">
          <div className="flex flex-col">
            <p className="text-lg font-semibold">Nutrition</p>

            <p className="text-gray-600 dark:text-gray-400 text-sm">
              per serving in gram (g)
            </p>
          </div>

          <div className="grid gap-2">
            <div className="border dark:border-gray-600 rounded-lg grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-4 p-4">
              {Object.entries(nutrition).map(
                ([key, { value, isHighIntake }]) => (
                  <div
                    key={key}
                    className="flex justify-between items-center space-x-2"
                  >
                    <p className="capitalize">{key}</p>

                    <div className="flex flex-row justify-end items-center space-x-1">
                      {isHighIntake && (
                        <Icon
                          name="ChevronsUp"
                          className="text-teal-900 dark:text-teal-700 font-semibold"
                        />
                      )}

                      <p className="text-gray-600 dark:text-gray-400 text-right">
                        {value}g
                      </p>
                    </div>
                  </div>
                ),
              )}
            </div>

            {hasHighIntakeNutrition && (
              <div className="flex flex-row justify-start items-start space-x-1">
                <Icon
                  name="ChevronsUp"
                  className="text-teal-900 dark:text-teal-700 font-semibold"
                />
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  indicates the intake is more than average daily for reference
                </p>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
