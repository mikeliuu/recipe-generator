import { MealPlan, Serve } from '@/types/recipe';

export const CURRENT_LMM_MODEL = 'llama-3.1-70b-versatile';

export const SERVES: Record<Serve, string> = {
  [Serve.Single]: 'Meal for 1',
  [Serve.Couple]: 'Meal for 2',
  [Serve.Family]: 'Family (2-4ppl)',
  [Serve.Group]: 'Group (8ppl)',
  [Serve.Party]: 'Party (8+ ppl)',
};

export const MEAL_PLAN: Record<MealPlan, string> = {
  [MealPlan.Day]: '1 day',
  [MealPlan.Week]: '1 week',
};
