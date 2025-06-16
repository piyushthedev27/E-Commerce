import { NextResponse } from 'next/server'
import { generateDescription } from '@/lib/gemini'

export async function POST(req) {
  const { name } = await req.json()

  if (!name) {
    return NextResponse.json({ error: 'Product name is required' }, { status: 400 })
  }

  const description = await generateDescription(name)
  return NextResponse.json({ description })
}
