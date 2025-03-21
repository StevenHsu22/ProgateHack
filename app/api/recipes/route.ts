import { NextResponse } from 'next/server';
import {
  getRecipes,
  saveRecipe,
  updateRecipe,
} from '@/lib/db/operations/recipes';
import { RecipeSuggestionRequest, Recipe } from '@/types/recipes';
import { generateRecipeSuggestions } from '@/lib/api/llm';

// GET /api/recipes - レシピ一覧の取得
export async function GET() {
  try {
    const recipes = await getRecipes('dummy-user-id');
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
      ...body,
      status: '作成中',
      description: `${body.peopleCount}人分の${body.mealPreference}レシピを生成中...`,
      content: '',
      userId: body.userId,
    } as Recipe;

    // const savedRecipe = await saveRecipe(initialRecipe);

    // バックグラウンドでレシピを生成
    // generateRecipeSuggestions(body)
    //   .then(async (recipe) => {
    //     if (recipe) {
    //       await updateRecipe({
    //         ...savedRecipe,
    //         status: '完了',
    //         description: recipe.description,
    //         content: recipe.content,
    //         user_id: body.userId,
    //         userId: body.userId,
    //       });
    //     } else {
    //       await updateRecipe({
    //         ...savedRecipe,
    //         status: '失敗',
    //         description: 'レシピの生成に失敗しました。',
    //         content: '',
    //         user_id: body.userId,
    //         userId: body.userId,
    //       });
    //     }
    //   })
    //   .catch(async (error) => {
    //     console.error('Failed to generate recipe:', error);
    //     await updateRecipe({
    //       ...savedRecipe,
    //       status: '失敗' as const,
    //       description: 'レシピの生成中にエラーが発生しました。',
    //       user_id: body.userId,
    //       userId: body.userId,
    //     });
    //   });

    // return NextResponse.json({ id: savedRecipe.id });
    return NextResponse.json({ id: 'dummy-id' });
  } catch (error) {
    console.error('Failed to process recipe creation:', error);
    return NextResponse.json(
      { error: 'Failed to process recipe creation' },
      { status: 500 }
    );
  }
}
