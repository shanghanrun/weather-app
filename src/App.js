
import './App.css';
import {useState, useEffect} from 'react';
//1. 앱이 실행되면 현재위치기반의 날씨가 보인다.
//2. 날씨정보에는 도시, 섭씨, 화씨, 날씨상태
//3. 5개의 버튼이 있다.(현재위치,  4개의 도시)
//4. 도버튼을 클릭할 때마다 도시별 날씨가 나온다.
//5. 현위치 버튼을 누르면 다시 현재위치 기반의 날씨가 나온다.
//6. 로딩스피너

function App() {
  let lat;
  let lon;
  const getCurrentLocation=()=>{
    navigator.geolocation.getCurrentPosition((position)=>{
      lat = position.coords.latitude;
      lon = position.coords.longitude;
      console.log('lat : ',lat );
      console.log('lon : ',lon )
    });
  }
  async function getWeatherData(){
    let url =`https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&appid=57efd97cdbba51882f3d280d012f05b6` 
    url = new URL(url)
    const resp = await fetch(url)
    const data = await resp.json()
    console.log('data : ',data ) 
  }
  useEffect(()=>{
    getCurrentLocation();
    getWeatherData();
  },[])
  return (
    <div className="App">
      
    </div>
  );
}

export default App;
