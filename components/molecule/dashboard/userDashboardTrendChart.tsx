import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { fetchUsageTrends } from '@/lib/api/dashboard';
import type { UsageTrend } from '@/lib/db/operations/dashboard';

export default function UserDashboardTrendChart() {
  // 使用トレンドデータの状態管理
  const [trendData, setTrendData] = useState<UsageTrend[]>([]);
  // ローディング状態
  const [isLoading, setIsLoading] = useState<boolean>(true);
  // エラー状態
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // コンポーネントマウント時にデータを取得
    const loadTrendData = async () => {
      try {
        setIsLoading(true);
        const data = await fetchUsageTrends();
        setTrendData(data);
        setError(null);
      } catch (err) {
        setError('トレンドデータの読み込みに失敗しました');
        console.error('トレンドデータの取得エラー:', err);
      } finally {
        setIsLoading(false);
      }
    };

    loadTrendData();
  }, []);

  // データ読み込み中の表示
  if (isLoading) {
    return (
      <Card className='w-full'>
        <CardHeader>
          <CardTitle>食材の使用トレンド</CardTitle>
        </CardHeader>
        <CardContent className='h-60 flex items-center justify-center'>
          <p>データを読み込み中...</p>
        </CardContent>
      </Card>
    );
  }

  // エラー発生時の表示
  if (error) {
    return (
      <Card className='w-full'>
        <CardHeader>
          <CardTitle>食材の使用トレンド</CardTitle>
        </CardHeader>
        <CardContent className='h-60 flex items-center justify-center'>
          <p className='text-red-500'>{error}</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className='w-full'>
      <CardHeader>
        <CardTitle>食材の使用トレンド</CardTitle>
      </CardHeader>
      <CardContent className='h-60'>
        <ResponsiveContainer width='100%' height='100%'>
          <LineChart data={trendData}>
            <CartesianGrid strokeDasharray='3 3' />
            <XAxis dataKey='date' />
            <YAxis />
            <Tooltip />
            <Line
              type='monotone'
              dataKey='使用量'
              stroke='#3b82f6'
              strokeWidth={2}
              dot={{ r: 4 }}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
