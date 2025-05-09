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

// Generate a larger set of mock products for pagination
export const mockProduct = [
    {
        id: "1",
        name: "Oxford Classic",
        slug: "oxford-classic",
        price: 189,
        color: "Brown",
        category: "Oxfords",
        image: "/placeholder.svg?height=600&width=600",
    },
    {
        id: "2",
        name: "Milano Loafer",
        slug: "milano-loafer",
        price: 165,
        color: "Tan",
        category: "Loafers",
        image: "/placeholder.svg?height=600&width=600",
    },
    {
        id: "3",
        name: "Urban Boot",
        slug: "urban-boot",
        price: 219,
        color: "Black",
        category: "Boots",
        image: "/placeholder.svg?height=600&width=600",
    },
    {
        id: "4",
        name: "Classic Derby",
        slug: "classic-derby",
        price: 179,
        color: "Black",
        category: "Oxfords",
        image: "/placeholder.svg?height=600&width=600",
    },
    {
        id: "5",
        name: "Casual Sneaker",
        slug: "casual-sneaker",
        price: 149,
        color: "White",
        category: "Sneakers",
        image: "/placeholder.svg?height=600&width=600",
    },
    {
        id: "6",
        name: "Penny Loafer",
        slug: "penny-loafer",
        price: 175,
        color: "Brown",
        category: "Loafers",
        image: "/placeholder.svg?height=600&width=600",
    },
    {
        id: "7",
        name: "Chelsea Boot",
        slug: "chelsea-boot",
        price: 229,
        color: "Brown",
        category: "Boots",
        image: "/placeholder.svg?height=600&width=600",
    },
    {
        id: "8",
        name: "Wingtip Oxford",
        slug: "wingtip-oxford",
        price: 199,
        color: "Tan",
        category: "Oxfords",
        image: "/placeholder.svg?height=600&width=600",
    },
    {
        id: "9",
        name: "Suede Loafer",
        slug: "suede-loafer",
        price: 185,
        color: "Navy",
        category: "Loafers",
        image: "/placeholder.svg?height=600&width=600",
    },
    {
        id: "10",
        name: "Desert Boot",
        slug: "desert-boot",
        price: 159,
        color: "Beige",
        category: "Boots",
        image: "/placeholder.svg?height=600&width=600",
    },
    {
        id: "11",
        name: "Leather Sneaker",
        slug: "leather-sneaker",
        price: 139,
        color: "Black",
        category: "Sneakers",
        image: "/placeholder.svg?height=600&width=600",
    },
    {
        id: "12",
        name: "Cap Toe Oxford",
        slug: "cap-toe-oxford",
        price: 195,
        color: "Dark Brown",
        category: "Oxfords",
        image: "/placeholder.svg?height=600&width=600",
    },
    {
        id: "13",
        name: "Tassel Loafer",
        slug: "tassel-loafer",
        price: 170,
        color: "Burgundy",
        category: "Loafers",
        image: "/placeholder.svg?height=600&width=600",
    },
    {
        id: "14",
        name: "Chukka Boot",
        slug: "chukka-boot",
        price: 189,
        color: "Tan",
        category: "Boots",
        image: "/placeholder.svg?height=600&width=600",
    },
    {
        id: "15",
        name: "Canvas Sneaker",
        slug: "canvas-sneaker",
        price: 119,
        color: "Gray",
        category: "Sneakers",
        image: "/placeholder.svg?height=600&width=600",
    },
    {
        id: "16",
        name: "Monk Strap",
        slug: "monk-strap",
        price: 209,
        color: "Black",
        category: "Dress Shoes",
        image: "/placeholder.svg?height=600&width=600",
    },
    {
        id: "17",
        name: "Driving Moccasin",
        slug: "driving-moccasin",
        price: 145,
        color: "Tan",
        category: "Loafers",
        image: "/placeholder.svg?height=600&width=600",
    },
    {
        id: "18",
        name: "Work Boot",
        slug: "work-boot",
        price: 249,
        color: "Brown",
        category: "Boots",
        image: "/placeholder.svg?height=600&width=600",
    },
    {
        id: "19",
        name: "Slip-On Sneaker",
        slug: "slip-on-sneaker",
        price: 129,
        color: "Navy",
        category: "Sneakers",
        image: "/placeholder.svg?height=600&width=600",
    },
    {
        id: "20",
        name: "Brogue Oxford",
        slug: "brogue-oxford",
        price: 215,
        color: "Tan",
        category: "Oxfords",
        image: "/placeholder.svg?height=600&width=600",
    },
    {
        id: "21",
        name: "Bit Loafer",
        slug: "bit-loafer",
        price: 195,
        color: "Black",
        category: "Loafers",
        image: "/placeholder.svg?height=600&width=600",
    },
    {
        id: "22",
        name: "Hiking Boot",
        slug: "hiking-boot",
        price: 239,
        color: "Brown",
        category: "Boots",
        image: "/placeholder.svg?height=600&width=600",
    },
    {
        id: "23",
        name: "Leather Trainer",
        slug: "leather-trainer",
        price: 159,
        color: "White",
        category: "Sneakers",
        image: "/placeholder.svg?height=600&width=600",
    },
    {
        id: "24",
        name: "Patent Leather Oxford",
        slug: "patent-leather-oxford",
        price: 225,
        color: "Black",
        category: "Dress Shoes",
        image: "/placeholder.svg?height=600&width=600",
    },
];
