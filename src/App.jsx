import { useEffect, useState } from 'react'
import './App.css'
import Card__Weather from './components/Card__Weather'
import clouds from './assets/videos/Cloudss.mp4'
import snow from './assets/videos/Snow.mp4'
import clear from './assets/videos/Clear.mp4'
import rain from './assets/videos/Rain.mp4'
import thunder from './assets/videos/Thunder.mp4'


function App() {

  const [coords, setCoords] = useState()
  const [Background, setBackground] = useState()

  const changeBackground = (weather) => {
    const backgrounds = {
      'Clouds': clouds,
      'Thunderstorm': thunder,
      'Rain': rain,
      'Snow': snow,
      'Clear': clear,
    }
    const defuaultBackground = clear
    const background = backgrounds[weather] || defuaultBackground
    console.log(weather)
    setBackground(background)
  }
  useEffect(() => {
    const success = pos => {
      const latlon = {
        lat: pos.coords.latitude,
        lon: pos.coords.longitude
      }
      setCoords(latlon)
    }
    navigator.geolocation.getCurrentPosition(success)

  }, [])


  return (
    <div className="App">
      <video src={Background} autoPlay loop muted className='backgroundVideo' ></video>
      <Card__Weather coords={coords} changeBackground={changeBackground} />
    </div>
  )
}

export default App
