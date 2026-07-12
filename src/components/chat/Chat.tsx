'use client'
import { useEffect, useRef, useState } from 'react'

import { useChat } from '@ai-sdk/react'
import { HiOutlineChatBubbleLeftRight } from 'react-icons/hi2'
import { IoSend } from 'react-icons/io5'
import styled from 'styled-components'

import { Product } from '@/shared/types/productsType'

import { Cursor, Header, EmptyState } from './index'

const Chat = ({ product }: { product: Product | null }) => {
  const [input, setInput] = useState('')
  const { messages, sendMessage, status } = useChat()
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const lastMessage = messages[messages.length - 1]
  const isDisabled = !product || !input.trim()

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: 'smooth',
    })
  }, [messages])

  const isStreamingMessage = (message: any, index: number) => {
    if (message.role !== 'assistant' || index !== messages.length - 1) {
      return false
    }

    const hasStreamingPart = message.parts.some(
      (part: any) =>
        (part.type === 'text' || part.type === 'reasoning') &&
        part.state === 'streaming'
    )

    return status === 'streaming' || status === 'submitted' || hasStreamingPart
  }

  const shouldShowTypingPlaceholder =
    (status === 'streaming' || status === 'submitted') &&
    (!lastMessage ||
      lastMessage.role === 'user' ||
      !isStreamingMessage(lastMessage, messages.length - 1))

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (isDisabled) return

    sendMessage({
      text: input,
      metadata: {
        product,
      },
    })

    setInput('')
  }

  return (
    <Container>
      <Header>
        <span>🤖</span>
        <div>
          <strong>Product Assistant</strong>
          <small>Ask anything about this product</small>
        </div>
      </Header>

      <MessagesContainer>
        {messages.length === 0 ? (
          <EmptyState>
            <HiOutlineChatBubbleLeftRight size={56} />
            <p>Hi! 👋 Ask a question about the product</p>
          </EmptyState>
        ) : (
          <>
            {messages.map((message, messageIndex) => {
              const isStreaming = isStreamingMessage(message, messageIndex)

              return (
                <Message
                  key={message.id}
                  $isUser={message.role === 'user'}
                  $isStreaming={isStreaming}
                >
                  <div>
                    {message.parts.map((part: any, i: number) => {
                      if (part.type === 'text' || part.type === 'reasoning') {
                        return (
                          <span key={`${message.id}-${i}`}>{part.text}</span>
                        )
                      }
                      return null
                    })}
                    {isStreaming && <Cursor />}
                  </div>
                </Message>
              )
            })}
            {shouldShowTypingPlaceholder && (
              <Message key="typing-placeholder" $isUser={false} $isStreaming>
                <div>
                  <Cursor />
                </div>
              </Message>
            )}
            <div ref={messagesEndRef} />
          </>
        )}
      </MessagesContainer>

      <FormContainer onSubmit={handleSubmit}>
        <Input
          value={input}
          placeholder="Your question..."
          onChange={e => setInput(e.currentTarget.value)}
          disabled={!product}
        />
        <SendButton type="submit" disabled={isDisabled}>
          <IoSend size={20} />
        </SendButton>
      </FormContainer>
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  max-height: 650px;
  background: #121418;
  border: 1px solid var(--clr-secondary-2);
  overflow: hidden;

  box-shadow:
    0 20px 50px rgba(0, 0, 0, 0.35),
    inset 0 1px var(--clr-secondary-5);
`

const MessagesContainer = styled.div`
  flex: 1;
  padding: 24px;
  overflow: auto;
  display: flex;
  flex-direction: column;
  gap: 18px;
  background: linear-gradient(180deg, #17191f, #111317);
`

const Message = styled.div<{ $isUser: boolean; $isStreaming: boolean }>`
  display: flex;
  align-items: flex-end;
  gap: 0.75rem;
  color: ${({ $isUser }) => ($isUser ? 'var(--clr-primary-1)' : 'white')};

  flex-direction: ${({ $isUser }) => ($isUser ? 'row-reverse' : 'row')};

  animation: fadeUp 0.25s ease;

  @keyframes fadeUp {
    from {
      opacity: 0;
      transform: translateY(10px);
    }

    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`

const FormContainer = styled.form`
  display: flex;
  gap: 0.5rem;
  padding: 1rem;
  background: var(--clr-secondary-6);
  backdrop-filter: blur(10px);
  border-top: 1px solid var(--clr-secondary-6);
`

const Input = styled.input`
  flex: 1;
  padding: 15px 20px;
  background: #23272f;
  color: white;
  border: 1px solid transparent;
  border-radius: 999px;
  font-size: 15px;
  transition: 0.25s;

  &::placeholder {
    color: #8b95a7;
  }

  &:focus {
    border-color: #4f8cff;
    background: #292e38;
    box-shadow: 0 0 0 4px rgba(79, 140, 255, 0.15);
  }
`

const SendButton = styled.button`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: var(--clr-primary-1);
  color: white;
  cursor: pointer;
  transition: 0.25s;

  &:hover {
    transform: translateY(-2px) scale(1.05);

    background: #4b91ff;
  }
`

export default Chat
