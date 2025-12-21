import { useRouter } from 'next/navigation'

import { useDebouncedCallback } from 'use-debounce'

export const useDebouncedUpdateFilters = () => {
  const { replace } = useRouter()

  return useDebouncedCallback((updatedParams: URLSearchParams) => {
    replace(`${window.location.pathname}?${updatedParams.toString()}`, {
      scroll: false,
    })
  }, 500)
}
