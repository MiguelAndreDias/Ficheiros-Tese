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