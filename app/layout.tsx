import { Outfit } from 'next/font/google';
import './globals.css';

import { SidebarProvider } from '@/context/SidebarContext';
import { ThemeProvider } from '@/context/ThemeContext';
import { Metadata } from 'next';
import Providers from '@/components/providers'

const outfit = Outfit({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    template: "adidas Dashboard %s | adidas US",
    default: "adidas Admin Dashboard | adidas US",
  },
  description: "Admin Dashboard Managment for Shop the latest adidas shoes, clothing and accessories",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${outfit.className} dark:bg-gray-900`}>
        <Providers>
          <ThemeProvider>
            <SidebarProvider>{children}</SidebarProvider>
          </ThemeProvider>
        </Providers>
      </body>
    </html>
  );
}
