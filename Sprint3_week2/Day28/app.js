const products = require('./products.json')
//!Require Mongoose 
const mongoose = require('mongoose');
//! Define Product Schema
async function connectdb() {
    try {
        await mongoose.connect("mongodb://localhost:27017/day28_db")
        console.log("successful Connected to database")
        //* define the Schema      
        const userSchema = new mongoose.Schema({
            name: { type: String, required: true },
            price: { type: Number, required: true },
            description: { type: String },
            inStock: { type: Boolean, default: true },
            category: { type: String, required: true },
            createdAt: { type: Date, default: Date.now }
        });
        //* create a model and return it
        const ProductModel = mongoose.model('products', userSchema);
        return ProductModel
    } catch (error) {
        console.log("Error: ", error)
    }
}
//! Insert Sample Products (called only one time )
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
//! Sort product by Price
async function sortProductsbyPrice() {
    const ProductModel = await connectdb()
    try {

        const users = await ProductModel.find().sort({ price: -1 })
        console.log('here are the list of products sorted by price : ', users);
    } catch (error) {
        console.log('oops bug in sortProductsbyPrice function', error);
    }

}

//! Pagination - Limiting Results
async function Pagination() {
    const ProductModel = await connectdb()
    try {
        const products = await ProductModel.find()
            .limit(5)

        console.log(products);

    } catch (error) {
        console.log('oops bug in Pagination() function', error);
    }
}
//! custom panigation with variables
async function Pagination_variables() {
    const ProductModel = await connectdb()

    try {
        const pageSize = 2;
        const pageNumber = 3;
        const products = await ProductModel.find()
            .limit(pageSize)
            .skip((pageNumber - 1) * pageSize)

        console.log(products);

    } catch (error) {
        console.log('oops bug in Pagination_variables() function', error);

    }
}
//! aggregation - count products in stock
async function countInstock() {
    const ProductModel = await connectdb()

    try {
        const users = await ProductModel.aggregate([
            { $match: { inStock: true } }, // to only include products currently in stock (inStock =true) 
            {
                $group: {
                    _id: "$inStock",
                    count: { $sum: 1 },
                },
            },
        ])
        console.log(`the number of products that are currently in stock is ${users[0].count}`);

    } catch (error) {
        console.log('oops bug in countInstock function', error);
    }
}
//! aggregation - Calculate Average Price
async function AveragePrice() {
    const ProductModel = await connectdb()
    try {
        const user = await ProductModel.aggregate([
            {
                $group: {
                    _id: "",
                    averagePrice: { $avg: "$price" }
                }
            }
        ])
        console.log(`the average price of all products is ${user[0].averagePrice} $`);

    } catch (error) {
        console.log('oops bug in AveragePrice function', error);
    }
}
//! Sorting Products by Name in Ascending Order
async function SortProductsByName() {
    const ProductModel = await connectdb()
    try {
        const users = await ProductModel.find().sort({ name: 1 })
        console.log('here are the list of products sorted by product name : ', users);
    } catch (error) {
        console.log('oops bug in SortProductsByName function', error);
    }
}
//! Pagination - Dynamic Results with a Variable
async function Pagination_dynamic() {
    const ProductModel = await connectdb()

    try {
        const pageSize = 2;
        const pageNumber = 3;
        const products = await ProductModel.find()
            .limit(pageSize)
            .skip((pageNumber - 1) * pageSize)

        console.log(products);

    } catch (error) {
        console.log('oops bug in Pagination_dynamic() function', error);
    }
}
//! Aggregation - Group Products by Category
async function GroupbyCategory() {
    const ProductModel = await connectdb()

    try {
        const users = await ProductModel.aggregate([
            {
                $group: {
                    _id: "$category",
                    count: { $sum: 1 },
                },
            },
        ])
        console.log('the list of products grooped by category');
        console.log(users);

    } catch (error) {
        console.log('oops bug in GroupbyCategory function', error);
    }
}
//! calling the functions
// insertdata() //? should be called one time only
//sortProductsbyPrice();
// Pagination()
// Pagination_variables()
//countInstock()
// AveragePrice()
// SortProductsByName();
// Pagination_dynamic()
// GroupbyCategory()
