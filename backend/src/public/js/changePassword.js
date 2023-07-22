const socket = io()

const password = document.getElementById("password")
const mail = document.getElementById("mail")
const parrafo = document.getElementById("parrafo")

document.addEventListener("keydown", (event)=>{    
  if (event.key === "Enter" ) {
    changePass()
  } 
})

const changePass = () => {
  alert('processing')    
  socket.emit("mailValidation", mail.innerText.trim())
}

socket.on("answerMailValidation", async (answer) => {
  if (answer) {
    const bodyData = {}

    bodyData.email = answer.email
    bodyData.password = password.value

    const request = {
      method: 'PUT',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams(bodyData).toString()
    }

    fetch('/api/session/changePass', request)
      .then(response => {
        if (response.ok) {
          alert("Password changed")
          window.location.href = '/'
        } else {
          alert("Incorrect data")
        }
      })

  } else {
    parrafo.innerHTML += `
    </n>
    <p>The email:${mail.innerText.trim()} it is not correct to retrieve your credentials</p>
    `    
  }
})