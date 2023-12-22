'use client'
import React from 'react'
import Link from 'next/link'
import styled from 'styled-components'
import { useAppSelector } from '@/redux/hooks'

interface PaginationProducts {
  postsPerPage: number
  totalPosts: number
  paginate: any
}

const Pagination: React.FC<PaginationProducts> = ({
  postsPerPage,
  totalPosts,
  paginate,
}) => {
  const pageNumbers: number[] = []

  const { pagination } = useAppSelector((store) => store.pagination)

  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i)
  }

  return (
    <Wrapper>
      <ul className='flex justify-center'>
        {pageNumbers.map((number) => (
          <li
            key={number}
            className={`${
              number === pagination ? 'pagination active' : 'pagination'
            }`}
          >
            <Link
              onClick={() => paginate(number)}
              href='/rooms'
              className='flex justify-center items-center'
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
    display: grid;
    grid-template-columns: 30px;
    grid-template-rows: 30px;
  }
  .active {
    background-color: orange;
  }
`

export default Pagination
