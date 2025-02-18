import { NextResponse } from 'next/server'
import Airtable, { FieldSet, Records } from 'airtable'

// Типизация продукта
interface Product {
  id: string
  name: string
  price: number
  description?: string
  category?: string
  image: string
}

const base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY }).base(
  process.env.AIRTABLE_BASE_ID!
)

export async function GET() {
  try {
    const records: Records<FieldSet> = await base(
      process.env.AIRTABLE_TABLE_NAME!
    )
      .select({
        maxRecords: 200,
        fields: ['name', 'price', 'description', 'category', 'images'],
        sort: [{ field: 'name', direction: 'asc' }],
      })
      .all()

    const products: Product[] = records.map((record) => {
      const { id, fields } = record
      const { name, price, description, category, images } = fields as any

      return {
        id,
        name: name || 'Unnamed Product',
        price: price || 0,
        description: description || 'No description available',
        category: category || 'Uncategorized',
        image: images?.[0]?.url || '/placeholder.jpg',
      }
    })

    return NextResponse.json(products, {
      status: 200,
      headers: {
        'Cache-Control': 's-maxage=600, stale-while-revalidate',
      },
    })
  } catch (error) {
    console.error('❌ Error fetching products:', error)

    return NextResponse.json(
      { message: 'Failed to fetch products' },
      { status: 500 }
    )
  }
}
