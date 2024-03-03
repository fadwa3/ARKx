require('dotenv').config();
const mongoose = require('mongoose');

const uri = process.env.MONGODB_URI;


const products = require('./products.json')
//! Define Product Schema
async function connectdb() {
    try {
        await mongoose
            .connect(uri)

        console.log('Connected to database');

        //* define the Schema      
        const userSchema = new mongoose.Schema({
            name: { type: String, required: true },
            price: { type: Number, required: true },
            description: { type: String },
            inStock: { type: Boolean, default: true },
            category: { type: String, required: true },
            createdAt: { type: Date, default: Date.now },
            isDeleted: { type: Boolean, default: false }, //* new field for soft delete function
            expirationDate: { type: Date } //* new field for hard delete function


        });
        //* create a model and return it
        const ProductModel = mongoose.model('products', userSchema);
        return ProductModel
    } catch (error) {
        console.log('Error connecting to database: ', error)
    }
}
//! Insert Sample Products (should be called only one time )
async function insertdata() {
    const ProductModel = await connectdb()
    try {
        products.forEach((user) => {
            const newUser = new ProductModel(user);
            newUser.save() //save the user created to db
        })
        console.log('Products  added successfuly :)');
    } catch (error) {
        console.log('oops bug in insertdata function', error)
    }
}

//! update product by name
async function updateProduct(name, newPrice) {
    const ProductModel = await connectdb()
    try {
        const userupdate = await ProductModel.findOneAndUpdate(
            { name: name },
            { $set: { price: newPrice } },
            { new: true } // to return the updated document
        )

        if (userupdate) console.log("User updated successfully: ", userupdate);
        else console.log("User not found");

    } catch (error) {
        console.log("oops Error updating the Product: ", error)
    }
}
//! soft delete products
async function softDelete(name) {
    const ProductModel = await connectdb()
    try {
        const softDeletedProduct = await ProductModel.findOneAndUpdate(
            { name: name },
            { $set: { isDeleted: true } },
            { new: true }
        );

        if (softDeletedProduct) {
            console.log("Product soft deleted successfully: ", softDeletedProduct);
        } else {
            console.log("this Product was not found");
        }

    } catch (error) {
        console.log("oops Error soft deleting product: ", error)
    }
}
//* insert new products with expired date 
async function add() {
    const ProductModel = await connectdb()
    const p1 = {
        "name": "Laptop",
        "price": 1200,
        "description": "High-performance laptop with powerful specs.",
        "inStock": true,
        "category": "Electronics",
        "expirationDate": new Date('2023-01-01')

    }
    const newUser = new ProductModel(p1);
    newUser.save() //save the user created to db
        .then(console.log('product added succesfuly'))
}

//! hard delete expired products
async function hardDelete() {
    const ProductModel = await connectdb()
    try {
        const currentDate = new Date();
        const result = await ProductModel.deleteMany({ expirationDate: { $lt: currentDate } });
        console.log('the number of  products expired hard deleted is : ', result.deletedCount);

    } catch (error) {
        console.log("oops Error hard deleting expired products: ", error)
    }
}


//! bulk update products
async function bulkUpdate(newDescription) {
    const ProductModel = await connectdb()
    try {
        const result = await ProductModel.updateMany(
            { inStock: true },
            { $set: { description: newDescription } }
        )
        console.log('the number of  products in stock updated is : ', result.modifiedCount);

    } catch (error) {
        console.log("oops Error updating inStock products: ", error)
    }
}
//! bulk delete ouf-of-stock products
async function bulkDelete() {
    const ProductModel = await connectdb()
    try {
        const result = await ProductModel.deleteMany({ inStock: false });
        console.log('the number of  products out of stock deleted is : ', result.deletedCount);

    } catch (error) {
        console.log("oops Error bulk deleting out of stock products: ", error)
    }
}
//! calling the functions
// insertdata(); //?  called only one time
// updateProduct('Laptop', 3000);
// softDelete('Laptop')
// add()
// hardDelete()
// const Desc = ' new description for inStock Products'
// bulkUpdate(Desc)
// bulkDelete()