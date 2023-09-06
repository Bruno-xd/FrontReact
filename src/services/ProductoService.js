import axios from "axios";

const BASE_URL_REST_API_URL = "http://localhost:8080/api/v1/productos";

class ProductoService{
    getAllProductos(){
        return axios.get(BASE_URL_REST_API_URL);
    }

    createProducto(producto){
        return axios.post(BASE_URL_REST_API_URL,producto);
    }

    getProductoById(ProductoId){
        return axios.get(BASE_URL_REST_API_URL + '/' + ProductoId);
    }

    updateProducto(productoId, producto){
        return axios.put(BASE_URL_REST_API_URL + '/' + productoId,producto );
    }

    deleteProducto(productoId){
        return axios.delete(BASE_URL_REST_API_URL + '/' + productoId);
    }

}

export default new ProductoService();