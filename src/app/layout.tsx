import './globals.css';
import { ReactNode } from 'react';
import AuthContext from '@/components/AuthContext';
import { AppHeader } from '@/components/AppHeader';

export interface RootLayoutProps {
  children: ReactNode;
}


export default async function RootLayout({ children }: RootLayoutProps) {

  return (
    <html lang="en">
      <head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body>
        <AuthContext><AppHeader />{children}</AuthContext>
      </body>
    </html>
  );
}