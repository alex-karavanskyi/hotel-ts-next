import { NextResponse } from 'next/server'

// const dotenv = require('dotenv')

// dotenv.config()

const Airtable = require('airtable-node')

const airtable = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY })
  .base(process.env.AIRTABLE_BASE_ID)
  .table(process.env.AIRTABLE_TABLE_NAME)

export async function GET(req: Request) {
  const responce = await airtable.list({ maxRecords: 200 })

  const products = responce.records.map((product: any) => {
    const { id, fields } = product
    const { name, price, description, category, images } = fields
    const { url } = images[0]
    return { id, name, price, description, category, image: url }
  })

  return NextResponse.json(products)
}
