import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';
import { FontawesomeObject } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import Sun from "./icons/sun.png";
import Haze from"./icons/haze.png";
import Cloud from "./icons/cloud.png"
import Snow from "./icons/snow.png"
import Wind from "./icons/wind.png"
import Rain from "./icons/rain (1).png"
import Drop from "./icons/drop.png"
import Thunder from "./icons/thunder.png"
import Drazel from "./icons/drazel.png"








function App() {
  let [city,setCity]=useState("")
  
  let[err,setErr]=useState()
  let[pic,setPic]=useState()
  let [data,setData]=useState({
    deg:0,
    env:"--",
    humidity:"0",
    wspeed:0,
    cod:0

  })

  useEffect(()=>{
    if(data.deg==0){
      setErr("")
    }
    else{
  if(city==""){
    setErr("*Please Enter City")
  }
  else{
    
    if(data.cod==404){
    setErr("*Please Enter Valid City")
    }
    else{
      setErr("")
     
      switch(data.env){
        case"Haze":
        return setPic(Haze);
        case "Clouds":
          return setPic(Cloud);
         case "Mist":
          return setPic(Cloud); 
          case"Rain":
          return setPic(Rain);
          case "Snow":
            return setPic(Snow);
           case "Dust":
            return setPic(Wind);
            case "Fog":
            return setPic(Cloud);
            case "Smoke":
              return setPic(Cloud);
              case "Sunny":
                return setPic(Sun)
            case "Thunderstorm" :
              return setPic(Thunder)
              case "Drizzle":
                return setPic(Drazel)
              default :
              return setPic(Sun)
      }
    }
  }
}
  },[fn])
  

 

  

async function fn(){
  let fdata=await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=3f7b06d5c17127fbb11114d0dcfa45af`)
  let js=await fdata.json()
   return (js.cod==200 ? setData({cod:js.cod,deg:Math.round((js.main.temp)-273.15),
    env:(js.weather[0]).main,
  humidity:js.main.humidity,
  wspeed:js.wind.speed
    }):setData({cod:js.cod}),console.log(js))
    
  }
const search=()=>{
  fn();
  
     }


  return (
    <div className="App">
   <div className='weather-main shadow-lg'>
    <div className='search-main'>
      <input type='text' placeholder='Enter Your city'className='input  shadow' onChange={(e)=>setCity(e.target.value)} value={city} ></input>
      <button onClick={search} className='shadow-lg' ><FontAwesomeIcon icon={faSearch}/></button>
      
   
    </div>
  
    <p className='text-dark  fst-normal pt-2'>{err}</p>
  
   <div className='data-main mt-5'>
      <p className='degree'>{data.deg}&nbsp;<span>°C</span></p>
    
   
      <p className='en-type'>{data.env} <img src={pic} className=' h-25 w-25 '></img>  </p>

      <div className='d-flex justify-content-around'>
      <div className='icon'><img src={Drop} ></img> <p className='fs-3 fw-bold ' >{data.humidity}&nbsp;%<br></br><span className='  fw-medium'>Humidity</span></p></div>
       <div  className='icon' ><img src={Wind} ></img><p className='fs-3 fw-bold '>{data.wspeed}&nbsp;<span className='ms-2'>KM/h</span><br></br><span className='fw-medium'>Wind Speed</span></p></div>
      </div>
    </div> 

   </div>
    </div>
  );
  }


export default App;
