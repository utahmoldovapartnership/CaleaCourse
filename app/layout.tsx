import { AppProvider } from "@/components/providers/AppProvider";
import { Outfit } from "next/font/google";
import type { Metadata, Viewport } from "next";
import "./globals.css";

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-outfit",
});

export const metadata: Metadata = {
  title: "Calea Courses",
  description: "Calea gets out of your way so learning can happen.",
  icons: { icon: "/assets/logos/logo-color.svg" },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${outfit.variable} h-full`} suppressHydrationWarning>
      <body className="min-h-full font-body antialiased" suppressHydrationWarning>
        <AppProvider>{children}</AppProvider>
      </body>
    </html>
  );
}
