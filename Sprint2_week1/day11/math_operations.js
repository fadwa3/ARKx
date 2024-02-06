//*addition function
function addNumbers(num1, num2) {
    return num1 + num2;
   }
//*subtraction function
function subtractNumbers(num1, num2) {
   
    return num1 - num2;
    
   }
//*multiplication function
function multiplyNumbers(num1, num2) {
    return num1*num2;
   }
//*divition function
function dividNumbers(num1, num2) {
    if(num2!=0){
    return num1 / num2;
    }else{
        console.log('the devider is invalid');
    }
   }
//* calling the functions 
let a=2;
let b=4;
console.log('the addition of a and b is : ',addNumbers(a,b));
console.log('the subtraction of a and b is : ',subtractNumbers(a,b));
console.log('the multiplication of a and b is : ',multiplyNumbers(a,b));
console.log('the divition of a and b is : ',dividNumbers(a,b));
