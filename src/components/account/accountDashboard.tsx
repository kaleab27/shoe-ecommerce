"use client";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AccountProfile } from "@/components/account/accountProfile";
import { AccountOrders } from "@/components/account/accountOrders";
import { AccountAddresses } from "@/components/account/accountAddresses";
import { AccountPayments } from "@/components/account/accountPayments";
import { AccountPreferences } from "@/components/account/accountPreferences";
import { AccountSidebar } from "@/components/account/accountSidebar";
import { useMediaQuery } from "@/hooks/use-media-query";

export default function AccountDashboard() {
    const [activeTab, setActiveTab] = useState("profile");
    const isDesktop = useMediaQuery("(min-width: 768px)");

    return (
        <div className="container px-4 mx-auto py-10">
            <h1 className="text-3xl font-bold mb-8">My Account</h1>

            <div className="grid md:grid-cols-[240px_1fr] gap-10">
                {isDesktop ? (
                    <>
                        <AccountSidebar
                            activeTab={activeTab}
                            setActiveTab={setActiveTab}
                        />
                        <div>
                            {activeTab === "profile" && <AccountProfile />}
                            {activeTab === "orders" && <AccountOrders />}
                            {activeTab === "addresses" && <AccountAddresses />}
                            {activeTab === "payments" && <AccountPayments />}
                            {activeTab === "preferences" && (
                                <AccountPreferences />
                            )}
                        </div>
                    </>
                ) : (
                    <Tabs
                        value={activeTab}
                        onValueChange={setActiveTab}
                        className="w-full"
                    >
                        <TabsList className="grid grid-cols-3 md:grid-cols-5 mb-8">
                            <TabsTrigger value="profile">Profile</TabsTrigger>
                            <TabsTrigger value="orders">Orders</TabsTrigger>
                            <TabsTrigger value="addresses">
                                Addresses
                            </TabsTrigger>
                            <TabsTrigger value="payments">Payments</TabsTrigger>
                            <TabsTrigger value="preferences">
                                Preferences
                            </TabsTrigger>
                        </TabsList>
                        <TabsContent value="profile">
                            <AccountProfile />
                        </TabsContent>
                        <TabsContent value="orders">
                            <AccountOrders />
                        </TabsContent>
                        <TabsContent value="addresses">
                            <AccountAddresses />
                        </TabsContent>
                        <TabsContent value="payments">
                            <AccountPayments />
                        </TabsContent>
                        <TabsContent value="preferences">
                            <AccountPreferences />
                        </TabsContent>
                    </Tabs>
                )}
            </div>
        </div>
    );
}
