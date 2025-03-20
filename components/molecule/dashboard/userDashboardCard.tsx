import { useEffect, useState } from 'react';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Leaf, Calendar, Utensils, ThumbsUp } from 'lucide-react';
import { fetchDashboardData } from '@/lib/api/dashboard';

// インターフェース定義
interface DashboardCardItem {
  title: string;
  value: string | number;
  icon: React.ElementType;
}

export default function DashboardPage() {
  // ダッシュボードデータの状態
  const [dashboardData, setDashboardData] = useState({
    ingredientsCount: 0,
    expiringCount: 0,
    recipesCount: 0,
    preferencesCount: 0,
  });
  // ローディング状態
  const [isLoading, setIsLoading] = useState(true);
  // エラー状態
  const [error, setError] = useState<string | null>(null);

  // コンポーネントマウント時にデータ取得
  useEffect(() => {
    const loadDashboardData = async () => {
      try {
        setIsLoading(true);
        const data = await fetchDashboardData();

        // APIから取得したデータを状態に設定
        setDashboardData({
          ingredientsCount: data.statistics.ingredientsCount,
          expiringCount: data.statistics.expiringIngredients,
          recipesCount: data.statistics.recipesCount,
          // 料理の好みのカウント - APIのレスポンスに合わせて調整が必要かもしれません
          preferencesCount: data.statistics.totalPreferences || 0,
        });
      } catch (err) {
        console.error('ダッシュボードデータの取得に失敗:', err);
        setError(
          'データの読み込み中にエラーが発生しました。再度お試しください。'
        );
      } finally {
        setIsLoading(false);
      }
    };

    loadDashboardData();
  }, []);

  // カードアイテムの動的な生成
  const getCardItems = (): DashboardCardItem[] => {
    return [
      { title: '食材総数', value: dashboardData.ingredientsCount, icon: Leaf },
      {
        title: '有効期限が迫る',
        value: dashboardData.expiringCount,
        icon: Calendar,
      },
      {
        title: 'レシピ総数',
        value: dashboardData.recipesCount,
        icon: Utensils,
      },
      {
        title: '料理の好み',
        value: dashboardData.preferencesCount,
        icon: ThumbsUp,
      },
    ];
  };

  // エラー表示
  if (error) {
    return <div className='p-4 text-red-500'>{error}</div>;
  }

  // ローディング表示
  if (isLoading) {
    return <div className='p-4'>データを読み込み中...</div>;
  }

  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4'>
      {getCardItems().map((item, index) => (
        <Card key={index} className='flex overflow-hidden flex-col'>
          <CardHeader className='flex justify-between items-start'>
            <div className='flex flex-col'>
              <CardTitle className='text-gray-500 text-sm'>
                {item.title}
              </CardTitle>
              <p className='text-xl font-semibold'>{item.value}</p>
            </div>
            <div className='flex items-center justify-center'>
              <item.icon size={24} />
            </div>
          </CardHeader>
        </Card>
      ))}
    </div>
  );
}
