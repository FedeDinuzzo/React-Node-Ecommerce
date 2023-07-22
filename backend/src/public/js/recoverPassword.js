const socket = io()

const email = document.getElementById("email")
const parrafo = document.getElementById("parrafo")

document.addEventListener("keydown", (event)=>{    
  if (event.key === "Enter" ) {
    recoveryMail()
  } 
})

const recoveryMail = () => {
  alert('procesando')  
  socket.emit("mailValidation", email.value)
}

socket.on("answerMailValidation", async (answer) => {
  if (answer) {
    window.location.href = `/api/session/recoverPasswordEmail/${email.value}`

  } else {
    parrafo.innerHTML += `
    </n>
    <p>The email:${email.value} it is not correct to retrieve your credentials</p>
    `    
  }
})