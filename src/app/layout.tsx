import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Todo App",
  description: "Stay organized",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased h-screen flex flex-col items-center`}
      >
        <header id="app-header"
          className=" h-[20vh] flex flex-col w-full items-center justify-center border border-black">
          <h1 className={`text-2xl font-extrabold`}>
            Todo App
          </h1>
        </header>
        {children}
      </body>
    </html>
  );
}
