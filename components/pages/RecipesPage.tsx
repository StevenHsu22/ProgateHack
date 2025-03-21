'use client';
import React, { useState, useEffect } from 'react';
import { RecipesTable } from '../molecule/recipes/recipesTable';
import { Recipe } from '@/types/recipes';
import { fetchRecipes, deleteRecipe } from '@/lib/api/recipes';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';

const RecipesPage = () => {
  const [allRecipes, setAllRecipes] = useState<Recipe[]>([]);
  const [displayedRecipes, setDisplayedRecipes] = useState<Recipe[]>([]);
  const [totalItems, setTotalItems] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const itemsPerPage = 10;
  
  // 削除確認ダイアログ用の状態
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [recipeToDelete, setRecipeToDelete] = useState<string | null>(null);

  // 初回レンダリング時にレシピを取得
  useEffect(() => {
    const loadRecipes = async () => {
      try {
        setLoading(true);
        const recipes = await fetchRecipes();
        setAllRecipes(recipes);
        setTotalItems(recipes.length);
      } catch (err) {
        console.error('レシピの取得に失敗しました:', err);
        setError('レシピの取得に失敗しました。後でもう一度お試しください。');
      } finally {
        setLoading(false);
      }
    };
    
    loadRecipes();
  }, []);

  useEffect(() => {
    // 表示するレシピを更新
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = Math.min(startIndex + itemsPerPage, allRecipes.length);
    setDisplayedRecipes(allRecipes.slice(startIndex, endIndex));
  }, [allRecipes, currentPage, itemsPerPage]);

  const handleFilterApply = async (filterParams: any) => {
    try {
      setLoading(true);
      
      const recipes = await fetchRecipes();
      
      // フィルタリングロジック
      if (filterParams.status) {
        const filtered = recipes.filter((item: Recipe) =>
          item.status.toLowerCase().includes(filterParams.status.toLowerCase())
        );
        setAllRecipes(filtered);
      } else {
        setAllRecipes(recipes);
      }
      
      // 新しいフィルターを適用する際に最初のページにリセット
      setCurrentPage(1);
    } catch (err) {
      console.error('フィルタリングに失敗しました:', err);
      setError('フィルタリングに失敗しました。後でもう一度お試しください。');
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = (page: number) => {
    if (page < 1 || page > Math.ceil(totalItems / itemsPerPage)) return;
    setCurrentPage(page);
  };

  // 削除確認ダイアログを表示する関数
  const confirmDeleteRecipe = (id: string) => {
    setRecipeToDelete(id);
    setIsDeleteDialogOpen(true);
  };

  // 削除の実行
  const executeDeleteRecipe = async () => {
    if (!recipeToDelete) return;
    
    try {
      await deleteRecipe(recipeToDelete);
      const updatedRecipes = allRecipes.filter((recipe) => recipe.id !== recipeToDelete);
      setAllRecipes(updatedRecipes);

      // ページの最後のアイテムを削除する場合、前のページに移動（ページ1の場合を除く）
      const newTotalItems = updatedRecipes.length;
      const newTotalPages = Math.ceil(newTotalItems / itemsPerPage);

      if (currentPage > newTotalPages && currentPage > 1) {
        setCurrentPage(newTotalPages || 1);
      }
    } catch (err) {
      console.error('レシピの削除に失敗しました:', err);
      setError('レシピの削除に失敗しました。後でもう一度お試しください。');
    } finally {
      setIsDeleteDialogOpen(false);
      setRecipeToDelete(null);
    }
  };

  // 削除のキャンセル
  const cancelDeleteRecipe = () => {
    setIsDeleteDialogOpen(false);
    setRecipeToDelete(null);
  };

  // 総ページ数を計算
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  return (
    <div className='container mx-auto p-4'>
      <div className='w-full mb-6'>
        <div className='flex justify-between items-center mb-4'>
          <h2 className='text-xl font-bold'>レシピ提案一覧</h2>
        </div>

        {error && (
          <div className='bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4'>
            {error}
          </div>
        )}

        {loading ? (
          <div className='flex justify-center items-center h-64'>
            <div className='animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500'></div>
          </div>
        ) : (
          <div className=''>
            <RecipesTable
              recipes={displayedRecipes}
              onRemove={confirmDeleteRecipe}
            />

            <div className='p-4 border-t flex justify-between items-center text-sm text-gray-500'>
              <span>
                {totalItems > 0
                  ? `${totalItems} 件中 ${
                      (currentPage - 1) * itemsPerPage + 1
                    }-${Math.min(
                      currentPage * itemsPerPage,
                      totalItems
                    )} 件を表示`
                  : '表示するレシピがありません'}
              </span>
              <div className='flex space-x-2'>
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className='p-2 border rounded-md disabled:opacity-50'
                >
                  &lt;
                </button>
                <span className='p-2'>
                  ページ {currentPage} / {totalPages || 1}
                </span>
                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage >= totalPages || totalPages === 0}
                  className='p-2 border rounded-md disabled:opacity-50'
                >
                  &gt;
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* 削除確認ダイアログ */}
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>レシピの削除</AlertDialogTitle>
            <AlertDialogDescription>
              このレシピを削除してもよろしいですか？この操作は元に戻せません。
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={cancelDeleteRecipe}>キャンセル</AlertDialogCancel>
            <AlertDialogAction 
              onClick={executeDeleteRecipe}
              className="bg-red-500 hover:bg-red-600"
            >
              削除
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default RecipesPage;