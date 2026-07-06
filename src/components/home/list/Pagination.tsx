'use client'
import { useEffect } from 'react'

import Link from 'next/link'

import styled from 'styled-components'

import { numberPagination } from '@/redux/features/paginationSlice'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'

interface PaginationProducts {
  postsPerPage: number
  totalPosts: number
}

const Pagination: React.FC<PaginationProducts> = ({
  postsPerPage,
  totalPosts,
}) => {
  const { pagination } = useAppSelector(store => store.pagination)

  const dispatch = useAppDispatch()

  const pageNumbers = Array.from(
    { length: Math.ceil(totalPosts / postsPerPage) },
    (_, i) => i + 1
  )

  const handleClick =
    (pageNumber: number) => (event: React.MouseEvent<HTMLAnchorElement>) => {
      event.preventDefault()
      dispatch(numberPagination(pageNumber))
    }

  useEffect(() => {
    const syncStorage = (e: StorageEvent) => {
      if (e.key === 'pagination' && e.newValue) {
        dispatch(numberPagination(Number(e.newValue)))
      }
    }
    window.addEventListener('storage', syncStorage)
    return () => window.removeEventListener('storage', syncStorage)
  }, [dispatch])

  return (
    <Container>
      <ul className="pagination__container">
        {pageNumbers.map(number => (
          <li
            key={number}
            className={`${
              number === pagination
                ? 'pagination pagination--active'
                : 'pagination'
            }`}
          >
            <Link
              onClick={handleClick(number)}
              href="/"
              className="pagination__link"
            >
              {number}
            </Link>
          </li>
        ))}
      </ul>
    </Container>
  )
}

const Container = styled.nav`
  padding: 2rem 0;
  .pagination__container {
    display: flex;
    justify-content: center;
    gap: 0.5rem;
    list-style: none;
    padding: 0;
    margin: 0;
  }
  .pagination {
    width: 2.2rem;
    height: 2.2rem;
    border: 1px solid rgba(0, 0, 0, 0.12);
    border-radius: 50%;
    overflow: hidden;
    transition:
      background-color 0.25s ease,
      border-color 0.25s ease,
      transform 0.2s ease;
    &:not(.pagination--active):hover {
      background-color: rgba(59, 130, 246, 0.12);
      border-color: rgba(59, 130, 246, 0.35);
      transform: translateY(-2px);
    }
    &.pagination--active {
      background-color: #3b82f6;
      border-color: #3b82f6;
      .pagination__link {
        color: #fff;
      }
      &:hover {
        background-color: #2563eb;
      }
    }
  }
  .pagination__link {
    display: grid;
    place-items: center;
    width: 100%;
    height: 100%;
    text-decoration: none;
    font-weight: 600;
    color: var(--clr-grey-dark);
    transition: color 0.25s ease;
  }
`

export default Pagination
