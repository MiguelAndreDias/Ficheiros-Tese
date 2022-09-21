import React, { Component } from 'react'
import { useState } from 'react'
import axios from "axios"



export default function Weather() {
    const [Weather, setWeather] = useState("Not yet gotten")


    const handleButtonClick = () =>{

    
    axios.get("/getWeathertoronto").then(function(response) {
        //console.log(response.data.temp_c)
        console.log(response.data)
        setWeather(response.data.temp_c) 
    })
}





  return (
    <div>
        <button onClick = {handleButtonClick}> Get weather in Toronto</button>

      <h1>The Weather in toronto is: {Weather}</h1> 
      </div>
  )
}

