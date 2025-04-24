export interface VariationStock {
    [key: string]: string | number;
    stock: number;
}

export interface Inventory {
    id: string;
    inventoryTag: string[];
    productId: string;
    variationsStock: VariationStock[];
    totalStock: number;
    createdAt: string;
}

export interface Product {
    id: string;
    name: string;
    categoryId: string;
    brand: string;
    basePrice: number;
    discountedPrice: number;
    description: string;
    stockStatus: "In Stock" | "Out of Stock";
    images: string[];
    variations: string[];
    createdAt: string;
}

export interface OrderItem {
    id: string;
    orderId: string;
    productId: string;
    quantity: number;
    variation: Record<string, string>;
    price: string;
    totalPrice: string;
    createdAt: string;
    status?: string;
    paymentStatus?: string;
    phoneNumber?: string;
    shippingAddress?: string;
}

export interface Order {
    id?: string;
    userId: string;
    phoneNumber: string;
    shippingAddress: string;
    totalAmount: number;
    status: string;
    paymentStatus: string;
    createdAt?: string;
}
