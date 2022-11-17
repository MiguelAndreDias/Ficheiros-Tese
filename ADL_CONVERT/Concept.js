//////////////////////////
//Archetype concept match
//////////////////////////



export function createConcept(dataFile){
    var regexFixe = /concept[\w\W]*?language/
  const matchConcept = regexFixe.exec(dataFile)
  var resultadoConcept = matchConcept[0]
  resultadoConcept = resultadoConcept.replace('language','')

  resultadoConcept = resultadoConcept.replace(/concept/, '{' + '"concept"' + ':')
  var regexAT = /\[at.+\]/
  var matchAT = resultadoConcept.match(regexAT)
  matchAT = matchAT[0]
  matchAT = matchAT.replace("[", "")
  matchAT = matchAT.replace("]", "")

  resultadoConcept = resultadoConcept.replace(/\[at.+\]/, '{' + '"' + matchAT + '"' + ':')


  var regexFixe = /-- \D.+/
  var matchFixe = regexFixe.exec(resultadoConcept)
  resultadoConcept = resultadoConcept.replace(matchFixe, '"' + matchFixe[0].substring(3) + '"' + '}}')

return resultadoConcept

}

