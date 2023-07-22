const firstName = document.getElementById("firstName")
const lastName  = document.getElementById("lastName")
const email     = document.getElementById("email")
const password  = document.getElementById("password")

document.addEventListener("keydown", (event)=>{    
  if (event.key === "Enter" ) {
    registerUser()
  } 
})

const registerUser = () => {
  alert('processing');    

  const User = {}

  User.first_name  = firstName.value
  User.last_name   = lastName.value
  User.email      = email.value
  User.password   = password.value

  const request = {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams(User).toString()
  }

  fetch('/api/user/register', request)
    .then(response => {
      if (response.ok) {
        window.location.href = '/';
      } else {
        alert("incorrect data")
      }
    })
}