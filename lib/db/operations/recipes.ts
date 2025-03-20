import { pool } from '../index';
import { Recipe } from '@/types/recipes';

export async function getRecipes(userId: string): Promise<Recipe[]> {
  const query = `
    SELECT id, name, description, content, status, created_at as "createdAt"
    FROM recipes
    WHERE user_id = $1
    ORDER BY created_at DESC
  `;
  const result = await pool.query(query, [userId]);
  return result.rows;
}

export async function saveRecipe(
  recipe: Omit<Recipe, 'id' | 'createdAt'> & { user_id: string }
): Promise<Recipe> {
  const query = `
    INSERT INTO recipes 
    (user_id, name, description, content, status) 
    VALUES ($1, $2, $3, $4, $5) 
    RETURNING id, name, description, content, status, created_at as "createdAt"
  `;
  const values = [
    recipe.user_id,
    recipe.name,
    recipe.description,
    recipe.content,
    recipe.status,
  ];
  const result = await pool.query(query, values);
  return result.rows[0];
}

export async function updateRecipe(
  recipe: Recipe & { user_id: string }
): Promise<Recipe> {
  const query = `
    UPDATE recipes 
    SET name = $1, description = $2, content = $3, 
        status = $4, updated_at = CURRENT_TIMESTAMP
    WHERE id = $5 AND user_id = $6
    RETURNING id, name, description, content, status, created_at as "createdAt"
  `;
  const values = [
    recipe.name,
    recipe.description,
    recipe.content,
    recipe.status,
    recipe.id,
    recipe.user_id,
  ];
  const result = await pool.query(query, values);
  return result.rows[0];
}

export async function deleteRecipe(id: string, userId: string): Promise<void> {
  const query = `
    DELETE FROM recipes 
    WHERE id = $1 AND user_id = $2
  `;
  await pool.query(query, [id, userId]);
}
