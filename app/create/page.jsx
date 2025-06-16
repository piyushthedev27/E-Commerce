'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function CreateProduct() {
  const [form, setForm] = useState({
    name: '',
    price: '',
    imageUrl: '',
    prompt: '',
  })
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async e => {
    e.preventDefault()
    setLoading(true)

    const res = await fetch('/api/products', {
      method: 'POST',
      body: JSON.stringify(form),
    })

    setLoading(false)

    if (res.ok) {
      router.push('/')
    } else {
      alert('Error creating product')
    }
  }

  return (
    <div className="p-6 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Create New Product</h1>
      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          name="name"
          placeholder="Product Name"
          onChange={handleChange}
          required
          className="w-full border p-2 rounded"
        />
        <input
          name="price"
          type="number"
          placeholder="Price"
          onChange={handleChange}
          required
          className="w-full border p-2 rounded"
        />
        <input
          name="imageUrl"
          placeholder="Image URL"
          onChange={handleChange}
          required
          className="w-full border p-2 rounded"
        />
        <textarea
          name="prompt"
          placeholder="Describe the product to generate a description (e.g., Write a cool description for iPhone 15)"
          onChange={handleChange}
          required
          className="w-full border p-2 rounded"
        />
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white p-2 rounded"
        >
          {loading ? 'Creating...' : 'Create Product'}
        </button>
      </form>
    </div>
  )
}
