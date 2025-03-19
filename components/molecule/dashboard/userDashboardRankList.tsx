import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

const rankData = [
  { name: '卵', count: 35 },
  { name: '牛乳', count: 30 },
  { name: '玉ねぎ', count: 25 },
  { name: 'トマト', count: 20 },
  { name: 'ジャガイモ', count: 18 },
];

export default function UserDashboardRankList() {
  return (
    <ul className='space-y-2'>
      <Card>
        <CardHeader>
          <CardTitle>よく使われる食材</CardTitle>
        </CardHeader>
        <CardContent>
          {rankData.map((item, index) => (
            <li key={index} className='flex justify-between border-b pb-1'>
              <span>
                {index + 1}. {item.name}
              </span>
              <span className='text-blue-600 font-medium'>{item.count} 次</span>
            </li>
          ))}
        </CardContent>
      </Card>
    </ul>
  );
}
