//!Require Mongoose 
const mongoose = require('mongoose');
//! Connect to  MongoDB database
async function connectdb() {
    try {
        await mongoose.connect("mongodb://localhost:27017/first_db")
        console.log("Connected to database")

        //* define the Schema      
        const userSchema = new mongoose.Schema({
            name: { type: String, required: true },
            email: { type: String, required: true, unique: true },
            age: { type: Number },
            createdAt: { type: Date, default: Date.now }
        });
        //* create a model and return it
        return mongoose.model('User', userSchema);
    } catch (error) {
        console.log("Error: ", error)
    }
}
//! Creating a new user
async function createuser(name, email, age) {
    const User = await connectdb();
    try {
        const newUser = await new User({
            name: name,
            email: email,
            age: age
        });
        newUser.save() //save the user created to db
        console.log("User created succesfully: ", newUser)
    } catch (error) {
        console.log("Error creating user: ", error)
    }
}
//!Fetching users
async function fetchusers() {
    const User = await connectdb();

    try {
        const userArray = await User.find()

        userArray.forEach((user) => { console.log(user) });


    } catch (error) {
        console.log("Error fetching users: ", error)
    }
}
//! fetch specific user 
async function fetchuser(name, email) {
    const User = await connectdb();
    try {
        const fetchuser = await User.find({ name: name, email: email })
        console.log(fetchuser);
    } catch (error) {
        console.log("Error fetching users: ", error)
    }
}

//!Updating a user
async function updateuser() {
    const User = await connectdb(email, newname);
    try {
        const userupdate = await User.findOneAndUpdate(
            { email: email },
            { $set: { name: newname } },
            { new: true } // to return the updated document
        )

        if (userupdate) console.log("User updated successfully: ", userupdate);
        else console.log("User not found");


    } catch (error) {
        console.log("Error updating the user: ", error)
    }
}
//! Deleting a user
async function deletesomeusers() {
    const User = await connectdb();
    try {
        const date = Date.now() - (7 * 24 * 60 * 60 * 1000)
        const result = await User.deleteMany({ createdAt: { $lt: date } });
        console.log("Number of deleted users:", result.deletedCount);
    } catch (error) {
        console.error("Error deleting users:", error.message);
    }
}
createuser("Mike Ross", "mike.ross@arkx.group", "22");
fetchusers();
fetchuser("Mike Ross", "mike.ross@arkx.group");
updateuser("mike.ross@arkx.group", "Admin");
deletesomeusers();
