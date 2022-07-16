// Node Server which will handle Socket.io Connections


const io = require('socket.io')(8000,{
    cors:{
        origin: '*',
    }
});

// const io = require('socket.io')(8000)



const users = {};
io.on('connection',socket => {
    socket.on('new-user-joined', name => {  // 'new user joined' is an event triggered when a new user joins
        // console.log("New user", name)
        users[socket.id] = name;
        // socket.emit('Welcome',{name:users[socket.id]});
        socket.broadcast.emit('user-joined',name);    //   to broadcast the message of 'user joined' to other users
    });
    
    // When user sends some message, broadcast it to other users
    socket.on('send', message =>{
        socket.broadcast.emit('receive', {message: message, name: users[socket.id]})
    });

    // When any user leaves the chat, broadcast it to other users
    socket.on('disconnect', message => {
        socket.broadcast.emit('left',users[socket.id]);
        delete users[socket.id];
    })
})