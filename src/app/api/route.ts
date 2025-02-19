import Airtable, { FieldSet, Records } from 'airtable'
import { NextResponse } from 'next/server'
import { Products } from '@/types/productsType'

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

    const products: Products[] = records.map((record) => {
      const { id, fields } = record
      const { name, price, image, description, category, images } =
        fields as any

      return {
        id,
        name: name || 'Unnamed Product',
        price: price || 0,
        description: description || 'No description available',
        category: category || 'Uncategorized',
        image: images?.[0]?.url || '/placeholder.jpg',
        images: images?.map((img: { url: string }) => img.url) || [],
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
