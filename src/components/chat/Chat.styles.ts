import styled from 'styled-components'

export const Cursor = styled.span`
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

export const Header = styled.div`
  display: flex;
  align-items: center;
  gap: 14px;

  padding: 18px 20px;

  background: #1a1d23;

  border-bottom: 1px solid rgba(255, 255, 255, 0.06);

  color: white;

  span {
    font-size: 28px;
  }

  strong {
    display: block;
    font-size: 15px;
  }

  small {
    color: #9ca3af;
  }
`

export const EmptyState = styled.div`
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
