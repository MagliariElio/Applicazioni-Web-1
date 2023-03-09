"use strict";

function counter() {
    let count = 0;
    return () => {
        count++;
        return count;
    }
}


console.log("This is another example of a closure function");
const count = counter();
console.log(count());
console.log(count());
console.log(count());
console.log(count());
console.log(count());
console.log(count());
console.log(count());
console.log(count());


const count2 = counter();
console.log(count2());
console.log(count2());
console.log(count2());
