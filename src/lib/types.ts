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
