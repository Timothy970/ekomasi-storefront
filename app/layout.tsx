import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { GoogleOAuthProvider } from '@react-oauth/google';
import ClientLayout from "./ClientLayout";
import { StoreProvider } from "./StoreProvider";
import ToastProvider from "@/components/ToastProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Ekomasi",
  description: "",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode; }>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-white`}>
        <GoogleOAuthProvider clientId={(process as any).env?.NEXT_PUBLIC_GOOGLE_CLIENT_ID ?? ''}>
          <StoreProvider>
            <ClientLayout>
              {children}
               <ToastProvider />
            </ClientLayout>
          </StoreProvider>
        </GoogleOAuthProvider>
      </body>
    </html>
  );
}
