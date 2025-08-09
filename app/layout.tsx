import type { Metadata } from "next";
import { Noto_Sans_TC } from 'next/font/google';
import "./globals.css";

export const notoSansTC = Noto_Sans_TC({
  subsets: ['latin'],
  weight: ['400', '700'],
  fallback: ["sans-serif"],
  display: 'swap',
  variable: '--font-noto-sans-tc'
});

export const metadata: Metadata = {
  title: "井字遊戲",
  description: "可以穿梭時空的井字遊戲",
};

export default function RootLayout({ children,
}: Readonly<{ children: React.ReactNode; }>) {
  return (
    <html lang="en">
      <body className={`bg-gray-100 dark:bg-gray-950 ${notoSansTC.variable} antialiased font-noto-sans-tc text-gray-800 dark:text-gray-300 selection:bg-teal-700 selection:text-teal-100`}>
        {children}
      </body>
    </html>
  );
}
