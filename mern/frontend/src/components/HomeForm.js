import { useState } from "react"
import { useHomesContext } from "../hooks/useHomesContext"
import { useAuthContext } from "../hooks/useAuthContext"

const HomeForm = () => {
    const { dispatch } = useHomesContext()
    const { user } = useAuthContext()
    const [title, setTitle] = useState('')
    const [load, setLoad] = useState('')
    const [files, setFiles] = useState([])
    const [error, setError] = useState(null)
    const [emptyFields, setEmptyFields] = useState([])

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!user) {
            setError('You must be logged in')
            return
        }

        const home = {title, load, files}

        const response = await fetch('/api/homes', {
            method: 'POST',
            body: JSON.stringify(home),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.token}`
            }
        })
        const json = await response.json()

        if (!response.ok) {
            setError(json.error)
            setEmptyFields(json.emptyFields)
        }
        if (response.ok) {
            setTitle('')
            setLoad('')
            setFiles([])
            setError(null)
            setEmptyFields([])
            console.log('new home added', json)
            dispatch({type: 'CREATE_HOME', payload: json})
        }
    }

    return (
        <form className="create" onSubmit={handleSubmit} enctype="multipart/form-data">
            <h3>Add a New Home</h3>

            <label>Title:</label>
            <input
                type="text"
                onChange={(e) => setTitle(e.target.value)}
                value={title}
                className={emptyFields.includes('title') ? 'error' : ''}
            />

            <label>Number:</label>
            <input
                type="number"
                onChange={(e) => setLoad(e.target.value)}
                value={load}
                className={emptyFields.includes('load') ? 'error' : ''}
            />

            <label>File:</label>
            <input
                type="file"
                onChange={(e) => setFiles(Array.from(e.target.files))}
                value={files}
                className={emptyFields.includes('files') ? 'error' : ''}
            />

            <button>Add Home</button>
            {error && <div className="error">{error}</div>}
        </form>
    )
}

export default HomeForm