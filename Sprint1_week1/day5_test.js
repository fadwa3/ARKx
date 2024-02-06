const books = require("./books.json");

function priceOfBook(bookName) {
 
    for (let i = 0; i < books.length; i++) {
      if (books[i].title === bookName) {
        return books[i].price;
      }
    }
    console.log("priceOfBook is not working properly.");
  }


function affordableBooks(budget) {
  const affordable = [];
  for (let i = 0; i < books.length; i++) {
    if (books[i].price <= budget) {
      affordable.push(books[i]);
    }
  }
  return affordable;
}

function findBookByGenre(genre) {
   // Initialize an empty array to store books of the specified genre.
   const ByGenre = [];
   // Loop through all the books in the 'books' array.
   for (let i = 0; i < books.length; i++) {
     // For each book, loop through all the genres of the book.
     for (let j = 0; j < books[i].genres.length; j++) {
       // Check if the current genre of the book matches the specified genre.
       if (books[i].genres[j] === genre) {
         // If so, add this book to the 'ByGenre' array.
         ByGenre.push(books[i]);
       }
     }
   }
   // Return the array containing books of the specified genre.
   return ByGenre;
}

function groupByGenre() {
  // Create an empty object to store grouped books
  const groupedBooks = {};

  // Loop through each book in the array
  for (let i = 0; i < books.length; i++) {
    // Loop through each genre of the current book
    for (let j = 0; j < books[i].genres.length; j++) {
      // Get the current genre
      const genre = books[i].genres[j];

      // If the genre is not a key in the groupedBooks object, create an array for it
      if (!groupedBooks[genre]) {
        groupedBooks[genre] = [];
      }

      // Push the current book to the array associated with its genre
      groupedBooks[genre].push(books[i]);
    }
  }
  // Return the object containing books grouped by genre
  return groupedBooks;
}

function sortBooksByPrice() {
// using the bubble sort 

let swap; //flag to track whether a swap accurred
let n=books.length; //number of books in the array
   do{
    swap=false;//reset swap flag each time we start looping on the array
    //iterate through the array 
    for( let i=0 ; i<n-1 ; i++ ){
        if( books[i].price >books[i+1].price ){
          //swap the two books objects
          let temp = books[i];
          books[i] = books[i + 1];
          books[i + 1] = temp;

            swap = true; //set the flag to indicate that a swap has accured
            }
    }
    n=n-1; //reduce the lenght of the array since the max value is placed at the end
    }
    while(swap==true); //continue until there is no more swap
}
sortBooksByPrice(); // Call the function to sort the books array
console.log('the price of the first book of the array is : ' ,books[0].price,'and the last book price is :',books[books.length-1].price);


(function main() {
  try {
    if (priceOfBook("The Alchemist") !== 9.49) {
      throw new Error("priceOfBook is not working properly.");
    }
    if (affordableBooks(10).length !== 6) {
      throw new Error("affordableBooks is not working properly.");
    }
    if (findBookByGenre("Fiction").length !== 7) {
      throw new Error("findBookByGenre is not working properly.");
    }
    if (Object.keys(groupByGenre()).length !== 30) {
      throw new Error("groupByGenre is not working properly.");
    }
    if (sortBooksByPrice()[0].price !== 5.99) {
      throw new Error("sortBooksByPrice is not working properly.");
    }
    console.log("All tests passed successfully.");
  } catch (error) {
    console.log('heyyyy buuuugs');
  }
})();
