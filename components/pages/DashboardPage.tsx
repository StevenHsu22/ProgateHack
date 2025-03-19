'use client';

import UserDashboardCard from '../molecule/userpage/dashboard/userDashboardCard';
import UserDashboardTrendChart from '../molecule/userpage/dashboard/userDashboardTrendChart';
import UserDashboardRankList from '../molecule/userpage/dashboard/userDashboardRankList';
import UserDashboardPieChart from '../molecule/userpage/dashboard/userDashboardPieChart';

export default function DashboardPage() {
  return (
    <div className='p-6 space-y-6'>
      <UserDashboardCard />
      <UserDashboardTrendChart />
      <div className='grid grid-cols-1 lg:grid-cols-2 gap-4'>
        <UserDashboardRankList />
        <UserDashboardPieChart />
      </div>
    </div>
  );
}
