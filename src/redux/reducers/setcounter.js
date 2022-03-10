const initial_state = {
    count: 0
}

const countersetterReducer = (state = initial_state, action) => {
    if (action.type === "SET_COUNTER") {
        return {
            ...state,
            count: state.count = 5
        }
    }
    return state
}

export default countersetterReducer