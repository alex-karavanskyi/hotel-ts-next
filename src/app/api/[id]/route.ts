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

  let product = await airtable.retrieve(id)
  product = { id: product.id, ...product.fields }

  return NextResponse.json(product)
}
