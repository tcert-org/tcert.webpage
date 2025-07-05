import type { Metadata } from "next";
// import { Geist, Geist_Mono } from "next/font/google";
import { Inter } from "next/font/google"; // Importar Inter
import "./globals.css";
import Footer from "@/components/footer";
import ClientNavbar from "@/components/client-navbar";

// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

const inter = Inter({
  variable: "--font-inter", // Variable CSS para Inter
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "T-Cert",
  description: "T-Cert es una plataforma de educación en línea.",
};
console.log("Layout renderizando en el servidor");

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <body
        className={`${inter.variable} antialiased flex flex-col min-h-screen`}
      >
        <ClientNavbar />
        <main className="flex-grow">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
