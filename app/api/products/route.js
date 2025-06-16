import { prisma } from "@/lib/prisma";
import { generateDescription } from "@/lib/gemini";

export async function POST(req) {
  const body = await req.json();
  const { name, price, imageUrl, prompt } = body;

  const description = await generateDescription(prompt);

  const product = await prisma.product.create({
    data: {
      name,
      price: parseFloat(price),
      imageUrl,
      description,
    },
  });

  return new Response(JSON.stringify(product), { status: 201 });
}
