import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Image from "next/image";

import rocket from "@/../public/rocket.svg"

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
          className=" h-[20vh] flex flex-col w-full items-center justify-center bg-dark-primary">
          <div id="app-name"
            className="flex">
            <Image src={rocket} alt="rocket-icon"></Image>
            <p className={`text-2xl font-extrabold text-theme-primary-light`}>
              Todo
            </p>
            <p className={`text-2xl font-extrabold ml-1 text-theme-secondary`}>
              App
            </p>
          </div>
        </header>
        {children}
      </body>
    </html>
  );
}
