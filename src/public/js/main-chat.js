const socket = io()
const name = document.getElementById("name-part-chat-id")
const email = document.getElementById("mail-part-chat-id")
const message = document.getElementById("message-part-chat-id")
const text = document.getElementById("view-side-chat-id")

window.addEventListener("load", () => {
    socket.emit("loadMessage")    
})

socket.on("pushMessage", async textMessage => {
    
    name.value = ""
    email.value = ""
    message.value = ""

    text.textContent = ''
    textMessage.forEach(textMessage => {
        text.textContent += `${textMessage.name} [(${textMessage.email})]: ${textMessage.message}\n`
    })
})

sendMessage = ()=>{
    if (name.value && email.value && message.value) {
        let newMessage = {
            "name":         name.value,
            "email":        email.value,
            "message":      message.value
        }

        socket.emit("addMessage", newMessage);
        
    } else {
        alert("Faltan completar datos")
    }


}


