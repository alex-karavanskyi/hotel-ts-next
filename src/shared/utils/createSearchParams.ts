import { ReadonlyURLSearchParams } from 'next/navigation'

export const createSearchParams = (searchParams: ReadonlyURLSearchParams) =>
  new URLSearchParams(searchParams.toString())
