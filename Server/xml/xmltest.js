//Needed to have both import and requires in the same file
import {createRequire} from "module";
const require = createRequire(import.meta.url);


//packages
const xml2js = require('xml2js');
const fs = require('fs');

// read XML from a file
const xml = fs.readFileSync('HSE Sample.opt');

var data2 = {}
// convert XML to JSON
xml2js.parseString(xml, { mergeAttrs: true }, (err, result) => {
    if (err) {
        throw err;
    }

    // `result` is a JavaScript object
    // convert it to a JSON string
    const json = JSON.stringify(result, null, 4);
      // convert data into JSON object
  var parsedData = JSON.parse(json);
  data2 = parsedData
  
  // looping through JSON object
  //for(var key in parsedData.template){
    //console.log(key, parsedData.template[key]);
  //}

    // save JSON in a file
    fs.writeFileSync('exemploHSE.json', json);

}); 


var newJson = {}

newJson["themeColor"] = "default"
newJson["templateName"] = data2.template.template_id[0].value[0]
newJson["templateId"] = data2.template.uid[0].value[0]
newJson["rm_type_name"] = data2.template.definition[0].rm_type_name[0]
newJson["occurrences"] = {"lowerOccurrences": 0,"upperOccurrences": 0}

const lower = data2.template.definition[0].occurrences[0].lower
const upper = data2.template.definition[0].occurrences[0].upper
console.log(lower[0])

if(lower[0] > 0){
  newJson.occurrences.lowerOccurrences = lower[0]
}

if(upper[0] > 0){
  newJson.occurrences.upperOccurrences = upper[0]
}

newJson["archetypeId"] = data2.template.definition[0].archetype_id[0].value[0]
newJson["path"] = data2.template.definition[0].archetype_id[0].value

newJson["node"] = {"code": "at0000",
"text": "",
"description": ""
}

console.log("ola")

newJson.node.text =  data2.template.definition[0].term_definitions[0].items[0]._

newJson.node.description = data2.template.definition[0].term_definitions[0].items[1]._

newJson["items"] = []



console.log(newJson)
console.log("hjkhjklkj")
console.log(data2)

  
