import React from 'react'
import axios from "axios"
import { useState } from 'react'

export default function Form() {

    const alertThis= () => {
        alert("Sent?")
    }

    const [repo, setRepo] = useState("")
    
    const requestClick = () =>{

        const payload= { id: 1, name:' Tom'};
        axios.post({method: 'post', url: '/test', data: JSON.stringify(payload)}).then(res => res.json())
        

    }
  return (
    <div>
        <h1>SOmething</h1>
        <form action='/test' method = "post">
        <button 
        type = "submit" 
        value = "local/templates/composition/Antenatal - first visit.oet" 
        name = "justTesting"
        onClick={requestClick}>
        A button</button>

        <h1> {repo} </h1>



    </form>


    </div>
  )
}
