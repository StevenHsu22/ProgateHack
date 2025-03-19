import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  Tooltip as PieTooltip,
  ResponsiveContainer as PieResponsiveContainer,
  Legend,
} from 'recharts';

// dummy data for PieChart
const pieData = [
  { name: '野菜', value: 400 },
  { name: '果物', value: 300 },
  { name: '肉類', value: 200 },
  { name: 'その他', value: 100 },
];

const COLORS = ['#60A5FA', '#F87171', '#34D399', '#FBBF24'];

export default function UserDashboardPieChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>カテゴリー別割合分析</CardTitle>
      </CardHeader>
      <CardContent className="h-64">
        <PieResponsiveContainer width="100%" height="100%">
          <RechartsPieChart>
            <Pie
              data={pieData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={80}
              fill="#8884d8"
              label
            >
              {pieData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <PieTooltip />
            <Legend />
          </RechartsPieChart>
        </PieResponsiveContainer>
      </CardContent>
    </Card>
  );
}