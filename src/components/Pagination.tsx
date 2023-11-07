import React from 'react'
import Link from 'next/link'

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

  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i)
  }

  return (
    <nav className='flex justify-center'>
      <ul className='join mb-16'>
        {pageNumbers.map((number) => (
          <li
            key={number}
            className='btn btn-xs sm:btn-md border-none join-item'
          >
            <Link
              onClick={() => paginate(number)}
              href='/rooms'
              className='page-link'
            >
              {number}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  )
}

export default Pagination
