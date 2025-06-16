import { prisma } from "@/lib/prisma";
import ProductCard from "@/components/ProductCard";
import Navbar from "@/components/Navbar";

export default async function HomePage() {
  const products = await prisma.product.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <>
      <Navbar />
      <main className="bg-gray-50 min-h-screen py-10 px-4">
        <div className="max-w-7xl mx-auto grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </main>
    </>
  );
}
