import { useAuthContext } from './useAuthContext'
import { useHomesContext } from './useHomesContext'

export const useLogout = () => {
    const { dispatch } = useAuthContext()
    const { dispatch: homesDispatch } = useHomesContext()
    
    const logout = () => {
        // remove user from storage
        localStorage.removeItem('user')

        // dispatch logout action
        dispatch({type: 'LOGOUT'})
        homesDispatch({type: 'SET_HOMES', payload: null})
    }

    return {logout}

}