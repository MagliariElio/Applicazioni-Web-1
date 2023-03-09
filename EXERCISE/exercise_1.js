"use strict";

/*
Write a JavaScript program to list the properties of a JavaScript object. Go to the editor
Sample object:
    let student = {
    name : "David Rayy",
    sclass : "VI",
    rollno : 12 };

Sample Output: name,sclass,rollno
*/

let student = {
    name: "Elio Magliari",
    scalss: "VI",
    rollno: 12,
    age: 22
};

console.log("------------------------------------------------------------");
for (let property in student) {
    console.log(property);
}

console.log("------------------------------------------------------------");
console.log("Deleting the age property");
delete student.age;

console.log("------------------------------------------------------------");
for (let property in student) {
    console.log(property);
}

console.log("------------------------------------------------------------");
console.log("Another way to print all properties");
let keys = Object.keys(student);
let values = Object.entries(student);
console.log(keys);
console.log(values);
for(let property of keys) {
    console.log(property);
}

console.log("------------------------------------------------------------");
console.log("Local and Reference copy of the student");
let anotherStudentLocal = {...student};
anotherStudentLocal.name = "Anuar Magliari";

let anotherStudentReference = student;

console.log("original: " + JSON.stringify(student));
console.log("local: " + JSON.stringify(anotherStudentLocal));
console.log("reference: " + JSON.stringify(anotherStudentReference));

let nome = "Elio";
console.log("\nname -> " + nome);
student.name = nome;

console.log("original: " + JSON.stringify(student));
console.log("local: " + JSON.stringify(anotherStudentLocal));
console.log("reference: " + JSON.stringify(anotherStudentReference));

console.log("------------------------------------------------------------");

console.log(student.nodeType);
