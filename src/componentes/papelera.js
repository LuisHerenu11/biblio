const buscarLibro = () => {
    document.getElementById('output').innerHTML="";
    fetch("https://openlibrary.org/search.json?q="+document.getElementById('input').value)
    .then(element => element.json())
    .then(response => {
        if (response.docs && response.docs.length > 0) {
            for(var i=0; i<5;i++){
                document.getElementById('output').innerHTML +=
                "<h2>" + response.docs[i].title + "</h2>" +
                "<p>" + (response.docs[i].author_name ? response.docs[i].author_name.join(', ') : 'N/A') + "</p>" +
                "<img src='http://covers.openlibrary.org/b/isbn/" + response.docs[i].isbn[0] + "-M.jpg'><br>"+
                "<p> Clave Autor: "+ response.docs[i].author_key+"</p>"+
                "<p> Clave Libro: "+ response.docs[i].key+"</p><br>";
                //"<button type='button' onClick={() => guardarLibro(nuevoLibro)}> GUARDAR </button>";
            }
        }else {
            document.getElementById('output').innerHTML = "No se encontraron resultados.";
        }
    })
    .catch(error => {
        console.error("Error fetching data:", error);
        document.getElementById('output').innerHTML = "Error al obtener datos. Por favor, inténtalo de nuevo.";
    });
};



// Original buscar sin modificaciones.