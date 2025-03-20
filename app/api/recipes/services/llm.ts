import { Recipe } from '@/types/recipes';

export async function generateRecipeSuggestions(
  ingredients: string[]
): Promise<Recipe[]> {
  // TODO: LLMとのやりとりを実装
  return [];
}

export async function getRecipeDetails(
  recipeId: string
): Promise<Recipe | null> {
  // TODO: LLMとのやりとりを実装
  return null;
}
