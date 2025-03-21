import { useState } from 'react';
import { useAtom } from 'jotai';

import { Ingredient } from '@/types/ingredients';

import { selectedIngredientCartState } from '@/store/selectedIngredientCartState';
import { fetchIngredients, deleteIngredientApi } from '@/lib/api/ingredients';
import { useShowDialog } from './useShowDialog';

export const useIngredients = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [tableDataIndex, setTableDataIndex] = useState(0);
  const [tableShowData, setTableShowData] = useState<Ingredient[]>([]);
  const [allIngredients, setAllIngredients] = useState<Ingredient[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const setDialog = useShowDialog();

  const [selectedIngredients, setSelectedIngredients] = useAtom(
    selectedIngredientCartState
  );

  const numPerPage = 10;

  // get食材
  const loadIngredients = async () => {
    try {
      setLoading(true);
      const data = await fetchIngredients();
      setAllIngredients(data);
      updateTableShowData(0, data);
      setLoading(false);
    } catch (err) {
      setError('食材の読み込みに失敗しました');
      setLoading(false);
      console.error(err);
    }
  };

  // delete食材
  const deleteSelectedIngredients = async () => {
    try {
      const confirm = await setDialog({
        title: '削除確認',
        content:
          '選択した食材を削除してもよろしいですか？この操作は元に戻せません。',
      });
      if (!confirm) return;

      setLoading(true);
      await Promise.all(
        selectedIngredients.map((ingredient) =>
          deleteIngredientApi(ingredient.id!)
        )
      );
      loadIngredients();
      setSelectedIngredients([]);
    } catch (err) {
      setError('食材の削除に失敗しました');
      setLoading(false);
      console.error(err);
    }
  };

  const handleNext = () => {
    if ((tableDataIndex + 1) * numPerPage < allIngredients.length) {
      setTableDataIndex(tableDataIndex + 1);
    }
  };

  const handlePrev = () => {
    if (tableDataIndex - 1 >= 0) {
      setTableDataIndex(tableDataIndex - 1);
    }
  };

  const updateTableShowData = (index: number, data = allIngredients) => {
    setTableShowData(
      data.slice(index * numPerPage, index * numPerPage + numPerPage)
    );
  };

  const clearAll = () => {
    setSelectedIngredients([]);
  };

  // 新しい食材を追加した後にハンドルを更新する
  const handleIngredientAdded = () => {
    setIsOpen(false);
    loadIngredients();
  };

  return {
    isOpen,
    setIsOpen,
    tableDataIndex,
    setTableDataIndex,
    tableShowData,
    setTableShowData,
    allIngredients,
    setAllIngredients,
    loading,
    setLoading,
    error,
    setError,
    selectedIngredients,
    setSelectedIngredients,
    numPerPage,
    loadIngredients,
    deleteSelectedIngredients,
    handleNext,
    handlePrev,
    updateTableShowData,
    clearAll,
    handleIngredientAdded,
  };
};
