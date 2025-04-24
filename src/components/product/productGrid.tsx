import Link from "next/link"
import Image from "next/image"
import { ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import type { Product } from "@/lib/mock-data"

interface ProductGridProps {
  products: Product[]
}

export function ProductGrid({ products }: ProductGridProps) {
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {products.map((product) => (
        <Link key={product.id} href={`/product/${product.id}`} className="group">
          <div className="relative aspect-square mb-4 bg-amber-50 overflow-hidden">
            <Image
              src={product.images[0] || "/placeholder.svg"}
              alt={product.name}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
            />
          </div>
          <div className="flex justify-between items-start">
            <div>
              <h3 className="font-medium text-lg">{product.name}</h3>
              <p className="text-muted-foreground">${product.basePrice}</p>
            </div>
            <Button variant="outline" size="sm" className="rounded-full h-8 w-8 p-0 border-amber-800">
              <ChevronRight className="h-4 w-4 text-amber-800" />
              <span className="sr-only">View details</span>
            </Button>
          </div>
        </Link>
      ))}
    </div>
  )
}
