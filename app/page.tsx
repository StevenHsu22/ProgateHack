import Image from 'next/image';
import { Navbar } from '@/components/molecule/navbar';
import HomePageMainArea from '@/components/molecule/homepageMainArea';
export default function Home() {
  return (
    <div className='h-screen'>
      <Navbar />
      <HomePageMainArea />
    </div>
  );
}
