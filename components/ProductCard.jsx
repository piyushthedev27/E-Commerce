export default function ProductCard({ product }) {
  return (
   <div className="group relative rounded-2xl overflow-hidden shadow-lg border border-gray-200 hover:shadow-2xl transition-shadow duration-300">
  <img
    src={product.imageUrl}
    alt={product.name}
    className="w-full h-56 object-cover transition-transform duration-300 group-hover:scale-105"
  />
  <div className="p-4 bg-white">
    <h3 className="text-xl font-bold text-gray-800 group-hover:text-blue-600 transition-colors duration-300">
      {product.name}
    </h3>
    <p className="text-gray-500 text-sm mt-1 line-clamp-2">{product.description}</p>
    <div className="mt-3 flex justify-between items-center">
      <span className="text-blue-600 font-extrabold text-lg">₹{product.price}</span>
      <button className="bg-blue-500 hover:bg-blue-600 text-white text-sm px-4 py-1.5 rounded-md transition-colors duration-300">
        Buy Now
      </button>
    </div>
  </div>
</div>

  )
}
