"use strict";

/*
Write a function called specialMultiply which accepts two parameters. If the function is passed both parameters, it 
should return the product of the two. If the function is only passed one parameter - it should return a function 
which can later be passed another parameter to return the product. You will have to use closure and arguments to solve this. 
*/

function specialMultiply(a, b) {
    if(isNaN(a)) {
        return c => Math.imul(b, c);
    } else if(isNaN(b)) {
        return c => Math.imul(a, c);
    } else {
        return a*b;
    }
}

const multUndefiniedA = specialMultiply(undefined, 9);
const multUndefiniedB = specialMultiply(8, undefined);
const mult = specialMultiply(2, 3);

console.log("This is an example of a closure function");
console.log("[" + typeof(multUndefiniedA) + "] A not definied: " + multUndefiniedA(10));
console.log("[" + typeof(multUndefiniedB) + "] B not definied: " + multUndefiniedB(11));
console.log("[" + typeof(mult) + "] All is definied: " + mult);