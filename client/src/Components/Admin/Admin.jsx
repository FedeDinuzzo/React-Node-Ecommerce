import { createProduct } from "../../MongoDB/ProductMongo"
import { useRef } from "react"
import { useCookies } from 'react-cookie'

export const Admin = () => {
    const datForm = useRef() 
    const [cookies, setCookie] = useCookies()

    const consultarForm = (e) => {
        //Consultar los datos del formulario
        e.preventDefault()
        const datosFormulario = new FormData(datForm.current) //Pasar de HTML a Objeto Iterable
        const product = Object.fromEntries(datosFormulario) //Pasar de objeto iterable a objeto simple

        createProduct(product, cookies)

        e.target.reset() //Reset form
    }
    return (
        <div className="container divForm" >
            <h3>Formulario de Inicio de Sesion</h3>
            <form onSubmit={consultarForm} ref={datForm}>

                <div className="mb-3">
                    <label htmlFor="title" className="form-label">Titulo</label>
                    <input type="title" className="form-control" name="title" />
                </div>

                <div className="mb-3">
                    <label htmlFor="description" className="form-label">Descripcion</label>
                    <input type="description" className="form-control" name="description" />
                </div>

                <div className="mb-3">
                    <label htmlFor="price" className="form-label">Precio</label>
                    <input type="price" className="form-control" name="price" />
                </div>

                <div className="mb-3">
                    <label htmlFor="code" className="form-label">Codigo</label>
                    <input type="code" className="form-control" name="code" />
                </div>

                <div className="mb-3">
                    <label htmlFor="stock" className="form-label">Stock</label>
                    <input type="stock" className="form-control" name="stock" />
                </div>

                <div className="mb-3">
                    <label htmlFor="category" className="form-label">Categoria</label>
                    <input type="category" className="form-control" name="category" />
                </div>

                <div className="mb-3">
                    <label htmlFor="thumbnail" className="form-label">Ruta Imagen</label>
                    <input type="thumbnail" className="form-control" name="thumbnail" />
                </div>

                <button type="submit" className="btn btn-primary">Crear producto</button>
            </form>
        </div>
    )
}