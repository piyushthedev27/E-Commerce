export default function ProductCard({ product }) {
  return (
    <div className="border rounded-xl p-4 shadow">
      <img src={product.imageUrl} alt={product.name} className="rounded w-full h-48 object-cover mb-2" />
      <h3 className="text-lg font-semibold">{product.name}</h3>
      <p className="text-gray-600">{product.description}</p>
      <p className="text-blue-500 font-bold mt-2">₹{product.price}</p>
    </div>
  )
}
