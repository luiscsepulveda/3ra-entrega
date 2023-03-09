import ProductManager from "./ProductManager.js";
import express from "express";
const products = new ProductManager('/files/Products.json');
const productServer = express();




productServer.get("/products", async (req, res) => {
    const consult = await products.getProducts();
    const limit = Number.parseInt(req.query.limit)

    if(limit){
        const result = consult.slice(0, limit);
        res.send(result);

    }else{
        res.send(consult);
    }
});

productServer.get("products/:pid", async (req, res) => {

    const userId = req.params.id;

    const idConsult = await products.getProductsById(Number.parseInt(userId));

    if(!idConsult) {
        return res.send({error: "Product with this ID was not found"});


    }else{
        res.send(idConsult)
    }

});

productServer.listen(8080, () => {
    console.log("Listening on port 8080");
});