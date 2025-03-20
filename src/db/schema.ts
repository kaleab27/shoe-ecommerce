import {
    integer,
    pgTable,
    varchar,
    decimal,
    json,
    boolean,
    timestamp,
    uuid,
} from "drizzle-orm/pg-core";

export const productCategoriesTable = pgTable("product_categories", {
    id: uuid().primaryKey().defaultRandom(),
    name: varchar({ length: 255 }).notNull(),
    description: varchar({ length: 1024 }),
    createdAt: timestamp().defaultNow(),
});

export const productsTable = pgTable("products", {
    id: uuid().primaryKey().defaultRandom(),
    name: varchar({ length: 255 }).notNull(),
    categoryId: uuid()
        .notNull()
        .references(() => productCategoriesTable.id),
    brand: varchar({ length: 100 }),
    basePrice: decimal().notNull(),
    discountedPrice: decimal(),
    description: varchar({ length: 1024 }),
    stockStatus: varchar({ length: 50 }).default("In Stock"),
    images: json(),
    variations: json(),
    createdAt: timestamp().defaultNow(),
});

export const discountsTable = pgTable("discounts", {
    id: uuid().primaryKey().defaultRandom(),
    discountType: varchar({ length: 20 }).notNull(), // percentage or fixed
    discountValue: decimal().notNull(),
    startDate: timestamp().notNull().defaultNow(),
    endDate: timestamp().notNull(),
    categoryId: uuid().references(() => productCategoriesTable.id),
    productId: uuid().references(() => productsTable.id),
    active: boolean().default(true),
    createdAt: timestamp().defaultNow(),
});

export const inventoryTable = pgTable("inventory", {
    id: uuid().primaryKey().defaultRandom(),
    productId: uuid()
        .notNull()
        .references(() => productsTable.id),
    variations: json().notNull(),
    stock: json().notNull(),
    createdAt: timestamp().defaultNow(),
});

export const ordersTable = pgTable("orders", {
    id: uuid().primaryKey().defaultRandom(),
    userId: integer().notNull(),
    phoneNumber: varchar({ length: 20 }).notNull(),
    totalAmount: decimal().notNull(),
    status: varchar({ length: 50 }).default("Pending"), // Order status (Pending, Shipped, Delivered, etc.)
    shippingAddress: varchar({ length: 1024 }).notNull(),
    paymentStatus: varchar({ length: 50 }).default("Incomplete"), // Payment status (Incomplete, Complete)
    createdAt: timestamp().defaultNow(),
    updatedAt: timestamp().defaultNow(),
});

export const orderItemsTable = pgTable("order_items", {
    id: uuid().primaryKey().defaultRandom(),
    orderId: uuid()
        .notNull()
        .references(() => ordersTable.id),
    productId: uuid()
        .notNull()
        .references(() => productsTable.id),
    quantity: integer().notNull(),
    variation: json().notNull(),
    price: decimal().notNull(),
    totalPrice: decimal().notNull(),
    createdAt: timestamp().defaultNow(),
});
