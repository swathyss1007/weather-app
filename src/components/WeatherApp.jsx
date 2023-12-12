import React from 'react'

export default function WeatherApp() {

  const [place, setPlace] = React.useState("")

  const [weather, setWeather]  = React.useState(false)

  const [info, setInfo] = React.useState()

  const [search, setSearch] = React.useState(false)


  function handleSearch(event){
    return setPlace(event.target.value)
  }

  function handleSubmit(event){
    event.preventDefault()
    setWeather(true)
    setSearch(prev => !prev)
  }

  function handleReset(event){
    event.preventDefault()
    setWeather(false)
    setPlace("")
  }


  const api_key = "96c128f6e1ed8d3825c5d49dc4104a64"

  const api_url = `https://api.openweathermap.org/data/2.5/weather?q=${place}&appid=${api_key}`

  React.useEffect(() => {

    const fetchWeather =  async() => {
      if(weather){
        const response = await fetch (api_url)
        const data = await response.json()
        console.log(data)
        if(data.cod !== 200){
          alert(data.message)
          return
        }
        setInfo(data)
      }
    }

    fetchWeather()

    // cleanup function - used to ensure that we are working with latest state
    return () => {}   
  },[search]);

  

  return (
    <div>
      <div className="search-box">
        <input className='input-box' type='text' name='input-name' value={place} placeholder='Enter a city' onChange={handleSearch}></input> 
      </div>
      <div className="buttons">
        <button className='search-btn' type='submit' onClick={handleSubmit}>Search</button>  
        <button className='reset-btn' type='reset' onClick={handleReset}>Reset</button>  
      </div>
      {weather && 
        <div>
        {info ? 
          <div className="weather-details">
            <div className="place-details">
              <h4>Today</h4>
              <h1 className='place'>{info.name}, {info.sys.country}</h1>
              <img className='weather-img' src={`https://openweathermap.org/img/wn/${info.weather[0].icon}@2x.png`} alt="" />
            </div>
            <div className='weather-desc'>
              <h2>{info.main.temp}°F</h2>
              <h4 className='description'>{info.weather[0].description} </h4>
            </div>
            <div className='weather-data'>
              <div>
                <h5 className='bold'>Wind Speed</h5>
                <p>{info.wind.speed} mph</p>
              </div>
              <div>
                <h5 className='bold'>Humidity</h5>
                <p>{info.main.humidity}%</p>
              </div>
              <div>
                <h5 className='bold'>Pressure</h5>
                <p>{info.main.pressure} hPa</p>
              </div>
            </div>
            
          </div>
          : 
          <h3></h3>
        }
      </div>
      
      }
    </div>
  )
}

