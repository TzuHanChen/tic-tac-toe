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

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`bg-gray-200 ${notoSansTC.variable} antialiased font-noto-sans-tc text-gray-800 selection:bg-teal-700 selection:text-teal-100`}>
        <main className="min-h-screen p-6 flex flex-col justify-center items-center">
          {children}
        </main>
      </body>
    </html>
  );
}
