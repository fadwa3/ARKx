const express = require('express');
const app = express();
//*the dummy array 
let products = [{ id: 11, name: "petitPeure", company: " Be", price: 2 },
{ id: 12, name: "king", company: "exelo", price: 2 }
    , { id: 13, name: " momo", company: "bimo", price: 1 },
{ id: 14, name: "capri", company: "exelo", price: 3 }]

//!  define the /products route
app.get('/products', (req, res) => {
    res.send(products);
});
//!  define the /products/:id route
app.get('/products/:id', (req, res) => {
    const product = products.find((prod) => prod.id === parseInt(req.params.id));
    if (!product) {
        res.status(404).json({ error: "the product was not found" });
    }
    res.json(product);
});
//! filter the products with price and a key
app.get('/products/search', (req, res) => {
    const resproducts = products.filter((prod) => (prod.name.toUpperCase().includes(req.query.q.toUpperCase())) && (prod.price <= req.query.maxprice) && (prod.price >= req.query.minprice))
    res.json(resproducts);
});
//! add a product
app.post('/products', (req, res) => {
    const { name, company, price } = req.body;

    const id = products[products.length - 1].id + 1
    const newProd = { id, name, company, price };
    products.push(newProd);

    res.status(200).json(products);
});
//! update a product 
app.put('/products/:id', (req, res) => {
    const product = products.find((prod) => prod.id === parseInt(req.params.id));
    if (!product) {
        res.status(404).json({ error: "the product was not found" });
    }
    products.forEach((prod) => {
        if (prod == product) {
            prod.price = 5;
        }
    })
    res.json(products);

});
//! delete a product by it's id 
app.delete('/products/:id', (req, res) => {
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
});

app.listen(3000, () => {
    console.log('server is running on port 3000 ...');
});