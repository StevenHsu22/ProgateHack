import { NextResponse } from 'next/server';
import { getRecipes, saveRecipe } from './services/db';
import { generateRecipeSuggestions } from './services/llm';

// GET /api/recipes - レシピ一覧の取得（食材が指定された場合は提案を生成）
export async function GET(request: Request) {
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
    const body = await request.json();
    saveRecipe(body).catch((error) => {
      console.error('Failed to save recipe in background:', error);
    });

    return NextResponse.redirect(new URL('/user/recipes', request.url));
  } catch (error) {
    console.error('Failed to process recipe creation:', error);
    return NextResponse.json(
      { error: 'Failed to process recipe creation' },
      { status: 500 }
    );
  }
}
