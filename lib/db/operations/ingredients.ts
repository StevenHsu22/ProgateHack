import { pool } from '../index';
import { Ingredient } from '@/types/ingredients';

export async function getIngredients(userId: string): Promise<Ingredient[]> {
  const query = `
    SELECT * FROM user_ingredients 
    WHERE user_id = $1 
    ORDER BY created_at DESC
  `;
  const result = await pool.query(query, [userId]);
  return result.rows;
}

export async function saveIngredient(
  ingredient: Ingredient
): Promise<Ingredient> {
  const query = `
    INSERT INTO user_ingredients 
    (user_id, name, quantity, unit, expiration_date, category, notes, status, used_at) 
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) 
    RETURNING *
  `;
  const values = [
    ingredient.userId,
    ingredient.name,
    ingredient.quantity,
    ingredient.unit,
    ingredient.expirationDate,
    ingredient.category,
    ingredient.notes,
    ingredient.status || 'active',
    ingredient.usedAt,
  ];
  const result = await pool.query(query, values);
  return result.rows[0];
}

export async function updateIngredient(
  ingredient: Ingredient
): Promise<Ingredient> {
  const query = `
    UPDATE user_ingredients 
    SET name = $1, quantity = $2, unit = $3, expiration_date = $4, 
        category = $5, notes = $6, status = $7, used_at = $8, updated_at = CURRENT_TIMESTAMP
    WHERE id = $9 AND user_id = $10
    RETURNING *
  `;
  const values = [
    ingredient.name,
    ingredient.quantity,
    ingredient.unit,
    ingredient.expirationDate,
    ingredient.category,
    ingredient.notes,
    ingredient.status || 'active',
    ingredient.usedAt,
    ingredient.id,
    ingredient.userId,
  ];
  const result = await pool.query(query, values);
  return result.rows[0];
}

export async function deleteIngredient(
  id: string,
  userId: string
): Promise<void> {
  const query = `
    DELETE FROM user_ingredients 
    WHERE id = $1 AND user_id = $2
  `;
  await pool.query(query, [id, userId]);
}
