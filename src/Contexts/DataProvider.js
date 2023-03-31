import { useState, useEffect, createContext, useContext } from 'react'
import { getFirestore, getDocs, collection, doc, getDoc, addDoc, Timestamp, collectionGroup, query } from '@firebase/firestore'
import { AuthContext } from './AuthProvider'
export const DataContext = createContext()

export const DataProvider = function(props) {
    const [weathers, setWeathers] = useState([])
    const { user } = useContext(AuthContext)
    const db = getFirestore()
    console.log(weathers)
    useEffect(() => {
        async function getWeathers() {
            const weatherQuery = query(collectionGroup(db, 'weathers'))
            const querySnapshot = await getDocs(weatherQuery)
            const loadedWeathers = []
            querySnapshot.forEach((doc) => {
                loadedWeathers.push({
                    id: doc.id,
                    uid: doc.ref.parent.parent.id,
                    ...doc.data()
                })
            })
            setWeathers(loadedWeathers)
        }
        getWeathers()
    }, [])

    async function getWeather(uid, id) {
        // Get a reference to our document
        const docRef = doc(db, 'users', uid, 'weathers', id)

        // Get a snapshot of information based on our reference
        const docSnap = await getDoc(docRef)

        if (!docSnap.exists()) {
            // Throw an error, so that the catch is triggered in PostSingle
            throw new Error
        }
        
        return docSnap.data()
    }
    const apiUrl = "https://api.openweathermap.org/data/2.5/weather"
    const apiKey = "c075c1bceff9d2d511f1d16ee0cfb476"
    
    async function getWeatherData(title) {
        const response = await fetch(`${apiUrl}?q=${title}&appid=${apiKey}`)
        const data = await response.json()
        return data
    } 

    async function addWeather(title) {
        const newWeather = {
            title, // shorthand for title: title
            dateCreated: Timestamp.now(),
            username: user.displayName
        }

        const docRef = await addDoc(collection(db, 'users', user.uid, 'weather'), newWeather)

        newWeather.id = docRef.id

        setWeathers([
            newWeather,
            ...weathers
        ])

        return newWeather
    }

    const value = {
        // title: title is equivalent to:
        weathers,
        getWeather,
        getWeatherData,
        addWeather
    }

    return (
        <DataContext.Provider value={value}>
            { props.children }
        </DataContext.Provider>
    )
}