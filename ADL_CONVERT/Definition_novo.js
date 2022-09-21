////////////////////////////
//Archetype Definition match
////////////////////////////

import { createOntology } from "./Ontology.js"

//Needed to have both import and requires in the same file
import { Console } from "console";
import {createRequire} from "module";
const require = createRequire(import.meta.url);

const fs = require('fs');
//read data file and put into a string

var filename = "openEHR-DEMOGRAPHIC-CLUSTER.person_death_data_iso.v0.adl.txt"

try {
    const data = fs.readFileSync(filename, 'utf8')
    filename = data
  } catch (err) {
    console.error(err)
  }

export function createDefinition(dataFile){
    var objOntology = createOntology(dataFile)
    objOntology = JSON.parse(objOntology)
    
    var ontologyItems = objOntology.ontology.term_definitions.en.items


    var regexDefinition = /definition[\w\W]*ontology/
    var matchDef = regexDefinition.exec(dataFile)

    var resultadoDefinition = matchDef[0]

    console.log(resultadoDefinition)








    return objOntology

}



var cena = createDefinition(filename)


