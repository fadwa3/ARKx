const express = require('express');
const app = express();
//*the dummy array 
let products = [
    { id: 1, name: 'iPhone 12 Pro', price: 1099.99 },
    { id: 2, name: 'Samsung Galaxy S21', price: 999.99 },
    { id: 3, name: 'Sony PlayStation 5', price: 499.99 },
    { id: 4, name: 'MacBook Pro 16', price: 2399.99 },
    { id: 5, name: 'DJI Mavic Air 2', price: 799.99 }
];
//! the Day18 exercice 
//*the Logging middleware
app.use((req, res, next) => {
    // Display the logged information in the console 
    console.log(`Date and time of the request :  [${new Date().toISOString()}]\n the Request method : ${req.method} \n the Request URL : ${req.url}`);
    next();
});


//!  display all the products 
app.get('/products', (req, res, next) => {
    try {
        res.send(products);
    } catch (error) {
        next(error);
    }

});
//!  display a product by id 
app.get('/products/:id', (req, res, next) => {
    try {
        const product = products.find((prod) => prod.id === parseInt(req.params.id));
        if (!product) {
            const error = new Error("Product searched not found");
            error.status = 400;
            throw error;
        }
        res.json(product);
    } catch (error) {
        next(error)
    }
});
//! filter the products with price and a key
app.get('/products/search', (req, res, next) => {
    try {
        const resproducts = products.filter((prod) => (prod.name.toUpperCase().includes(req.query.q.toUpperCase())) && (prod.price <= req.query.maxprice) && (prod.price >= req.query.minprice))
        res.json(resproducts);
    } catch (error) {
        next(error)
    }
});
//! add a product
app.post('/products', (req, res, next) => {
    try {
        const { name, price } = req.body;

        const id = products[products.length - 1].id + 1
        const newProd = { id, name, price };
        products.push(newProd);

        res.status(200).json(products);
    } catch (error) {
        next(error)
    }
});
//! update a product 
app.put('/products/:id', (req, res, next) => {
    try {
        const product = products.find((prod) => prod.id === parseInt(req.params.id));
        if (!product) {
            const error = new Error("Product u want to update is not found");
            error.status = 400;
            throw error;
        }
        products.forEach((prod) => {
            if (prod == product) {
                prod.price = 5;
            }
        })
        res.json(products);
    } catch (error) {
        next(error)
    }

});
//! delete a product by it's id 
app.delete('/products/:id', (req, res, next) => {
    try {
        const product = products.find((prod) => prod.id === parseInt(req.params.id));
        if (!product) {
            res.send("the product already doesn't exist");
        } else {
            for (let i = products.indexOf(product); i < products.length - 1; i++) {
                [products[i], products[i + 1]] = [products[i + 1], products[i]]
            }
            products.pop();
            res.json(products);
        }
    } catch (error) {
        next(error)
    }
});
//! the Day18 exercice 
//*the Error handling middleware for non existing routes
app.use((req, res, next) => {
    const error = new Error('Root was not Found');
    error.status = 404;
    next(error);
});

//*the  Error handling middleware
app.use((err, req, res) => {
    console.log('here is an error ', err);
    res.status(err.status).json(`oops you encounted an error !! : ${err.message}`);

});

app.listen(3000, () => {
    console.log('server is running on port 3000 ...');
});