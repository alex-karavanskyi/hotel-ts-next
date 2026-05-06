import { openai } from '@ai-sdk/openai'
import { streamText, UIMessage, convertToModelMessages } from 'ai'

type Product = {
  name: string
  description: string
  price: string
  category: string
}

type ChatMessage = UIMessage & {
  metadata?: {
    product?: Product
  }
}

export async function POST(req: Request) {
  const { messages }: { messages: ChatMessage[] } = await req.json()

  const lastMessage = messages[messages.length - 1]
  const product = lastMessage?.metadata?.product
  const systemMessage: Omit<UIMessage, 'id'> | null = product
    ? {
        role: 'system',
        parts: [
          {
            type: 'text',
            text: `
You are an assistant helping with a product.

Product:
Name: ${product.name}
Description: ${product.description}
Price: ${product.price}
Category: ${product.category}

Answer only about this product.
Be helpful and concise.
          `,
          },
        ],
      }
    : null

  const result = streamText({
    model: openai('o4-mini'),
    messages: await convertToModelMessages(
      systemMessage ? [systemMessage, ...messages] : messages
    ),
  })

  return result.toUIMessageStreamResponse()
}
