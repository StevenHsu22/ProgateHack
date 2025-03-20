import { Recipe } from '@/types/recipes';

// 仮データ
const mockRecipes: Recipe[] = [
  {
    id: '1',
    name: '和食レシピ',
    status: '完了',
    description: '2人分の和食レシピ',
    content:
      '# 和食レシピ\n\n## 材料\n- 米 2合\n- 味噌 大さじ2\n\n## 手順\n1. 米を研ぐ\n2. 炊く\n3. 味噌汁を作る',
    createdAt: new Date(),
  },
  {
    id: '2',
    name: '中華レシピ',
    status: '作成中',
    description: '4人分の中華レシピを生成中...',
    content: '',
    createdAt: new Date(),
  },
  {
    id: '3',
    name: 'イタリアン',
    status: '失敗',
    description: 'レシピの生成に失敗しました。',
    content: '',
    createdAt: new Date(),
  },
];

export async function getRecipes(): Promise<Recipe[]> {
  // TODO: データベースからレシピを取得する
  return mockRecipes;
}

export async function getRecipeById(id: string): Promise<Recipe | null> {
  // TODO: データベースからレシピを取得する
  return mockRecipes.find((recipe) => recipe.id === id) || null;
}

export async function saveRecipe(recipe: Recipe): Promise<Recipe> {
  // TODO: データベースにレシピを保存する
  mockRecipes.push(recipe);
  return recipe;
}

export async function updateRecipe(recipe: Recipe): Promise<Recipe> {
  // TODO: データベースにレシピを更新する
  const index = mockRecipes.findIndex((r) => r.id === recipe.id);
  if (index !== -1) {
    mockRecipes[index] = recipe;
  }
  return recipe;
}
