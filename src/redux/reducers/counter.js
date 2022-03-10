const initial_state = {
    count: 0
}


const counterReducer = (state = initial_state, action) => {

    if (action.type === "INCREMENT_COUNTER") {
        return {
            ...state,
            count: state.count + 1
        }
    }
    else if (action.type === "DECREMENT_COUNTER") {
        return {
            ...state,
            count: state.count - 1
        }
    }
    else if (action.type === "RESET_COUNTER") {
        return initial_state
    }
    else if (action.type === "SET_COUNTER") {
        return {
            ...state,
            count: action.payLoad
        }
    }
    return state
}
export default counterReducer