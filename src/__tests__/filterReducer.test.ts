import filterReducer from '../redux/features/filterSlice'

describe('filterReducer', () => {
  it('should return default state when passed an empty action', () => {
    const result = filterReducer(undefined, { type: '' })
    expect(result).toEqual({
      all_products: [],
      filtered_products: [],
      filters: {
        category: 'all',
        max_price: 0,
        min_price: 0,
        price: 0,
        text: '',
      },
      grid_view: true,
      sort: 'price-lowest',
    })
  })
})
