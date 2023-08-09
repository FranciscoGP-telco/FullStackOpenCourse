const initialState = {
  good: 0,
  ok: 0,
  bad: 0
}

const counterReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'GOOD':
      const stateWithGoodChanged = {
        ...state,
        good: state.good + 1
      }
      state = stateWithGoodChanged
      return stateWithGoodChanged
    case 'OK':
      const stateWithOkChanged = {
        ...state,
        ok: state.ok + 1
      }
      state = stateWithOkChanged
      return stateWithOkChanged
    case 'BAD':
      const stateWithBadChanged = {
        ...state,
        bad: state.bad + 1
      }
      state = stateWithBadChanged
      return stateWithBadChanged
    case 'ZERO':
      const stateWithResetValues = {
        ...state,
        good: 0,
        ok: 0,
        bad: 0
      }
      state = stateWithResetValues
      return stateWithResetValues
    default: return state
  }
  
}

export default counterReducer
