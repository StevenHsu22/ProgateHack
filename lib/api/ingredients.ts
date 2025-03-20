import { Ingredient } from '@/types/ingredients';

// get食材
export async function fetchIngredients() {
  const response = await fetch('/api/ingredients');
  if (!response.ok) {
    throw new Error('Failed to fetch ingredients');
  }
  return response.json();
}

// add食材
export async function addIngredient(
  ingredient: Omit<Ingredient, 'id' | 'createdAt' | 'userId'>
) {
  const response = await fetch('/api/ingredients', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(ingredient),
  });

  if (!response.ok) {
    throw new Error('Failed to add ingredient');
  }

  return response.json();
}

// update食材
export async function updateIngredientApi(ingredient: Ingredient) {
  const response = await fetch(`/api/ingredients/${ingredient.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(ingredient),
  });

  if (!response.ok) {
    throw new Error('Failed to update ingredient');
  }

  return response.json();
}

// delete食材
export async function deleteIngredientApi(id: string) {
  const response = await fetch(`/api/ingredients/${id}`, {
    method: 'DELETE',
  });

  if (!response.ok) {
    throw new Error('Failed to delete ingredient');
  }

  return response.json();
}
