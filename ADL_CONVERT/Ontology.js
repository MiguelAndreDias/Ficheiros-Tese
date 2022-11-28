////////////////
//ONTOLOGY MATCH
////////////////

import {matchData} from './extraFunctions.js'


//Needed to have both import and requires in the same file
import { Console } from "console";
import {createRequire} from "module";
const require = createRequire(import.meta.url);

const fs = require('fs');

export function createOntology(dataFile){

//Resolver bug com o SNOMED no terminalogies available

dataFile = dataFile.replace('<"SNOMED-CT", ...>', '<"SNOMED-CT">')
dataFile = dataFile.replaceAll("<[", '"')
dataFile = dataFile.replaceAll("]>", '"')

  //Resolução do bug com comentarios (remove os comentarios)
 
  dataFile = dataFile.replaceAll(/comment = <.+>/g, '') //remove os comentarios formatados
  dataFile = dataFile.replaceAll(/comment = <.+[^>]+>/g, '') //remove os comentarios mal formatados
  


    //Resolução do bug em que certos ficheiros têm o "> numa linha diferente
    var regexErro = /description = <".+[\s]+">/g
    var matchErro = dataFile.match(regexErro)
    //console.log(matchErro)
if(matchErro){

  for(var i = 0; i < matchErro.length; i++){
    //console.log(matchErro[i])
    var matchResolvido = matchErro[i]
    matchResolvido = matchResolvido.replaceAll(/[\r\n\t]/g, '')
    //console.log(matchResolvido)
    dataFile = dataFile.replace(matchErro[i], matchResolvido)
  }
 
}
    
   
    var resultadoOntology = matchData(/ontology[\w\W]*>/,  null ,dataFile, "ontology")
    


    //console.log(resultadoOntology)


    const ontologyProps = [ 'term_definitions :', 'items :', 'text :', 'description :', 'copyright :', 'comment :', 'terminologies_available :']


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
    var regexConstraint = /constraint_definitions/
    var constraintExists = regexConstraint.test(resultadoOntology)
    
    if(constraintExists){
      resultadoOntology = resultadoOntology.replace("constraint_definitions", ',' + '"' + "constraint_definitions" + '"')
    }
    

    //TERM BINDINGS

    resultadoOntology = resultadoOntology.replace("term_bindings", ',"term_bindings"')


    return resultadoOntology

}
  

/* var filename = "rascunho.txt"

try {
    const data = fs.readFileSync(filename, 'utf8')
    filename = data
  } catch (err) {
    console.error(err)
  }

console.log(filename)
var resultado = createOntology(filename)
console.log(resultado)
console.log(111111)
resultado = JSON.parse(resultado)
console.log(22222222)

console.log(JSON.stringify(resultado))
console.log(resultado)

 */