/* import ProductManager from "./ProductManager.js"; */
/* const products = new ProductManager('/files/Products.json'); */
import express from "express";
import productsRouter from './routes/products.router.js';
import viewsRouter from './routes/views.router.js'
import cartRouter from './routes/cart.router.js'

import __dirname from "./utils.js";
import handlebars from 'express-handlebars';

import { Server } from "socket.io";
import socket from './socket.js'

const productServer = express();
const httpServer = productServer.listen(8080, () => {
    console.log("Listening on port 8080");
});

/* const socketServer = new Server(httpServer); */

productServer.engine('handlebars',handlebars.engine());
productServer.set('views', __dirname+'/views');
productServer.set('view engine', 'handlebars');
productServer.use(express.static(`${__dirname}/public`));
productServer.use("/", viewsRouter);

productServer.use(express.json());
productServer.use(express.urlencoded({extended: true}));


/* productServer.get("/products", async (req, rsres) => {
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




/* Server.on('connection', socket =>{
    console.log('New Client is online');
})
 */
socket.connect(httpServer)