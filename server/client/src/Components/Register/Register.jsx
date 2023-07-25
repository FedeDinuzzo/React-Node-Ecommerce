import { register, registerGithub } from "../../MongoDB/UserMongo"
import { useState, useRef } from "react"
import Loader from "../Loader";
import ScrollToTop from "../ScrollToTop"
import EmptyCart from "../EmptyCart"
import { Link } from 'react-router-dom'
import { FcGoogle } from "react-icons/fc";
import { BsGithub } from "react-icons/bs";


export const Register = () => {

    const datForm = useRef() //Crear una referencia para consultar los valoresa actuales del form

    const consultarForm = (e) => {
        //Consultar los datos del formulario
        e.preventDefault()
        const datosFormulario = new FormData(datForm.current) //Pasar de HTML a Objeto Iterable
        const cliente = Object.fromEntries(datosFormulario) //Pasar de objeto iterable a objeto simple

        fetch('http://localhost:4000/auth/register', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(cliente)
        })
            .then(response => response.json())
            .then(data => {
                document.cookie = `token=${data.token};expires=${new Date(Date.now() + 1 * 24 * 60 * 60 * 1000).toUTCString()};path=/`
                console.log(data.token)
            })
            .catch(error => console.error(error))

        e.target.reset() //Reset form
    }
    return (
        <div className="container divForm" >
            <h3>Formulario de registro</h3>
            <form onSubmit={consultarForm} ref={datForm}>
                <div className="mb-3">
                    <label htmlFor="first_name" className="form-label">Nombre</label>
                    <input type="text" className="form-control" name="first_name" required />
                </div>
                <div className="mb-3">
                    <label htmlFor="last_name" className="form-label">Apellido</label>
                    <input type="text" className="form-control" name="last_name" required />
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input type="email" className="form-control" name="email" />
                </div>
                <div className="mb-3">
                    <label htmlFor="age" className="form-label">Edad</label>
                    <input type="number" className="form-control" name="age" />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Contraseña</label>
                    <input type="password" className="form-control" name="password" />
                </div>

                <button type="submit" className="btn btn-primary">Registrar</button>
            </form>
        </div>
    )
}


// const STYLES_LABEL = " block w-72 lg:w-80 mx-auto text-slate-500 font-bold"
// const STYLES_FORM = " block border-solid border-2 w-72 mb-6 lg:w-80 border-gray-200 rounded-lg p-2 pl-4 my-4 mx-auto"
// const a = 3;

// export const Login = () => {
//   const [loading, setLoading] = useState(false)
//   const datForm = useRef()

//   const loginGithub = () => {
//     loginGithub()
//   }

//   const consultarForm = (e) => {
//     //Consultar los datos del formulario
//     e.preventDefault();
//     const datosFormulario = new FormData(datForm.current); //Pasar de HTML a Objeto Iterable
//     const cliente = Object.fromEntries(datosFormulario); //Pasar de objeto iterable a objeto simple

//     login(cliente)

//     setLoading(true)
//     e.target.reset() //Reset form
//   }
//   return (
//     <>
//       <ScrollToTop />
//       <div className="fondo -my-16 h-16 mb-0 grid"></div>
//       {a === 2 ? (
//         <EmptyCart />
//       ) : (
//         <div className="py-10 lg:pt-20 lg:pb-32 bg-gray-50">
//           <div className="relative group block m-auto max-w-md bg-gray-50 rounded-lg ">
//             <div className="absolute mx-4 md:mx-0 -inset-1 bg-gradient-to-r from-green-300 to-gray-500 rounded-lg blur opacity-25 group-hover:opacity-100 transition duration-1000 group-hover:duration-200" />
//             <div className="relative mx-4 md:mx-0 py-6 bg-white ring-1 ring-gray-900/5 rounded-xl leading-none">
//               <form onSubmit={consultarForm} ref={datForm}>
//                 <h1 className="text-center my-4 mb-8 text-green-400 text-2xl">
//                   Login
//                 </h1>
//                 <div>
//                   <label htmlFor="email" className={STYLES_LABEL}>
//                     Email
//                   </label>
//                   <input
//                     type="email"
//                     name="email"
//                     placeholder="Email adress"
//                     className={STYLES_FORM}
//                   />
//                 </div>
//                 <div>
//                   <label htmlFor="password" className={STYLES_LABEL}>
//                     Password
//                   </label>
//                   <input
//                     type="password"
//                     name="password"
//                     placeholder="Password"
//                     className={STYLES_FORM}
//                   />
//                 </div>
//                 <div className="cursor-pointer block m-auto fondo w-48 rounded px-2 py-2 mt-6 mb-4 text-white text-xl shadow-lg hover:shadow-blue-900/30 transition ease-in hover:-translate-y-1 hover:scale-105 duration-200">
//                   <button
//                   type="submit"
//                   className="block m-auto w-48 pr-4"
//                   >
//                   Login
//                   </button>
//                 </div>
//                 <h2 className="block w-86 text-center text-gray-400 my-6">Or Login with:</h2>
//                 <div className="flex flex-center justify-center">
//                   <FcGoogle className="w-9 h-9 mr-2"/>
//                   <button onClick={loginGithub}><BsGithub className="w-8 h-8 ml-2"/></button>
//                 </div>
//                 <Link to="/register" className="block w-86 text-center text-slate-500 underline mt-6 mb-2">You don't have any account yet? Register</Link>
//                 <div className="mt-4 flex justify-center">
//                   {loading ? <Loader /> : ""}
//                 </div>
//               </form>
//             </div>
//           </div>
//         </div>
//       )}
//     </>
//   )
// }
