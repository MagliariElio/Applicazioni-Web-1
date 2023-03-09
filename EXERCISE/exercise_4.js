"use strict";


function sumTwoNumber(a, b, sum) {
    return sum(a, b);
}

function buildName(nome, printer) {
    let name = "Hi, I'm " + nome;
    printer(name);
}


console.log("This is an example of a callback function");

const a = 7;
const b = 8;
const result = sumTwoNumber(a, b, (a, b) => (a+b));
console.log(a+ " + " + b + " = " + result);

buildName("Elio", (name) => console.log(name));