import React from 'react';
import { Button, Card } from 'react-bootstrap';

const LibroVista = ({portada,titulo,autor,clave_autor,clave_libro}) => {
    return (
        <div>
            <img src={portada}></img>
            <br/>
            <h1>Titulo:{titulo}</h1>
            <br/>
            <h2>Autor:{autor}</h2>
            <br/>
            <h3>ClaveA:{clave_autor}</h3>
            <br/>
            <h3>ClaveL:{clave_libro}</h3>
        </div>
    );
}
export default LibroVista;
