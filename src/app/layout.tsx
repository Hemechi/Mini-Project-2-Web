import type { Metadata } from "next";
import { Inter, Kantumruy_Pro, Roboto_Condensed } from "next/font/google";
import "./globals.css";
import NextUILayout from "./NextUIProvider";
import NavbarComponent from "@/components/header/NavbarComponent";
import { Suspense } from "react";
import { ErrorBoundary } from "next/dist/client/components/error-boundary";
import LoadingComponent from "./loading";
import Error from "./error";
import FooterComponent from "@/components/footer/FooterComponent";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    template: "%s - Hemechi",
    default: "Hemechi",
  },
  description: "This is Hemechi shop",
  keywords: ["shop", "ecommerce", "sell", "card"],
  openGraph: {
    title: {
      template: "%s - Hemechi",
      default: "Hemechi",
    },
    description: "This is Hemechi shop",
    images: [
      "https://i.pinimg.com/564x/21/20/5c/21205cf422f350b0358a61b3f54e34c7.jpg",
    ],
  },
};

const roboto_Condensed = Roboto_Condensed({
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600"],
  style: ["italic", "normal"],
  variable: "--font-roboto_Condensed",
});

const kantumruy_pro = Kantumruy_Pro({
  subsets: ["khmer"],
  display: "swap",
  variable: "--font-kantumruy-pro",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${roboto_Condensed.className} ${kantumruy_pro.className}`}>
        <NextUILayout>
        <NavbarComponent />
          <div className="bg-beige-custom">
          <Suspense fallback={<LoadingComponent/>}>
            {children}
            </Suspense>
            <FooterComponent/>
          </div>
        </NextUILayout>
      </body>
    </html>
  );
}
