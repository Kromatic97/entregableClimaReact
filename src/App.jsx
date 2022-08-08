import { useEffect, useState } from 'react'
import './App.css'
import CardsWeather from './components/CardsWeather'
import LoadingScreen from './components/LoadingScreen'

function App() {

  const [coords, setCoords] = useState()
 
  
  useEffect(() => {
    const success = pos  => {
      const latlon = {
        lat: pos.coords.latitude,
        lon: pos.coords.longitude
      }
      setCoords(latlon)
    }

    navigator.geolocation.getCurrentPosition(success);
  } ,[])



  return (
    <div className="App">
        <CardsWeather lon={coords?.lon} lat={coords?.lat} />
    </div>
  )
}

export default App
