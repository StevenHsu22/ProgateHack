import { NextResponse } from 'next/server';
import { getRecipes, saveRecipe, updateRecipe } from './services/db';
import { RecipeSuggestionRequest } from '@/types/recipes';
import { generateRecipeSuggestions } from './services/llm';

// GET /api/recipes - レシピ一覧の取得
export async function GET() {
  try {
    const recipes = await getRecipes();
    return NextResponse.json(recipes);
  } catch (error) {
    console.error('Failed to fetch recipes:', error);
    return NextResponse.json(
      { error: 'Failed to fetch recipes' },
      { status: 500 }
    );
  }
}

// POST /api/recipes - 新規レシピの作成
export async function POST(request: Request) {
  try {
    const body = (await request.json()) as RecipeSuggestionRequest;

    // 初期値でレシピを保存
    const initialRecipe = {
      id: crypto.randomUUID(),
      name: body.recipesName,
      status: '作成中',
      description: `${body.peopleCount}人分の${body.mealPreference}レシピを生成中...`,
      content: '',
      createdAt: new Date(),
    };

    const savedRecipe = await saveRecipe(initialRecipe);

    // バックグラウンドでレシピを生成
    generateRecipeSuggestions(body)
      .then(async (recipe) => {
        if (recipe) {
          await updateRecipe({
            ...savedRecipe,
            status: '完了',
            description: recipe.description,
            content: recipe.content,
          });
        } else {
          await updateRecipe({
            ...savedRecipe,
            status: '失敗',
            description: 'レシピの生成に失敗しました。',
          });
        }
      })
      .catch(async (error) => {
        console.error('Failed to generate recipe:', error);
        await updateRecipe({
          ...savedRecipe,
          status: '失敗',
          description: 'レシピの生成中にエラーが発生しました。',
        });
      });

    return NextResponse.json({ id: savedRecipe.id });
  } catch (error) {
    console.error('Failed to process recipe creation:', error);
    return NextResponse.json(
      { error: 'Failed to process recipe creation' },
      { status: 500 }
    );
  }
}
