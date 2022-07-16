// Connect this website to node server //index.js
var ip = '127.0.0.1:8000';

var socket = io.connect(ip);
// const socket = io('http://localhost:7000');

const form = document.getElementById('send-container');
const msginput = document.getElementById('msg')
const msgcontainer = document.querySelector('.container')

var audio = new Audio('ring.mp3');

const append = (message,position) =>{
    const msgelement = document.createElement('div');
    msgelement.innerText = message;
    msgelement.classList.add('message');
    msgelement.classList.add(position);
    msgcontainer.append(msgelement);
    if(position == 'left'){
        audio.play();
    }    
}

form.addEventListener('submit', (e) =>{
    e.preventDefault(); //Avoids reloading of the page
    const message = msginput.value;
    append(`You: ${message}`,'right');
    socket.emit('send',message);
    msginput.value = '';
})

const name = prompt("Enter your name to join the chat");
socket.emit('new-user-joined',name);

socket.on('user-joined',name => {
    append(`${name} joined the chat`,'left')
})

socket.on('receive',data =>{
    append(`${data.name}: ${data.message}`,'left')
})

socket.on('left',name =>{
    append(`${name} left the chat`,'left')
})