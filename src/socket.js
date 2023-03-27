import { Server } from 'socket.io';
import ProductManager from './ProductManager.js';


const socket = {};

socket.connect = (server) => {

    const productManager = new ProductManager();
    socket.io = new Server(server);

    socket.io.on("connection", async (socket) =>{
        console.log("client is connected");
        const products = await productManager.getProducts();

        socket.emit("products", products);
        return products;

    })
}

export default socket 