//Needed to have both import and requires in the same file
import { Console } from "console";
import {createRequire} from "module";
const require = createRequire(import.meta.url);

const fs = require('fs');


import fetch, { Headers } from 'node-fetch';
import {fileURLToPath} from 'url';
import xml2js from 'xml2js'

var filename = 'openEHR-DEMOGRAPHIC-CLUSTER.person_death_data_iso.v0.adl.txt'
//var filename = "openEHR-EHR-COMPOSITION.request.v1.adl.txt"
//var dataFile = ""





//read data file and put into a string

try {
    const data = fs.readFileSync(filename, 'utf8')
    dataFile = data
  } catch (err) {
    console.error(err)
  }




  export function matchData(regex, remove, string){
    const matchSomething = regex.exec(string)
    var resultado = matchSomething[0]
  
    resultado = resultado.replace(remove || null,'')
    resultado = resultado.replace(/<>/g, '""')
  
    resultado = resultado.replace(/=/g,':')
  
    resultado = resultado.replace(/\s>\s/g,'}')
    resultado = resultado.replace(/\s<\s/g,'{')
  
    resultado = resultado.replace(/>/g,'')
    resultado = resultado.replace(/</g,'')
  
    resultado = resultado.replace(/]/g,'')
    resultado = resultado.replace(/[[]/g,'')
    return resultado
  
  }
  





console.log("olal")

export function createJson(dataFile){
    var Header = createHeader(dataFile)
    var Concept = createConcept(dataFile)

    var objHeader = JSON.parse(Header)
    var objConcept = JSON.parse(Concept)

    const mergedObject = {
      ...objHeader,
      ...objConcept,
      
    };
    
    
    return mergedObject

}

////////////////////////
//Archetype header match
////////////////////////

export function createHeader(dataFile){
  var regexFixe = /archetype[\w\W]*?concept/
  const matchHeader = regexFixe.exec(dataFile)
  var resultadoHeader = matchHeader[0]
  resultadoHeader = resultadoHeader.replace('concept','')
  
  var regexFixe = /openEHR.+\.v\d{1}/
  var matchFixe = regexFixe.exec(resultadoHeader)
  resultadoHeader = resultadoHeader.replace(matchFixe, '"file_name":' + '"'  + matchFixe + '"' + '}}')
  
  var regexFixe = /archetype/
  var matchFixe = regexFixe.exec(resultadoHeader)
  resultadoHeader = resultadoHeader.replace(matchFixe,'{' + '"' + matchFixe + '"' + ':')
  
  
  
  var regexFixe = /[(]adl_version=/
  var matchFixe = regexFixe.exec(resultadoHeader)
  resultadoHeader = resultadoHeader.replace(matchFixe, '{"' + matchFixe[0].substring(1,12) + '"' + ':')
  
  var regexFixe = /uid/
  var matchFixe = regexFixe.exec(resultadoHeader)
  resultadoHeader = resultadoHeader.replace(matchFixe, '"' + matchFixe + '"' + ':')
  
  var regexFixe = /=[\d\D]{8}-[\d\D]{4}-[\d\D]{4}-[\d\D]{4}-[\d\D]{12}[)]/
  var matchFixe = regexFixe.exec(resultadoHeader)
  resultadoHeader = resultadoHeader.replace(matchFixe, '"' + matchFixe[0].substring(1,37) + '"' + ',')
  
  
  resultadoHeader = resultadoHeader.replace(';',',')
  return resultadoHeader
}


//console.log(createJson(dataFile))
//////////////////////////
//Archetype concept match
//////////////////////////


export function createConcept(dataFile){
  var regexFixe = /concept[\w\W]*?language/
const matchConcept = regexFixe.exec(dataFile)
var resultadoConcept = matchConcept[0]
resultadoConcept = resultadoConcept.replace('language','')

resultadoConcept = resultadoConcept.replace(/concept/, '{' + '"concept"' + ':')
resultadoConcept = resultadoConcept.replace(/\[at0000\]/, '{' + '"at0000"' + ':')


var regexFixe = /-- \D.+/
var matchFixe = regexFixe.exec(resultadoConcept)
resultadoConcept = resultadoConcept.replace(matchFixe, '"' + matchFixe[0].substring(3) + '"' + '}}')

return resultadoConcept

}











//console.log(matchData(/description[\w\W]*?definition/, "definition", dataFile))




