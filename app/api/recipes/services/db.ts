import { Recipe } from '@/types/recipes';

export async function getRecipes(): Promise<Recipe[]> {
  // TODO: DBからレシピ一覧を取得
  return [];
}

export async function getRecipeById(id: string): Promise<Recipe | null> {
  // TODO: DBから特定のレシピを取得
  return null;
}

export async function saveRecipe(recipe: Recipe): Promise<Recipe> {
  // TODO: レシピをDBに保存
  return recipe;
}
