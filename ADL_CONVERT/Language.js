//////////////////////////
//Archetype Language match
//////////////////////////

import {matchData} from './extraFunctions.js'


export function createLanguage(dataFile){

    var resultadoLanguage = matchData(/language[\w\W]*?description/,  "description" ,dataFile)
   
    
    
  
  
          resultadoLanguage = resultadoLanguage.replace(/language/,  '{' + "language" + ':' + '{')
          resultadoLanguage = resultadoLanguage.replace(/language/g,'"language"')
  
  
          resultadoLanguage = resultadoLanguage.replace('original_"language"','"original_language"')
  
          resultadoLanguage = resultadoLanguage.replace("translations",'"translations"')
  
          resultadoLanguage = resultadoLanguage.replace(/author/g,'"author"')
  
          resultadoLanguage = resultadoLanguage.replace(/accreditation/g,'"accreditation"')
  
        
  
  
  
          const regex3 = /ISO.*/g
          const regex4 = /::.*/g
  
          var matchISO = resultadoLanguage.match(regex3)
          var matchLang = resultadoLanguage.match(regex4)
  
          for (var i=0 ; i < matchISO.length ; i++) {
          resultadoLanguage = resultadoLanguage.replace(matchISO[i],'"' + matchLang[i].slice(2) + '"')
          }
  
  
          
  
          const regex5 = /".*?" : ".*?"/g
          var matchVirgula = resultadoLanguage.match(regex5)
  
          for (var i=0 ; i < matchVirgula.length ; i++) {
          resultadoLanguage = resultadoLanguage.replace(matchVirgula[i],matchVirgula[i] + ",")
          }
  
            
  
  
          //resultadoLanguage = resultadoLanguage.replace(/\s/g,'')
  
        
  
          //Por a virgula antes do termo seguinte
  
          var regexVirgula = /}[\s]+"/g
          var matchVirgula = resultadoLanguage.match(regexVirgula)
          //console.log(matchVirgula)
  
          if (matchVirgula == null){
  
          }
          else{
  
            for (var i=0 ; i < matchVirgula.length ; i++) {
  
              resultadoLanguage = resultadoLanguage.replace(matchVirgula[i],'}' + ',' + '"')
              }
  
          }
      
  
          
  
          //Tirar a virgula do ultimo termo
  
          //caso se tiver apenas 3 linhas
          if (resultadoLanguage.split(/\r\n|\r|\n/).length == 3){
            resultadoLanguage = resultadoLanguage.replace(',','')
           
          }
          
          //console.log(resultadoLanguage)
  
          var regexVirgula = /",[\s]+}/g
          var matchVirgula = resultadoLanguage.match(regexVirgula)
         
  
          if (matchVirgula == null){
  
          }
          else{
  
            for (var i=0 ; i < matchVirgula.length ; i++) {
  
              resultadoLanguage = resultadoLanguage.replace(matchVirgula[i], '"' + '}')
              }
  
          }
  
  
          resultadoLanguage = resultadoLanguage + "}}"
  
  
  
  
          return resultadoLanguage
  
  }