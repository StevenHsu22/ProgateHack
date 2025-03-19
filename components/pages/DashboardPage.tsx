'use client';

import UserDashboardCard from '../molecule/dashboard/userDashboardCard';
import UserDashboardTrendChart from '../molecule/dashboard/userDashboardTrendChart';
import UserDashboardRankList from '../molecule/dashboard/userDashboardRankList';
import UserDashboardPieChart from '../molecule/dashboard/userDashboardPieChart';

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
