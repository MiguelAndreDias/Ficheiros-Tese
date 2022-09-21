var fs = require('fs');

var lastVarr = []
var lastV = "";
var dataOjb = {}
var skipper = ['', '>', '}']
var captureKey = ""
var captureValue = ""
var lastMainTabCount = "";  
var filename = 'openEHR-DEMOGRAPHIC-CLUSTER.person_death_data_iso.v0.adl.txt'
//'openEHR-EHR-CLUSTER.address.v0.adl.txt'
//openEHR-EHR-CLUSTER.environmental_conditions.v0.adl
//filename = "2.txt" //testing 
      
fs.readFile(filename, 'utf8', function(err, data){
  
  dataOjb["definition"] = {}
  var regex1 = new RegExp('^(definition.*?\\}\\s*}\\s*}\\s*})', "imsg"); 
  while ((m1 = regex1.exec(data)) !== null) {
    data = data.replace(m1[1], "");
    var oneD = {}
    var regex2 = new RegExp('-- (.*?)$', "imsg"); 
    var he1 = regex2.exec(m1[1])
    if(he1[1] !== undefined){
      
      dataOjb["definition"][he1[1]] = {}
      
      var regex3 = new RegExp('ELEMENT\\[.*?--\\s+(.*?)\\n.*?\\{(.*?)\\}\\s*\\}', "imsg"); 
      while ((m3 = regex3.exec(m1[1])) !== null) {
        
        var regex4 = new RegExp('(\\w+)\\s+matches\\s+\\{(.*?)$', "imsg"); 
        var he4 = regex4.exec(m3[2])
    
        if(he4 !== null){
          dataOjb["definition"][he1[1]][m3[1]] = {
            "type" : he4[1],
            "value" : he4[2],
          }
        }
        else{
          /*
          var regex5 = new RegExp('(\\w+)\\s+<(.*?)\\}', "imsg"); 
          var he5 = regex5.exec(m3[2])
      
          if(he5 !== null){
            dataOjb["definition"][he1[1]][m3[1]] = {
              "tysspe" : he5[1]
            }
            
            var regex6 = new RegExp('(\\w+)\\s*=\\s*(.*?)>', "imsg"); 
            var he6 = regex6.exec(he5[2])
              console.log("--", he6, he5[2])
              
            if(he6 !== null){
              dataOjb["definition"][he1[1]][m3[1]][he6[1]] = he6[2]
            }
            
          }
          */
        
        }
        
        
        
      }
      
    }
    
  }
  
  //console.log(JSON.stringify(dataOjb));
  //console.log(dataOjb);process.exit()
  
  var exp = data.split("\n");
  //console.log(exp);
  
  exp.forEach(function(v, mainK){
     
    var check2V = v.replace(/\t+/g, '');
    check2V = check2V.replace(/\r+/g, '');
    
    
    v = v.replace(/\r+/g, '');
    
    if(check2V == ">"){
      delete lastVarr[lastVarr.length-1]
      var compactArray = [];
      for (var i in lastVarr) {
        compactArray.push(lastVarr[i]);
      }
      lastVarr = compactArray
    }
    
    if (skipper.includes(check2V)) {
       //skip this cases
    }
    else{
      var myRegexp = new RegExp("^(\t+)(.)", "g"); 
      var tabMatch = myRegexp.exec(v);
      
      if(captureKey !== ""){
        var newlastMainTabCount =  [ ...lastMainTabCount]; 
        setObjectKey(dataOjb, v, newlastMainTabCount)
        if(getValue('">$', v)){
          captureKey = captureValue = lastMainTabCount = "";  
        }     
      }
      else if(tabMatch === null ){
        dataOjb[v] = {}
        lastVarr = [v]
        lastV = v
      }
      else{
        var resKyeMap = lastVarr.filter((val, index, arr) => index > arr.length - tabMatch[1].length - 1);
        lastMainTabCount =  [ ...resKyeMap];
        setObjectKey(dataOjb, v, resKyeMap)     
         
      }

    }
    
    //if(mainK == 123){
      //console.log(dataOjb);
      //process.exit()
    //}
        
  });

  console.log(JSON.stringify(dataOjb)); //resultado
  //console.log(dataOjb);
    
    
  
  
});


function getValue(r, v){
  var myRegexp = new RegExp(r, "gims"); 
  var tabMatch = myRegexp.exec(v);
  if(tabMatch !== null){
    return tabMatch
  }
  else{
    return null
  }
}

function setValue(r, v, testOjb, caseM){
  var check1 = getValue(r, v)
  if(check1 !== null){
    //console.log(caseM, v);
    
    if(check1[2] == "<"){
      lastVarr.push(check1[1])
      testOjb[check1[1]] = {}
    }
    else if(caseM === 6){
      captureKey = check1[1]
      testOjb[captureKey] = check1[2]
    }
    else{
      testOjb[check1[1]] = check1[2]
    }
  }
  else{
    return null;
  }
}

function setObjectKey(testOjb, val, resKyeMap){
  if(resKyeMap.length > 0){
    var f = resKyeMap[0] 
    delete resKyeMap[0] 
    var compactArray = [];
    for (var i in resKyeMap) {
      compactArray.push(resKyeMap[i]);
    }
    setObjectKey(testOjb[f], val, compactArray) 
  }
  else{

    if(Object.keys(dataOjb).length == 1){
      dataOjb[lastV] = val 
    }
    else if(captureKey !== ""){
      testOjb[captureKey] = testOjb[captureKey]+val
    }
    else{
      one = setValue("^\\t+\\[(\\w+)\\]\\s+--\\s+(.*?)$", val, testOjb, 1)
      if(one === null){
        two = setValue("^\t+(\\w+)\\s*=\\s*<(.*?)>$", val, testOjb, 2)
        if(two === null){
          three = setValue("^\t+(\\w+)\\s*=\\s*(<)$", val, testOjb, 3)
          if(three === null){
            four = setValue("^\t+\\[\"(\\w+)\"\\]\\s*=\\s*(<)$", val, testOjb, 4)
            if(four === null){
              five = setValue('^\\t+\\["(.*?)"\\]\\s*=\\s*<"(.*?)">', val, testOjb, 5)
              if(five === null){
                six = setValue('^\t+(\\w+)\\s*=\\s*<(.*?)$', val, testOjb, 6)
                if(six === null){
                  six = setValue('^\t+\\["(\\w+)"\\]\\s*=\\s*<(.*?)$', val, testOjb, 6)
                  if(six === null){
                    testOjb[lastV] = val
                  }
                }
              }
            }
          }
        }
      }
    }
    resKyeMap = []
  }
}
