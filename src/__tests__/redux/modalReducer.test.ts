import modalReducer, {
  openModal,
  closeModal,
} from '@/redux/features/modalSlice'

describe('modalSlice', () => {
  const initialState = {
    isOpen: false,
  }

  it('should return the initial state when passed an empty action', () => {
    const result = modalReducer(undefined, { type: '' })
    expect(result).toEqual(initialState)
  })

  it('should handle openModal', () => {
    const state = modalReducer(initialState, openModal())
    expect(state).toEqual({ isOpen: true })
  })

  it('should handle closeModal', () => {
    const state = { isOpen: true }
    const result = modalReducer(state, closeModal())
    expect(result).toEqual({ isOpen: false })
  })

  it('should handle openModal and closeModal in sequence', () => {
    let state = modalReducer(initialState, openModal())
    expect(state).toEqual({ isOpen: true })

    state = modalReducer(state, closeModal())
    expect(state).toEqual({ isOpen: false })
  })
})
