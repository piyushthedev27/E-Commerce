  'use client'

  import { useEffect, useState } from 'react'
  import { useRouter } from 'next/navigation'
  import Navbar from '@/components/Navbar'

  export default function AdminPage() {
    const [products, setProducts] = useState([])
    const [editingId, setEditingId] = useState(null)
    const [form, setForm] = useState({ name: '', price: '', imageUrl: '', prompt: '' })
    const [loading, setLoading] = useState(false)
    const router = useRouter()

  useEffect(() => {
  fetch('/api/products')
    .then(async (res) => {
      if (!res.ok) {
        console.error('Failed to fetch products:', res.status);
        return;
      }

      const data = await res.json();
      setProducts(data);
    })
    .catch((err) => {
      console.error('Error in fetch:', err.message);
    });
}, []);


    const startEdit = (product) => {
      setEditingId(product.id)
      setForm({
        name: product.name,
        price: product.price,
        imageUrl: product.imageUrl,
        prompt: '',
      })
    }

    const cancelEdit = () => {
      setEditingId(null)
      setForm({ name: '', price: '', imageUrl: '', prompt: '' })
    }

    const handleUpdate = async (id) => {
      setLoading(true)
      const res = await fetch(`/api/products/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })

      if (res.ok) {
        const updated = await res.json()
        setProducts(products.map(p => (p.id === id ? updated : p)))
        cancelEdit()
      } else {
        alert('Update failed')
      }

      setLoading(false)
    }

    const handleDelete = async (id) => {
      if (!confirm('Are you sure you want to delete this product?')) return
      const res = await fetch(`/api/products/${id}`, { method: 'DELETE' })
      if (res.ok) {
        setProducts(products.filter(p => p.id !== id))
      }
    }

    return (
      <>
      <Navbar />
      <div className="min-h-screen bg-gray-100 py-6 px-2">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-xl font-semibold text-blue-600 mb-4">Admin Dashboard</h1>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {products.map(product => (
              <div
                key={product.id}
                className="bg-white border rounded-lg p-3 text-lg shadow-sm "
              >
                {editingId === product.id ? (
                  <>
                    <input
                      name="name"
                      value={form.name}
                      onChange={e => setForm({ ...form, name: e.target.value })}
                      placeholder="Name"
                      className="w-full mb-1 p-1 border rounded text-xs"
                    />
                    <input
                      name="price"
                      type="number"
                      value={form.price}
                      onChange={e => setForm({ ...form, price: e.target.value })}
                      placeholder="Price"
                      className="w-full mb-1 p-1 border rounded text-xs"
                    />
                    <input
                      name="imageUrl"
                      value={form.imageUrl}
                      onChange={e => setForm({ ...form, imageUrl: e.target.value })}
                      placeholder="Image URL"
                      className="w-full mb-1 p-1 border rounded text-xs"
                    />
                    <input
                      name="prompt"
                      value={form.prompt}
                      onChange={e => setForm({ ...form, prompt: e.target.value })}
                      placeholder="Optional prompt"
                      className="w-full mb-2 p-1 border rounded text-xs"
                    />
                    <div className="flex gap-1 justify-end">
                      <button
                        onClick={() => handleUpdate(product.id)}
                        className="bg-blue-600 text-white text-xs px-2 py-1 rounded hover:bg-blue-700"
                        disabled={loading}
                      >
                        {loading ? 'Saving...' : 'Save'}
                      </button>
                      <button
                        onClick={cancelEdit}
                        className="bg-gray-300 text-xs px-2 py-1 rounded hover:bg-gray-400"
                      >
                        Cancel
                      </button>
                    </div>
                  </>
                ) : (
                  <>
                    <img
                      src={product.imageUrl}
                      alt={product.name}
                      className="w-full h-32 object-cover rounded mb-2"
                    />
                   <h3 className="font-sans text-lg text-gray-800">{product.name}</h3>
                    <p className="text-gray-800 line-clamp-2 ">{product.description}</p>
                    <p className="text-blue-600 font-semibold mt-1">₹{product.price}</p>
                    <div className="flex gap-1 mt-2 justify-end">
                      <button
                        onClick={() => startEdit(product)}
                        className="bg-yellow-500 text-white text-xs px-2 py-1 rounded hover:bg-yellow-600"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(product.id)}
                        className="bg-red-500 text-white text-xs px-2 py-1 rounded hover:bg-red-600"
                      >
                        Delete
                      </button>
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
      </>
    )
  }
