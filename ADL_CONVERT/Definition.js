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
import {createJson} from "./jsonFinal.js"
import fetch, { Headers } from 'node-fetch';


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





async function getRepository(rmType){


    var url = "https://api.github.com/"
    var getRepoContent = "repos/gestaopedidosehr/CKM-mirror/contents/local/archetypes/"

        
    var response = await fetch(url + getRepoContent + rmType   , {
    headers: new Headers({
        'Accept': 'application/vnd.github.v3+json',
        'Authorization': 'Bearer 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',
        
        })
    });
  
    var data = await response.json();
  
    return data
  
  
  
  
  }


  var objRepo = await getRepository("cluster")
  





////////////////////////
//CREATE ONTOLOGY TERMS
////////////////////////


var ontologyItems = `

Sem conteudo por enquanto a função createallmatches vai criar este objecto
 para ser usado na scope global em todas as funções`




function createNode(string){

    var objNode = {}

    var regexNode = /[A-Z_ ]+\[at.+\].+matches.+{/
    var matchNode = string.match(regexNode)
    matchNode = matchNode[0]

  

    //rm_type 

    var regexRMtype = /[A-Z_]+(?=\[)/
    var matchRMtype = matchNode.match(regexRMtype)
    matchRMtype = matchRMtype[0]
    objNode["rm_type"] = matchRMtype
    
    

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








function createDVCODED(string){


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
function createNameMatches(string){

    var objName = {}
    var regexDV = /DV[\w]+/g
    var matchDV = string.match(regexDV)
   
   
   
    objName["name_matches"] = []
    
    
    for(var i = 0; i < matchDV.length; i++){

        //Se for DVCODED_TEXT cria uma lista com os values e vai buscar os valores ao ontology
        if(matchDV[i] == "DV_CODED_TEXT"){

           var objValue =  createDVCODED(string)

         

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








function createItemsMatches(string, type = null){

    
    if(type == "CLUSTER"){

    }
    else{
        var first = createNode(string)
   
    }
    
 
    var objItems = {}
    objItems["items"] = []

    

    
    var regexElements = /CLUSTER\[at.+?\][\d\D]+?{[\d\D]+?items[\d\D]+?{.+?}|(ELEMENT\[at.+?\].+?})(?=\s*(?:ELEMENT|CLUSTER|allow_archetype|$))|(allow_archetype.+?})(?=\s*(?:ELEMENT|CLUSTER|allow_archetype|$))/gs
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
            var element = createNode(matchElements[i])
           
            if(matchElements[i].includes("ELEMENT")){
                var regexCode = /\[at.+\]/g 
                var matchCode = matchElements[i].match(regexCode)
                matchCode = matchCode[0]

                if(listaCode.includes(matchCode)){

                }

                else{
                    var objElement = createNode(matchElements[i])
                    var objELementValues = createNameMatches(matchElements[i])

                    objElement = {
                        ...objElement,
                        ...objELementValues
                    }

                    objItems["items"].push(objElement)
                }


                }


                ///////////////////
                //INLCUDE ARCHETYPE
                //////////////////
            else if(matchElements[i].includes("allow_archetype")){
                console.log("inclui archetype")
                var nodeAllowArchetype = createNode(matchElements[i])
                nodeAllowArchetype["include"] = {}
                console.log(nodeAllowArchetype)


                //Match do regex dentro do include archetype
                var regexInclude = /\/open.+\//
                var matchInclude = matchElements[i].match(regexInclude)
                matchInclude = matchInclude[0]
                
                //Regex para saber o tipo RM para fazer fetch request
                var regexRMType = /[A-Z]+?(?=\\\.)/
                var matchRMType = matchInclude.match(regexRMType)
                matchRMType = matchRMType[0]
                console.log(matchRMType)
                
                
                //Match do url de download para fazer o fetch
                var stringRepo = JSON.stringify(objRepo)
                var regexInclude = /openEHR-EHR-CLUSTER\.document_entry_metadata(-[a-zA-Z0-9_]+)*\.v1|openEHR-EHR-CLUSTER\.document_entry_metadata(-[a-zA-Z0-9_]+)*\.v0/
                var matchInclude = stringRepo.match(regexInclude)
                matchInclude = matchInclude[0]

                
                function getData(){
                    var url2 = "https://raw.githubusercontent.com/gestaopedidosehr/CKM-mirror/master/local/archetypes/cluster/openEHR-EHR-CLUSTER.document_entry_metadata.v0.adl"
                    var data = ""
                    fetch(url2).then(res =>console.log(res.text())).then( r => console.log(r) )
                    
                   
                  }
                  
                getData() 




                



       }








               




            

            else{

                var newCluster = createNode(matchElements[i])
                
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
                    
                    var objNewElement = createNode(matchClusterElements[j])

                    var objELementValues = createNameMatches(matchClusterElements[j])

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
        
        
        
  
            return objItemsFinal

}}

//////////////////////
//TESTAR ITEMS MATCHES
//////////////////////




//var testeItems = createItemsMatches(testeDetails)

//////////////////////////



function createDetailsMatches(string){

    var objDetails = {}
    var objItemsDetails = createItemsMatches(string)
    objDetails["details_matches"] = []
    objDetails["details_matches"].push(objItemsDetails)

    return objDetails
    

}


//var testeDetail = createDetailsMatches(testeDetails)







function createContextMatches(string){
    var objContext = {}
    var objItemsDetails = createItemsMatches(string)
    objContext["context_matches"] = []
    objContext["context_matches"].push(objItemsDetails)

    return objContext
}


var objMatchCheck = {
    "name matches" : createNameMatches,
    "category matches" : createNameMatches,
    "details matches" : createDetailsMatches,
    "description matches": createDetailsMatches,
    "credentials matches" : createDetailsMatches,
    "items matches" : createDetailsMatches,
    "context matches" : createContextMatches
  }





function removeMatches(string){
    string = string.replaceAll("upper matches", "")
    string = string.replaceAll("lower matches", "")

    return string
}  



//Função que procura os matches e depois chama as outras funções em função do tipo de match que é
export function createAllMatches(string){
      
      
        //Cria um objecto com os termos de Ontology 
        var objOntology = JSON.parse(createOntology(string))
        ontologyItems = objOntology.ontology.term_definitions.en.items

        if(JSON.stringify(objOntology).includes("constraint_definitions")){
            var ontologyConstraints = objOntology.ontology.constraint_definitions.en.items
            ontologyItems = {
                ...ontologyConstraints,
                ...ontologyItems
            }
        }



        //Vai buscar só a parte do definition
        var regexDefinition = /definition[\w\W]*ontology/
        var matchDef = regexDefinition.exec(string)
        string = matchDef[0]

        //Cria o primeiro node
        var firstNode = {}
        firstNode = createNode(string)

        
        
        
        
        var objAllMatches = {}

        //tira o espaço vazio no final (Necessário para a expressão regular regexMaType funcionar corretamente)
        string = string.replace(/}[\r\n]+ontology/, "}")
        //Tira a primeira referencia a "occurrences" necessário para os matches darem bem
        string = string.replace("occurrences", "")

        //Tirar o termo cardinality
        string = string.replace(" cardinality", "")

        string = removeMatches(string)

        
        //Faz match dos diferentes tipos de matches existentes (Name matches, definition matches, protocol matches...)
        var regexMaType = /[a-z]+ matches\s+{.+?}(?=\s+[a-z]+ matches|$)/gs
        var matchMaType = string.match(regexMaType)
        

        

        
        for (var i = 0 ; i < matchMaType.length; i++){
        
            var regexMaType = /[a-z]+ matches/  //só é necessario a primeira instancia logo não se põe o "g"
            var matchFinalType = matchMaType[i].match(regexMaType)
            matchFinalType = matchFinalType[0]

            if(firstNode.rm_type == "CLUSTER"){
            
                var objMatch = createItemsMatches(matchMaType[i], "CLUSTER")
            
            }
            else{
                
                var matchesFunction = objMatchCheck[matchFinalType]
                var objMatch = matchesFunction(matchMaType[i])
              
                
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







