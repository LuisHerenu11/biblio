import { useState, useEffect } from "react";
import LibrosContenidos from "./LibrosContenidos";
import LibroControlador from "./LibroControlador";


export function Buscador(){

    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [controller, setController] = useState(null);
    const [inputValue, setInputValue] = useState("");

    // lista de libros hard codeada.
    // Debería guardarse los resultados del buscador.
    const [libros, guardarLibros] = useState([]);

     // Creamos librero personal.
    const[librosContenidos, agregarLibro] = useState([]);

    // Estado libroHTML.
    const[librosHtml,setLibrosHtml] = useState([]);

    const guardarLibroEnContenidos = (libro) => {
        agregarLibro([...librosContenidos, libro]);
    };

    const eliminarLibro = (libroId) => {
        // Copia el librosContenidos actual
        const librosContenidosActualizado = [...librosContenidos];
        // Filtra y elimina el libro con el libroId
        const nuevolibrosContenidos = librosContenidosActualizado.filter(libro => libro.clave_libro !== libroId);
        // Actualiza el estado del librero personal con el nuevo arreglo
        agregarLibro(nuevolibrosContenidos);
    };

    useEffect(() => {
        const abortController = new AbortController();
        setController(abortController);
        setLoading(true);

        fetch("https://openlibrary.org/search.json?q=${inputValue}",{ signal: abortController.signal})
            .then((response) => response.json())
            .then((data) => setData(data))
            .catch((error) => {
                if(error.name === "AbortError"){
                    console.log("Request cancelled");
                }else {
                    setError(error);
                }
            })
            .finally(() => setLoading(false));
        return () => abortController.abort();
    }, [inputValue]);
    
    const handleCancelRequest = () => {
        if (controller){
            controller.abort();
            setError("Request cancelada");
        }
    };

    const buscarLibro = () => {
        document.getElementById('output').innerHTML="";
        fetch("https://openlibrary.org/search.json?q="+document.getElementById('input').value)
        .then(element => element.json())
        .then(response => {
            if (response.docs && response.docs.length > 0) {
                const nuevosLibros = [];
                for(var i=0; i<5;i++){
                    document.getElementById('output').innerHTML +=
                    "<h2>" + response.docs[i].title + "</h2>" +
                    "<p>" + (response.docs[i].author_name ? response.docs[i].author_name.join(', ') : 'N/A') + "</p>" +
                    "<img src='http://covers.openlibrary.org/b/isbn/" + response.docs[i].isbn[0] + "-M.jpg'><br>"+
                    "<p> Clave Autor: "+ response.docs[i].author_key+"</p>"+
                    "<p> Clave Libro: "+ response.docs[i].key+"</p><br>";
                    
                    const libroNuevo = {
                        portada: "http://covers.openlibrary.org/b/isbn/"+response.docs[i].isbn[0]+"-M.jpg",
                        titulo: response.docs[i].title,
                        autor: response.docs[i].author_name,
                        clave_autor: response.docs[i].author_key,
                        clave_libro: response.docs[i].key
                    };
                    //"<button type='button' onClick={() => guardarLibro(nuevoLibro)}> GUARDAR </button>";
                    guardarLibros([...libros,libroNuevo]);
                    // esto es nuevo!
                    nuevosLibros.push(
                        <LibroControlador
                            key={libroNuevo.clave_libro}
                            portada={libroNuevo.portada}
                            titulo={libroNuevo.titulo}
                            autor={libroNuevo.autor}
                            clave_autor={libroNuevo.clave_autor}
                            clave_libro={libroNuevo.clave_libro}
                            libros={libros}
                            librosContenidos={librosContenidos}
                            agregarLibro={agregarLibro}
                        />
                    );
                }
                // Esto es nuevo!
                setLibrosHtml(nuevosLibros);
                /*
                    document.getElementById('output2').innerHTML = `
                        <div>
                            ${libros.map((libro) => (
                                `<div>
                                    <LibroControlador 
                                        portada="${libro.portada}"
                                        titulo="${libro.titulo}"
                                        autor="${libro.autor}"
                                        clave_autor="${libro.clave_autor}"
                                        clave_libro="${libro.clave_libro}"
                                        libros="${libros}"
                                        librosContenidos="${librosContenidos}"
                                        agregarLibro="${agregarLibro}"
                                    />
                                    <button onclick="guardarLibroEnContenidos(${JSON.stringify(libro)})">Guardar</button>
                                </div>`
                            ))}
                        </div>
                    `;
                */
                document.getElementById('output2').innerHTML = `<div>${nuevosLibros.map(libro => libro)}</div>`;
                // Renderizar <LibrosContenidos> aquí si es relevante para tu aplicación.
                <LibrosContenidos librosContenidos={librosContenidos} eliminarLibro={eliminarLibro}/>;
                
            }else {
                document.getElementById('output').innerHTML = "No se encontraron resultados.";
            }
        })
        .catch(error => {
            console.error("Error fetching data:", error);
            document.getElementById('output').innerHTML = "Error al obtener datos. Por favor, inténtalo de nuevo.";
        });
    };
    // las llaves significan que retorna como OBJECT
    return {data, loading, error, handleCancelRequest, buscarLibro, inputValue, setInputValue};
}