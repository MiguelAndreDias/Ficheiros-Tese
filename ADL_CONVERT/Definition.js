////////////////////////////
//Archetype Definition match
////////////////////////////

import { createOntology } from "./Ontology.js"

//Needed to have both import and requires in the same file
import { Console } from "console";
import {createRequire} from "module";
const require = createRequire(import.meta.url);
import estruturasDV from './Estruturas.js' 
const fs = require('fs');
import {createJson, filename} from "./jsonFinal.js"
//import fetch, { Headers } from 'node-fetch';
import { match } from "assert";
const fetch = require('sync-fetch')
import {createHeader} from "./Header.js"

//read data file and put into a string



//var dataFile = './ficheiros/openEHR-DEMOGRAPHIC-CLUSTER.person_death_data_iso.v0.adl.txt'
//var dataFile = "./ficheiros/openEHR-EHR-COMPOSITION.request.v1.adl.txt"
//var dataFile = "./ficheiros/openEHR-EHR-CLUSTER.anatomical_pathology_exam.v0.adl.txt" ESTE FICHEIRO ESTÁ MAL FEITO MESMO NO CKM REPOSITORY
//var dataFile = "./openEHR-EHR-CLUSTER.waveform.v0.adl.txt"
//var dataFile = "./ficheiros/openEHR-EHR-CLUSTER.anatomical_location_precise.v0.adl.txt" //ver o regex do ontology neste
//var dataFile = "./ficheiros/openEHR-EHR-CLUSTER.clinical_evidence.v1.adl.txt"
//var dataFile = "./ficheiros/openEHR-EHR-SECTION.soap.v0.adl.txt"
//var dataFile = "./ficheiros/rascunho_detailmatches.txt"
//var dataFile = "./ficheiros/Rascunho3.txt"


/* 
try {
    const data = fs.readFileSync(dataFile, 'utf8')
    dataFile = data
  } catch (err) {
    console.error(err)
  }
   */
 






//////////////////
//DEFINITION MATCH
//////////////////





////////////////////////
//CREATE ONTOLOGY TERMS
////////////////////////



let fileArray = []



function createNode(string, ontologyItems){

    var objNode = {}

    var regexNode = /[A-Z_ ]+\[at.+\].+matches.+{/

    var matchNode = string.match(regexNode)
    matchNode = matchNode[0]

    

  

    //rmType

    var regexRMtype = /[A-Z_]+(?=\[)/
    var matchRMtype = matchNode.match(regexRMtype)
    matchRMtype = matchRMtype[0]
    objNode["rmType"] = matchRMtype
    
    

     //Occurrences
     var regexOccur = /{....}/
     var matchOccur = matchNode.match(regexOccur)
     //

     if(matchOccur == null){
        objNode["occurrences"] = {}
        objNode.occurrences["lowerOccurence"] = '1'
        objNode.occurrences["upperOccurence"] = '1'
        
    }
    else{
      
        matchOccur = matchOccur[0]
        var lowerOccurrence = matchOccur[1]
        var upperOccurrence = matchOccur[4]
        objNode["occurrences"] = {}
        objNode.occurrences["lowerOccurence"] = lowerOccurrence
        objNode.occurrences["upperOccurence"] = upperOccurrence

    }

    

     //code
     var regexCode = /\[at.+\]/   
     var matchCode= matchNode.match(regexCode)
   
     matchCode = matchCode[0]
     matchCode = matchCode.replace("[", "")
     matchCode = matchCode.replace("]", "")
     objNode["node"] = {}
     objNode.node["code"] = matchCode
    

     objNode.node["text"] = ontologyItems[matchCode]["text"]

     
     objNode.node["description"] = ontologyItems[matchCode]["description"]





     return objNode
     


}








function createDVCODED(string, ontologyItems){


    var objValue = {}
    objValue["dataType"] = "DV_CODED_TEXT"
    objValue["value"] = []



    //Regex para buscar o defining_code matches (local)
    var regexLocal = /\[local::[\d\D]+?\]/g
    var matchLocal = string.match(regexLocal)

    ////Regex para buscar o defining_code matches (constraint)
    if(matchLocal == null){
        var regexconstraint = /ac.+?(?=[,\]])/g
        var matchLocal = string.match(regexconstraint)
        if(matchLocal == null){
            return objValue
        }


    }
    
    if(matchLocal.length == 1){
        matchLocal = matchLocal[0]
    }
    else{
        //Caso em que os codigos dos DVcoded_text estão colocados em listas diferentes (cada um em local diferente)
       //Junta os resultados do array num string
        matchLocal = matchLocal.join()
    }
    


    var regexCode = /a[ct][\d\.]+/g 
    var matchCode= matchLocal.match(regexCode)
    

    
     

    for(var k = 0; k < matchCode.length; k++){
    
        var objDVCODED = {}
        objDVCODED["code"] = matchCode[k]
      
        objDVCODED["text"] = ontologyItems[matchCode[k]]["text"]
        objDVCODED["description"] = ontologyItems[matchCode[k]]["description"]
        objValue["value"].push(objDVCODED)
        
    }

    return objValue


}





//Tambem dá para usar esta função com value matches ou outras que tenham apenas DV codes
function createNameMatches(string, ontologyItems){

    var objName = {}
    var regexDV = /DV[\w]+/g
    var matchDV = string.match(regexDV)
   

   
    objName["name_matches"] = []
  
    for(var i = 0; i < matchDV.length; i++){

        //Se for DVCODED_TEXT cria uma lista com os values e vai buscar os valores ao ontology
        if(matchDV[i] == "DV_CODED_TEXT"){

           var objValue =  createDVCODED(string, ontologyItems)

         

        objName["name_matches"].push(objValue)
    }
        else{

       
        var objValue = {}
        objValue["dataType"] = matchDV[i]
        objValue["value"] = estruturasDV[matchDV[i]]
        objName["name_matches"].push(objValue)
     

    }

    }
if(string.includes("value matches")){
    objName = JSON.stringify(objName)
    objName = objName.replaceAll("name_matches", "value_matches")
    objName = JSON.parse(objName)
}
    

    return objName


    

}




function getRepository(rmType){
    var url = "https://api.github.com/"
    var getRepoContent = "repos/MiguelAndreDias/CKM-mirror/contents/local/archetypes/"
    
        
    var response = fetch(url + getRepoContent + rmType   , {
    headers: ({
        'Accept': 'application/vnd.github.v3+json',
        'Authorization': 'Bearer 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',
        
        })
    });
  
    var data = response.text();

    return data
}



function createItemsMatches(string, type = null, ontologyItems){

    
    if(type == "CLUSTER"){

    }
    else{
        
        var first = createNode(string, ontologyItems)
   
    }
    

    var objItems = {}
    objItems["items"] = []

    

    
    var regexElements = /CLUSTER\[at.+?\][\d\D]+?{[\d\D]+?items[\d\D]+?{|(ELEMENT\[at.+?\].+?})(?=\s*(?:ELEMENT|CLUSTER|allow_archetype|$))|(allow_archetype.+?})(?=\s*(?:ELEMENT|CLUSTER|allow_archetype|$))/gs
    var matchElements = string.match(regexElements)//DEPOIS USAR O MATCH ITEMS NA EXPRESSAO REGULAR PARA ACHAR OS CLUSTERS SEPARADOS
    
    var regexItems = /items[\d\D]+?matches {[\d\D]+/g
    var matchItems = string.match(regexItems)
   
    matchItems = matchItems[0]
   
 

    var listaCode = ""

    if (matchElements == null){
        return objItems
    }

    else{

        for (var i = 0 ; i < matchElements.length; i++){
            var element = createNode(matchElements[i], ontologyItems)
           
            if(matchElements[i].includes("ELEMENT")){
                var regexCode = /\[at.+\]/g 
                var matchCode = matchElements[i].match(regexCode)
                matchCode = matchCode[0]

                if(listaCode.includes(matchCode)){

                }

                else{
                  
                    var objElement = createNode(matchElements[i], ontologyItems)
               
                    var objELementValues = createNameMatches(matchElements[i], ontologyItems)

                    objElement = {
                        ...objElement,
                        ...objELementValues
                    }

                    objItems["items"].push(objElement)
                }


                }


                ///////////////////
                //INCLUDE ARCHETYPE
                //////////////////
            else if(matchElements[i].includes("allow_archetype")){
                
                console.log("inclui archetype")

                //Criar o path
                var path = createHeader(filename)
                path = JSON.parse(path)
                console.log(path.archetype.file_name)
             
   
                //console.log(ontologyItems)
                var nodeAllowArchetype = createNode(matchElements[i], ontologyItems)
                nodeAllowArchetype["xsi_type"] = "C_ARCHETYPE_ROOT"
                nodeAllowArchetype["include"] = []

              
                

                //Ver o rm type do archetype a incluir
                var regexRMtype = /(?<=openEHR-EHR-)\w+(?=\\\.)/
                var rmType = matchElements[i].match(regexRMtype)
                
                

                //Se não der match ignora o allow_archetype
                //Caso em existe ficheiros cluster na pasta demographic porque por alguma razão
                //a expressão regular é diferente
                if(rmType == null){
                    regexRMtype = /openEHR-DEMOGRAPHIC-CLUSTER/
                    var existe = regexRMtype.test(matchElements[i])
                    if(existe){
                        rmType = "demographic"
                    }
                    else{
                        break  
                    }
                    
                  
                }

                else{
                    rmType = rmType[0].toLowerCase()
                }

               
                

                

                //fazer fetch do repositorio especifico ao rmType
                var objRepositoryString = getRepository(rmType)

               //Vai buscar a expressão regular no allow archetype
                var regexOpenEHR = /\/openEHR.+\//g
                var matchRegexOpenEHR = matchElements[i].match(regexOpenEHR)
                matchRegexOpenEHR = matchRegexOpenEHR[0]

                //Cria uma expressão regular com a anterior para ir buscar o link https ao repositorio selecionado
                function getHTTPSRegex(filenameRegex, rmType){

                    var url = "https:\/\/raw.githubusercontent\.com\/MiguelAndreDias\/CKM-mirror\/main\/local\/archetypes\/"
                    //varia com o tipo de ficheiro
                    filenameRegex = filenameRegex.substring(1)
                    filenameRegex = filenameRegex.slice(0, -1)
                    filenameRegex = "(" + filenameRegex + ")"
                    
                    //varia com a Regex de cada ficheiro
                    rmType = rmType + "\/"
                    var extension = "\.adl"

                    var regexFinal = new RegExp(url + rmType + filenameRegex + extension, "g")
                    return regexFinal

                }

               
                var regexFetch = getHTTPSRegex(matchRegexOpenEHR, rmType)
               
                var matchFetch = objRepositoryString.match(regexFetch)
               
                if(matchFetch == null){
                    
                }
                else{
                    matchFetch = matchFetch[0]
                    function fetchFileContent(httpsLink){

                    var response = fetch(httpsLink)
                    var data = response.text()
                    return data
                
                    }

                var fileinclude = fetchFileContent(matchFetch)
                
               

                //Função recursiva
                var includeArch = createJson(fileinclude)
              
                //Resolve o bug do ontology items mudar após cada iteração
                //Assim chama a função novamente e cria um objecto novo com os dados do ficheiro anterior/original
               
                /////////////////////////////////////
                nodeAllowArchetype["include"].push(includeArch)
                
               
                objItems["items"].push(nodeAllowArchetype)
 
                }

                
                
               
                

                

       }

  

            else{
                
                console.log("NEWCLUSTER HERE!!!!!!!!!!!!!!!!!!!!!")
               
                var newCluster = createNode(matchElements[i], ontologyItems)
                
                
                newCluster["items"] = [] 


                var regexCluster = /CLUSTER[\D\d]+?[\s]+}[\s]+}[\s]+}[\s]+}/g
                var matchCluster = matchItems.match(regexCluster)
                matchCluster = matchCluster[0]
                var matchClusterElements = matchCluster.match(regexElements)
                matchClusterElements = matchClusterElements.slice(1)

                for(var j = 0 ; j < matchClusterElements.length; j++){
        
                    //Para remover Elements repetidos no final faz-se uma lista dos codigos
                    var regexCode = /\[at.+\]/ 
                    var matchCode = matchClusterElements[j].match(regexCode)
                    matchCode = matchCode[0]
                    listaCode += matchCode
                    //////////////////////////////////////////////////////////////////////
                    
                    var objNewElement = createNode(matchClusterElements[j], ontologyItems)
              
                    var objELementValues = createNameMatches(matchClusterElements[j], ontologyItems)

                    objNewElement = {
                        ...objNewElement,
                        ...objELementValues
                    }
                  
                    newCluster.items.push(objNewElement)
                
                  }



                objItems["items"].push(newCluster)
              

               
                 
                }
           
            
          
           

        }

        if(type == "CLUSTER"){
            var objItemsFinal = objItems
        }
        else{
            var objItemsFinal = {
                ...first,
                ...objItems
                };
        }
        
        
        console.log(JSON.stringify(objItemsFinal))

            return objItemsFinal

}}

//////////////////////
//TESTAR ITEMS MATCHES
//////////////////////




//var testeItems = createItemsMatches(testeDetails)

//////////////////////////



function createDetailsMatches(string, ontologyItems){
    console.log("ola")
    console.log(ontologyItems)
    var objDetails = {}
    var objItemsDetails = createItemsMatches(string, null,  ontologyItems)
    console.log("adeus")
    

    objDetails["details_matches"] = []
    objDetails["details_matches"].push(objItemsDetails)

    return objDetails
    

}


//var testeDetail = createDetailsMatches(testeDetails)



/* JUNTAR ESTAS FUNÇÕES!!!!! */
function createProtocolMatches(string, ontologyItems){
    var objProtocol = {}
    var objItemsDetails = createItemsMatches(string, null, ontologyItems)
    objProtocol["protocol matches"] = []
    objProtocol["protocol matches"].push(objItemsDetails)

    return objProtocol
}


function createContextMatches(string, ontologyItems){
    var objContext = {}
    var objItemsDetails = createItemsMatches(string, null, ontologyItems)
    objContext["context_matches"] = []
    objContext["context_matches"].push(objItemsDetails)

    return objContext
}





function createTransitionMatches(string, ontologyItems){

    var objISMFinal = {}
    objISMFinal["ism_transition"] = []

    var regexISM = /ISM_TRANSITION\[at.+?\] matches\s+{.+?}(?=\s+ISM_TRANSITION\[at.+?\] matches|$)/gs
    var matchISM = string.match(regexISM)

    for(var i = 0; i < matchISM.length; i++){
        var objNodeISM = createNode(matchISM[i], ontologyItems)
        
        //buscar os current_state e careflow_state
        var regexStateStep = /(current_state matches\s+{.+?}(?=\s+careflow_step matches|$))|(careflow_step matches[\d\D]+)/gs
        var matchStateStep = matchISM[i].match(regexStateStep)

        //Regex com os dvs
        
        var regexDV = /DV[\w]+/g
        var matchDV = matchStateStep[0].match(regexDV)

        if(matchDV == "DV_CODED_TEXT"){
            var DVcoded = createDVCODED(matchStateStep[0], ontologyItems)
            objNodeISM["current_state"] = DVcoded
        }
        else{
            DVcoded = estruturasDV[matchDV]
            objNodeISM["current_state"] = DVcoded
        }

        matchDV = matchStateStep[1].match(regexDV)
        if(matchDV == "DV_CODED_TEXT"){
            var DVcoded = createDVCODED(matchStateStep[1], ontologyItems)
            objNodeISM["careflow_step"] = DVcoded
        }
        else{
            var DVtext = estruturasDV[matchDV]
            objNodeISM["careflow_step"] = DVcoded
        }

        objISMFinal["ism_transition"].push(objNodeISM)
   
        
    }


    return objISMFinal
    
}


function removeMatches(string){
    string = string.replaceAll("upper matches", "")
    string = string.replaceAll("lower matches", "")

    return string
}  


var objMatchCheck = {
    "name matches" : createNameMatches,
    "category matches" : createNameMatches,
    "details matches" : createDetailsMatches,
    "description matches": createDetailsMatches,
    "credentials matches" : createDetailsMatches,
    "items matches" : createDetailsMatches,
    "context matches" : createContextMatches,
    "ism_transition matches" : createTransitionMatches,
    "protocol matches" : createProtocolMatches
  }


//Função que procura os matches e depois chama as outras funções em função do tipo de match que é
export function createAllMatches(string){

        if(fileArray.includes(filename)){

        }
        else{
            fileArray.push(filename)
        }
      
        //Cria um objecto com os termos de Ontology 
        let objOntology = JSON.parse(createOntology(string))
  
        let ontologyItems = objOntology.ontology.term_definitions.en.items
       
    
        
       

        if(JSON.stringify(objOntology).includes("constraint_definitions")){
            let ontologyConstraints = objOntology.ontology.constraint_definitions.en.items
            ontologyItems = {
                ...ontologyConstraints,
                ...ontologyItems
            }
        }


        console.log(ontologyItems)
        //Vai buscar só a parte do definition
        var regexDefinition = /definition[\w\W]*ontology/
        var matchDef = regexDefinition.exec(string)
        string = matchDef[0]

        //Cria o primeiro node
        var firstNode = {}
        firstNode = createNode(string, ontologyItems)
        
        console.log(firstNode)
       
        
        
        
        var objAllMatches = {}

        //tira o espaço vazio no final (Necessário para a expressão regular regexMaType funcionar corretamente)
        string = string.replace(/}[\r\n]+ontology/, "}")
        //Tira a primeira referencia a "occurrences" necessário para os matches darem bem
        string = string.replace("occurrences", "")

        //Tirar o termo cardinality
        string = string.replace(" cardinality", "")

        string = removeMatches(string)

        
        //Faz match dos diferentes tipos de matches existentes (Name matches, definition matches, protocol matches...)
        var regexMaType = /[a-z_]+ matches\s+{.+?}(?=\s+[a-z]+ matches|$)/gs
        var matchMaType = string.match(regexMaType)
        

        

        
        for (var i = 0 ; i < matchMaType.length; i++){
        
            var regexMaType = /[a-z_]+ matches/  //só é necessario a primeira instancia logo não se põe o "g"
            var matchFinalType = matchMaType[i].match(regexMaType)
            matchFinalType = matchFinalType[0]

            if(firstNode.rmType == "CLUSTER"){
                console.log("olla")
                var objMatch = createItemsMatches(matchMaType[i], "CLUSTER", ontologyItems)
            
            }
            else{
             
                var matchesFunction = objMatchCheck[matchFinalType]
                console.log(matchesFunction)
               
              
                var objMatch = matchesFunction(matchMaType[i], ontologyItems)
                console.log(objMatch)

                
              
              
                
            }
            

            var objAllMatches = {
                ...firstNode,
                ...objAllMatches,
                ...objMatch
                };
            

            

        }

       

        return objAllMatches





}




/* var testeCreateAllMatches = createAllMatches(dataFile)
console.log(111111111)
console.log(testeCreateAllMatches.items[0]) 
console.log(JSON.stringify(testeCreateAllMatches.items)) 

 */







