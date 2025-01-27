import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import Providers from "@/components/Providers";
import { CartProvider } from "./cart/CartProvider";
import "tom-select/dist/css/tom-select.css";
import { StoresProvider } from "./providers/StoresProvider";

export const metadata: Metadata = {
  title: "PymeStore",
  description: "A store for pymes in Riohacha,La guajira",
};

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "700", "900"],
  variable: "--font-roboto",
  style: ["normal", "italic"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <CartProvider>
          <StoresProvider>
            <Providers>
              <main className={`${roboto.variable} font-roboto`}>
                <Toaster />
                {children}
              </main>
            </Providers>
          </StoresProvider>
        </CartProvider>
      </body>
    </html>
  );
}
