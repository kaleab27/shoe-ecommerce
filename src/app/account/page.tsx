import type { Metadata } from "next";
import AccountDashboard from "@/components/account/accountDashboard";

export const metadata: Metadata = {
  title: "My Account | NOBLEMAN",
  description: "Manage your account, view orders, and update your preferences.",
};

export default function AccountPage() {
  return <AccountDashboard />;
}
