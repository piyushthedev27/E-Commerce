// src/app/api/products/[id]/route.js

import { NextResponse } from 'next/server';
import db from '@/lib/db';
// <- db might be your Prisma instance or custom db connection

export async function PUT(req, { params }) {
  const { id } = params;
  const body = await req.json();

  try {
    // Update product in your database
    const updatedProduct = await db.product.update({ 
      where: { id }, 
      data: body 
    });

    return NextResponse.json(updatedProduct);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to update product' }, { status: 500 });
  }
}

export async function DELETE(req, { params }) {
  const { id } = params;

  try {
    await db.product.delete({ where: { id } });
    return NextResponse.json({ message: 'Product deleted successfully' });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to delete product' }, { status: 500 });
  }
}
