const reader = require('readline');
//! methode 1 
//! start
//* Create the readline interface
const rl = reader.createInterface({
    input: process.stdin,
    output: process.stdout,
});
//* the enter contact information function

function EnterInformations() {
    rl.question('What is your name? ', (name) => {
        rl.question('What is your phone number? ', (number) => {
            collection.push({ name, number });
            Menu();
        });

    });
}
//* the display contacts function

function displaycontacts() {
    if (collection.length != 0) { 
        collection.forEach((element) => console.log(`contact name: ${element.name}, Phone number: ${element.number}`));
    } else {
        console.log('No contacts available.');
    }
    Menu();
}
//* the search contact information function

function searchcontact() {
    rl.question('What is the name of the contact searched? ', (nm) => {
        const contact = collection.find((c) => c.name === nm);
        if (contact) {
            console.log(`The contact searched with the name: ${contact.name} and the phone number: ${contact.number}`);
        } else {
            console.log("The contact searched doesn't exist");
        }
        Menu();

    });
}

let collection = [];
//* the contact menu function
function Menu() {
    console.log('Hello and welcome to the contact list menu: \n1 --> Enter a new contact \n2 --> Display the list of contacts \n3 --> Search for a contact \n4 --> Exit the application');
    rl.question('Write the number of choice you want: ', (choice_nbr) => {
        switch (parseInt(choice_nbr)) {
            case 1:
                EnterInformations();
                break;
            case 2:
                console.log('Here is the contact list:');
                displaycontacts();
                break;
            case 3:
                searchcontact();
                break;
            case 4:
                rl.close();
                break;
            default:
                console.log('The choice number you entered is invalid');
            Menu();
        }
    });
}
//*calling the menu function
Menu();
//!end 
