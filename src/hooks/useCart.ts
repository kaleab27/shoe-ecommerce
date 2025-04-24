import { useState, useEffect } from "react";
import { Product } from "@/lib/mock-data";

export interface CartItem {
    product: Product;
    selectedVariations: Record<string, string>;
    quantity: number;
}

export function useCart() {
    const [cartItems, setCartItems] = useState<CartItem[]>([]);
    const [isInitialized, setIsInitialized] = useState(false);

    // Load cart items from localStorage on initial render
    useEffect(() => {
        try {
            const savedCart = localStorage.getItem("cart");
            if (savedCart) {
                const parsedCart = JSON.parse(savedCart);
                setCartItems(parsedCart);
            }
        } catch (error) {
            console.error("Error loading cart from localStorage:", error);
        } finally {
            setIsInitialized(true);
        }
    }, []);

    // Save cart items to localStorage whenever they change
    useEffect(() => {
        if (isInitialized) {
            try {
                localStorage.setItem("cart", JSON.stringify(cartItems));
            } catch (error) {
                console.error("Error saving cart to localStorage:", error);
            }
        }
    }, [cartItems, isInitialized]);

    const isInCart = (
        productId: string,
        selectedVariations: Record<string, string>
    ) => {
        return cartItems.some(
            (item) =>
                item.product.id === productId &&
                Object.entries(item.selectedVariations).every(
                    ([key, value]) => selectedVariations[key] === value
                )
        );
    };

    const addToCart = (
        product: Product,
        selectedVariations: Record<string, string>,
        quantity: number
    ) => {
        setCartItems((prevItems) => {
            const existingItem = prevItems.find(
                (item) =>
                    item.product.id === product.id &&
                    Object.entries(item.selectedVariations).every(
                        ([key, value]) => selectedVariations[key] === value
                    )
            );

            if (existingItem) {
                return prevItems.map((item) =>
                    item.product.id === product.id &&
                    Object.entries(item.selectedVariations).every(
                        ([key, value]) => selectedVariations[key] === value
                    )
                        ? { ...item, quantity: item.quantity + quantity }
                        : item
                );
            }

            return [...prevItems, { product, selectedVariations, quantity }];
        });
    };

    const updateQuantity = (
        productId: string,
        selectedVariations: Record<string, string>,
        newQuantity: number
    ) => {
        if (newQuantity < 1) return;
        setCartItems((prevItems) =>
            prevItems.map((item) =>
                item.product.id === productId &&
                Object.entries(item.selectedVariations).every(
                    ([key, value]) => selectedVariations[key] === value
                )
                    ? { ...item, quantity: newQuantity }
                    : item
            )
        );
    };

    const removeItem = (
        productId: string,
        selectedVariations: Record<string, string>
    ) => {
        setCartItems((prevItems) =>
            prevItems.filter(
                (item) =>
                    !(
                        item.product.id === productId &&
                        Object.entries(item.selectedVariations).every(
                            ([key, value]) => selectedVariations[key] === value
                        )
                    )
            )
        );
    };

    const clearCart = () => {
        setCartItems([]);
        localStorage.removeItem("cart");
    };

    return {
        cartItems,
        addToCart,
        updateQuantity,
        removeItem,
        clearCart,
        isInitialized,
        isInCart,
    };
}
