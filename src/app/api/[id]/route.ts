import { NextResponse } from 'next/server'

const Airtable = require('airtable-node')

const airtable = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY })
  .base(process.env.AIRTABLE_BASE_ID)
  .table(process.env.AIRTABLE_TABLE_NAME)

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
    const product = await airtable.retrieve(id)

    if (!product?.fields) {
      return NextResponse.json(
        { message: 'Product not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({ id: product.id, ...product.fields })
  } catch (error) {
    console.error('Error fetching product:', error)
    return NextResponse.json(
      { message: 'Failed to fetch product' },
      { status: 500 }
    )
  }
}
