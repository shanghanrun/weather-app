import React from 'react'

const WeatherBox = ({weather}) => {
  const f = weather? weather.main.temp *1.8 +32 : null;
  return (
    <div className='weather-box'>
        <div>{weather?.name}</div>
        <h2>{weather?.main.temp}C / {f}F</h2>
        <h3>{weather?.weather[0].description}</h3>
    </div>
  )
}

export default WeatherBox