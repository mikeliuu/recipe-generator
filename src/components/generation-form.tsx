'use client';

import { ClosableBadge } from '@/components/closable-badge';
import { GenerationLoading } from '@/components/generation-loading';
import { Icon } from '@/components/icon';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { CURRENT_LMM_MODEL, MEAL_PLAN, SERVES } from '@/constants';
import { cn } from '@/lib/utils';
import { usePromptContext } from '@/providers/prompt-provider';
import { generatePromptResponse } from '@/server/actions/prompt';
import { CuisineType, MealPlan, MealType, Serve } from '@/types/recipe';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useRef } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

const formSchema = z.object({
  ingredientInputValue: z.string().optional().default(''),
  ingredients: z
    .array(
      z.object({
        name: z.string(),
      }),
    )
    .optional()
    .default([]),
  serves: z.nativeEnum(Serve).optional(),
  mealType: z.nativeEnum(MealType).optional(),
  preferredCuisines: z.array(z.nativeEnum(CuisineType)).optional().default([]),
  mealPlan: z.nativeEnum(MealPlan).optional().default(MealPlan.Day),
});

export function GenerationFrom() {
  const loadingRef = useRef<HTMLDivElement | null>(null);

  const { setPromptLoading, setPromptResult } = usePromptContext();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      ingredientInputValue: '',
      ingredients: [],
      serves: Serve.Couple,
      mealType: MealType.Dinner,
      preferredCuisines: [],
      mealPlan: MealPlan.Day,
    },
  });

  const { fields, remove } = useFieldArray({
    control: form.control,
    name: 'ingredients',
  });

  async function onSubmit({
    ingredients,
    ...inputs
  }: z.infer<typeof formSchema>) {
    setPromptLoading(true);

    const ingredientList = ingredients.map(item => item.name);

    const result = await generatePromptResponse({
      ...inputs,
      ingredients: ingredientList,
    });

    if (!result.success) {
      toast.error(result.message);
      setPromptLoading(false);

      return;
    }

    setPromptResult(result.data);
  }

  const addToIngredientList = () => {
    const ingredients = form.getValues('ingredients');

    const updatedList = [
      ...ingredients,
      { name: form.getValues('ingredientInputValue') },
    ];

    form.setValue('ingredients', updatedList);
    form.setValue('ingredientInputValue', '');
  };

  const selectToggleItem = (key: 'preferredCuisines', value: CuisineType) => {
    const values = form.getValues(key);

    if (values?.includes(value)) {
      const filtered = values.filter(item => item !== value);

      form.setValue(key, filtered);
    } else {
      form.setValue(key, [...values, value]);
    }
  };

  const isInputValueEmpty = !form.watch('ingredientInputValue');

  const ingredients = form.watch('ingredients');

  const isLoading = form.formState.isSubmitting || form.formState.isLoading;

  // scroll to loading section
  useEffect(() => {
    if (isLoading && loadingRef.current) {
      loadingRef.current?.scrollIntoView({
        block: 'start',
        behavior: 'smooth',
      });
    }
  }, [isLoading]);

  return (
    <div className="w-full max-w-screen-sm mx-auto">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="border rounded-xl space-y-10 p-4 sm:p-8 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-200"
        >
          <div className="space-y-6">
            <div>
              <FormField
                control={form.control}
                name="ingredientInputValue"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-lg font-semibold">
                      Your ingredients
                    </FormLabel>

                    <FormControl>
                      <div className="grid grid-cols-1 sm:grid-cols-6 items-center gap-4">
                        <Input
                          className="w-full sm:col-span-4"
                          placeholder="Type your ingredients"
                          disabled={isLoading}
                          {...field}
                        />

                        <Button
                          className="w-full sm:max-w-[320px] rounded-full sm:col-span-2"
                          disabled={isLoading || isInputValueEmpty}
                          onClick={addToIngredientList}
                        >
                          <Icon name="Plus" className="w-6 h-6" /> Add
                        </Button>
                      </div>
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />

              {!!ingredients.length && (
                <div className="flex flex-row flex-wrap justify-start items-center gap-4 gap-y-2 mt-4">
                  {fields.map((field, index) => {
                    return (
                      <ClosableBadge
                        key={field.id}
                        disabled={isLoading}
                        onClose={() => remove(index)}
                      >
                        {field.name}
                      </ClosableBadge>
                    );
                  })}
                </div>
              )}
            </div>

            <FormField
              control={form.control}
              name="mealPlan"
              render={({ field }) => (
                <FormItem className="space-y-1">
                  <FormLabel className="text-lg font-semibold">
                    Meal Plan
                  </FormLabel>

                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex flex-row flex-wrap justify-start items-start gap-2"
                    >
                      {Object.values(MealPlan).map(item => {
                        const id = `mealplan_${item}`;

                        return (
                          <div key={item}>
                            <RadioGroupItem
                              className="hidden"
                              value={item}
                              id={id}
                              disabled={isLoading}
                            />

                            <label htmlFor={id}>
                              <Badge
                                active={field.value === item}
                                className={cn('cursor-pointer')}
                                disabled={isLoading}
                              >
                                {MEAL_PLAN[item]}
                              </Badge>
                            </label>
                          </div>
                        );
                      })}
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="serves"
              render={({ field }) => (
                <FormItem className="space-y-1">
                  <FormLabel className="text-lg font-semibold">
                    Number of servings
                  </FormLabel>

                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex flex-row flex-wrap justify-start items-start gap-2"
                    >
                      {Object.values(Serve).map(item => {
                        const id = `serve_${item}`;

                        return (
                          <div key={item}>
                            <RadioGroupItem
                              className="hidden"
                              value={item}
                              id={id}
                              disabled={isLoading}
                            />

                            <label htmlFor={id}>
                              <Badge
                                active={field.value === item}
                                className={cn('cursor-pointer')}
                                disabled={isLoading}
                              >
                                {SERVES[item]}
                              </Badge>
                            </label>
                          </div>
                        );
                      })}
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="mealType"
              render={({ field }) => (
                <FormItem className="space-y-1">
                  <FormLabel className="text-lg font-semibold">
                    Meal type
                  </FormLabel>

                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex flex-row flex-wrap justify-start gap-2"
                    >
                      {Object.values(MealType).map(item => {
                        return (
                          <div key={item}>
                            <RadioGroupItem
                              className="hidden"
                              value={item}
                              id={item}
                              disabled={isLoading}
                            />

                            <label htmlFor={item}>
                              <Badge
                                active={field.value === item}
                                className={cn('cursor-pointer capitalize')}
                                disabled={isLoading}
                              >
                                {item}
                              </Badge>
                            </label>
                          </div>
                        );
                      })}
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="preferredCuisines"
              render={({ field }) => (
                <FormItem className="space-y-1">
                  <div>
                    <FormLabel className="text-lg font-semibold">
                      Preferred cuisine
                    </FormLabel>

                    <FormDescription>
                      You may choose more than 1
                    </FormDescription>
                  </div>

                  <FormControl>
                    <div className="flex flex-row flex-wrap justify-start items-start gap-2">
                      {Object.values(CuisineType)
                        .sort()
                        .map(cuisine => {
                          const isSelected = field.value.includes(cuisine);

                          return (
                            <Badge
                              key={cuisine}
                              active={isSelected}
                              className={cn('cursor-pointer capitalize')}
                              onClick={() => {
                                selectToggleItem(field.name, cuisine);
                              }}
                              disabled={isLoading}
                            >
                              {cuisine}
                            </Badge>
                          );
                        })}
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="w-full grid grid-cols-1 gap-2">
            <div className="w-full flex justify-center items-start">
              <Button
                className="w-full max-w-[350px] rounded-full text-white bg-teal-900 dark:bg-teal-900 hover:bg-teal-800 dark:hover:bg-teal-800 py-6"
                type="submit"
                disabled={isLoading}
              >
                <Icon name="Sparkles" />
                Generate
              </Button>
            </div>

            <p className="text-sm text-center text-gray-400">
              Model: {CURRENT_LMM_MODEL}
            </p>
          </div>
        </form>
      </Form>

      <div ref={loadingRef}>
        {isLoading && <GenerationLoading className="my-8" />}
      </div>
    </div>
  );
}
