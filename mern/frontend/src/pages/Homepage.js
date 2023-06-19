import { useEffect } from 'react'
import { useHomesContext } from '../hooks/useHomesContext'
import { useAuthContext } from '../hooks/useAuthContext'

// components
import HomeDetails from '../components/HomeDetails'
import HomeForm from '../components/HomeForm'

const Homepage = () => {
    const {homes, dispatch} = useHomesContext()
    const {user} = useAuthContext()

    useEffect(() => {
        const fetchHomes = async () => {
            const response = await fetch('/api/homes', {
                headers: {
                    'Authorization': `Bearer ${user.token}`
                }
            })
            const json = await response.json()

            if (response.ok) {
                dispatch({type: 'SET_HOMES', payload: json})
            }
        }

        if (user) {
            fetchHomes()
        }
    }, [dispatch])

    return (
        <div className="homepage">
            <div className='homes'>
                {homes && homes.map((home) => (
                    <HomeDetails key={home._id} home={home} />
                ))}
            </div>
            <HomeForm />
        </div>
    )
}

export default Homepage