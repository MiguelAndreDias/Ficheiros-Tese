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