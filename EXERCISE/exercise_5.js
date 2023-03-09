"use strict";






console.log("This is an example of non blocking code");



// attende un secondo per essere eseguito ma viene inserito all'interno dello stack
// degli eventi e verrà prelevato non appena il thread principale non ha niente da eseguire
const onesec = setTimeout(() => {
    console.log("I'm Elio");
}, 1000);

console.log("Hi");

/*
while(true);    // se mettessi un ciclo infinito e quindi lasciassi al thread principale 
                // di eseguire solo questo compito, l'evento dallo stack non verrebbe prelevato
                // perchè JS è single threaded
*/