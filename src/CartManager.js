import fs from "fs"
import {Blob} from "buffer";

/* Define cartManager, path, array */
export default class CartManager {
    constructor(){
        this.cart = [];
        this.pathfiles = "./files";
        this.path = "./files/Cart.json";
    }

    /* Get cart info/Data */

    getCart = async() => {

        if(!fs.existsSync(this.pathfiles)){
            fs.mkdirSync(this.pathfiles)
        }
        if(fs.existsSync(this.path)) {
            const data = await fs.promises.readFile(this.path, 'utf-8');
            const size = new Blob([data]).size;
            if(size > 0) {
                const result = JSON.parse(data);
                return result;
            }else {
                return[];
            }
        }else{
            return[];
        }

}

    /* Create cart  */

    createCart = async() => {
        if(fs.existsSync(this.path)) {
            const data = await fs.promises.readFile(this.path, 'utf-8');
            const result = JSON.parse(data);
            const otherCart = { id: result.length + 1, products: [] }
            result.push(otherCart)
            await fs.promises.writeFile(this.path, JSON.stringify(result, null, "\t"));
            return `your cart has been created`;
        }else {
            const newCart = { id: this.cart.length + 1, products: [] }
            this.cart.push(newCart);
            await fs.promises.writeFile(this.path, JSON.stringify(this.cart, null, "\t"));
            return `your cart has something inside`;
        }
    }

    /* send products to cart*/

    sendProductToCart = async(cartId, productId) => {

        const productToSend = {
            id: parseInt(productId),
            quantity: 1,
        };

        const myCart = await this.getCart();
        const cartIdFound = myCart.findIndex((cart) => cart.id === parseInt(cartId));
        const idExistingProd = myCart[cartIdFound].products.findIndex((prod) => prod.id === parseInt(productId));

        if(cartIdFound !== -1) {
            if( idExistingProd !== -1 ) {
                myCart[cartIdFound].products[idExistingProd].quantity++;
            }else{
                myCart[cartIdFound].products.push(productToSend);
            }
            await fs.promises.writeFile(this.path, JSON.stringify(myCart, null, "\t"));
        }else{
            return `Product with id ${cartId} does not exist in this list`
        }

    }

    /* pull out product by ID */

    getCartById= async(id) => {
        try{
            if(fs.existsSync(this.path)) {
                const result = await this.getCart();

                let indexValue = result.find((event) => event.id === id);
                console.log(indexValue);
                return indexValue
            }
        }catch(error) {
            console.log(error);
        }
    }

}