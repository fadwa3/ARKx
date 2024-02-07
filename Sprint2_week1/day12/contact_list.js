const { exit } = require('process');
const reader = require('readline');
// Create the readline interface
const rl = reader.createInterface({
    input: process.stdin,
    output: process.stdout,
});

let collection = [];
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
                exit();
            default:
                console.log('The choice number you entered is invalid');
        }
        Menu();
    });
}

function EnterInformations() {
    rl.question('What is your name? ', (name) => {
        rl.question('What is your phone number? ', (number) => {
            collection.push({ name, number });
            rl.close();
        });
    });
    Menu();

}

function displaycontacts() {
    if (collection.length == 0) {
        console.log('No contacts available.');
    } else {
        collection.forEach((element) => console.log(`contact name: ${element.name}, Phone number: ${element.number}`));
    }
    Menu();

}

function searchcontact() {
    rl.question('What is the name of the contact searched? ', (nm) => {
        const contact = collection.find((c) => c.name === nm);
        if (contact) {
            console.log(`The contact searched with the name: ${contact.name} and the phone number: ${contact.number}`);
        } else {
            console.log("The contact searched doesn't exist");
        }
        rl.close();
    });
    Menu();

}
Menu();

rl.on('close', () => {
    exit();
});
