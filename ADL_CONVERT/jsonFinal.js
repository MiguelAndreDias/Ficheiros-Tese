import {createHeader} from "./Header.js"
import {createConcept} from "./Concept.js"
import {createLanguage} from "./Language.js"
import {createOntology} from "./Ontology.js"

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

  

export function createJson(dataFile){
    var Header = createHeader(dataFile)
    var Concept = createConcept(dataFile)
    var Language = createLanguage(dataFile)
    //var Description = createDescription(dataFile)
    //var Definition = createDefinition(dataFile)
    var Ontology = createOntology(dataFile)
    


    var objHeader = JSON.parse(Header)
    var objConcept = JSON.parse(Concept)
    var objLanguage = JSON.parse(Language)
    //var objDescription = JSON.parse(Description)
    //var objDefinition = JSON.parse(Definition)
    var objOntology = JSON.parse(Ontology)

    const mergedObject = {
      ...objHeader,
      ...objConcept,
      ...objLanguage,
      ...objOntology
      
    };
    
    
    return mergedObject

}

var resultado = createJson(filename)
console.log(resultado)