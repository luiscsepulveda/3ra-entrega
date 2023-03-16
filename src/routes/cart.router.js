/* first of all import */
import { Router } from "express"
/* import ProductManager from "../ProductManager" */
import CartManager from "../CartManager"

const router = Router();

const cartAdmin = new CartManager();

router.post("/", async(req, res) => {
    await cartAdmin.createCart();
    return res.status(201).send({
        status: "success",
        message: {
            success: "Your Cart has been created succesfully"
        },
    })
})

router.get("/:cid", async(req,res) =>{
    const id = req.params.cid
    const cart = await cartAdmin.getCartById(id);
    if(typeof(cart) === "string") {
        return res.status(404).send({
            status: "error",
            message: {error:cart},
        });
    }
    return res.status(200).send({
        status: "success",
        message: { cart: cart },
    })
})

router.post ("/:cid/product/:pid", async(req, res) => {

    const cId =req.params.cid
    const pId=req.params.pid
    const quantity = req.body
    const value = object.values(quantity);
    let quantityProd = value[0]
    console.log(quantityProd)

    let cart = await cartAdmin.sendProductToCart(cId,pId, quantityProd);
    if(typeof(cart) === "string"){
        return res.status(400).send({status: "error", message: cart});
    }
    return res.status(201).send({
        status: "success",
        message: {succes: "Product was sent to your cart"}
    })
    
});

export default router;


