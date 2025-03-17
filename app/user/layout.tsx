import React from 'react';
import { Navbar } from '@/components/molecule/navbar';

interface RecipesLayoutProps {
  children: React.ReactNode;
}

const RecipesLayout = ({ children }: RecipesLayoutProps) => {
  return (
    <div>
      <Navbar />
      <main>{children}</main>
    </div>
  );
};

export default RecipesLayout;
