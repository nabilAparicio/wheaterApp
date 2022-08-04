import axios from 'axios'
import React from 'react'
import { useEffect, useState } from 'react'
import Loader from './Loader'




const Card__Weather = ({ coords, changeBackground }) => {
  const [weather, setWeather] = useState()
  const [temperture, setTemperture] = useState()
  const [isCelsius, setIsCelsius] = useState(true)
  const [loading, setLoading] = useState(true)
  const [urlImg, setUrlImg] = useState()

  useEffect(() => {
    if (coords?.lat) {
      const APIkey = '8a735895b3560c7dd2ad8d685835a447'
      const URL = `https://api.openweathermap.org/data/2.5/weather?lat=${coords?.lat}&lon=${coords?.lon}&appid=${APIkey}`
      axios.get(URL)
        .then(res => {
          setWeather(res.data)
          const temp = {
            celsius: `${(res.data.main.temp - 273.15).toFixed(2)} °C`,
            farenheit: `${((res.data.main.temp - 273.15) * 9 / 5 + 32).toFixed(2)} °F`
          }
          setTemperture(temp)
          setLoading(false)
          setUrlImg(res.data.weather[0].main)
          changeBackground(res.data.weather[0].main)
        })
        .catch(err => console.log(err))
    }
  }, [coords?.lon, coords?.lat])


  const handleClick = () => {
    setIsCelsius(!isCelsius)

  }

  if (loading) {
    return <Loader />
  } else {
    return (
      <div className="card">
        <div className="card__body">
          <div className="body__img">
            <div className='card__img'>
              <img src={weather && `http://openweathermap.org/img/wn/${weather?.weather[0].icon}@4x.png`} alt="" />
            </div>
            <div className='card__grados'><h2>{isCelsius ? temperture?.celsius : temperture?.farenheit}</h2></div>
          </div>
          <div className="card__info">
            <h2>Today</h2>
            <h1>{weather?.name}, {weather?.sys.country}</h1>
            <h2>&#34; {weather?.weather[0].description} &#34;</h2>
            <ul>
              <li><span>Wind Speed: </span>{weather?.wind.speed} m/s</li>
              <li><span>Clouds: </span>{weather?.clouds.all}%</li>
              <li><span>Preasure: </span>{weather?.main.pressure} hPa</li>
            </ul>
            <button className='glass-button' onClick={handleClick}>{isCelsius ? 'Change to °F' : 'Change to °C'}</button>
          </div>
        </div>
      </div>

    )
  }
}

export default Card__Weather