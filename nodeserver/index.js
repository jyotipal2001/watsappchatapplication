//node server whichwill handle socket io connection
const io=require("socket.io")(5000,{
    cors:{
        origin:'*',
    }
});
const users={};
io.on("connection",socket=>{
    socket.on("new-user-joined",name=>{
        //if any new user joines ,let other users connected to the server 
        console.log("New user",name);
        users[socket.id]=name;
        socket.broadcast.emit("user-joined",name);
    });
    //if someone sends a message broadcast it to other people
    socket.on('send',message=>{
        socket.broadcast.emit("receive",{message:message,name:users[socket.id]})
    });
    //if someone leve the chat let others know
    socket.on("disconnect",()=>{
        socket.broadcast.emit("left",users[socket.id]);
        delete users[socket.id];
    });
})