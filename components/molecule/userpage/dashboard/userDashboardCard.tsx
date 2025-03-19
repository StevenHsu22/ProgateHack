import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Leaf, Calendar, Utensils, ThumbsUp } from 'lucide-react';

// interface UserDashboardCardProps {
//   title: string;
//   value: string | number;
//   icon: React.ElementType;
// }

const cardItems = [
  { title: '食材総数', value: 128, icon: Leaf },
  { title: '有効期限が迫る', value: 12, icon: Calendar },
  { title: 'レシピ総数', value: 8, icon: Utensils },
  { title: '料理の好み', value: 24, icon: ThumbsUp },
];

export default function DashboardPage() {
  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4'>
      {cardItems.map((item, index) => (
        <Card key={index} className='flex overflow-hidden flex-col'>
          <CardHeader className='flex justify-between items-start'>
            <div className='flex flex-col'>
              <CardTitle className='text-gray-500 text-sm'>{item.title}</CardTitle>
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


export function ProductCardSkeleton() {
  return (
    <Card className='overflow-hidden flex flex-col animate-pulse'>
      <div className='w-full aspect-video bg-gray-300' />
      <CardHeader>
        <CardTitle>
          <div className='w-3/4 h-6 rounded-full bg-gray-300' />
        </CardTitle>
        <CardDescription>
          <div className='w-1/2 h-4 rounded-full bg-gray-300' />
        </CardDescription>
      </CardHeader>
      <CardContent className='space-y-2'>
        <div className='w-full h-4 rounded-full bg-gray-300' />
        <div className='w-full h-4 rounded-full bg-gray-300' />
        <div className='w-3/4 h-4 rounded-full bg-gray-300' />
      </CardContent>
      <CardFooter>
        <Button className='w-full' disabled size='lg'></Button>
      </CardFooter>
    </Card>
  );
}
