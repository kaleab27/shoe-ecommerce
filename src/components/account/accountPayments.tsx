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
import { PlusCircle, CreditCard } from "lucide-react";

export function AccountPayments() {
    // Mock payment methods
    const paymentMethods = [
        {
            id: "1",
            type: "Visa",
            last4: "4242",
            expMonth: 12,
            expYear: 2025,
            isDefault: true,
        },
        {
            id: "2",
            type: "Mastercard",
            last4: "5555",
            expMonth: 8,
            expYear: 2026,
            isDefault: false,
        },
    ];

    return (
        <div className="space-y-8">
            <div>
                <h2 className="text-2xl font-bold">Payment Methods</h2>
                <p className="text-muted-foreground">
                    Manage your saved payment methods
                </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
                {paymentMethods.map((method) => (
                    <Card key={method.id}>
                        <CardHeader className="pb-2">
                            <div className="flex justify-between items-start">
                                <div className="flex items-center">
                                    <CreditCard className="h-5 w-5 mr-2" />
                                    <div>
                                        <CardTitle>
                                            {method.type} •••• {method.last4}
                                        </CardTitle>
                                        <CardDescription>
                                            Expires {method.expMonth}/
                                            {method.expYear}
                                        </CardDescription>
                                    </div>
                                </div>
                                {method.isDefault && (
                                    <Badge variant="outline">Default</Badge>
                                )}
                            </div>
                        </CardHeader>
                        <CardFooter className="flex justify-between">
                            <Button variant="outline" size="sm">
                                Edit
                            </Button>
                            {!method.isDefault ? (
                                <Button variant="outline" size="sm">
                                    Set as Default
                                </Button>
                            ) : (
                                <Button
                                    variant="outline"
                                    size="sm"
                                    className="text-red-600 hover:text-red-700 hover:bg-red-50"
                                >
                                    Remove
                                </Button>
                            )}
                        </CardFooter>
                    </Card>
                ))}

                <Card className="border-dashed">
                    <CardContent className="flex flex-col items-center justify-center h-full py-10">
                        <PlusCircle className="h-10 w-10 text-muted-foreground mb-4" />
                        <p className="text-muted-foreground mb-4 text-center">
                            Add a new payment method
                        </p>
                        <Button className="bg-amber-800 hover:bg-amber-900 text-white">
                            Add Payment Method
                        </Button>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
