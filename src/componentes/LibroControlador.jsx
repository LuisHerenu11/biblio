import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import LibroVista from './LibroVista';
import LibroModel from './LibroModel';

const LibroControlador = ({libros,librosContenidos, agregarLibro}) => {

    const [portada, setPortada] = useState(LibroModel.portada);
    const [titulo, setTitulo] = useState(LibroModel.titulo);
    const [autor, setAutor] = useState(LibroModel.autor);
    const [clave_autor, setClave_autor] = useState(LibroModel.clave_autor);
    const [clave_libro, setClave_libro] = useState(LibroModel.clave_libro);


    const modificarPortada = () => {
        LibroModel.modificarPortada(portada);
        setPortada(LibroModel.portada)
    }

    const modificarTitulo = () => {
        LibroModel.modificarTitulo(titulo);
        setTitulo(LibroModel.titulo);
    }

    const modificarAutor = () => {
        LibroModel.modificarAutor(autor);
        setAutor(LibroModel.autor);
    }

    const modificarClaveAutor = () => {
        LibroModel.modificarClaveAutor(clave_autor);
        setClave_autor(LibroModel.clave_autor);
    }
    
    const modificarClaveLibro = () => {
        LibroModel.modificarClaveLibro(clave_libro);
        setClave_libro(LibroModel.clave_libro);
    }
    
    const seleccionarLibro = (id) => {
        console.log("Seleccionado: "+id);
        // el filter crea una shallow copy.
        const libroFiltrado = libros.filter(
            // para cada producto filtrar los que sean estrictamente iguales al parámetro id.  
            unLibro => unLibro.clave_libro === id
        )[0];
        // [0] <- para tomar el primer objeto de la lista filtrada, osea el producto.
        // ... <- "continuar sin reescribir lo almacenado previamente"
        let libroClonado = structuredClone(libroFiltrado);
        libroClonado.clave_libro = uuidv4(); // revisar si hay que quitar.
        agregarLibro([...librosContenidos,libroClonado]);
        console.log(librosContenidos);
    };

    return (  
        <div>
            <LibroVista 
                portada={portada} 
                titulo={titulo} 
                autor={autor} 
                clave_autor={clave_autor} 
                clave_libro={clave_libro}
            />
            <br/>
            <button type='button' onClick={ () => seleccionarLibro(clave_libro)}>
                Agregar    
            </button>
        </div>
    );
}

export default LibroControlador;