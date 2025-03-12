import type React from "react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Product Details | NOBLEMAN",
  description: "Explore our premium handcrafted men's shoes with detailed product information.",
}

export default function ProductLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}

