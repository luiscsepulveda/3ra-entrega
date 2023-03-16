/* import ProductManager from "./ProductManager.js"; */
/* const products = new ProductManager('/files/Products.json'); */
import express from "express";
import productsRouter from './routes/products.router.js';
import cartRouter from './routes/cart.router.js'

const productServer = express();


productServer.use(express.json());
productServer.use(express.urlencoded({extended: true}));

/* productServer.get("/products", async (req, res) => {
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

});  */

productServer.use("/api/products", productsRouter);
productServer.use("/api/carts", cartRouter);


productServer.listen(8080, () => {
    console.log("Listening on port 8080");
});