import modalReducer, {
  openModal,
  closeModal,
} from '@/redux/features/modalSlice'

describe('modalSlice', () => {
  it('should handle openModal', () => {
    const initialState = { isOpen: false }

    const nextState = modalReducer(initialState, openModal())

    expect(nextState.isOpen).toEqual(true)
  })

  it('should handle closeModal', () => {
    const initialState = { isOpen: true }

    const nextState = modalReducer(initialState, closeModal())

    expect(nextState.isOpen).toEqual(false)
  })

  it('should return the initial state if no action is provided', () => {
    const initialState = { isOpen: false }

    const nextState = modalReducer(initialState, {
      type: undefined,
    })

    expect(nextState).toEqual(initialState)
  })
})
