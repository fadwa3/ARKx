//! Task 1 : Speed run !!
//*--->1 sum of a table content 
function summ(numbers){
    let s=0;
    for(let i=0;i<numbers.length ;i++){
        s+=numbers[i];
    }
    return s;
}
var n=[2,3,4];
console.log(summ(n));
//*---->2 number of even values in a table
function countEven(numbers){
    var sumEven=0;
    for(let i=0;i<numbers.length;i++){
        if(numbers[i]%2==0){
          sumEven++;
         }
    }
    return sumEven;
} 
console.log(countEven(n));
//*----->3 douple of a table 
function double(numbers){
    var doupleAr=[];
    for(let i=0;i<numbers.length;i++){
        doupleAr[i]=numbers[i]*2;
    }
    return doupleAr

}
console.log(double(n));

//! Task 2 : The pair of socks
function Bubble(t) {
    let echange;
    let n = t.length;
    let temp;
    do {
      echange = false;
      for (let i = 0; i < n - 1; i++) {
        if (t[i] > t[i + 1]) {
          temp = t[i];
          t[i] = t[i + 1];
          t[i + 1] = temp;
          echange = true;
        }
      }
      n = n - 1;
    } while (echange);
    return t;
  }
  function sockMerchant(t) {
    let tSort = Bubble(t);
    let CountPairs = 0;
    for (let i = 0; i < t.length - 1; i++) {
      if (tSort[i] === tSort[i + 1]) {
        CountPairs++;
        i += 1;
      }
    }
    return CountPairs;
  }
  socks = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  console.log("number of pairs socks " + sockMerchant(socks));
  