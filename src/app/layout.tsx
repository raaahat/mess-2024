import type { Metadata } from 'next';
import { Nunito } from 'next/font/google';
import './globals.css';
import { cn } from '@/lib/utils';
import { Nav, NavLink } from '@/components/Nav';

const nunito = Nunito({
  weight: ['600', '800'],
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
          nunito.variable
        )}
      >
        <Nav>
          <NavLink href="/">Dashboard</NavLink>
          <NavLink href="/member">Members</NavLink>
          <NavLink href="/meal">Daily Meal</NavLink>
          <NavLink href="/bazar">Bazar</NavLink>
          <NavLink href="/meal/edit-by-date">Edit Meal</NavLink>
        </Nav>
        <div className="container my-6">{children}</div>
      </body>
    </html>
  );
}
