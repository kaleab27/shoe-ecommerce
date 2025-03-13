"use client";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  User,
  Package,
  MapPin,
  CreditCard,
  Settings,
  LogOut,
} from "lucide-react";

interface AccountSidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export function AccountSidebar({
  activeTab,
  setActiveTab,
}: AccountSidebarProps) {
  const menuItems = [
    { id: "profile", label: "Profile", icon: User },
    { id: "orders", label: "Orders", icon: Package },
    { id: "addresses", label: "Addresses", icon: MapPin },
    { id: "payments", label: "Payment Methods", icon: CreditCard },
    { id: "preferences", label: "Preferences", icon: Settings },
  ];

  return (
    <div className="space-y-6">
      <div className="space-y-1">
        {menuItems.map((item) => (
          <Button
            key={item.id}
            variant="ghost"
            className={`w-full justify-start ${
              activeTab === item.id ? "bg-amber-50 text-amber-900" : ""
            }`}
            onClick={() => setActiveTab(item.id)}
          >
            <item.icon className="mr-2 h-4 w-4" />
            {item.label}
          </Button>
        ))}
      </div>
      <Separator />
      <Button
        variant="ghost"
        className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50"
      >
        <LogOut className="mr-2 h-4 w-4" />
        Sign Out
      </Button>
    </div>
  );
}
