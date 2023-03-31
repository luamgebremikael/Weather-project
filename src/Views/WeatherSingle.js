import { useParams } from 'react-router-dom'
import { useState, useEffect, useContext } from 'react'
import Weather from '../Components/Weather'
import { DataContext } from '../Contexts/DataProvider'
export default function WeatherSingle() {
    const { id, uid } = useParams()
    const [weather, setWeather] = useState({})
    const [error, setError] = useState(false)
    const { getWeather } = useContext(DataContext)
    useEffect(() => {
        async function handleLoad() {
            try {
                const data = await getWeather(uid, id)
                setWeather(data)
            } catch(err) {
                setError(true)
            }
        }
        handleLoad()
    }, [])
    return (
        <div>
            {
                error ?
                <>
                    <h2>404 Not Found</h2>
                    <p>Weather with id {id} could not be found</p>
                </> :
                <>
                    <h1>Post Single: {id}</h1>
                    <Weather weather={weather} hideLink={true} />
                </>
            }
        </div>
    )
}