import type { Metadata } from "next";
import { Montserrat, Roboto } from "next/font/google";
import ClientProvider from "./components/ClientProvider";
import "./globals.css";


export const metadata: Metadata = {
  title: "Parcl",
  description: "Buy and sell locally",
};


// Configure fonts
const montserrat = Montserrat({
  weight: ["400", "700"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-montserrat",
});

const roboto = Roboto({
  weight: ["400", "500"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-roboto",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${montserrat.variable} ${roboto.variable}`}>
      <body>
        <ClientProvider>{children}</ClientProvider>
      </body>
    </html>
  );
}