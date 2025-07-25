'use client'
import Link from 'next/link'
import styled from 'styled-components'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { numberPagination } from '@/redux/features/paginationSlice'
import { useEffect } from 'react'

interface PaginationProducts {
  postsPerPage: number
  totalPosts: number
}

const Pagination: React.FC<PaginationProducts> = ({
  postsPerPage,
  totalPosts,
}) => {
  const { pagination } = useAppSelector((store) => store.pagination)

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
    <Wrapper>
      <ul className='pagination__container'>
        {pageNumbers.map((number) => (
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
              href='/'
              className='pagination__link'
            >
              {number}
            </Link>
          </li>
        ))}
      </ul>
    </Wrapper>
  )
}

const Wrapper = styled.nav`
  padding-bottom: 1.9rem;
  .pagination__container {
    display: flex;
    justify-content: center;
    gap: 0.25rem;
  }
  .pagination {
    border: solid 1px;
    border-radius: 50%;
    display: grid;
    grid-template-columns: 1.9rem;
    grid-template-rows: 1.9rem;
    transition: background 0.3s ease;
    &:hover:not(.pagination--active) {
      background: rgba(211, 211, 211, 0.2);
    }
    &.pagination--active:hover {
      background-color: rgba(234, 140, 46, 0.8);
    }
  }
  .pagination--active {
    background-color: rgba(234, 140, 46, 1);
  }
  .pagination__link {
    display: flex;
    justify-content: center;
    align-items: center;
    color: var(--clr-grey-dark);
    text-decoration: none;
    font-weight: bold;
  }
`

export default Pagination
