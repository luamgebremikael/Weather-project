import { useEffect, useState, useContext } from "react";
import Weather from '../Components/Weather'
import { DataContext } from '../Contexts/DataProvider'
import { AuthContext } from '../Contexts/AuthProvider'
import WeatherForm from '../Components/WeatherForm'


export default function Home() {
    const { weathers } = useContext(DataContext)
    const { user } = useContext(AuthContext)
    return (
        <div>
            <h1>Home</h1>
            {
                (user.loggedIn) ?
                <WeatherForm /> :
                <></>
            }
            { weathers.map((weather) => <Weather weather={weather} key={weather.city} />) }
        </div>
    )
}