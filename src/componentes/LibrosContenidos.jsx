import React from 'react';
import { Button, Card } from 'react-bootstrap';
import { v4 as uuidv4 } from 'uuid';
import LibroControlador from './LibroControlador';

/* reutilizando el componente Libro, mapeo el libro ya seleccionado */
/*
    portada:"",
    titulo:"",
    autor:"",
    clave_autor:"",
    clave_libro:""
*/

// Considerar usar el LibroControlador para mapear los libros contenidos.

const LibrosContenidos = ({librosContenidos, eliminarLibro}) => {
    return (
        <>
            <div>
                <h3>Contenedor Libros</h3>
                {librosContenidos.map(libro => (
                    <Card key={libro.clave_libro}>
                        <Card.Body>
                            <Card.Title>{libro.clave_libro}</Card.Title>
                            <Card.Text><img src={libro.portada} style={{width:"30%"}}/> {libro.titulo} {libro.autor}</Card.Text>
                            <Button variant="danger" onClick={() => eliminarLibro(libro.clave_libro)}>
                                Eliminar
                            </Button>
                        </Card.Body>
                    </Card>
                ))}
            </div>
        </>
    );
}

export default LibrosContenidos;