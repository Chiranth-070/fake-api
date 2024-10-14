import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import AppBar from "@/pages/AppBar";
import SideBar from "@/pages/SideBar";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Fake-api",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased font-mono `}
      >
        <div className="flex flex-col h-screen bg-gray-100">
          <AppBar />
          <div className="flex flex-1 overflow-hidden">
            {/* Sidebar */}
            <div className="w-1/5 bg-white border-r">
              <SideBar />
            </div>

            {/* ChatArea with hidden scrollbar */}
            <div className="flex-1 max-w-screen-2xl">{children}</div>
          </div>
        </div>
      </body>
    </html>
  );
}
