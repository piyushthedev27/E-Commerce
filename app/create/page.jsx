'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Navbar from '@/components/Navbar'

export default function Create() {
  const [form, setForm] = useState({ name: '', price: '', imageUrl: '', prompt: '' })
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
    try {
      const res = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: form.name })
      })
      if (res.ok) {
        const data = await res.json()
        setForm((prev) => ({
          ...prev,
          prompt: data.description,
        }))
      } else {
        alert('Failed to generate prompt')
      }
    } catch (error) {
      console.error(error)
      alert('Error generating prompt')
    } finally {
      setGenerating(false)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      const res = await fetch('/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (res.ok) {
        router.push('/')
      } else {
        alert('Error creating product')
      }
    } catch (error) {
      console.error(error)
      alert('Error creating product')
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
        <div className="w-full max-w-md bg-gray-50 shadow-md rounded-xl p-8">
          <h1 className="text-4xl font-semibold text-gray-900 mb-6">
            Create Product
          </h1>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Product Name */}
            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                Product Name
              </label>
              <input
                name="name"
                onChange={handleChange}
                required
                className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 placeholder-gray-500"
                placeholder="iPhone 15"
              />
            </div>

            {/* Product Price */}
            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                Product Price (₹)
              </label>
              <input
                name="price"
                type="number"
                onChange={handleChange}
                required
                className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 placeholder-gray-500"
                placeholder="99999"
              />
            </div>

            {/* Product Image URL */}
            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                Image URL
              </label>
              <input
                name="imageUrl"
                onChange={handleChange}
                required
                className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 placeholder-gray-500"
                placeholder="https://example.com/image.jpg"
              />
            </div>

            {/* AI Prompt */}
            <div>
              <label className="flex text-gray-700 justify-between items-center font-semibold mb-2">
                AI Prompt
                <button
                    type="button"
                    disabled={generating}
                    onClick={handleGenerate}
                    className="text-blue-500 hover:underline disabled:opacity-50 disabled:cursor-not-allowed ml-2"
                >
                    {generating ? 'Generating...' : 'Generate'}
                </button>
              </label>
              <textarea
                name="prompt"
                onChange={handleChange}
                value={form.prompt}
                required
                rows="4"
                className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 placeholder-gray-500 resize-none"
                placeholder="Write a catchy description for your product..."
              ></textarea>
            </div>

            {/* Submit Button */}
            <button
              disabled={loading}
              type="submit"
              className="w-full py-2 rounded-md bg-blue-500 hover:bg-blue-600 disabled:bg-blue-300 disabled:cursor-not-allowed font-semibold text-gray-50 transition-colors duration-300">
              {loading ? 'Creating...' : 'Create Product'}
            </button>
          </form>
        </div>
      </div>
    </>
  )
}

