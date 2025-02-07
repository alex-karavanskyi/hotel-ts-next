import { NextResponse } from 'next/server'

const Airtable = require('airtable-node')

const airtable = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY })
  .base(process.env.AIRTABLE_BASE_ID)
  .table(process.env.AIRTABLE_TABLE_NAME)

export async function GET(req: Request) {
  try {
    const response = await airtable.list({ maxRecords: 200 })

    const products = response.records.map((product: any) => {
      const { id, fields } = product
      const { name, price, description, category, images } = fields
      return {
        id,
        name,
        price,
        description,
        category,
        image: images?.[0]?.url || null,
      }
    })

    return NextResponse.json(products)
  } catch (error) {
    console.error('Error fetching products:', error)
    return NextResponse.json(
      { message: 'Failed to fetch products' },
      { status: 500 }
    )
  }
}
