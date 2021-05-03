 const socket = io();

 // dom elemensts
 let username = document.getElementById('username');
 let message = document.getElementById('message');
 let btnsend = document.getElementById('send');
 let output = document.getElementById('output');
 let actions = document.getElementById('actions');

 btnsend.addEventListener('click', function() {
     console.log(username.value,message.value);
     socket.emit('chat:message', {
        username: username.value,
        message: message.value
     });
 });

 message.addEventListener('keypress', function(){
    console.log(username.value);
    socket.emit('chat:typing', username.value);
 });

 socket.on('chat:message', function (data){
    console.log(data.username,data.message);
    actions.innerHTML = '';
    output.innerHTML += `<p><strong>${data.username}</strong>: ${data.message}</p>`
    message.value ='';
 });

 socket.on('chat:typing', function (data){
    actions.innerHTML = `<p><em>${data} esta escribiendo...</em></p>`
 });
