///////////////////
//DESCRIPTION MATCH
///////////////////

import {matchData} from './extraFunctions.js'

export function createDescription(dataFile){
    var regexDescription = /description[\w\W]*?definition/
    var matchDesc = regexDescription.exec(dataFile)
    
    var resultadoDescription = matchDesc[0]
    
  
    //Tirar o desnecessario
    var descriptionProps = ["purpose", "misuse", "use", "keywords",  "copyright", "lifecycle_state", "other_contributors"]
    
    for (var i=0 ; i < descriptionProps.length ; i++) {
      var regexDesc = new RegExp( descriptionProps[i] + ' = <[\\d\\D]*?>', 'g' ) 
     
      var matchKeywords = resultadoDescription.match(regexDesc)
     
      for (var j=0 ; j < matchKeywords.length; j++) {
        resultadoDescription = resultadoDescription.replaceAll(matchKeywords[j], '')
      }
  
      
    }
    
    resultadoDescription = resultadoDescription.replace(/other_details =[\d\D]+>/, '')
  
    
    
    resultadoDescription = matchData(/description[\w\W]*?definition/,  "definition" ,resultadoDescription)
  
    
  
    var descriptionProps = ["description", "original_author", "details", "language"]
  
  
    for (var i=0 ; i < descriptionProps.length ; i++) {
  
      resultadoDescription = resultadoDescription.replaceAll(descriptionProps[i], '"' + descriptionProps[i] + '"')
  
    }
  
  
    var regexISO = /ISO.+/g
    var matchISO = resultadoDescription.match(regexISO)
    matchISO.forEach( (element) => {
      resultadoDescription = resultadoDescription.replaceAll(element, '"' + element + '"')
  })
  
   
    
    
    //VIRGULA
    
    var regexV = /".*?" : ".*?"/g
    var matchVirgula = resultadoDescription.match(regexV)
    var uniqMatch = [...new Set(matchVirgula)]
    
    
    
    for (var i=0 ; i < uniqMatch.length ; i++) {
      
        resultadoDescription = resultadoDescription.replaceAll(uniqMatch[i],uniqMatch[i] + ",")
      
    }
    
    
   
    
    
    
    
    
    
    //Tirar virgula no ultimo termo
    
    var regexV = /,\s+}/g
    
    var matchVirgula = resultadoDescription.match(regexV)
    
    
    if(matchVirgula == null){
      resultadoDescription = resultadoDescription.replace('",', '"')
    }
    else{
      for (var i=0 ; i < matchVirgula.length ; i++) {
      
        resultadoDescription = resultadoDescription.replace(matchVirgula[i], '}')
      }
    }
    
    
    
    
    
    
    //Por virgula antes de certos termos
    
    var regexV = /}\s+"/g
    
    
    var matchVirgula = resultadoDescription.match(regexV)
    
    
    if(matchVirgula == null){
      
    }
    else{
      for (var i=0 ; i < matchVirgula.length ; i++) {
      
        resultadoDescription = resultadoDescription.replace(matchVirgula[i], matchVirgula[i].slice(0, -1) + ',' + '"' )
      }
    }
    
    
    
    
    resultadoDescription = resultadoDescription.replace(/"description"/, '{' + '"description"' + ':'+ '{')
    resultadoDescription = resultadoDescription + "}}"
  
   
  
    return resultadoDescription
  
  }
  
 