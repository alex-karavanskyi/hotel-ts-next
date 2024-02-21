'use client'
import React from 'react'
import Link from 'next/link'
import styled from 'styled-components'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { numberPagination } from '@/redux/features/paginationSlice'

interface PaginationProducts {
  postsPerPage: number
  totalPosts: number
}

const Pagination: React.FC<PaginationProducts> = ({
  postsPerPage,
  totalPosts,
}) => {
  const pageNumbers: number[] = []

  const { pagination } = useAppSelector((store) => store.pagination)

  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i)
  }

  const dispatch = useAppDispatch()

  const paginate = (
    pageNumber: number,
    event: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ) => {
    event.preventDefault()
    dispatch(numberPagination(pageNumber))
  }

  return (
    <Wrapper>
      <ul className='pagination-container'>
        {pageNumbers.map((number) => (
          <li
            key={number}
            className={`${
              number === pagination ? 'pagination active' : 'pagination'
            }`}
          >
            <Link
              onClick={(e) => paginate(number, e)}
              href='/rooms'
              className='pagination-link'
            >
              {number}
            </Link>
          </li>
        ))}
      </ul>
    </Wrapper>
  )
}

const Wrapper = styled.section`
  padding-bottom: 30px;
  .pagination {
    border: solid 1px;
    border-radius: 20%;
    display: grid;
    grid-template-columns: 30px;
    grid-template-rows: 30px;
  }
  .active {
    background-color: orange;
  }
  .pagination-container {
    display: flex;
    justify-content: center;
    gap: 0.25rem;
  }
  .pagination-link {
    display: flex;
    justify-content: center;
    align-items: center;
  }
`

export default Pagination
