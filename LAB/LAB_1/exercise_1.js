"use strict";

/*
Create a function that, given an array of strings, for each string computes and prints a new one composed by
the first two and last two characters. For instance, ‘spring’ yields ‘spng’.
If the word is shorter than two characters, it prints an empty string. Otherwise, if the word is two or three
characters long, the function prints the same character two times. For instance, ‘it’ yields ‘itit’ and ‘cat’
yields ‘caat’.
Write some test instructions that call the function with a variety of strings and check the result's correctness.
*/


const array = ["ciao", "hello", "hola", "hi", "salut", "bye", "bonjour"];

function printString() {
    for(let word of array) {
        if(word.length < 2) {
            word = "";
        } else if(word.length in [2, 3]) {
            word = word.concat(word);
        }
        
        word = word.slice(0, 2).concat(word.slice(word.length-2));
        console.log(word);
    }
}


printString();