"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Sidebar } from "@/components/Sidebar";
import CartButton from "./CartButton";
import SearchBar from "@/components/search/searchBar";
import { AuthButtons } from "./auth/authButton";

export default function SiteHeader() {
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
    useEffect(() => {
        const fetchUser = async () => {
            try {
                const res = await fetch("/api/user", {
                    credentials: "include",
                });
                const data = await res.json();
                setIsLoggedIn(true);
                console.log(data);
            } catch (error) {
                console.log(error);
            }
        };
        fetchUser();
    });
    return (
        <header className="sticky top-0 z-50 w-full border-b">
            <div className="container px-4 mx-auto flex h-16 items-center justify-between">
                <div className="flex items-center gap-6 md:gap-10">
                    <Link href="/" className="font-bold text-2xl">
                        NOBLEMAN
                    </Link>
                    <nav className="hidden md:flex gap-6">
                        <Link
                            href="#"
                            className="text-sm font-medium transition-colors hover:text-amber-800"
                        >
                            New Arrivals
                        </Link>
                        <Link
                            href="#"
                            className="text-sm font-medium transition-colors hover:text-amber-800"
                        >
                            Oxfords
                        </Link>
                        <Link
                            href="#"
                            className="text-sm font-medium transition-colors hover:text-amber-800"
                        >
                            Loafers
                        </Link>
                        <Link
                            href="#"
                            className="text-sm font-medium transition-colors hover:text-amber-800"
                        >
                            Boots
                        </Link>
                        <Link
                            href="#"
                            className="text-sm font-medium transition-colors hover:text-amber-800"
                        >
                            Sneakers
                        </Link>
                    </nav>
                </div>
                <div className="flex items-center gap-4">
                    <SearchBar />
                    {/* <Button
                        variant="ghost"
                        size="icon"
                        className="hidden md:flex"
                    >
                        <User className="h-5 w-5" />
                        <span className="sr-only">Account</span>
                    </Button> */}
                    <AuthButtons
                        setLoggedInStatus={setIsLoggedIn}
                        isLoggedInStatus={isLoggedIn}
                    />
                    <CartButton />
                    {/* Mobile Menu Button */}
                    <Sidebar />
                </div>
            </div>
        </header>
    );
}
