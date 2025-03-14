import { NextResponse } from 'next/server'
import { ApiProduct } from '@/types/productsType'

const AIRTABLE_API_KEY = process.env.AIRTABLE_API_KEY
const AIRTABLE_BASE_ID = process.env.AIRTABLE_BASE_ID
const AIRTABLE_TABLE_NAME = process.env.AIRTABLE_TABLE_NAME

export async function GET() {
  try {
    const url = `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/${AIRTABLE_TABLE_NAME}?view=Grid%20view&maxRecords=28&sort[0][field]=name&sort[0][direction]=asc`

    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${AIRTABLE_API_KEY}`,
      },
      next: { revalidate: 0 },
    })

    if (!response.ok) {
      throw new Error(`Airtable API Error: ${response.statusText}`)
    }

    const { records } = await response.json()

    const data: ApiProduct[] = records.map((record: any) => ({
      id: record.id,
      name: record.fields.name,
      price: record.fields.price,
      images: record.fields.images ?? [],
      image: record.fields.images?.[0]?.url || null,
      description: record.fields.description,
      category: record.fields.category,
    }))

    return NextResponse.json(data, {
      status: 200,
      headers: { 'Cache-Control': 'no-cache, no-store, must-revalidate' },
    })
  } catch (error) {
    console.error('Error fetching data from Airtable:', error)
    return NextResponse.json({ error: 'Failed to fetch data' }, { status: 500 })
  }
}
