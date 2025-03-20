import { atom } from 'jotai';
import { Ingredient } from '@/types/ingredients';

export const selectedIngredientCartState = atom<Ingredient[]>([]);
