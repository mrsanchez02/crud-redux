import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';


// Actions de Redux
import { crearNuevoProductoAction } from '../actions/productoActions';
import { mostrarAlerta,ocultarAlertaAction } from '../actions/alertaActions';

const NuevoProducto = () => {

    const navigate = useNavigate();

    //state del componente.
    const [nombre, setNombre] = useState('');
    const [precio, setPrecio] = useState(0);

    // Utilizar useDispatch y crea una funcion.
    const dispatch = useDispatch();

    //Acceder al state del store.
    const cargando = useSelector( (state) => state.productos.loading );
    const error = useSelector( (state) => state.productos.error );
    const alerta = useSelector( (state) => state.alerta.alerta);

    //Mandar llamar el action de productoAction
    const agregarProducto = producto => dispatch(crearNuevoProductoAction(producto));

    // Cuando el usuario haga submit
    const handleSubmit = e => {
        e.preventDefault();

        //Validar formulario.
        if (nombre.trim() === '' || precio < 0) {

            const respuesta = {
                msg: 'Ambos campos son obligatorios',
                clases: 'alert alert-danger text-center text-uppercase p3'
            }
            dispatch( mostrarAlerta(respuesta));
            return;
        }

        // Si no hay errores.
        dispatch(ocultarAlertaAction());

        //Crear el nuevo producto.
        agregarProducto({
            nombre,
            precio
        });

        //Redirect.
        navigate('/',{replace: true});
    }

    return (
        <div className='row justify-content-center'>
            <div className="col-md-8">
                <div className="card">
                    <div className="card-body">
                        <h2 className="text-center mb-4-font-weight-bold">
                            Agregar Nuevo Producto
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
                                    onChange={e => setNombre(e.target.value)}
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
                                    onChange={e => setPrecio(Number(e.target.value))}
                                />
                            </div>
                            <button
                                type='submit'
                                className='btn btn-primary font-weight-bold text-uppercase d-block w-100'
                            >Agregar
                            </button>
                        </form>
                        {cargando ? <p>Cargando</p>:null}
                        {error ? <p className='alert alert-danger p2 mt-4 text-center'>Hubo un error.</p>:null}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default NuevoProducto