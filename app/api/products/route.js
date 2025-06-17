// src/app/api/products/route.js

import db from '@/lib/db';
import { NextResponse } from 'next/server';

export async function GET(req) {
  try {
    // Change this to match your db schema
    const products = await db.product.findMany({});
    return NextResponse.json(products);
  } catch (error) {
    console.error(error);
    return NextResponse.json({error:'Failed to fetch products'}, {status: 500});
  }
}
