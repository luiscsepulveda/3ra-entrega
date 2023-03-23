import { Server } from 'socket.io';
import ProductManager from './ProductManager.js';


const socket = {};
socket.connect = (server) => {
    /* linea 8 error */
    /* const ProductManager = new ProductManager(); */
    socket.io = new Server(server);

    socket.io.on("connection", async (socket) =>{
        console.log("client is connected");
        const products = await ProductManager.getProducts();

        socket.emit("products", products);

    })
}

export default socket