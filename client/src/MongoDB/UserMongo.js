import { toast } from 'react-toastify';

export const login = async (cliente) => {
  const response = await fetch('http://localhost:4000/api/session/login', {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: 'include', 
    body: JSON.stringify(cliente)
  });
  const data = await response.json();
  if (response.ok) {
    const {token, rol, idCart} = data;
    console.log(data)
    document.cookie = `jwtCookies=${token};expires=${new Date(Date.now() + 1 * 24 * 60 * 60 * 1000).toUTCString()};path=/`;
    // window.location.href = '/';
    return {token, rol, idCart};
  } else {
    throw new Error(data.message);
  }
}

export const loginGoogle = async (cliente) => {
  const response = await fetch('http://localhost:4000/api/session/login', {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(cliente)
  });

  const data = await response.json();

  if (response.ok) {
    const token = data.token;
    document.cookie = `token=${token};expires=${new Date(Date.now() + 1 * 24 * 60 * 60 * 1000).toUTCString()};path=/`;
    console.log(token);
    window.location.href = '/';
    return token;
  } else {
    throw new Error(data.message);
  }
}

export const loginGithub = async (email, password) => {
  const response = await fetch('http://localhost:4000/authGithub/githubSession', {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(email, password)
  });

  const data = await response.json();

  if (response.ok) {
    const token = data.token;
    document.cookie = `token=${token};expires=${new Date(Date.now() + 1 * 24 * 60 * 60 * 1000).toUTCString()};path=/`;
    console.log(token);
    window.location.href = '/';
    return token;
  } else {
    throw new Error(data.message);
  }
}

export const register = async (cliente) => {
  const response = await fetch('http://localhost:4000/api/session/login', {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(cliente)
  });

  const data = await response.json();

  if (response.ok) {
    const token = data.token;
    document.cookie = `token=${token};expires=${new Date(Date.now() + 1 * 24 * 60 * 60 * 1000).toUTCString()};path=/`;
    console.log(token);
    window.location.href = '/';
    return token;
  } else {
    throw new Error(data.message);
  }
}

export const registerGoogle = async (cliente) => {
  const response = await fetch('http://localhost:4000/api/session/login', {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(cliente)
  });

  const data = await response.json();

  if (response.ok) {
    const token = data.token;
    document.cookie = `token=${token};expires=${new Date(Date.now() + 1 * 24 * 60 * 60 * 1000).toUTCString()};path=/`;
    console.log(token);
    window.location.href = '/';
    return token;
  } else {
    throw new Error(data.message);
  }
}

export const registerGithub = async () => {
  const response = await fetch('http://localhost:4000/authSession/github', {
    method: "GET",
    headers: {
      "Content-Type": "application/json"
    }
  })

  const message = await response.json()
  return message
}

export const recoverPassword = async (email) => {
  const response = await fetch(`http://localhost:4000/api/session/recoverPasswordEmail/${email}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json"
    },
    credentials: 'include', // Habilitar envío de cookies
  })
  const message = await response.json()
  console.log(response)
  console.log(response.status)
  return message
}


// export const recoverChangePassword = (req, res) => {
//   const token = validaToken(req)

//   if (token){    
//     res.redirect(`/recoverChange`)    
//   } else {
//       res.cookie('booleanTimeOut', true)
//       res.redirect(`/recoverPassword`) 
//   }  
// }
