import express from 'express';
import ProductManager from '../ProductManager.js';
/* import { Router } from "express" */

const router = express.Router();
/* const router = Router(); */

const productManager = new ProductManager();

router.get("/", async(req, res) => {
    const products = await productManager.getProducts();
    res.render("home", {products});
})

router.get("/realtimeproducts", async (req, res) =>{
    res.render("realTimeProducts", {})
})



/* router.get('/', (req, res)=> {
    res.render('index', {});
}) */

export default router;