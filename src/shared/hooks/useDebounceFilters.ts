import { useDebouncedCallback } from 'use-debounce'
import { useRouter } from 'next/navigation'

export const useDebouncedUpdateFilters = () => {
  const { replace } = useRouter()

  return useDebouncedCallback((updatedParams: URLSearchParams) => {
    replace(`${window.location.pathname}?${updatedParams.toString()}`, {
      scroll: false,
    })
  }, 500)
}
