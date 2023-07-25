const email     = document.getElementById("email")
const password  = document.getElementById("password")

document.addEventListener("keydown", (event)=>{    
  if (event.key === "Enter" ) {
    login()
  } 
})

const login = () => {
  alert('procesando');    

  const credentials = {}

  credentials.email = email.value
  credentials.password = password.value

  //console.log(credentials);

  const request = {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams(credentials).toString()
  }

  fetch('/api/session/login', request)
    .then(response => {
      if (response.ok) {
        window.location.href = '/products';
      } else {
        alert("Datos incorrectos")
      }
    })
}