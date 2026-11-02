import type { Metadata } from "next";
import { Geist } from "next/font/google";

import "./globals.css";

import Header from "../components/Header";
import Footer from "../components/Footer";

const geist = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ShippingTime",
  description: "Сервис поиска морских рейсов",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" className={geist.variable}>
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}