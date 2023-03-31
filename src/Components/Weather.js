import { useContext } from "react"
import { Link } from "react-router-dom"
import { DataContext } from "../Contexts/DataProvider"
export default function Weather(props) {
    const {weatherData} = useContext(DataContext)
    return (
        <div className="weather">
            <p>{props.weather.city}</p>
            <p>{props.weather.high}</p>
            <p>{props.weather.low}</p>
            <p>{props.weather.forecast}</p>
            <p>{props.weather.humidity}</p>
            {
                (props.hideLink) ?
                <></> :
            <Link to={`/weather/${props.weather.id}`}>Read More</Link>
}
        </div>
    )
}