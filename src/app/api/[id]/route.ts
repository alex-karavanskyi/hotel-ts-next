import Airtable from 'airtable'
import { NextResponse } from 'next/server'
import { Products } from '@/types/productsType'

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

    const { name, price, description, category, images } = record.fields as any

    const product: Products = {
      id: record.id,
      name: name || 'Unknown Product',
      price: price || 0,
      description: description || 'No description available',
      category: category || 'Uncategorized',
      image: images?.[0]?.url || '',
      images: images,
    }

    return NextResponse.json(product, {
      status: 200,
      headers: {
        'Cache-Control': 's-maxage=600, stale-while-revalidate',
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
