import type { Metadata } from "next";
import { SearchResults } from "@/components/search/searchResults";

export const metadata: Metadata = {
    title: "Search | NOBLEMAN",
    description: "Search for premium men's footwear in our collection.",
};

export default async function SearchPage({
    searchParams,
}: {
    searchParams: Promise<{ q?: string }> | undefined;
}) {
    const query = (await searchParams)?.q || "";

    return <SearchResults initialQuery={query} />;
}
