'use client';
import React, { useState, useEffect } from 'react';
import { RecipesTable } from '../molecule/recipes/recipesTable';
import { Recipe } from '@/types/recipes';
import { Button } from '@/components/ui/button';
import { Trash2 } from 'lucide-react';
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

const dummyData = [] as Recipe[];

// レシピの状態: 作成中、完了、失敗
const statuses = ['作成中', '完了', '失敗'];

// ダミーのレシピ内容（Markdown形式）
const getDummyContent = (index: number) => {
  if (index % 3 === 1) { // 完了のステータスにだけコンテンツを提供
    const recipeNumber = Math.floor(index / 3) + 1;
    
    if (index < 10) {
      return `
# 春野菜の${recipeNumber}品レシピ

## 材料（2人分）
- 新玉ねぎ: 1個
- アスパラガス: 1束
- 新じゃがいも: 4個
- ミニトマト: 10個
- オリーブオイル: 大さじ2
- 塩・こしょう: 適量

## 調理手順
1. 新玉ねぎは薄切りにし、水にさらしておく
2. アスパラガスは根元の固い部分を切り落とし、3cm長さに切る
3. 新じゃがいもは皮をむき、一口大に切る
4. フライパンにオリーブオイルを熱し、じゃがいもを炒める
5. じゃがいもに火が通ったら、アスパラガスを加えて炒める
6. 塩・こしょうで味を調える
7. 器に盛り、水気を切った新玉ねぎとミニトマトを添える

## ポイント
* 新玉ねぎは水にさらすことで辛みが抜け、甘みが増します
* じゃがいもは先に炒めることで、中はホクホク、外はカリッとした食感になります
* アスパラガスは炒めすぎないようにしましょう
`;
    } else {
      return `
# 和牛の贅沢${recipeNumber}品レシピ

## 材料（2人分）
- 和牛サーロイン: 200g
- にんにく: 2片
- しょうが: 1片
- 長ねぎ: 1/2本
- しいたけ: 4個
- 酒: 大さじ2
- みりん: 大さじ1
- 醤油: 大さじ1
- 砂糖: 小さじ1
- ごま油: 小さじ1

## 調理手順
1. 和牛は常温に戻し、一口大に切る
2. にんにく、しょうがはみじん切りに、長ねぎは斜め切りに、しいたけは石づきを取り半分に切る
3. フライパンを熱し、にんにく、しょうがを香りが出るまで炒める
4. 和牛を加え、表面に焼き色がつくまで強火で焼く
5. 長ねぎ、しいたけを加えて炒める
6. 酒、みりん、醤油、砂糖を加え、軽く煮詰める
7. 仕上げにごま油を回しかける

## ポイント
* 和牛は常温に戻すことで、ムラなく焼けます
* 強火で手早く焼くことで、肉汁を閉じ込めジューシーに仕上がります
* 調味料は煮詰めすぎないよう注意しましょう
`;
    }
  }
  return '';
};

// ダミーデータを生成
for (let i = 0; i < 10; i++) {
  const statusIndex = i % 3; // 順番に状態を割り当て
  dummyData.push({
    id: i.toString(),
    name: `春野菜の${i + 1}品レシピ`,
    createdAt: new Date(2024, 2, 20 - i), // 3月20日から順に日付を遡る
    status: statuses[statusIndex],
    description: `春の食材を使った簡単${i + 1}品レシピです。`,
    content: getDummyContent(i)
  });
}

for (let i = 10; i < 20; i++) {
  const statusIndex = i % 3;
  dummyData.push({
    id: i.toString(),
    name: `和牛の贅沢${i - 9}品レシピ`,
    createdAt: new Date(2024, 2, 10 - (i - 10)), // 3月10日から順に日付を遡る
    status: statuses[statusIndex],
    description: `上質な和牛を使った贅沢${i - 9}品レシピです。`,
    content: getDummyContent(i)
  });
}

const RecipesPage = () => {
  const [allRecipes, setAllRecipes] = useState<Recipe[]>(dummyData);
  const [displayedRecipes, setDisplayedRecipes] = useState<Recipe[]>([]);
  const [totalItems, setTotalItems] = useState(dummyData.length);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    // 表示するレシピを更新
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = Math.min(startIndex + itemsPerPage, allRecipes.length);
    setDisplayedRecipes(allRecipes.slice(startIndex, endIndex));
    setTotalItems(allRecipes.length);
  }, [allRecipes, currentPage, itemsPerPage]);

  const handleFilterApply = (filterParams: any) => {
    // 実際のアプリケーションでは、APIからフィルタリングされたデータを取得
    console.log('フィルター適用:', filterParams);

    // デモのために、ダミーデータをステータスでフィルタリング
    if (filterParams.status) {
      const filtered = dummyData.filter((item) =>
        item.status
          .toLowerCase()
          .includes(filterParams.status.toLowerCase())
      );
      setAllRecipes(filtered);
    } else {
      setAllRecipes(dummyData);
    }

    // 新しいフィルターを適用する際に最初のページにリセット
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    if (page < 1 || page > Math.ceil(totalItems / itemsPerPage)) return;
    setCurrentPage(page);
  };

  const handleRemoveRecipe = (id: string) => {
    const updatedRecipes = allRecipes.filter(
      (recipe) => recipe.id !== id
    );
    setAllRecipes(updatedRecipes);

    // ページの最後のアイテムを削除する場合、前のページに移動（ページ1の場合を除く）
    const newTotalItems = updatedRecipes.length;
    const newTotalPages = Math.ceil(newTotalItems / itemsPerPage);

    if (currentPage > newTotalPages && currentPage > 1) {
      setCurrentPage(newTotalPages || 1);
    }
  };

  const handleClearAll = () => {
    setAllRecipes([]);
    setCurrentPage(1);
    setIsDialogOpen(false);
  };

  const openConfirmDialog = () => {
    setIsDialogOpen(true);
  };

  // 総ページ数を計算
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  return (
    <div className='container mx-auto p-4'>
      <div className='w-full mb-6'>
        <div className='flex justify-between items-center mb-4'>
          <h2 className='text-xl font-bold'>レシピ提案一覧</h2>
          <Button
            onClick={openConfirmDialog}
            className='hover:cursor-pointer bg-red-400 hover:bg-red-700 text-white size-12 w-18 mr-1'
          >
            <div className='flex items-center gap-1'>
              <Trash2 />
            </div>
          </Button>
        </div>

        <AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>削除確認</AlertDialogTitle>
              <AlertDialogDescription>
                すべてのレシピを削除してもよろしいですか？この操作は元に戻せません。
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>キャンセル</AlertDialogCancel>
              <AlertDialogAction onClick={handleClearAll}>
                削除を確認
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>

        <div className='bg-white rounded-lg shadow-md overflow-hidden'>
          <RecipesTable
            recipes={displayedRecipes}
            onRemove={handleRemoveRecipe}
          />

          <div className='p-4 border-t flex justify-between items-center text-sm text-gray-500'>
            <span>
              {totalItems > 0
                ? `${totalItems}件中 ${(currentPage - 1) * itemsPerPage + 1}-${Math.min(
                    currentPage * itemsPerPage,
                    totalItems
                  )}件を表示`
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
      </div>
    </div>
  );
};

export default RecipesPage;