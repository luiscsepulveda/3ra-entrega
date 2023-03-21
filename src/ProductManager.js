import fs from "fs";
import express  from "express";
import {Blob} from "buffer";

export default class ProductManager {
    constructor() {
        this.products = [];
        this.pathfiles = "./files";
        this.path = "./files/products.json";
    }

    productServer = express()
    productObject = async () => {
        const data = await fs.promises.readFile(this.path, "utf-8");

            const result = JSON.parse(data);
            return result;
    }
    



    getProducts = async () => {

        if(fs.existsSync(this.pathfiles)){
            fs.mkdirSync(this.pathfiles)
        }
        if(fs.existsSync(this.path)) {

            const data = await fs. promises.readFile(this.path, 'utf-8');

            const size = new Blob ([data]).size;
            if (size > 0){
                const result = JSON.parse( data );
                return result;
            
            }else{
                return[];
            }
        }else{
            return [];
        }
            
        }

        addProduct = async (title, description, price, thumbnail, code, stock) => {

            const products = await this.getProducts();
    
            if (!title || !description || !price || !thumbnail || !code || !stock) {
                console.log("Error: All fields are mandatory")
                return;
            };
    
            let sameProduct = products.find((element) => element.code === code);
            if (sameProduct) {
                return `Already exist a product with this code ${code}`
            }
    
    
            const product = {
                id: products.length + 1,
                title: title,
                description: description,
                price: price,
                thumbnail: thumbnail,
                code: code,
                stock: stock,
            }
    
        let maxId = 0;
            for (let i = 0; i < products.length; i++) {
                if (products[i].id > maxId) {
                    maxId = products[i].id;
                }
            }
            product.id = maxId + 1;
    
        
    
            products.push(product);
            await fs.promises.writeFile(this.path, JSON.stringify(products, null, "\t"));
            return products;
    
        }

        getProductsById = async (id) => {
            if (fs.existsSync(this.path)) {
                let result = await this.getProducts();
    
                /* let productId = result.find(id  => result.id === id); */
                let productId = result.find((res) => res.id === id);
    
                if (!productId) {
                    console.log(`Error: Product with ID ${'Id'} was not found`);
                } else {
                    return productId;
                }
    
    
            }
    
    
        }
    
    
        updateProduct = async (id, code, title, description, price, thumbnail, stock) => {
    
            const products = await this.getProducts();
    
            if (products == "error") {
                return "this file is empty"
            }
    
            let searchProduct = products.find((product) => product.id !== id)
    
            if (searchProduct === undefined) {
                
                const updatedProduct = {
                    id: id,
                    title: title ?? searchProduct.title,
                    description: description ?? searchProduct.description,
                    price: price ?? searchProduct.price,
                    thumbnail: thumbnail ?? searchProduct.thumbnail,
                    code: code ?? searchProduct.code,
                    stock: stock ?? searchProduct.stock,
    
                }
    
                for(let i = 0 ; i < products.length ; i++){
                    if(products[i].id === id){
                        products[i] = updatedProduct
                    }
                }
    
                await fs.promises.writeFile(this.path, JSON.stringify(products, null, "\t"));
                return "product has been updated";
            } else {
                return `Product with id ${id} cannot be updated because it does not exist in this list`
            }
        }
    
        deleteProducts = async (id) => {
    
            const products = await this.getProducts()
    
            let existingProduct = products.find((product) => product.id === id);
            if (existingProduct) {
                const feature = products.filter(del => del.id != id);
    
                await fs.promises.writeFile(this.path, JSON.stringify(feature, null, "\t"))
                return "product has been deleted"
            } else {
                return `Product with id ${id} cannot be deleted because it does not exist in this list`
            }
    
        }
    


        /* me quede corto de tiempo. estoy cambiando unas cosas.  */

    };



