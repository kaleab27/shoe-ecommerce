import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ChevronRight } from "lucide-react";

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[80vh] bg-amber-50">
        <div className="absolute inset-0 z-0">
          <Image
            src="/placeholder.svg?height=1080&width=1920"
            alt="Hero background with men's leather shoes"
            fill
            className="object-cover"
            priority
          />
        </div>
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4 md:px-6">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-4">
            Crafted for the modern man.
          </h1>
          <p className="text-xl text-white/90 mb-8">
            PREMIUM COLLECTION AVAILABLE NOW
          </p>
          <Button className="bg-amber-800 hover:bg-amber-900 text-white px-8 py-6 text-lg rounded-none">
            Shop Collection
          </Button>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 px-4 md:px-6 max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold mb-12 text-center">
          Featured Styles
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Product 1 */}
          <div className="group">
            <div className="relative aspect-square mb-4 bg-amber-50 overflow-hidden">
              <Image
                src="/placeholder.svg?height=600&width=600"
                alt="Oxford Classic - Brown leather oxford shoes"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-medium text-lg">Oxford Classic</h3>
                <p className="text-muted-foreground">$189</p>
              </div>
              <Button
                variant="outline"
                size="sm"
                className="rounded-full h-8 w-8 p-0 border-amber-800"
              >
                <ChevronRight className="h-4 w-4 text-amber-800" />
                <span className="sr-only">View details</span>
              </Button>
            </div>
          </div>

          {/* Product 2 */}
          <div className="group">
            <div className="relative aspect-square mb-4 bg-slate-100 overflow-hidden">
              <Image
                src="/placeholder.svg?height=600&width=600"
                alt="Milano Loafer - Tan suede loafers"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-medium text-lg">Milano Loafer</h3>
                <p className="text-muted-foreground">$165</p>
              </div>
              <Button
                variant="outline"
                size="sm"
                className="rounded-full h-8 w-8 p-0 border-amber-800"
              >
                <ChevronRight className="h-4 w-4 text-amber-800" />
                <span className="sr-only">View details</span>
              </Button>
            </div>
          </div>

          {/* Product 3 */}
          <div className="group">
            <div className="relative aspect-square mb-4 bg-amber-100 overflow-hidden">
              <Image
                src="/placeholder.svg?height=600&width=600"
                alt="Urban Boot - Black leather boots"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-medium text-lg">Urban Boot</h3>
                <p className="text-muted-foreground">$219</p>
              </div>
              <Button
                variant="outline"
                size="sm"
                className="rounded-full h-8 w-8 p-0 border-amber-800"
              >
                <ChevronRight className="h-4 w-4 text-amber-800" />
                <span className="sr-only">View details</span>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Brand Story */}
      <section className="py-16 bg-amber-900 text-white">
        <div className="max-w-7xl mx-auto px-4 md:px-6 grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-4xl font-bold mb-6">
              Craftsmanship in every stitch.
            </h2>
            <p className="text-lg mb-8">
              Our shoes are handcrafted by master artisans using traditional
              techniques passed down through generations. We source the finest
              leathers and materials to ensure quality, comfort, and longevity.
            </p>
            <Button className="bg-white text-amber-900 hover:bg-amber-100 px-8 py-6 text-lg rounded-none">
              Our Story
            </Button>
          </div>
          <div className="relative aspect-square md:aspect-[4/5]">
            <Image
              src="/placeholder.svg?height=800&width=600"
              alt="Craftsman working on a leather shoe"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* Collection Grid */}
      <section className="py-16 px-4 md:px-6 max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold mb-12 text-center">
          Explore Collections
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item) => (
            <div
              key={item}
              className="relative aspect-[3/4] bg-amber-50 overflow-hidden group"
            >
              <Image
                src={`/placeholder.svg?height=600&width=450`}
                alt={`Collection image ${item}`}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
          ))}
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-16 bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-4 md:px-6 grid md:grid-cols-2 gap-12 items-center">
          <div className="relative aspect-square md:aspect-[4/3] lg:aspect-square">
            <Image
              src="/placeholder.svg?height=600&width=600"
              alt="Stylish men's shoes"
              fill
              className="object-cover"
            />
          </div>
          <div>
            <h2 className="text-4xl font-bold mb-6">Stay in the loop.</h2>
            <p className="text-lg mb-8">
              Be the first to know about new collections, exclusive offers, and
              style tips.
            </p>
            <div className="flex gap-2">
              <Input
                type="email"
                placeholder="Your email address"
                className="bg-white/10 border-white/20 text-white rounded-none"
              />
              <Button className="bg-amber-800 hover:bg-amber-700 text-white rounded-none">
                Subscribe
              </Button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
