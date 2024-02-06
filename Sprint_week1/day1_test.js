//  exercice 1
//! task 1

let firstname = 'fadwa';
let lastname = 'benlhaddad';
const PI = 3.14;
let radius = 3;
let favoriteSuperhero = 'luffy';
let favorieQuote = 'fake it until u make it ';

//! task 2

let fullName = firstname + ' '+ lastname ;
console.log('my name is ',fullName);

let area = PI * (radius**2);
console.log('the area is ',area);

let perimeter = 2*PI*radius;
console.log('the perimeter is ',perimeter);

let motivation = 'A wise man named <'+ favoriteSuperhero +'> : "< ' +favorieQuote+' >"';
console.log(motivation);

//! task 3

let a = 3;
let b = 10;

let temp;
temp=a;
a=b;
b=temp;

console.log("After swapping: a = ", a, " and b = ", b); 

// exercice 2

//! task 1

let x = 4 ;
if (x%2==0) {
    console.log('the variable is even')
} else {
    console.log('the variable is odd')
}

//! task 2

var day = 9;
switch (day){
    case 1:
         console.log("Monday");
         break;
    case 2:
        console.log("Tuesday");
        break;
    case 3:
        console.log("Wednsday");
        break;
    case 4:
        console.log("Thursday");
        break;
    case 5:
        console.log("Friday");
        break;
    case 6:
        console.log("Saturday");
        break;
    default:
        console.log("Unvalid Day");
    case 7:
        console.log("Sunday");
        break;
}

//! task 3

let A = -15;
let B = 6;
let C = 2.6;
 if (A>B && A>C){
    console.log("the max number is ",A);
 }else if (B>A && B>C){
    console.log("the max number is ",B);
 }else{
    console.log("the max number is ",C);
 }

//! task 4 

let score = 88;

if (score > 85 && score<=100){
    console.log("hey teacher this student's grade is A");
 }else if ( score > 70 ){
    console.log("hey teacher this student's grade is B");
 }else if ( score > 55 ){
    console.log("hey teacher this student's grade is C");
 }else if ( score > 40 ){
    console.log("hey teacher this student's grade is D");
 }else if (score > 15 ){
    console.log("hey teacher this student's grade is E");
 }else if (score > 0){
    console.log("hey teacher this student's grade is F");
 }else{
    console.log("hey teacher this student's note is unvalid");
 }
