"use client";

import type React from "react";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { SearchIcon, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useIsMobile } from "@/hooks/use-mobile";

interface SearchBarProps {
    variant?: "header" | "page";
    initialQuery?: string;
}

export default function SearchBar({
    variant = "header",
    initialQuery = "",
}: SearchBarProps) {
    const [query, setQuery] = useState(initialQuery);
    const [isFocused, setIsFocused] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);
    const router = useRouter();
    const isMobile = useIsMobile();
    console.log(isMobile);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (query.trim()) {
            router.push(`/search?q=${encodeURIComponent(query.trim())}`);
        }
    };

    const clearSearch = () => {
        setQuery("");
        if (inputRef.current) {
            inputRef.current.focus();
        }
    };

    if (variant === "header") {
        return (
            <form
                onSubmit={handleSubmit}
                className={`relative flex items-center transition-all duration-200 ${
                    isFocused && !isMobile ? "w-64" : !isMobile ? "w-40" : ""
                }`}
            >
                {!isMobile && (
                    <Input
                        ref={inputRef}
                        type="search"
                        placeholder="Search..."
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        onFocus={() => setIsFocused(true)}
                        onBlur={() => setIsFocused(false)}
                        className="pr-8"
                    />
                )}
                {!isMobile && query && (
                    <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="absolute right-8 h-full p-0 hover:bg-transparent"
                        onClick={clearSearch}
                    >
                        <X className="h-4 w-4 text-muted-foreground" />
                        <span className="sr-only">Clear search</span>
                    </Button>
                )}
                <Button
                    type="submit"
                    variant="ghost"
                    size="icon"
                    className="absolute right-0 h-full p-0 hover:bg-transparent"
                >
                    <SearchIcon className="h-4 w-4" />
                    <span className="sr-only">Search</span>
                </Button>
            </form>
        );
    }

    return (
        <form onSubmit={handleSubmit} className="relative w-full max-w-2xl">
            <Input
                ref={inputRef}
                type="search"
                placeholder="Search for shoes, boots, loafers..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="pr-20 h-12 text-base"
            />
            {query && (
                <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute right-12 top-0 h-full p-0 hover:bg-transparent"
                    onClick={clearSearch}
                >
                    <X className="h-5 w-5 text-muted-foreground" />
                    <span className="sr-only">Clear search</span>
                </Button>
            )}
            <Button
                type="submit"
                variant="default"
                className="absolute right-0 top-0 h-full rounded-l-none bg-amber-800 hover:bg-amber-900 dark:text-white"
            >
                <SearchIcon className="h-5 w-5 mr-2" />
                Search
            </Button>
        </form>
    );
}
