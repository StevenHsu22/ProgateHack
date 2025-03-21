import { NextResponse } from 'next/server';
import { getRecipeById } from '@/lib/db/operations/recipes';

export async function GET({ params }: { params: { recipeId: string } }) {
  try {
    const recipe = await getRecipeById(params.recipeId);

    if (!recipe) {
      return NextResponse.json({ error: 'Recipe not found' }, { status: 404 });
    }

    return NextResponse.json(recipe);
  } catch (error) {
    console.error('Failed to fetch recipe:', error);
    return NextResponse.json(
      { error: 'Failed to fetch recipe' },
      { status: 500 }
    );
  }
}
