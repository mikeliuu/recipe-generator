'use client';

import { ClosableBadge } from '@/components/closable-badge';
import { Icon } from '@/components/icon';
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
import { Textarea } from '@/components/ui/textarea';
import { usePromptContext } from '@/providers/prompt-provider';
import { generatePromptResponse } from '@/server/actions/prompt';
import { Recipe } from '@/types/recipe';
import { zodResolver } from '@hookform/resolvers/zod';
import { useFieldArray, useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

const formSchema = z.object({
  value: z.string().optional().default(''),
  ingredients: z
    .array(
      z.object({
        name: z.string(),
      }),
    )
    .optional()
    .default([]),
  customPrompt: z.string().optional().default(''),
});

export function IngredientFrom() {
  const { setPromptLoading, setPromptResult } = usePromptContext();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      value: '',
      ingredients: [{ name: 'eggs' }],
      customPrompt: '',
    },
  });

  const { fields, remove } = useFieldArray({
    control: form.control,
    name: 'ingredients',
  });

  async function onSubmit(data: z.infer<typeof formSchema>) {
    setPromptLoading(true);

    const ingredients = data.ingredients.map(item => item.name);

    setTimeout(() => {
      console.log('delay');
    }, 2000);

    const result = await generatePromptResponse(ingredients);

    if (!result.success) {
      toast.error(result.message);

      setPromptLoading(false);

      return;
    }

    setPromptResult(result.data as unknown as Recipe);
  }

  const addToIngredientList = () => {
    const ingredients = form.getValues('ingredients');

    const updatedList = [...ingredients, { name: form.getValues('value') }];

    form.setValue('ingredients', updatedList);
    form.setValue('value', '');
  };

  const isInputValueEmpty = !form.watch('value');

  const ingredients = form.watch('ingredients');

  const isLoading = form.formState.isSubmitting || form.formState.isLoading;

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full max-w-screen-sm mx-auto space-y-8"
      >
        <div className="space-y-4">
          <FormField
            control={form.control}
            name="value"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Ingredient(s)</FormLabel>

                <FormControl>
                  <div className="flex flex-row items-center gap-4">
                    <Input
                      className="w-full"
                      placeholder="Type your ingredient"
                      disabled={isLoading}
                      {...field}
                    />

                    <Button
                      disabled={isLoading || isInputValueEmpty}
                      onClick={addToIngredientList}
                    >
                      <Icon name="Plus" className="w-6 h-6" /> Add
                    </Button>
                  </div>
                </FormControl>

                <FormDescription>
                  Enter what ingredients you have to find a recipe.
                </FormDescription>

                <FormMessage />
              </FormItem>
            )}
          />

          {!!ingredients.length && (
            <div className="flex flex-row flex-wrap justify-start items-center gap-4 gap-y-6">
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
          name="customPrompt"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Custom Prompt</FormLabel>

              <FormControl>
                <Textarea
                  className="h-full max-h-[200px]"
                  placeholder="Optional"
                  disabled={isLoading}
                  {...field}
                />
              </FormControl>

              <FormDescription>
                Enter an additional custom prompt for your recipe.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" disabled={isLoading}>
          {isLoading ? (
            'Generating'
          ) : (
            <>
              <Icon name="Sparkles" /> Generate
            </>
          )}
        </Button>
      </form>
    </Form>
  );
}
