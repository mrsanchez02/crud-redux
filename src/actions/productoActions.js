import {
    AGREGAR_PRODUCTO,
    AGREGAR_PRODUCTO_EXITO,
    AGREGAR_PRODUCTO_ERROR,
    COMENZAR_DESCARGA_PRODUCTOS,
    DESCARGA_PRODUCTOS_EXITO,
    DESCARGA_PRODUCTOS_ERROR,
    OBTENER_PRODUCTO_ELIMINAR,
    ELIMINAR_PRODUCTO_EXITO,
    ELIMINAR_PRODUCTO_ERROR,
    OBTENER_PRODUCTO_EDITAR,
    COMENZAR_EDICION_PRODUCTO,
    EDITAR_PRODUCTO_EXITO,
    EDITAR_PRODUCTO_ERROR,
} from '../types';
import clienteAxios from '../config/axios';
import Swal from 'sweetalert2'

// Crear nuevos productos.

export function crearNuevoProductoAction(producto) { 
    return async (dispatch)=> {
        dispatch( agregarProducto() );

        try {
            // insertar en la API
            await clienteAxios.post('/productos', producto);
            // Si todo sale bien, actualizar el State.
            dispatch( agregarProductoExito(producto) );
            Swal.fire(
                'Correcto',
                'El producto se agregó correctamente',
                'success');
        } catch (error) {
            console.log('Error al agregar producto:', error)
            // Si hay un error, cambiar el state.
            dispatch( agregarProductoError(true) );
            //Alerta de error:
            Swal.fire({
                icon:'error',
                title:'Hubo un error',
                text: 'Hubo un error intenta de nuevo'
            });
        }
    }
}

const agregarProducto = () => ({
    type:AGREGAR_PRODUCTO,
    payload: true
})

// Si el producto se guarda en la base de datos.
const agregarProductoExito = producto => ({
    type:AGREGAR_PRODUCTO_EXITO,
    payload: producto
})

// Si hubo un error.
const agregarProductoError = estado => ({
    type:AGREGAR_PRODUCTO_ERROR,
    payload: estado
})

// Funcion que descarga los productos de la base de datos.
export function obtenerProdctosActions() {
    return async (dispatch) => {
        dispatch( descargarProductos() );
        try {
            const respuesta = await clienteAxios.get('/productos');
            dispatch(descargaProductoExito(respuesta.data));
        } catch (error) {
            console.log(error);
            dispatch(descargaProductosError())
        }
    }
} 

const descargarProductos = () => ({
    type: COMENZAR_DESCARGA_PRODUCTOS,
    payload: true
})

const descargaProductoExito = productos => ({
    type: DESCARGA_PRODUCTOS_EXITO,
    payload: productos
})

const descargaProductosError = () => ({
    type: DESCARGA_PRODUCTOS_ERROR,
    payload: true
})

//Seleccion y elemina el producto.
export function borrarProductoAction(id){
    return async (dispatch)=> {
        dispatch(obtenerProductoEliminar(id));
        try {
            await clienteAxios.delete(`/productos/${id}`);
            dispatch(eliminarProductoExito());
            // Si se elimina, mostrar alerta.
            Swal.fire(
                'Eliminado!',
                'Su producto ha sido eliminado.',
                'success'
              )
        } catch (error) {
            console.log(error)
            dispatch(eliminarProductoError());
        }
    }
}

const obtenerProductoEliminar = id => ({
    type: OBTENER_PRODUCTO_ELIMINAR,
    payload: id
})

const eliminarProductoExito = () => ({
    type: ELIMINAR_PRODUCTO_EXITO
})

const eliminarProductoError = () => ({
    type: ELIMINAR_PRODUCTO_ERROR,
    payload: true
})

// Colocar producto en edicion.
export function obtenerProductoEditar(producto){
    return (dispatch)=>{
        dispatch(obtenerProductoEditarAction(producto))
    }
}

const obtenerProductoEditarAction = producto => ({
    type: OBTENER_PRODUCTO_EDITAR,
    payload: producto
})

// Edita un registro en la API y state.
export function editarProductoAction(producto) {
    return async (dispatch)=>{
        dispatch(editarProducto())
        try {
            await clienteAxios.put(`/productos/${producto.id}`, producto);
            dispatch(editarProductoExito(producto));
        } catch (error) {
            dispatch(editarProductoError());
            console.log(error)
        }
    }
}

const editarProducto = () => ({
    type: COMENZAR_EDICION_PRODUCTO,
})

const editarProductoExito = producto => ({
    type: EDITAR_PRODUCTO_EXITO,
    payload: producto
})

const editarProductoError = () => ({
    type: EDITAR_PRODUCTO_ERROR,
    payload: true
})