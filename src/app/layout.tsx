import { Suspense } from "react";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import Link from "next/link";
import Header from "@/components/Header";
import { Providers } from "@/components/providers";
import { Toaster } from "@/components/ui/sonner";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "NobelMen Shoes",
    description: "An ecommerce where you can buy luxury men's shoes.",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <ClerkProvider>
            <html lang="en">
                <body
                    className={`${geistSans.variable} ${geistMono.variable} antialiased`}
                >
                    <ThemeProvider
                        attribute="class"
                        defaultTheme="system"
                        enableSystem
                        disableTransitionOnChange
                    >
                        <Providers>
                            <Suspense>
                                <Header />
                                {children}
                                <footer className="border-t py-6 md:py-0">
                                    <div className="container px-4 mx-auto flex flex-col md:flex-row justify-between items-center gap-4 md:h-16">
                                        <p className="text-sm text-muted-foreground">
                                            © 2025 NOBLEMAN. All rights
                                            reserved.
                                        </p>
                                        <div className="flex gap-4 text-sm text-muted-foreground">
                                            <Link href="#">Terms</Link>
                                            <Link href="#">Privacy</Link>
                                            <Link href="#">Shipping</Link>
                                            <Link href="#">Returns</Link>
                                        </div>
                                    </div>
                                </footer>
                                <Toaster />
                            </Suspense>
                        </Providers>
                    </ThemeProvider>
                </body>
            </html>
        </ClerkProvider>
    );
}
