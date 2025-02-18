import { NextResponse } from 'next/server'
import Airtable from 'airtable'

interface Product {
  id: string
  name: string
  price: number
  description?: string
  category?: string
  images: []
}

const base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY }).base(
  process.env.AIRTABLE_BASE_ID!
)

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params

  if (!id) {
    return NextResponse.json(
      { message: 'Product ID is required' },
      { status: 400 }
    )
  }

  try {
    const record = await base(process.env.AIRTABLE_TABLE_NAME!).find(id)

    if (!record?.fields) {
      return NextResponse.json(
        { message: 'Product not found' },
        { status: 404 }
      )
    }

    const {
      name,
      price,
      description,
      category,
      images = [],
    } = record.fields as any

    const product: Product = {
      id: record.id,
      name: name || 'Unknown Product',
      price: price || 0,
      description: description || 'No description available',
      category: category || 'Uncategorized',
      images: images,
    }

    return NextResponse.json(product, {
      status: 200,
      headers: {
        'Cache-Control': 's-maxage=600, stale-while-revalidate', // Кэш на 10 минут
      },
    })
  } catch (error) {
    console.error('❌ Error fetching product:', {
      message: (error as Error).message,
      stack: (error as Error).stack,
    })

    return NextResponse.json(
      { message: 'Failed to fetch product' },
      { status: 500 }
    )
  }
}
