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


