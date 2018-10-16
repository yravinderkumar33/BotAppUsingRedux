const server = require('http').createServer();
const sendMessage = require('./bot');
const io = require('socket.io')(server)
server.listen(5000, () => {
    console.log("listening to port 5000")
});

io.on("connection", (socket) => {
    console.log("connected");
    socket.on("userToBotMessage", (data) => {
        sendMessage(data).then((data) => {
            socket.emit("botToUserMessage", data);
        })
    })
    socket.on("disconnect", () => {
        console.log("disconnected" + socket.id)
    })
})