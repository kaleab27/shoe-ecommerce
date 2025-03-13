import type { Metadata } from "next";
import { SearchResults } from "@/components/search/searchResults";

export const metadata: Metadata = {
  title: "Search | NOBLEMAN",
  description: "Search for premium men's footwear in our collection.",
};

export default function SearchPage({
  searchParams,
}: {
  searchParams: { q?: string };
}) {
  const query = searchParams.q || "";

  return <SearchResults initialQuery={query} />;
}
