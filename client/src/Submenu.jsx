import React from 'react'
import { Sidenav, Nav } from 'rsuite';
import Button from 'rsuite/Button';

export default function Submenu() {
  return (

    <div style = {{ width: 340}}>

         
    <Sidenav defaultOpenKeys={['3', '4']}>
      <Sidenav.Body>
        <Nav activeKey="1">
          <Nav.Item eventKey="1" >
            Dashboard
          </Nav.Item>
          
          
      <Nav.Menu eventKey="1" title="CKM Repository" >

          <Nav.Menu eventKey="3" title="Local" >

          <Nav.Menu eventKey="2" title = "Archetypes">
         
               

                
                <form action = "/search" method = "post">

                <Button className = "btn1" appearance="Subtle" block  type = "submit" 
                value = "local/archetypes/cluster" 
                name = "testar">
                Cluster
                </Button>
           
                </form>

                <form action = "/search" method = "post">

                <Button className = "btn1" appearance="Subtle" block  type = "submit" 
                value = "local/archetypes/composition/" 
                name = "testar">
                Composition
                </Button>
           
                </form>
                <form action = "/search" method = "post">

                <Button className = "btn1" appearance="Subtle" block  type = "submit" 
                value = "local/archetypes/demographic/" 
                name = "testar">
                Demographic
                </Button>
           
                </form>
               
                <form action = "/search" method = "post">

                <Button className = "btn1" appearance="Subtle" block  type = "submit" 
                value = "local/templates/section/" 
                name = "testar">
                Section
                </Button>
           
                </form>


         

                
                <form action = "/search" method = "post">

                <Button className = "btn1" appearance="Subtle" block  type = "submit" 
                value = "local/archetypes/entry/action/" 
                name = "testar">
                Entry/Action
                </Button>
           
                </form>

                <form action = "/search" method = "post">

                <Button className = "btn1" appearance="Subtle" block  type = "submit" 
                value = "local/archetypes/entry/admin_entry/" 
                name = "testar">
                Entry/Admin Entry
                </Button>
           
                </form>

                <form action = "/search" method = "post">

                <Button className = "btn1" appearance="Subtle" block  type = "submit" 
                value = "local/archetypes/entry/evaluation/" 
                name = "testar">
                Entry/Evaluation
                </Button>
           
                </form>

                <form action = "/search" method = "post">

                <Button className = "btn1" appearance="Subtle" block  type = "submit" 
                value = "local/archetypes/entry/instruction/" 
                name = "testar">
                Entry/Instruction
                </Button>
           
                </form>
                <form action = "/search" method = "post">

                <Button className = "btn1" appearance="Subtle" block  type = "submit" 
                value = "local/archetypes/entry/observation/" 
                name = "testar">
                Entry/Observation
                </Button>
           
                </form>
        


          

          </Nav.Menu>
          
            <Nav.Menu eventKey="2" title="Templates">

       
                <form action = "/search" method = "post">

                <Button className = "btn2" appearance="Subtle" block  type = "submit" 
                value = "/local/templates/cluster/" 
                name = "testar">
                Cluster
                </Button>
           
                </form>

                
                <form action = "/search" method = "post">

                <Button className = "btn2" appearance="Subtle" block  type = "submit" 
                value = "/local/templates/composition/" 
                name = "testar">
                Composition
                </Button>
           
                </form>

                
                

                
                <form action = "/search" method = "post">

                <Button className = "btn2" appearance="Subtle" block  type = "submit" 
                value = "/local/templates/section/" 
                name = "testar">
                Section
                </Button>
           
                </form>


                

                    <form action = "/search" method = "post">

                    <Button className = "btn2" appearance="Subtle" block  type = "submit" 
                    value = "/local/templates/entry/evaluation/" 
                    name = "testar">
                    Entry/Evaluation
                    </Button>

                    </form>


                    <form action = "/search" method = "post">

                    <Button className = "btn2" appearance="Subtle" block  type = "submit" 
                    value = "/local/templates/entry/observation/" 
                    name = "testar">
                    Entry/Observation
                    </Button>

                    </form>


                   
             


            </Nav.Menu>
        
            



          </Nav.Menu>


          <Nav.Menu eventKey = "5" title = "Remote">

                <form action = "/search" method = "post">

                  <Button className = "btn2" appearance="Subtle" block  type = "submit" 
                  value = "/remote/no.nasjonalikt/archetypes/cluster/" 
                  name = "testar">
                  no.nasjonalikt/archetypes/cluster/
                  </Button>

                </form>

                <form action = "/search" method = "post">

                  <Button className = "btn2" appearance="Subtle" block  type = "submit" 
                  value = "/remote/no.nasjonalikt/archetypes/entry/observation/" 
                  name = "testar">
                  no.nasjonalikt/archetypes/entry/observation/
                  </Button>

                </form>


                <form action = "/search" method = "post">

                  <Button className = "btn2" appearance="Subtle" block  type = "submit" 
                  value = "/remote/org.highmed/archetypes/cluster/" 
                  name = "testar">
                  org.highmed/archetypes/cluster/
                  </Button>

                </form>

                <form action = "/search" method = "post">

                  <Button className = "btn2" appearance="Subtle" block  type = "submit" 
                  value = "/remote/uk.org.clinicalmodels/archetypes/cluster/" 
                  name = "testar">
                  uk.org.clinicalmodels/archetypes/cluster/
                  </Button>

                </form>


                <form action = "/search" method = "post">

                  <Button className = "btn2" appearance="Subtle" block  type = "submit" 
                  value = "/remote/uk.org.clinicalmodels/archetypes/entry/evaluation/" 
                  name = "testar">
                  uk.org.clinicalmodels/archetypes/entry/evaluation/
                  </Button>

                </form>

                <form action = "/search" method = "post">

                  <Button className = "btn2" appearance="Subtle" block  type = "submit" 
                  value = "/remote/uk.org.clinicalmodels/archetypes/entry/observation/" 
                  name = "testar">
                  uk.org.clinicalmodels/archetypes/entry/observation/
                  </Button>

                </form>

                </Nav.Menu>
        </Nav.Menu>
          
          
        </Nav>
      </Sidenav.Body>
    </Sidenav>
    </div>
  )
}
