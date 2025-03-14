import { NextResponse } from 'next/server'
import { ApiProduct } from '@/types/productsType'

const AIRTABLE_API_KEY = process.env.AIRTABLE_API_KEY
const AIRTABLE_BASE_ID = process.env.AIRTABLE_BASE_ID
const AIRTABLE_TABLE_NAME = process.env.AIRTABLE_TABLE_NAME

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params

    if (!id) {
      return NextResponse.json({ error: 'ID is required' }, { status: 400 })
    }

    const url = `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/${AIRTABLE_TABLE_NAME}/${id}`

    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${AIRTABLE_API_KEY}`,
      },
    })

    if (!response.ok) {
      return NextResponse.json({ error: 'Record not found' }, { status: 404 })
    }

    const record = await response.json()

    const product: ApiProduct = {
      id: record.id,
      name: record.fields.name,
      price: record.fields.price,
      images: record.fields.images ?? [],
      description: record.fields.description,
      category: record.fields.category,
    }

    return NextResponse.json(product, { status: 200 })
  } catch (error) {
    console.error('Error fetching record:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
