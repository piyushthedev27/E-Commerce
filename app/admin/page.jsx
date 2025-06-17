'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Navbar from '@/components/Navbar'

export default function AdminPage() {
  const [products, setProducts] = useState([])
  const [editingId, setEditingId] = useState(null)
  const [form, setForm] = useState({ name: '', price: '', imageUrl: '' })
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  // Fetch products on load
  useEffect(() => {
    async function fetchProducts() {
      try {
        const res = await fetch('/api/products')
        if (res.ok) {
          const data = await res.json()
          setProducts(data)
        } else {
          console.error('Failed to fetch products!', res.status)
        }
      } catch (err) {
        console.error('Error fetching!', err)
      }
    }

    fetchProducts()
  }, [])


  const startEdit = (product) => {
    setEditingId(product.id)
    setForm({ name: product.name, price: product.price, imageUrl: product.imageUrl })
  }

  const cancelEdit = () => {
    setEditingId(null)
    setForm({ name: '', price: '', imageUrl: '' })
  }

  const handleUpdate = async (id) => {
    setLoading(true)
    try {
      const res = await fetch(`/api/products/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (res.ok) {
        const updated = await res.json()
        setProducts((prev) =>
          prev.map((p) => (p.id === id ? updated : p))
        )
        cancelEdit()
      } else {
        console.error('Failed to update!', res.status)
        alert('Failed to update product.')
      }
    } catch (err) {
      console.error('Error!', err)
      alert('Error updating product.')
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this product?')) return
    try {
      const res = await fetch(`/api/products/${id}`, { method: 'DELETE' })
      if (res.ok) {
        setProducts((prev) => prev.filter((p) => p.id !== id))
      } else {
        console.error('Failed!', res.status)
        alert('Failed to delete product.')
      }
    } catch (err) {
      console.error('Error!', err)
      alert('Error while removing product.')
    }
  }

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-gray-50 py-10 px-4">
        <h1 className="text-2xl font-semibold text-blue-600 mb-6">
          Admin Dashboard
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-gray-100 p-4 rounded-md shadow-md hover:shadow-lg transition-shadow duration-500 ease-in-out border border-gray-300"
            >
              {editingId === product.id ? (
                <div className="flex flex-col gap-2">
                    <input
                    aria-label='Product Name'
                    className="p-2 border rounded-md text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={form.name}
                    onChange={(e) =>
                      setForm((prev) => ({
                        ...prev,
                        name: e.target.value,
                      }))
                    }
                    placeholder="Product Name"
                    />

                    <input
                    aria-label='Product Price'
                    className="p-2 border rounded-md text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    type="number"
                    value={form.price}
                    onChange={(e) =>
                      setForm((prev) => ({
                        ...prev,
                        price: e.target.value,
                      }))
                    }
                    placeholder="Product Price"
                    />

                    <input
                    aria-label='Product Image URL'
                    className="p-2 border rounded-md text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={form.imageUrl}
                    onChange={(e) =>
                      setForm((prev) => ({
                        ...prev,
                        imageUrl: e.target.value,
                      }))
                    }
                    placeholder="Product Image URL"
                    />

                    <div className="flex gap-2">
                      <button
                        disabled={loading}
                        onClick={() => handleUpdate(product.id)}
                        className="bg-blue-500 disabled:bg-blue-300 text-gray-50 px-4 py-2 rounded-md font-semibold hover:bg-blue-600 transition-colors duration-500 ease-in-out"
                      >
                        {loading ? 'Saving...' : 'Save'}
                      </button>
                      <button
                        disabled={loading}
                        onClick={cancelEdit}
                        className="bg-gray-500 disabled:bg-gray-400 text-gray-50 px-4 py-2 rounded-md font-semibold hover:bg-gray-600 transition-colors duration-500 ease-in-out"
                      >
                        Cancel
                      </button>
                    </div>
                </div>
              ) : (
                <div className="flex flex-col gap-2">
                    <img src={product.imageUrl} alt={product.name} className="rounded-md w-full h-40 object-cover" />

                    <h3 className="text-gray-900 font-semibold">
                      {product.name}
                    </h3>

                    <p className="text-gray-700">
                      {product.description}
                    </p>

                    <p className="text-blue-600 font-semibold">
                      ₹{product.price}
                    </p>

                    <div className="flex gap-2 mt-4">
                      <button
                        onClick={() => startEdit(product)}
                        className="bg-yellow-500 text-gray-50 px-4 py-2 rounded-md font-semibold hover:bg-yellow-600 transition-colors duration-500 ease-in-out"
                      >
                        Edit
                      </button>

                      <button
                        onClick={() => handleDelete(product.id)}
                        className="bg-red-500 text-gray-50 px-4 py-2 rounded-md font-semibold hover:bg-red-600 transition-colors duration-500 ease-in-out"
                      >
                        Delete
                      </button>
                    </div>
                </div>
              )}

            </div>
          ))}
        </div>
      </div>
    </>
  )
}

