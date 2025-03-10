"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Home,
  ShoppingBag,
  User,
  Search,
  ChevronRight,
  Menu,
} from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const navigationItems = [
  {
    title: "Home",
    href: "/",
    icon: Home,
  },
  {
    title: "New Arrivals",
    href: "#",
    icon: ChevronRight,
  },
  {
    title: "Oxfords",
    href: "#",
    icon: ChevronRight,
  },
  {
    title: "Loafers",
    href: "#",
    icon: ChevronRight,
  },
  {
    title: "Boots",
    href: "#",
    icon: ChevronRight,
  },
  {
    title: "Sneakers",
    href: "#",
    icon: ChevronRight,
  },
];

const accountItems = [
  {
    title: "My Account",
    href: "#",
    icon: User,
  },
  {
    title: "Search",
    href: "#",
    icon: Search,
  },
  {
    title: "Shopping Bag",
    href: "#",
    icon: ShoppingBag,
  },
];

export function Sidebar() {
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="h-5 w-5" />
          <span className="sr-only">Open menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-[300px] sm:w-[350px] p-0">
        <div className="flex flex-col h-full">
          <SheetHeader className="border-b p-4">
            <SheetTitle className="flex justify-between items-center">
              <span className="font-bold text-2xl">NOBLEMAN</span>
            </SheetTitle>
          </SheetHeader>

          <div className="flex-1 overflow-auto py-4">
            <div className="px-4 mb-6">
              <h3 className="text-sm font-medium text-muted-foreground mb-3">
                Navigation
              </h3>
              <nav className="space-y-1">
                {navigationItems.map((item) => (
                  <Link
                    key={item.title}
                    href={item.href}
                    className={cn(
                      "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium",
                      "hover:bg-amber-50 hover:text-amber-800 transition-colors"
                    )}
                    onClick={() => setOpen(false)}
                  >
                    <item.icon className="h-4 w-4" />
                    {item.title}
                  </Link>
                ))}
              </nav>
            </div>

            <div className="px-4 mb-6">
              <h3 className="text-sm font-medium text-muted-foreground mb-3">
                Account
              </h3>
              <nav className="space-y-1">
                {accountItems.map((item) => (
                  <Link
                    key={item.title}
                    href={item.href}
                    className={cn(
                      "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium",
                      "hover:bg-amber-50 hover:text-amber-800 transition-colors"
                    )}
                    onClick={() => setOpen(false)}
                  >
                    <item.icon className="h-4 w-4" />
                    {item.title}
                  </Link>
                ))}
              </nav>
            </div>
          </div>

          <div className="border-t p-4">
            <Button
              className="w-full bg-amber-800 hover:bg-amber-900 text-white"
              onClick={() => setOpen(false)}
            >
              Shop Collection
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
