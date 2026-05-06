'use client'
import { useEffect, useRef, useState } from 'react'

import { useChat } from '@ai-sdk/react'
import styled from 'styled-components'

import { Product } from '@/shared/types/productsType'

const Chat = ({ product }: { product: Product | null }) => {
  const [input, setInput] = useState('')
  const { messages, sendMessage, status } = useChat()
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
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

    return status === 'streaming' || hasStreamingPart
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!product || !input.trim()) return

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
      <Header>💬 Product Assistant</Header>

      <MessagesContainer>
        {messages.length === 0 ? (
          <EmptyState>
            <svg
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
              />
            </svg>
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
                    {isStreaming && <TypingCursor />}
                  </div>
                </Message>
              )
            })}
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
        <SendButton type="submit" disabled={!product || !input.trim()}>
          ➤
        </SendButton>
      </FormContainer>
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  max-height: 600px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
`

const Header = styled.div`
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  padding: 1rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
  color: white;
  font-weight: 600;
  font-size: 0.95rem;
  text-align: center;
`

const MessagesContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  overflow-y: auto;
  padding: 1rem;
  gap: 0.75rem;

  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-track {
    background: rgba(255, 255, 255, 0.1);
    border-radius: 10px;
  }

  &::-webkit-scrollbar-thumb {
    background: rgba(255, 255, 255, 0.3);
    border-radius: 10px;

    &:hover {
      background: rgba(255, 255, 255, 0.5);
    }
  }
`

const Message = styled.div<{ $isUser: boolean; $isStreaming?: boolean }>`
  display: flex;
  justify-content: ${props => (props.$isUser ? 'flex-end' : 'flex-start')};
  margin-bottom: 0;

  > div {
    max-width: 80%;
    padding: 0.75rem 1rem;
    border-radius: 12px;
    word-wrap: break-word;
    white-space: pre-wrap;
    font-size: 0.9rem;
    line-height: 1.4;
    background: ${props =>
      props.$isUser ? 'rgba(255, 255, 255, 0.9)' : 'rgba(255, 255, 255, 0.2)'};
    color: ${props => (props.$isUser ? '#333' : 'white')};
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    position: relative;
  }
`

const TypingCursor = styled.span`
  display: inline-block;
  width: 0.55rem;
  height: 1rem;
  margin-left: 0.25rem;
  vertical-align: bottom;
  background: currentColor;
  border-radius: 999px;
  animation: blink 1s steps(2, start) infinite;

  @keyframes blink {
    to {
      visibility: hidden;
    }
  }
`

const FormContainer = styled.form`
  display: flex;
  gap: 0.5rem;
  padding: 1rem;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-top: 1px solid rgba(255, 255, 255, 0.2);
`

const Input = styled.input`
  flex: 1;
  padding: 0.75rem 1rem;
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 24px;
  background: rgba(255, 255, 255, 0.95);
  color: #333;
  font-size: 0.9rem;
  outline: none;
  transition: all 0.2s ease;

  &:focus {
    background: white;
    border-color: rgba(255, 255, 255, 0.6);
    box-shadow: 0 0 0 3px rgba(255, 255, 255, 0.2);
  }

  &::placeholder {
    color: #999;
  }
`

const SendButton = styled.button`
  padding: 0.75rem 1.5rem;
  background: rgba(255, 255, 255, 0.9);
  color: #667eea;
  border: none;
  border-radius: 24px;
  font-weight: 600;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background: white;
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  }

  &:active {
    transform: translateY(0);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`

const EmptyState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  color: rgba(255, 255, 255, 0.7);
  text-align: center;
  padding: 2rem;
  font-size: 0.95rem;

  svg {
    width: 3rem;
    height: 3rem;
    margin-bottom: 1rem;
    opacity: 0.5;
  }
`

export default Chat
