export interface Category {
    id: string;
    name: string;
    slug: string;
    description?: string;
}

export const categories: Category[] = [
    {
        id: "dress-shoes",
        name: "Dress Shoes",
        slug: "dress-shoes",
        description:
            "Elegant and sophisticated dress shoes for formal occasions",
    },
    {
        id: "t-shirts",
        name: "T-Shirts",
        slug: "t-shirts",
        description: "Comfortable and stylish t-shirts for everyday wear",
    },
    {
        id: "casual-shoes",
        name: "Casual Shoes",
        slug: "casual-shoes",
        description: "Comfortable and versatile casual shoes for daily wear",
    },
    {
        id: "sun-glasses",
        name: "Sun Glasses",
        slug: "sun-glasses",
        description: "Stylish and protective sunglasses for every occasion",
    },
    {
        id: "rings-necklaces",
        name: "Rings & Necklaces",
        slug: "rings-necklaces",
        description: "Elegant jewelry pieces to complement your style",
    },
];
