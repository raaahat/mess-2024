import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { cn } from '@/lib/utils';
import { Nav, NavLink } from '@/components/Nav';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
});

export const metadata: Metadata = {
  title: 'Baraka Dormitory Mess Management',
  description: 'Mess meal counting and monthly report',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={cn(
          'min-h-screen bg-background font-sans antialiased',
          inter.variable
        )}
      >
        <Nav>
          <NavLink href="/">Dashboard</NavLink>
          <NavLink href="/member">Members</NavLink>
          <NavLink href="/daily-meal">Daily Meal</NavLink>
          <NavLink href="/bazar">Bazar</NavLink>
        </Nav>
        <div className="container my-6">{children}</div>
      </body>
    </html>
  );
}
