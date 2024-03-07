import React from 'react'
import { Button } from 'react-bootstrap';

const WeatherButton = ({cities, selectedCity, setCity}) => {
  return (
    <div>
      <Button 
      className="no-hover"
      variant={selectedCity == ''? "outline-warning" :"warning"}
      onClick={()=>setCity('')}
      >Current Location</Button>

      { cities.map((city, index) =>
          <Button 
            className ="no-hover"
            variant={selectedCity==city ? "outline-warning" : "warning"}
            key={index}
            onClick={()=>setCity(city)}
            >{city}</Button>
      )}
    </div>
  )
}

export default WeatherButton
