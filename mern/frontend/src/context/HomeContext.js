import { createContext, useReducer } from 'react'

export const HomesContext = createContext()

export const homesReducer = (state, action) => {
    switch (action.type) {
        case 'SET_HOMES':
            return {
                homes: action.payload
            }
        case 'CREATE_HOME':
            return {
                homes: [action.payload, ...state.homes]
            }
        case 'DELETE_HOME':
            return {
                homes: state.homes.filter((w) => w._id !== action.payload._id)
            }
        default:
            return state
    }
} 

export const HomesContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(homesReducer, {
        homes: null
    })

    return (
        <HomesContext.Provider value={{...state, dispatch}}>
            { children }
        </HomesContext.Provider>
    )
}

