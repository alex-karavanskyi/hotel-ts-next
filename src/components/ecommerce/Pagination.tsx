'use client'
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
              onClick={(e) => paginate(number, e)}
              href='/ecommerce'
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

const Wrapper = styled.section`
  padding-bottom: 30px;
  .pagination__container {
    display: flex;
    justify-content: center;
    gap: 0.25rem;
  }
  .pagination {
    border: solid 1px;
    border-radius: 50%;
    display: grid;
    grid-template-columns: 30px;
    grid-template-rows: 30px;
  }
  .pagination--active {
    background-color: orange;
  }
  .pagination__link {
    display: flex;
    justify-content: center;
    align-items: center;
  }
`

export default Pagination
