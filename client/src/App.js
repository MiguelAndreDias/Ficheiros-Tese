import React, {useEffect, useState} from "react";
import Weather from "./Weather";
import Form from "./Form";
import Dropdown from 'rsuite/Dropdown';
import 'rsuite/dist/rsuite.min.css';
import './App.css'

//import { Navbar, Nav } from 'rsuite';

import Submenu from "./Submenu"
import { Toggle } from 'rsuite';









function App(){

    
    return (
      <div style={{ width: 240 }}>
     
        <Submenu/>

      </div>
    );
}






export default App






/*

<h1 style={{ color: 'green' }}>
                GeeksforGeeks</h1>
            <h3>React Suite Dropdown Submenu</h3>
            <Dropdown title="GeeksforGeeks">
                <Dropdown.Item>Item 1</Dropdown.Item>
                <Dropdown.Menu title="Item 2">
                    <Dropdown.Item>Item 2A</Dropdown.Item>
                    <Dropdown.Item>Item 2B</Dropdown.Item>
                </Dropdown.Menu>
                <Dropdown.Item>Item 3</Dropdown.Item>
                <Dropdown.Menu title="Item 4">
                    <Dropdown.Menu title="Item 4A">
                        <Dropdown.Item>
                        <form action='/search' method = "post">
          
          
          
          <button 
          type = "submit" 
          value = "/local/archetypes/cluster/" 
          name = "testar"
          >
          
          Cluster
          </button>
          </form>

                        </Dropdown.Item>
                        <Dropdown.Item>Item 4A-B</Dropdown.Item>
                    </Dropdown.Menu>
                    <Dropdown.Item>Item 4B</Dropdown.Item>
                </Dropdown.Menu>
  
            </Dropdown>
            <Weather/>


*/


/*



function App() {
    
    const [backendData, setBackendData] = useState([{}])
    
        useEffect(
            () => {
                fetch("/api").then(
                    response => response.json()
                ).then(
                    data => {
                        setBackendData(data)
                    }
                )
            },[])
          
return (  <div>



        {(typeof backendData.users === 'undefined') ? (
            <p>Loading...</p>
        ): (
            backendData.users.map((user, i) => (
            <p key = {i}>{user}</p>
        ))
    )}
</div>
      );
}


*/






/*


        <header className="App-header">
        <Weather/>
        <Form/>
        </header>
        <h1 style={{ color: 'green' }}>
                GeeksforGeeks</h1>
            <h3>React Suite Dropdown Submenu</h3>
            <Dropdown title="GeeksforGeeks">
                <Dropdown.Item>Item 1</Dropdown.Item>
                <Dropdown.Menu title="Item 2">
                    <Dropdown.Item>
                    
                    <form action='/search' method = "post">
        <button className="something"
        type = "submit" 
        value = "local/templates/composition/" 
        name = "testar"
        >
        A button</button>

                 </form>   
                    
                    
                    
                    </Dropdown.Item>
                    <Dropdown.Item>Item 2B</Dropdown.Item>
                </Dropdown.Menu>
                <Dropdown.Item>Item 3</Dropdown.Item>
                <Dropdown.Menu title="Item 4">
                    <Dropdown.Menu title="Item 4A">
                        <Dropdown.Item>Item 4A-A</Dropdown.Item>
                        <Dropdown.Item>Item 4A-B</Dropdown.Item>
                    </Dropdown.Menu>
                    <Dropdown.Item>Item 4B</Dropdown.Item>
                </Dropdown.Menu>
  
            </Dropdown>


*/