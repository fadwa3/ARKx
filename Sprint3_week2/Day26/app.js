//! Connect to MongoDB
const { MongoClient } = require("mongodb");

const url = "mongodb://localhost:27017";

const client = new MongoClient(url);

client
    .connect()
    .then(() => console.log("Connected to the database"))
    .catch((error) => console.log("Error: ", error));

//! Get a reference to the database and collection:
const db = client.db('first_db');
const collection = db.collection('users');
const docs = [{ name: "fadwa", age: "22" }, { name: "admin", age: "25" }, { name: "Arkadian", age: "25" }]
//! Perform basic operations
collection
    .insertMany(docs)
    .then((user) => console.log("User Created Successfully: "))
    .catch((error) => console.log("Error: ", error));
//! Retrieve and print all users from the collection
const users = collection.find();
users.toArray()
    .then((userArray) => {
        userArray.forEach((user) => {
            console.log(user);
        });
})
    .catch((error) => console.log("Error: ", error));

