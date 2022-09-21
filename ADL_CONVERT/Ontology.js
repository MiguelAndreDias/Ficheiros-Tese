////////////////
//ONTOLOGY MATCH
////////////////

import {matchData} from './extraFunctions.js'


export function createOntology(dataFile){
    var resultadoOntology = matchData(/ontology[\w\W]*>/,  null ,dataFile)


    


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
    

    return resultadoOntology

}
  