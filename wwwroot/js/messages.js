"use strict";

let conn = new signalR.HubConnectionBuilder()
.withUrl('/messages')
.build();



conn.on("ReceiveMessage", (message)=> {
    var msg = message.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, '&gt;');
    let div = document.createElement('div');
    div.innerHTML = msg + "<hr/>";
    document.getElementById("messagesField").append(div);
} )

conn.start().catch((err) =>{ 
    return console.error(err.toString());
})

$("#btnSend").on('click', (event) => {
    let message = $("#messageBox").val();
    let receiver = $("#group").val();
    let method = "SendMessageToAll";
    if(receiver === "Myself"){
        method = "SendMessageToCaller"
    }
    conn.invoke(method, message).catch((err) => {
        return console.error(err.toString());
    })
    event.preventDefault();
})