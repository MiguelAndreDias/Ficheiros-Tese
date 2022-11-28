//Needed to have both import and requires in the same file
import { Console } from "console";
import {createRequire} from "module";
const require = createRequire(import.meta.url);
const fs = require('fs');
var content = {"cena": "ola"};
content = JSON.stringify(content)
/* fs.writeFile('fetchCLUSTER.txt', content, err => {
  if (err) {
    console.error(err);
  }
  // file written successfully
}); */



var url = "https:\/\/raw.githubusercontent\.com\/MiguelAndreDias\/CKM-mirror\/main\/local\/archetypes\/"
//varia com o tipo de ficheiro
var rmType = "cluster\/"
//varia com a Regex de cada ficheiro
var file = "(openEHR-EHR-CLUSTER\.document_entry_metadata(-[a-zA-Z0-9_]+)*\.v1|openEHR-EHR-CLUSTER\.document_entry_metadata(-[a-zA-Z0-9_]+)*\.v0)"
var extension = "\.adl"

var regexTeste = new RegExp(url + rmType + file + extension)
console.log(regexTeste)

var stringTeste = `

mirror/git/blobs/ac3a991760d0194c92b1955e76d2a770e50782ee","html":"https://github.com/MiguelAndreDias/CKM-mirror/blob/main/local/archetypes/cluster/openEHR-EHR-CLUSTER.distribution.v0.adl"}},{"name":"openEHR-EHR-CLUSTER.document_entry_metadata.v0.adl","path":"local/archetypes/cluster/openEHR-EHR-CLUSTER.document_entry_metadata.v0.adl","sha":"6b50a2594360e58ccd500c67e9ffe679da8b5784","size":2845,"url":"https://api.github.com/repos/MiguelAndreDias/CKM-mirror/contents/local/archetypes/cluster/openEHR-EHR-CLUSTER.document_entry_metadata.v0.adl?ref=main","html_url":"https://github.com/MiguelAndreDias/CKM-mirror/blob/main/local/archetypes/cluster/openEHR-EHR-CLUSTER.document_entry_metadata.v0.adl","git_url":"https://api.github.com/repos/MiguelAndreDias/CKM-mirror/git/blobs/6b50a2594360e58ccd500c67e9ffe679da8b5784","download_url":"https://raw.githubusercontent.com/MiguelAndreDias/CKM-mirror/main/local/archetypes/cluster/openEHR-EHR-CLUSTER.document_entry_metadata.v0.adl","type":"file","_links":{"self":"https://api.github.com/repos/MiguelAndreDias/CKM-mirror/contents/local/archetypes/cluster/openEHR-EHR-CLUSTER.document_entry_metadata.v0.adl?ref=main","git":"https://api.github.com/repos/MiguelAndreDias/CKM-mirror/git/blobs/6b50a2594360e58ccd500c67e9ffe679da8b5784","html":"https://github.com/MiguelAndreDias/CKM-mirror/blob/main/local/archetypes/cluster/openEHR-EHR-CLUSTER.document_entry_metadata.v0.adl"}},{"name":"openEHR-EHR-CLUSTER.dosage.v2.adl","path":"local/archetypes/cluster/openEHR-EHR-CLUSTER.dosage.v2.adl","sha":"b9417258ed726fe5b9afa59c96cab604c2cc9b05","size":34500,"url":"https://api.github.com/repos/MiguelAndreDias/CKM-mirror/contents/local/archetypes/cluster/openEHR-EHR-CLUSTER.dosage.v2.adl?ref=main","html_url":"https://github.com/MiguelAndreDias/CKM-mirror/blob/main/local/archetypes/cluster/openEHR-EHR-CLUSTER.dosage.v2.adl","git_url":"https://api.github.c

`

var matchTeste = stringTeste.match(regexTeste)
console.log(88888)
console.log(matchTeste[0])
console.log(88888)



const fetch = require('sync-fetch')

/* const metadata = fetch('https://doi.org/10.7717/peerj-cs.214', {
  headers: {
    Accept: 'application/vnd.citationstyles.csl+json'
  }
}).json() */



console.log(111111)
var url = "https://api.github.com/"
var getRepoContent = "repos/MiguelAndreDias/CKM-mirror/contents/local/archetypes/"

        
    var response = fetch(url + getRepoContent + rmType   , {
    headers: ({
        'Accept': 'application/vnd.github.v3+json',
        'Authorization': 'Bearer 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',
        
        })
    });
  
    var data = response.text();
  

    console.log(data)
console.log(111111)


console.log(99999)

console.log(88888)




function findIncludeArchetype(string){
  var regexOpenEHR = /\/openEHR.+\//g
  var matchregexOpenEHR = string.match(regexOpenEHR)

  for(var i = 0; i < matchregexOpenEHR.length; i++){

      var url = "https:\/\/raw.githubusercontent\.com\/MiguelAndreDias\/CKM-mirror\/main\/local\/archetypes\/"
      //varia com o tipo de ficheiro
      var rmType = "cluster\/"
      //varia com a Regex de cada ficheiro
      var file =  matchregexOpenEHR[i] 
      file = file.substring(1)
      file = file.slice(0, -1)
      file = "(" + file + ")"
      console.log(file)
      var extension = "\.adl"

      var regexInclude = new RegExp(url + rmType + file + extension, "g")
      console.log(regexInclude)
      var matchInclude = objRepo.match(regexInclude)
      matchInclude = matchInclude[0]

      //FAZER O FETCH!!!

      var response = fetch(matchInclude).then(res => res.text()).then(text => {
    
      
        console.log(text)
        console.log("Adeus")
      })
     
  }
  return matchregexOpenEHR
}