//! Task 1 : Warm up !
const student = {
  _firstname: "fadwa",
  _lastname: "ben",
  _fullname: "",
  age: 22,
  // methods
  get firstname() {
    return this._firstname;
  },
  get last_name() {
    return this._lastname;
  },
  get fullname() {
    return '"<' + this._firstname + "> <" + this._lastname + '>"';
  },
};
console.log(student.fullname);
//! Task 2 : Are you Older Than me ?
class Person {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }
  compareAge(P) {
    if (this.age < P.age) {
      return ' "' + P.name + ' is older than me."';
    } else if (this.age > P.age) {
      return ' "' + P.name + ' is younger than me."';
    } else {
      return ' "' + P.name + ' is the same age as me."';
    }
  }
}
// instantiation
p1 = new Person("Samuel", 24);
p2 = new Person("Joel", 36);
p3 = new Person("Lily", 24);
// result
console.log(p2.compareAge(p3));
console.log(p2.compareAge(p1));
console.log(p1.compareAge(p3));

//! Task 3 : Most Occurred
function insertionSort(arr) {
  for (let i = 1; i < arr.length; i++) {
    for (let j = i; j >= 0; j--) {
      if (arr[j] < arr[j - 1]) {
        let temp = arr[j];
        arr[j] = arr[j - 1];
        arr[j - 1] = temp;
      }
    }
  }
  return arr;
}
function mostOccurred(anArray) {
  let sortedArray = insertionSort(anArray);
  let counter = 1;
  let index = 0;
  let maxNumber = 0;
  for (let i = 0; i < sortedArray.length; i++) {
    if (sortedArray[i] == sortedArray[i + 1]) {
      counter++;
    } else {
      if (counter > maxNumber) {
        maxNumber = counter;
        index = i;
        counter = 1;
      }
    }
  }
  return sortedArray[index];
}

console.log(mostOccurred([2, 4, 4, 4, 4, 6, 2, 2, 3, 3, 3]));