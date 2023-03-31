import { useState, useContext, useEffect } from 'react'
import { DataContext } from '../Contexts/DataProvider'

export default function WeatherForm() {
    const [title, setTitle] = useState('')
    //const [body, setBody] = useState('')
    const [weatherData, setWeatherData] = useState({})
    const { addWeather } = useContext(DataContext)
    const { getWeatherData } = useContext(DataContext)

    useEffect(() => {
        async function handleLoad() {
            const data = await getWeatherData(title)
            setWeatherData(data)
            //setLoadingState("LOADED")
        } 
        handleLoad()
    }, [title])
    // async function handleSubmit(e) {
    //     e.preventDefault()
    //     const newWeather = await addWeather(title)
    //     setTitle(title)
        
    // }
    function handleSubmit(e) {
        e.preventDefault()
        setTitle(title)
        
    }


    return (
        <form onSubmit={(e) => handleSubmit(e)}>
            <div>
                <input 
                    type="text" 
                    name="title" 
                    id="title" 
                    onChange={(e) => setTitle(e.target.value)}
                    value={title}
                />
            </div>
            
            <button>Search Weather</button>
        </form>
    )
}