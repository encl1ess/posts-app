import { FC, ReactNode } from 'react';
import { Header } from '../Header/Header';

interface LayoutProps {
  children: ReactNode;
}

export const Layout: FC<LayoutProps> = ({ children }) => {
  return (
    <>
      <Header />
      <main className="p-3 h-100 overflow-auto">{children}</main>
    </>
  );
};
