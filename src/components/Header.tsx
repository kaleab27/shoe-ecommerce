import Link from "next/link";
import { ShoppingBag, Search, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sidebar } from "@/components/Sidebar";

export default function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white">
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
          <Button variant="ghost" size="icon" className="hidden md:flex">
            <Search className="h-5 w-5" />
            <span className="sr-only">Search</span>
          </Button>
          <Button variant="ghost" size="icon" className="hidden md:flex">
            <User className="h-5 w-5" />
            <span className="sr-only">Account</span>
          </Button>
          <Button variant="ghost" size="icon" className="hidden md:flex">
            <ShoppingBag className="h-5 w-5" />
            <span className="sr-only">Cart</span>
          </Button>

          {/* Mobile Menu Button */}
          <Sidebar />
        </div>
      </div>
    </header>
  );
}
