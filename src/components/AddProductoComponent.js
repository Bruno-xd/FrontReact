import React, { useEffect, useState } from 'react'
import ProductoService from '../services/ProductoService';
import { Link } from 'react-router-dom';
import { useNavigate, useParams } from 'react-router-dom';

export const AddProductoComponent = () => {

    const [nombre,SetNombre] = useState('');
    const [precio,SetPrecio] = useState('');
    const navigate = useNavigate();
    const {id} = useParams();

    const saveOrUpdateProducto = (e) =>{
        e.preventDefault();
        const producto = {nombre,precio};

        if(id){
            ProductoService.updateProducto(id,producto).then((Response) => {
                console.log(Response.data);
                navigate('/productos');
            }).catch(error => {
                console.log(error);
            })
        }
        else{
            ProductoService.createProducto(producto).then((Response) => {
                console.log(Response.data);
                navigate('/productos');
            }).catch(error => {
                console.log(error);
            })
        }
    }

    useEffect(() => {
        ProductoService.getProductoById(id).then((reponse) => {
            SetNombre(reponse.data.nombre);
            SetPrecio(reponse.data.precio);
        }).catch(error => {
            console.log(error);
        })
    },[])

    const title = () => {
        if(id){
            return <h2 className='text-center'>Actualizar Producto</h2>
        }else{
            return <h2 className='text-center'>Agregar Producto</h2>
        }
    }

  return (
    <div>
        <div className='container'>
            <div className='row'>
                <div className='card col-md-6 offset-md-3 offset-md-3'>
                    <h2 className='text-center'>
                        {
                            title()
                        }
                    </h2>
                    <div className='card-body'>
                        <form>
                            <div className='form-group mb-2'>
                                <label className='form-label'>Nombre</label>
                                <input
                                    type='text'
                                    placeholder='Nombre'
                                    name='nombre'
                                    className='form-control'
                                    value={ nombre }
                                    onChange={ (e) => SetNombre(e.target.value) }    
                                />
                            </div>
                            <div className='form-group mb-2'>
                                <label className='form-label'>Precio</label>
                                <input
                                    type='text'
                                    placeholder='Precio'
                                    name='precio'
                                    className='form-control'
                                    value={ precio }
                                    onChange={ (e) => SetPrecio(e.target.value) }    
                                />
                            </div>
                            <button className='btn btn-success' onClick={ (e) => saveOrUpdateProducto(e) }>Guardar</button>
                            &nbsp;&nbsp;
                            <Link to='/productos' className='btn btn-danger'>Cancelar</Link>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default AddProductoComponent;