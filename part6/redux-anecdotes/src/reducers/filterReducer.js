export const addFilter = (data) => {
  return {
    type: 'SET_FILTER',
    payload: { filterValue: data },
  }
}

const filterReducer = (state = '', action) => {
  if (action.type == 'SET_FILTER') {
    return action.payload.filterValue
  }

  return state
}

export default filterReducer
