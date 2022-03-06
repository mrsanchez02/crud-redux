import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

// Redux
import { editarProductoAction } from '../actions/productoActions';
import { mostrarAlerta,ocultarAlertaAction } from '../actions/alertaActions';
import { useDispatch, useSelector } from 'react-redux'

const EditarProducto = () => {

  const navigate = useNavigate()

  const dispatch = useDispatch();

  const alerta = useSelector( (state) => state.alerta.alerta);

  //Nuevo State de producto.
  const [producto, setProducto] = useState({
    nombre: '',
    precio: ''
  });


  // Producto a editar.
  const productoEditar = useSelector(state => state.productos.productoEditar);

  const { nombre, precio } = producto;

  // Llenar el state automaticamente.
  useEffect(() => {
    setProducto(productoEditar)
  }, [productoEditar])

  // Leer los datos del formulario.

  const handleChange = e => {
    setProducto({
      ...producto,
      [e.target.name]: e.target.value
    })
  }


  // Submit Editar Producto.

  const handleSubmit = e => {
    e.preventDefault();

    if (nombre.trim() === '' || precio <= 0) {
      const respuesta = {
          msg: 'Ambos campos son obligatorios',
          clases: 'alert alert-danger text-center text-uppercase p3'
      }
      dispatch( mostrarAlerta(respuesta));
      return;
    }

    // Si no hay errores:
    dispatch(ocultarAlertaAction());

    // Editar el producto.
    dispatch(editarProductoAction(producto));

    // Redireccionar al home.
    navigate('/',{replace: true})
  }

  return (
    <div className='row justify-content-center'>
      <div className="col-md-8">
        <div className="card">
          <div className="card-body">
            <h2 className="text-center mb-4-font-weight-bold">
              Editar Producto
            </h2>
            {alerta ? <p className={alerta.clases}>{alerta.msg}</p> : null}
            <form
              onSubmit={handleSubmit}
            >
              <div className="form-group">
                <label>Nombre producto</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder='Ej.: Cubo Rubik'
                  name='nombre'
                  value={nombre}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label>Precio</label>
                <input
                  type="number"
                  className="form-control"
                  placeholder='Ej.: 25'
                  name='precio'
                  value={precio}
                  onChange={handleChange}
                />
              </div>
              <button
                type='submit'
                className='btn btn-secondary font-weight-bold text-uppercase d-block w-100'
              >Guardar cambios
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EditarProducto