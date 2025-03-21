import { selectedIngredientCartState } from '@/store/selectedIngredientCartState';
import { useAtom } from 'jotai';

export const useIngredientsCart = (itemsPerPage: number) => {
  const [ingredients, setIngredients] = useAtom(selectedIngredientCartState);

  const removeIngredient = (
    id: string,
    currentPage: number,
    setCurrentPage: (page: number) => void
  ) => {
    const updatedIngredients = ingredients.filter(
      (ingredient) => ingredient.id !== id
    );
    setIngredients(updatedIngredients);

    const newTotalPages = Math.ceil(updatedIngredients.length / itemsPerPage);
    if (currentPage > newTotalPages && currentPage > 1) {
      setCurrentPage(newTotalPages || 1);
    }
  };

  const updateQuantity = (id: string, quantity: number) => {
    setIngredients(
      ingredients.map((ingredient) =>
        ingredient.id === id ? { ...ingredient, quantity } : ingredient
      )
    );
  };

  const clearAll = () => {
    setIngredients([]);
  };

  const filterIngredients = (category: string) => {
    if (!category) {
      return;
    }
    const filtered = ingredients.filter((item) =>
      item.category.toLowerCase().includes(category.toLowerCase())
    );
    setIngredients(filtered);
  };

  return {
    ingredients,
    setIngredients,
    removeIngredient,
    updateQuantity,
    clearAll,
    filterIngredients,
  };
};
