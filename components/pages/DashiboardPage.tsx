// 'use client';
// import * as React from 'react';
// import userPageHeader from '../molecule/userpage/userPageHeader';
// import userPageHeader from '../molecule/userpage/userPageHeader';

// function HomePage() {
//   return (
//     <main className='flex flex-col pb-16 bg-white items-center'>
//       <div className='flex flex-col px-16 pt-16 pb-8 w-2/3 bg-white md:w-full max-md:px-5'>
//         <userPageHeader />
//         <HomePageHeroSection />
//         <HomePageFeatureSection />
//       </div>
//     </main>
//   );
// }

// export default HomePage;

// "use client";
// import * as React from "react";
// import Sidebar from "./Sidebar";
// import TopBar from "./TopBar";
// import StatCard from "./StatCard";
// import ChartCard from "./ChartCard";

// function Dashboard() {
//   return (
//     <div className="bg-white max-md:pr-5">
//       <div className="py-px bg-white max-md:max-w-full" space={0}>
//         <div className="flex gap-5 max-md:flex-col">
//           <div className="w-[17%] max-md:ml-0 max-md:w-full">
//             <Sidebar />
//           </div>
//           <div className="ml-5 w-[83%] max-md:ml-0 max-md:w-full">
//             <main className="pb-56 mx-auto w-full bg-slate-100 max-md:pb-24 max-md:max-w-full">
//               <TopBar />
//               <img
//                 src="https://cdn.builder.io/api/v1/image/assets/TEMP/9f12774f79defa3de49ba6189eb3f05c24855fa79c55fa5eca0349594c2c2f8f?placeholderIfAbsent=true&apiKey=c44502950afb400e865a11a365c79054"
//                 alt="Dashboard banner"
//                 className="object-contain w-full max-md:max-w-full"
//               />
//               <section className="mt-28 mr-8 ml-8 max-md:mt-10 max-md:mr-2.5 max-md:max-w-full" space={30}>
//                 <div className="flex gap-5 max-md:flex-col">
//                   <div className="w-3/12 max-md:ml-0 max-md:w-full">
//                     <StatCard
//                       title="有効期限が近づく"
//                       value="10293"
//                       percentage="1.3%"
//                       trend="up"
//                       description="Up from past week"
//                     />
//                   </div>
//                   <div className="ml-5 w-3/12 max-md:ml-0 max-md:w-full">
//                     <StatCard
//                       title="有効期限が近づく"
//                       value="10293"
//                       percentage="1.3%"
//                       trend="up"
//                       description="Up from past week"
//                     />
//                   </div>
//                   <div className="ml-5 w-3/12 max-md:ml-0 max-md:w-full">
//                     <StatCard
//                       title="レシピ総数"
//                       value="$89,000"
//                       percentage="4.3%"
//                       trend="down"
//                       description="Down from yesterday"
//                     />
//                   </div>
//                   <div className="ml-5 w-3/12 max-md:ml-0 max-md:w-full">
//                     <StatCard
//                       title="料理の好み"
//                       value="$89,000"
//                       percentage="4.3%"
//                       trend="down"
//                       description="Down from yesterday"
//                     />
//                   </div>
//                 </div>
//               </section>
//               <ChartCard />
//             </main>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Dashboard;