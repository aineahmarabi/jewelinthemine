'use client";'
import type { Metadata } from "next";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { Jost } from 'next/font/google';
import "./globals.css";

const jost = Jost({
  subsets: ['latin'],
  weight: ['400', '500', '700'], // Add more weights if needed
  display: 'swap',
});

export const metadata: Metadata = {
  title: "Jewel in the Mines",
  description: "A blog by Imelda Nasubo",
  icons: {
    icon: "/favicon.ico"}
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${jost.className} antialiased`}
      >
        <Navbar />
        {children}
        <Footer /> 
      </body>

    </html>
  );
}
