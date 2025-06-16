'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Navbar from '@/components/Navbar'

export default function Create() {
  const [form, setForm] = useState({
    name: '',
    price: '',
    imageUrl: '',
    prompt: '',
  })
  const [loading, setLoading] = useState(false)
  const [generating, setGenerating] = useState(false)
  const router = useRouter()

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleGenerate = async () => {
    if (!form.name) {
      alert('Please enter a product name to generate a prompt.')
      return
    }

    setGenerating(true)
    const res = await fetch('/api/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name: form.name }),
    })

    if (res.ok) {
      const data = await res.json()
      setForm({ ...form, prompt: data.description })
    } else {
      alert('Failed to generate prompt')
    }
    setGenerating(false)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    const res = await fetch('/api/products', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
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
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="w-full max-w-lg bg-white shadow-xl rounded-xl p-8">
          <h1 className="text-3xl font-bold text-blue-600 mb-6">Create New Product</h1>
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Product Name */}
            <div>
              <label className="block text-sm font-medium text-gray-800">Product Name</label>
              <input
                name="name"
                placeholder="iPhone 15"
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded-lg px-4 py-2 mt-1 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400"
              />
            </div>

            {/* Price */}
            <div>
              <label className="block text-sm font-medium text-gray-800">Price (₹)</label>
              <input
                name="price"
                type="number"
                placeholder="99999"
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded-lg px-4 py-2 mt-1 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400"
              />
            </div>

            {/* Image URL */}
            <div>
              <label className="block text-sm font-medium text-gray-800">Image URL</label>
              <input
                name="imageUrl"
                placeholder="https://example.com/image.jpg"
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded-lg px-4 py-2 mt-1 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400"
              />
            </div>

            {/* AI Prompt */}
            <div>
              <label className="block text-sm font-medium text-gray-800 flex justify-between">
                AI Prompt
                <button
                  type="button"
                  onClick={handleGenerate}
                  disabled={generating}
                  className="text-blue-500 hover:underline text-xs"
                >
                  {generating ? 'Generating...' : 'Generate'}
                </button>
              </label>
              <textarea
                name="prompt"
                placeholder="Write a catchy description for iPhone 15..."
                onChange={handleChange}
                value={form.prompt}
                required
                className="w-full border border-gray-300 rounded-lg px-4 py-2 mt-1 resize-none text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400"
                rows={4}
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Creating...' : 'Create Product'}
            </button>
          </form>
        </div>
      </div>
    </>
  )
}
