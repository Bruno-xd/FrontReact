import React, { useEffect, useState } from 'react'
import ProductoService from '../services/ProductoService';
import { Link } from 'react-router-dom';

export const ListProductosComponent = () => {

    const [productos,setProductos] = useState([]);

    useEffect(() => {
        listarProductos()
    },[])

    const listarProductos = () =>{
        ProductoService.getAllProductos().then(Response => {
            setProductos(Response.data);
            console.log(Response.data);
        }).catch(error => {
            console.log(error);
        })
    }

    const deleteProducto = (productoId) =>{
        ProductoService.deleteProducto(productoId).then((reponse) => {
            listarProductos();
        }).catch(error => {
            console.log(error);
        })
    }
    
  return (
    <div className='container'>
        <h2 className='text-center'>Lista de Productos</h2>
        <Link to='add-producto' className='btn btn-primary mb-2'>Agregar Producto</Link>
        <table className='table table-bordered table-striped'>
            <thead>
                <th>ID</th>
                <th>Nombre</th>
                <th>Precio</th>
                <th>Acciones</th>
            </thead>
            <tbody>
                {
                    productos.map(
                        producto =>
                        <tr key={ producto.id }>
                            <td> {producto.id} </td>
                            <td> {producto.nombre} </td>
                            <td> {producto.precio} </td>
                            <td>
                                <Link className='btn btn-info' to={ `/edit-producto/${producto.id}`}>Actualizar</Link>
                                <button style={{ marginLeft:"10px" }} className='btn btn-danger' onClick={() => deleteProducto(producto.id)}>Eliminar</button>
                            </td> 
                        </tr>
                    )
                }
            </tbody>
        </table>
    </div>
  )
}

export default ListProductosComponent;