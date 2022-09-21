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