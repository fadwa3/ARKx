
//! Task 1 : Factorial

let num = 5;
let res;
if(num==0){
    res=1;
}else{
    res=1;
   for(let i=1; i<=num ; i++){
    
    res=i*res;
   }
}
console.log('the factorial of ',num,'is : ',res);


//! Task 2 : How many digits ?

var NUM = 123542;
let Rest=NUM
let cnt=0;

while(Rest!=0){

  Rest=(Rest/10)-((Rest%10)/10);
  cnt=cnt+1;
}
console.log('the result is : ',cnt);

//! Task 3 :  Time to draw ! 

let n=4;
let t='';
  for (let i = 1; i <= n; i++) {
      var L = '';
     
       for (let j = i; j <= n; j++) {
          L += ' ';
       
      }
      for (var k = 1; k <=(i*2)-1; k++) {
        L += '*';
    } 
      console.log(L);
    
  }

   for(let e=0;e<=n-1;e++){
    t+=' ';
  }
  t+='|';
  console.log(t);

//Functions & Reusability

//! Task 1 : Going back in Time !

//* 1 -->Factorial

function Factorial(num){
let res;
if(num==0){
    res=1;
}else{
    res=1;
   for(let i=1; i<=num ; i++){
    
    res=i*res;
   }
}
return res;
}
console.log('fact is ',Factorial(0));
//*2--> nDigits
function nDigits(NUM){
  
let Rest=NUM
let cnt=0;

while(Rest!=0){

  Rest=(Rest/10)-((Rest%10)/10);
  cnt=cnt+1;
}
return cnt;

}
console.log('numbers of digits in 2001 is : ',nDigits(2001))
//*3--> numberToDay
function numberToDay(day){
  
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
    case 7:
        console.log("Sunday");
        break;
    default:
    console.log("Unvalid Day");
}
}
numberToDay(7);
//*4-->max
function max(A,B,C){

 if (A>B && A>C){
return A;
 }else if (B>A && B>C){
    return B;
 }else{
    return C;
 }
}
console.log("the max of 3,8,1 is ",max(3,8,1));

//*5--> myGrade
function myGrade(score){

  if (score > 85 && score<=100){
      console.log("hey teacher this student's grade is A");
   }else if (score <= 85 && score > 70 ){
      console.log("hey teacher this student's grade is B");
   }else if (score <= 70 && score > 55 ){
      console.log("hey teacher this student's grade is C");
   }else if (score <= 55 && score > 40 ){
      console.log("hey teacher this student's grade is D");
   }else if (score <= 40 && score > 15 ){
      console.log("hey teacher this student's grade is E");
   }else if (score <= 15 && score > 0){
      console.log("hey teacher this student's grade is F");
   }else{
      console.log("hey teacher this student's note is unvalid");
   }
}
myGrade(122);
//! Task 2 : The Extended Factorial
function combinator(n,p){
 
  return Factorial(n)/(Factorial(p)*Factorial(n-p));
}
combinator(5, 2) // 10

//! Task 3 :  The Calculator

function calculator(a,o,b){

  if(o=='+'){
     return a+b}
  else if(o=='-'){
  return a-b}
  else if(o=='*'){
  return a*b}
  else if(o=='/'&& b!=0){
  return a/b}
  else if(o=='%' && b!=0){
  return a%b ;}
  else if(o=='c'){
  return combinator(a, b);
  }else{
    console.log('invalide operator or null devider')
  }   
}

console.log(calculator(5, 'c', 2)) ;
