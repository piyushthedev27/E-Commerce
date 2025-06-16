'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

export default function AdminPage() {
  const [products, setProducts] = useState([])
  const [editingId, setEditingId] = useState(null)
  const [form, setForm] = useState({ name: '', price: '', imageUrl: '', prompt: '' })
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  useEffect(() => {
    fetch('/api/products')
      .then(res => res.json())
      .then(data => setProducts(data))
  }, [])

  const startEdit = product => {
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

  const handleUpdate = async id => {
    setLoading(true)
    const res = await fetch(`/api/products/${id}`, {
      method: 'PUT',
      body: JSON.stringify(form),
    })

    if (res.ok) {
      const updated = await res.json()
      setProducts(products.map(p => (p.id === id ? updated : p)))
      cancelEdit()
    }

    setLoading(false)
  }

  const handleDelete = async id => {
    if (!confirm('Are you sure you want to delete this product?')) return
    const res = await fetch(`/api/products/${id}`, { method: 'DELETE' })
    if (res.ok) {
      setProducts(products.filter(p => p.id !== id))
    }
  }

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold mb-4">Admin Panel</h1>

      {products.map(product => (
        <div key={product.id} className="border rounded-xl p-4 shadow-md">
          {editingId === product.id ? (
            <>
              <input
                name="name"
                value={form.name}
                onChange={e => setForm({ ...form, name: e.target.value })}
                className="mb-2 w-full p-2 border"
              />
              <input
                name="price"
                type="number"
                value={form.price}
                onChange={e => setForm({ ...form, price: e.target.value })}
                className="mb-2 w-full p-2 border"
              />
              <input
                name="imageUrl"
                value={form.imageUrl}
                onChange={e => setForm({ ...form, imageUrl: e.target.value })}
                className="mb-2 w-full p-2 border"
              />
              <input
                name="prompt"
                value={form.prompt}
                onChange={e => setForm({ ...form, prompt: e.target.value })}
                placeholder="Optional: new Gemini prompt"
                className="mb-2 w-full p-2 border"
              />
              <div className="flex gap-2">
                <button
                  onClick={() => handleUpdate(product.id)}
                  className="bg-blue-600 text-white px-4 py-2 rounded"
                  disabled={loading}
                >
                  {loading ? 'Saving...' : 'Save'}
                </button>
                <button onClick={cancelEdit} className="bg-gray-300 px-4 py-2 rounded">
                  Cancel
                </button>
              </div>
            </>
          ) : (
            <>
              <img src={product.imageUrl} alt={product.name} className="w-full h-40 object-cover rounded mb-2" />
              <h3 className="text-xl font-semibold">{product.name}</h3>
              <p className="text-gray-700">{product.description}</p>
              <p className="text-blue-500 font-bold mt-1">₹{product.price}</p>
              <div className="mt-2 flex gap-2">
                <button onClick={() => startEdit(product)} className="bg-yellow-500 text-white px-4 py-1 rounded">
                  Edit
                </button>
                <button onClick={() => handleDelete(product.id)} className="bg-red-500 text-white px-4 py-1 rounded">
                  Delete
                </button>
              </div>
            </>
          )}
        </div>
      ))}
    </div>
  )
}
