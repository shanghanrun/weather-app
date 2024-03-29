
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {useState, useEffect} from 'react';
import WeatherBox from './component/WeatherBox';
import WeatherButton from './component/WeatherButton';
import ClipLoader from "react-spinners/ClipLoader";
//1. 앱이 실행되면 현재위치기반의 날씨가 보인다.
//2. 날씨정보에는 도시, 섭씨, 화씨, 날씨상태
//3. 5개의 버튼이 있다.(현재위치,  4개의 도시)
//4. 도버튼을 클릭할 때마다 도시별 날씨가 나온다.
//5. 현위치 버튼을 누르면 다시 현재위치 기반의 날씨가 나온다.
//6. 로딩스피너

function App() {
  const apiKey ='3b37f6cba7de33d06a1f3edc2f2fa085'
  const [weather, setWeather] = useState(null)
  const [city, setCity] = useState('')
  const cities =['Paris', 'New York', 'London', 'Seoul']
  const [loading, setLoading] =useState(false);
  const [apiError, setAPIError] = useState('')

  const getCurrentLocation=()=>{
    navigator.geolocation.getCurrentPosition((position)=>{
      let {latitude, longitude} = position.coords;   // 문자열이 아니라 숫자라서 substring안된다.
      console.log('lat : ',latitude );
      console.log('lon : ',longitude )
      getCurrentLocationWeather(latitude, longitude);
    });
  }
  async function getCurrentLocationWeather(lat, lon){
    // let url =`https://api.openweathermap.org/data/2.5/weather?lon=127.48&lat=36.62&appid=3b37f6cba7de33d06a1f3edc2f2fa085`  <=== 잘 받아짐.
    try{
      let url =`https://api.openweathermap.org/data/2.5/weather?lon=${lon}&lat=${lat}&appid=3b37f6cba7de33d06a1f3edc2f2fa085&units=metric` 
      setLoading(true)
      const resp = await fetch(url)
      const data = await resp.json()
      console.log('data : ',data ) 
      setWeather(data)
      setLoading(false)

    } catch(e){
      setAPIError(e.message)
      setLoading(false)
    }
  }

  async function getWeatherByCity(){
    // let url ='https://api.openweathermap.org/data/2.5/weather?q=London&appid={API key}'
    try{
      let url =`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
      setLoading(true)
      const resp = await fetch(url)
      const data = await resp.json()
      console.log('data : ',data ) 
      setWeather(data)
      setLoading(false)
    }catch(e){
      setAPIError(e.message)
      setLoading(false)
    }
  }

  useEffect(()=>{
    if (city ==''){
      getCurrentLocation();
    } else{
      getWeatherByCity()
    }
  },[city]);

  return (
    <div >
      {loading? (
        <div className="container">
          <ClipLoader
          color='red'
          loading={loading}
          size={150}/>
        </div>) 
        : !apiError ? (
        <div className="container">
          <WeatherBox weather={weather}/>
          <WeatherButton 
            cities={cities} 
            selectedCity={city}
            setCity={setCity} />
        </div>)
            : (apiError)}
    </div>
  );
}

export default App;
