const socket=io('http://localhost:5000');
const form=document.getElementById("send-container");
const messageInput=document.getElementById("messageinp")
const messageContainer=document.querySelector(".container")
var audio=new Audio('ding-souns-effect_2.mp3');
//function which will append event info to the conatiner
const append=(message,position)=>{
const messageElement=document.createElement('div');
messageElement.innerText=message;
messageElement.classList.add('message');
messageElement.classList.add('position');
messageContainer.append(messageElement);
if(position=='left'){
    audio.play();
}
}

//ask user for his name
var name=prompt("enter your name to join");
socket.emit("new-user-joined",name);
//if new user joins,receive the evnt from server
socket.on('user-joined',name=>{
append(`${name} join the chat`,'right')
});
//If server sends a message receive it
socket.on('receive',data=>{
    append(`${data.name}:${data.message}`,'left')
})
//if a user leaves the chat,append the info to the conatiner
socket.on('left',(name)=>{
    append(`${name} left the chat`,'right')
})
//if form get submitted,send server the message
form.addEventListener('submit',(e)=>{
    e.preventDefault();
    const message=messageInput.value;
    append(`you:${message}`,'right')
    socket.emit('send',message);
    messageInput.value=''
})