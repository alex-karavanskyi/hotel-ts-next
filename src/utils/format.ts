import Products from '@/types/productsType'

export const formatPrice = (number: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(number / 1)
}

export const getUniqueValues = (data: Products[], type: string) => {
  let unique = data.map((item: { [x: string]: any }) => item[type])
  if (type === 'colors') {
    unique = unique.flat()
  }
  return ['all', ...new Set(unique)]
}
