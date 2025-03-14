import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PlusCircle } from "lucide-react";

export function AccountAddresses() {
    // Mock address data
    const addresses = [
        {
            id: "1",
            name: "John Doe",
            line1: "123 Main Street",
            line2: "Apt 4B",
            city: "New York",
            state: "NY",
            postalCode: "10001",
            country: "United States",
            phone: "+1 (555) 123-4567",
            isDefault: true,
            type: "shipping",
        },
        {
            id: "2",
            name: "John Doe",
            line1: "456 Park Avenue",
            line2: "",
            city: "New York",
            state: "NY",
            postalCode: "10022",
            country: "United States",
            phone: "+1 (555) 987-6543",
            isDefault: true,
            type: "billing",
        },
    ];

    return (
        <div className="space-y-8">
            <div>
                <h2 className="text-2xl font-bold">Saved Addresses</h2>
                <p className="text-muted-foreground">
                    Manage your shipping and billing addresses
                </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
                {addresses.map((address) => (
                    <Card key={address.id}>
                        <CardHeader className="pb-2">
                            <div className="flex justify-between items-start">
                                <div>
                                    <CardTitle>{address.name}</CardTitle>
                                    <CardDescription>
                                        {address.type === "shipping"
                                            ? "Shipping"
                                            : "Billing"}{" "}
                                        Address
                                    </CardDescription>
                                </div>
                                {address.isDefault && (
                                    <Badge variant="outline">Default</Badge>
                                )}
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="text-sm">
                                <p>{address.line1}</p>
                                {address.line2 && <p>{address.line2}</p>}
                                <p>
                                    {address.city}, {address.state}{" "}
                                    {address.postalCode}
                                </p>
                                <p>{address.country}</p>
                                <p className="mt-2">{address.phone}</p>
                            </div>
                        </CardContent>
                        <CardFooter className="flex justify-between">
                            <Button variant="outline" size="sm">
                                Edit
                            </Button>
                            {!address.isDefault && (
                                <Button variant="outline" size="sm">
                                    Set as Default
                                </Button>
                            )}
                        </CardFooter>
                    </Card>
                ))}

                <Card className="border-dashed">
                    <CardContent className="flex flex-col items-center justify-center h-full py-10">
                        <PlusCircle className="h-10 w-10 text-muted-foreground mb-4" />
                        <p className="text-muted-foreground mb-4 text-center">
                            Add a new address for shipping or billing
                        </p>
                        <Button className="bg-amber-800 hover:bg-amber-900 text-white">
                            Add New Address
                        </Button>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
