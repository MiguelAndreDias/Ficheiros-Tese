let y = 1;


function soma(num){
    let y = num
    y = y + y -1
    console.log("aqui")
    console.log("O y vale " + y)
    console.log("aqui")
    if(y == 5){
        y = soma(y - 1)
        
       
        console.log("O y vale " + y)
      
        
    }
    
        return y
    
   
}

function ola(){
    let y = 3
    var cena = soma(y)
    console.log("????")
    console.log(cena)
    console.log("O y vale " + y)
   
    return cena
}

console.log(ola())
console.log("22222222")
console.log("O y vale " + y)



/* 
if(y === 1){
    let y = 2;
    console.log(y)
    
}

console.log(y) */


function foo(){
    var bar1; // Local variable
    bar1 = 11;
    bar2 = bar1; // bar2 will be global with same value.
 }


 foo()