import fs from "fs";
import express  from "express";
/* import {Blob} from "buffer"; */

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

            const size = newBlob ([data]).size;
            if (size > 0){
                const result = JSON.parse( data );
                return result;
            
            }else{
                return[];
            }
        }


        /* me quede corto de tiempo. estoy cambiando unas cosas.  */

    };



}