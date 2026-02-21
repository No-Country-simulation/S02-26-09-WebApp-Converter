import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Header from "./components/header/header";
import Footer from "./components/footer/footer";
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
    title: "video-flow",
    description: "video-flow",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <html lang="en">
          <body
              className={`${geistSans.variable} ${geistMono.variable} antialiased`}
          >
              <header>
                  <Header />
              </header>
              {children}
              <Footer />
          </body>
      </html>
  );
}
