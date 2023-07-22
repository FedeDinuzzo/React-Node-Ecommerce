const socket = io()
const name = document.getElementById("nameId")
const email = document.getElementById("emailId")
const message = document.getElementById("messageId")
const text = document.getElementById("viewId")

window.addEventListener("load", () => {
  socket.emit("loadMessage")    
})

socket.on("pushMessage", async textMessage => {
  name.value = ""
  email.value = ""
  message.value = ""
  text.textContent = ""
  textMessage.forEach(textMessage => {
    text.textContent += `${textMessage.name} [(${textMessage.email})]: ${textMessage.message}\n`
  })
})

sendMessage = () => {
  if (name.value && email.value && message.value) {
    let newMessage = {
      "name":    name.value,
      "email":   email.value,
      "message": message.value
    }
    
    socket.emit("addMessage", newMessage)
        
  } else {
    alert("Some fields are empty, please complete them")
  }
}
