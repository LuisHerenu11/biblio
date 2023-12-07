import React from 'react';

const LibroModel= {
    portada:"",
    titulo:"",
    autor:"",
    clave_autor:"",
    clave_libro:"",

    modificarPortada: function(unaPortada){
        this.portada = unaPortada;
    },

    modificarTitulo: function(unTitulo){
        this.titulo = unTitulo;
    },

    modificarAutor: function(unAutor){
        this.autor = unAutor;
    },

    modificarClaveAutor: function(unaClave_autor){
        this.clave_autor = unaClave_autor;
    },

    modificarClaveLibro: function(unaClave_libro){
        this.clave_libro = unaClave_libro;
    }
};

export default LibroModel;