//Needed to have both import and requires in the same file
import { Console } from "console";
import {createRequire} from "module";
const require = createRequire(import.meta.url);

const fs = require('fs');


import fetch, { Headers } from 'node-fetch';
import {fileURLToPath} from 'url';
import xml2js from 'xml2js'


//var filename = 'openEHR-DEMOGRAPHIC-CLUSTER.person_death_data_iso.v0.adl.txt'
//var dataFile = "./ficheiros/openEHR-EHR-COMPOSITION.request.v1.adl.txt"
//var dataFile = "./ficheiros/openEHR-EHR-CLUSTER.anatomical_pathology_exam.v0.adl.txt" ESTE FICHEIRO ESTÁ MAL FEITO MESMO NO CKM REPOSITORY
var dataFile = "./ficheiros/openEHR-EHR-CLUSTER.waveform.v0.adl.txt"

//var dataFile = "./ficheiros/openEHR-EHR-CLUSTER.anatomical_pathology_exam.v0.adl.txt" //VER O ONTOLO

//read data file and put into a string

try {
  const data = fs.readFileSync(dataFile, 'utf8')
  dataFile = data
} catch (err) {
  console.error(err)
}



var estruturasDV = {
  "DV_TEXT": {"value": null},

  "DV_CODED_TEXT": {"value": null},

  "DV_DURATION": {
      "value": {
          "value":null, "unit": null}},
  
  "DV_DATE_TIME": {
      "value": {
          "date": null,"time": null}},

  "DV_QUANTITY": {
      "value": {
          "value": null,"unit": null}},

  "DV_BOOLEAN": {"value": null},

  "DV_DATE": {"value": null},

  "DV_TIME": {"value": null},

  "DV_COUNT": {"value": null},

  "DV_IDENTIFIER": {"value": null},

  "DV_MULTIMEDIA": {"value": null},

  "DV_ORDINAL": {"value": null},

  "DV_INTERVAL<DV_DATE>":{
      "value": {
          "start": null,"end": null}},

  "DV_INTERVAL<DV_COUNT>":{

      "value": {
      "start": null, "end": null}},

  "DV_INTERVAL<DV_DATE_TIME>":{
      "value": {
      "date": {
      "start": null,"end": null},
      "time": {
       "start": null,"end": null}}},

  "DV_INTERVAL<DV_TIME>":{
      
          "value": {
          "start": null,"end": null
          }
          
  },
  "DV_INTERVAL<DV_QUANTITY>":{

          "value": {
          "value": {
          "start": null,"end": null
          },
          "unit": null
          }
  },

  "DV_PROPORTION":{
      "value": null
  }
}




function matchData(regex, remove, string){
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










////////////////
//ONTOLOGY MATCH
////////////////
var resultadoOntology = matchData(/ontology[\w\W]*>/,  null ,dataFile)





const ontologyProps = [ 'term_definitions :', 'items :', 'text :', 'description :', 'copyright :', 'comment :']


for (var i=0 ; i < ontologyProps.length ; i++) {
    resultadoOntology = resultadoOntology.replaceAll(ontologyProps[i],'"' + ontologyProps[i].slice(0, -2) + '"' + ' :')
  }

  resultadoOntology = resultadoOntology.replace("ontology", '{' + '"ontology"' + ':' + '{')



//VIRGULA


var regexV = /".*?" : ".*?"/g
var matchVirgula = resultadoOntology.match(regexV)
var uniqMatch = [...new Set(matchVirgula)]



for (var i=0 ; i < uniqMatch.length ; i++) {
  
    resultadoOntology = resultadoOntology.replaceAll(uniqMatch[i],uniqMatch[i] + ",")
  
  
}





//Tirar virgula no ultimo termo

var regexOnto = /,\s+}/g

var matchOnto = resultadoOntology.match(regexOnto)


if(matchOnto == null){
  resultadoOntology = resultadoOntology.replace('",', '"')
}
else{
  for (var i=0 ; i < matchOnto.length ; i++) {
  
    resultadoOntology = resultadoOntology.replace(matchOnto[i], '}')
  }
}





//Por virgula antes de certos termos

var regexOnto = /}\s+"/g


var matchOnto = resultadoOntology.match(regexOnto)


if(matchOnto == null){
  
}
else{
  for (var i=0 ; i < matchOnto.length ; i++) {
  
    resultadoOntology = resultadoOntology.replace(matchOnto[i], matchOnto[i].slice(0, -1) + ',' + '"' )
  }
}





resultadoOntology = resultadoOntology + "}}}"



////////////
//FINAL JSON
////////////



const objOntology = JSON.parse(resultadoOntology)







var cena = ["at0000", "at0001", "at0002", "at0003"]
for(var i=0; i<cena.length; i++){
    var at0000 = cena[i]
   

}



//////////////////
//DEFINITION MATCH
//////////////////

var ontologyItems = objOntology.ontology.term_definitions.en.items


var regexDefinition = /definition[\w\W]*ontology/
var matchDef = regexDefinition.exec(dataFile)

var resultadoDefinition = matchDef[0]




//cluster

function createCluster(string){

        var objDefinition = {}

        //rm_type
        var regexDef = /(CLUSTER)|(COMPOSITION)|(OBSERVATION)/
        var matchDef = regexDef.exec(string)

        objDefinition["rm_type"] = matchDef[0]
        //code
        var regexCode = /at\d{4}/
        
        var matchCode= string.match(regexCode)
        matchCode = matchCode[0]
       

        

        //text
        var regexDef = /{ -- .*/
        var matchDef = regexDef.exec(string)
        if(matchDef){
            objDefinition["text"] = matchDef[0].slice(5)
        }

        //CLUSTER INICIAL
        var regexDef = /CLUSTER\[at....\][\d\D]+?}/
        var matchDef = string.match(regexDef)
        var matchCluster = matchDef[0]
        

        var regexItemOccur = /items cardinality matches {....;/
        var matchItemOccur = string.match(regexItemOccur)
        matchItemOccur = matchItemOccur[0]
     

        var regexOccur = /{....}/
        var regexCardiItems = /{....;/
        var matchOccur = matchCluster.match(regexOccur)
        var matchCardiItems = matchItemOccur.match(regexCardiItems)
        matchCardiItems = matchCardiItems[0]
   

        //Occurrences Cluster
        if(matchOccur == null){
            objDefinition["occurrences"] = {}
            objDefinition.occurrences["lowerOccurence"] = '1'
            objDefinition.occurrences["upperOccurence"] = '1'
            
        }
        else{
          
            matchOccur = matchOccur[0]
            var lowerOccurrence = matchOccur[1]
            var upperOccurrence = matchOccur[4]
            objDefinition["occurrences"] = {}
            objDefinition.occurrences["lowerOccurence"] = lowerOccurrence
            objDefinition.occurrences["upperOccurence"] = upperOccurrence
 
        }
        
        
        //Occurences Items(cardinality)
        if(matchCardiItems == null){

        }
        else{
       
            var lowerOccurrence = matchCardiItems[1]
            var upperOccurrence = matchCardiItems[4]
            objDefinition["itemCardinality"] = {}
            objDefinition.itemCardinality["lowerOccurence"] = lowerOccurrence
            objDefinition.itemCardinality["upperOccurence"] = upperOccurrence
        }
        

       


        //Node
        var ontologyTerms = objOntology.ontology.term_definitions.en.items
   
        ontologyTerms = JSON.stringify(ontologyTerms)
        
        
        if(matchCode == "at0000"){
          var regexOntoTerm = new RegExp( '{' + '"' + matchCode + '"' + ':{[\\d\\D]+?}', 'g' )
          var matchOntoTerm = ontologyTerms.match(regexOntoTerm)
          matchOntoTerm = matchOntoTerm[0]
        }
        else{
          var regexOntoTerm = new RegExp('"' + matchCode + '"' + ':{[\\d\\D]+?}', 'g' )
          var matchOntoTerm = ontologyTerms.match(regexOntoTerm)
          matchOntoTerm = '{' + matchOntoTerm[0]
        }
             // {"at0000":{[\d\D]+?} 
        
        
        matchOntoTerm = matchOntoTerm.substring(10)
        matchOntoTerm = JSON.parse(matchOntoTerm)
        matchOntoTerm["code"] = matchCode
        objDefinition["node"] = {}
        objDefinition.node = matchOntoTerm
        objDefinition["items"] = []

        return objDefinition

}


function createElement(string){
  var objElement = {}

  //MATCH CODE

  var regexCode = /at\d{4}/    
  var matchCode= string.match(regexCode)
  matchCode = matchCode[0]
  

  //MATCH OCCURRENCES

  var regexOccur = /{....}/
  var matchOccur = string.match(regexOccur)
  matchOccur = matchOccur[0]
 
       
   
  //Occurrences
  var lowerOccurrence = matchOccur[1]
  var upperOccurrence = matchOccur[4]
  objElement["occurrences"] = {}
  objElement.occurrences["lowerOccurence"] = lowerOccurrence
  objElement.occurrences["upperOccurence"] = upperOccurrence

  //Ontology terms

  var ontologyTerms = objOntology.ontology.term_definitions.en.items
   
  ontologyTerms = JSON.stringify(ontologyTerms)

  

  var regexOntoTerm = new RegExp('"' + matchCode + '"' + ':{[\\d\\D]+?}', 'g' )
  var matchOntoTerm = ontologyTerms.match(regexOntoTerm)
  matchOntoTerm = '{' + matchOntoTerm[0]

  matchOntoTerm = matchOntoTerm.substring(10)
  matchOntoTerm = JSON.parse(matchOntoTerm)
  matchOntoTerm["code"] = matchCode
  objElement["node"] = {}
  objElement.node = matchOntoTerm

  //DATA TYPES
  var regexDV = /DV[\w]+/g
  var matchDV = string.match(regexDV)
  matchDV = matchDV[0]
  var objDV = {}
  objDV["dataType"] = matchDV
  
  
  var estruturasDVString = JSON.stringify(estruturasDV)
  var regexEstruturasDV =  new RegExp('"' + matchDV + '"' + ':{"value".+?}' + '|' + '"' + matchDV + '"' + ':{"value".+?}}', 'g' )
  var matchEstruturasDV = estruturasDVString.match(regexEstruturasDV)
  matchEstruturasDV = matchEstruturasDV[0] 

  var regexEstruturasDV = /{"[\w]+":[\w]+.+}/g
  var matchEstruturasDV = matchEstruturasDV.match(regexEstruturasDV)
  matchEstruturasDV = matchEstruturasDV[0] 
  console.log(55555555555555555555555555555)
  console.log(matchEstruturasDV)
  console.log(55555555555555555555555555555)
  console.log(objDV)
  if(matchEstruturasDV == '{"value":null}'){
    objDV["value"] = null
  }
  else{
    matchEstruturasDV = JSON.parse(matchEstruturasDV)
    objDV["value"] = matchEstruturasDV
  }
console.log("DDDDDDDDDDDDDDDDDDDDDDDDDDD")
  console.log(objDV)
  console.log("DDDDDDDDDDDDDDDDDDDDDDDDDDD")


  console.log(matchEstruturasDV)
  console.log(444444444444444444444444444)
  
  console.log(JSON.stringify(estruturasDV))
  console.log(444444444444444444444444444)
  objElement.valueMatches = []
  objElement.valueMatches.push(objDV)
  

  return objElement
}

var objDefinition = createCluster(resultadoDefinition)









//Items

objDefinition["items"] = []

var regexItems = /items[\d\D]+?matches {[\d\D]+/g

var matchItems = resultadoDefinition.match(regexItems)
matchItems = matchItems[0]
matchItems = matchItems.replace("ontology", '')
var regexElements = /CLUSTER\[at....\][\d\D]+?{[\d\D]+?items[\d\D]+?}|(ELEMENT\[at....\].+?})(?=\s*(?:ELEMENT|CLUSTER|$))/gs
console.log(matchItems)
var matchElements = matchItems.match(regexElements)//DEPOIS USAR O MATCH ITEMS NA EXPRESSAO REGULAR PARA ACHAR OS CLUSTERS SEPARADOS

var soma = 0

var listaCode = ""

for (var i = 0 ; i < matchElements.length; i++){
  
  if(matchElements[i].includes("ELEMENT")){
      var regexCode = /at..../g
      var matchCode = matchElements[i].match(regexCode)
      matchCode = matchCode[0]
      console.log(matchCode)
    if(listaCode.includes(matchCode)){
      console.log("skipped")
    }


    
    
    
    else{
      console.log(matchElements[i])
    var cena = createElement(matchElements[i])
    //console.log(cena)
    objDefinition.items.push(cena)

    }

  }


  
  else{
    console.log(matchElements[i])
    soma += 1
    var clusterNovo = createCluster(matchElements[i])
    
    var regexCluster = /CLUSTER[\D\d]+?[\s]+}[\s]+}[\s]+}[\s]+}/g
    var matchCluster = matchItems.match(regexCluster)
    matchCluster = matchCluster[0]
    var matchClusterElements = matchCluster.match(regexElements)
    matchClusterElements = matchClusterElements.slice(1)
    console.log(matchClusterElements.length)
    var elementsLista = []
    for(var j = 0 ; j < matchClusterElements.length; j++){
      
      //Para remover Elements repetidos no final faz-se uma lista dos codigos
      var regexCode = /at..../g
      var matchCode = matchClusterElements[j].match(regexCode)
      matchCode = matchCode[0]
      listaCode += matchCode
      //////////////////////////////////////////////////////////////////////
      
      var newElement = createElement(matchClusterElements[j])
      clusterNovo.items.push(newElement)
      
    }


    console.log(matchClusterElements)
    console.log("11111111111111111111111")
    console.log(matchCluster)
    console.log("11111111111111111111111")
    
    console.log(clusterNovo)
    console.log("fghjkjhg")
    console.log(clusterNovo.items)
    console.log("fghjkjhg")





    objDefinition.items.push(clusterNovo)//Ultima linha
   
    
    
    //console.log(objDefinition.items)
    /*
    console.log(matchElements[i])
    console.log("Deu 1??????????????????????")
    console.log(clusterNovo)
    console.log(objDefinition)
    */
}
}
   


console.log("0000000000000000000000000")


console.log(objDefinition)
console.log(listaCode)



    //objDefinition.Items.push(ontologyItems[resultadoNode])



  
//console.log(ontologyItems)
  //console.log(matchElements[i])
  




//console.log(objDefinition)








/*

var jsonObj = {};
let text = "";
let text2 = ""
for (const x in ontologyItems) {
  if(x == resultadoNode){
  
    //objDefinition["Items"] = ontologyItems[x]
    //console.log(objDefinition)
  }
  
  for (const y in ontologyItems[x]){
      
  }
  text += x + ", ";
  text2 += ontologyItems[x] + ", ";
}

  


console.log(objDefinition.rm_type)
//DV_CODED_TEXT

var regexDV_CODED_TEXT = /DV_CODED_TEXT matches/
var existe = regexDV_CODED_TEXT.test(resultadoDefinition)
if (existe){
    var regexCodematch = /\[local::[\d\D]+?]/
    var matchCode = regexCodematch.exec(resultadoDefinition)
    var local = matchCode[0]
    var regexCodematch = /at[\d]{4}/g
    var matchCode = local.match(regexCodematch)
    
}
else{
    console.log("nao")
}

for (var i = 0; i < matchCode.length; i++){
    console.log("aqui")
    console.log(matchCode[i])
    var regexAT = new RegExp( '"' + matchCode[i] + '"' + ' :{[\\d\\D]+?}' ) 
    console.log(regexAT)
    var matchAT = resultadoOntology.match(regexAT)
    var resultado = matchAT[0]
    console.log(resultado)
    resultado = resultado.replace('"' + matchCode[i] + '"' + ' :', "")
    resultado = resultado.replace(/{[\d\D]+?/g, "{")
    resultado = resultado.replace(/,[\d\D]+?"/g, ',"')
    console.log("????????????'")
    console.log(resultado)
    
    
    
    console.log("AQUUUUUUUUUUUUUUUI")
    console.log(resultado)
    resultado = JSON.parse(resultado)
    console.log(resultado)
    objDefinition[matchCode[i]] = resultado
    
}

console.log(objDefinition)

//items
console.log("AAAAAAAAAAAAAAAAAAAA")


*/



