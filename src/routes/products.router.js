import ProductManager from "../ProductManager";
import { Router } from "express";

const router = Router();

const manager = new ProductManager();

router.get("/", async (req, res) => {
    const consult = await manager.getProducts();

    let limit = req.query.limit

    if(!consult) {
        return res.status(404).send({
            message: { error: "there is no product here" },
        })
    }

    if(limit) {
        if(isNaN(limit)){
            return res.status(400).send({
                message: { error: `Something is wrong with that ${limit}`},
            });
        }

        const result = consult.slice(0, limit);

        return res.status(200).send({
            status: "success",
            message: { products: result },
        });
    }
});

router.get ("/:pid", async(req, res) => {
    let id = req.params.pid

    const searchId = await manager.getProductsById(Number.parseInt(id));

    if(typeof(searchId) === "string"){
        return res.status(400).send({
            status: "error", message: searchId
        });
    }
    return res.status(200).send({
        status: "success",
        message: { product: searchId },
    })
});


router.post("/", async(req, res) =>{
    let newProduct = req.body;

    let result = await manager.addProduct(newProduct);
    if(typeof(result) === "string"){
        return res.status(400).send({
            status: "error", message: {error: result},
        });
    }
    return res.status(201).send({
        status: "success",
        message: { success: `your cart has a new product, Go and check this out` },
    })
});

router.put("/:pid", async(req, res) => {
    const product = req.body;
    const id = req.params.pid;

    let result = await manager.updateProduct(Number.parseInt(id), product);
    if(typeof(result) === "string"){
        return res.status(404).send({
            status: "error", message: { error: IG}
        });
    }
    return res.status(200).send({
        status: "success",
        message: { update: `Your product has been updated.` },
    })

});

router.delete("/pid", async(req, res) => {
    const id = req.params.pid;
    console.log(id);

    let result = await manager.deleteProducts(id);
    if(typeof(result) === "string"){
        return res.status(404).send({
            status: "error", message: { error: result}
        });
    }
    return res.status(200).send({
        status: "success",
        message: { delete: `Your product has been updated` },
    });

    










})