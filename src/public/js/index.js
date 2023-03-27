const socket = io();
socket.emit("message", "Quiero comunicarme contigo desde websocket")
/* este es el que utilizaremos para comunicarnos con el socket del servidor */

socket.on("product_added", (products) =>{
    console.log(products);
})