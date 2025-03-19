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

const trendData = [
  { date: '4/1', 使用量: 10 },
  { date: '4/2', 使用量: 15 },
  { date: '4/3', 使用量: 8 },
  { date: '4/4', 使用量: 12 },
  { date: '4/5', 使用量: 18 },
  { date: '4/6', 使用量: 20 },
  { date: '4/7', 使用量: 14 },
];

export default function UserDashboardTrendChart() {
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
