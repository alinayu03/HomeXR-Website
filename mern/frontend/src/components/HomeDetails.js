import { useHomesContext } from "../hooks/useHomesContext"
import { useAuthContext } from "../hooks/useAuthContext"

import formatDistanceToNow from "date-fns/formatDistanceToNow"

const HomeDetails = ({ home }) => {
    const { dispatch } = useHomesContext()
    const { user } = useAuthContext()
    
    const handleClick = async () => {
        if (!user) {
            return
        }

        const response = await fetch('/api/homes/' + home._id, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${user.token}`
            }
        })
        const json = await response.json()

        if (response.ok) {
            dispatch({type: 'DELETE_HOME', payload: json})
        }
    }
    return (
        <div className="home-details">
            <h4>{home.title}</h4>
            <p><strong>Load (kg): </strong>{home.load}</p>
            <p><strong>Reps: </strong>{home.reps}</p>
            <p>{formatDistanceToNow(new Date(home.createdAt), { addSuffix: true })}</p>
            <span className="material-symbols-outlined" onClick={handleClick}>delete</span>
        </div>
    )
}

export default HomeDetails