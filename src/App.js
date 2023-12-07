import './App.css';
import { useAuth0 } from '@auth0/auth0-react';
import { useState, useEffect } from 'react';
import { LoginButton } from './componentes/Login';
import { LogoutButton } from './componentes/Logout';
import { Profile } from './componentes/Profile';
import LibroControlador from './componentes/LibroControlador';
import { Buscador } from './componentes/Buscador';
import LibrosContenidos from './componentes/LibrosContenidos';

const base_url = "https://openlibrary.org/search.json?q=";

function App() {
  const { isAuthenticated } = useAuth0();
  // const {data, loading, error, handleCancelRequest,buscarLibro} = Buscador("https://openlibrary.org/search.json?q=lord+of+the+rings")
  const {data, loading, error, handleCancelRequest, buscarLibro, inputValue, setInputValue} = Buscador();
  
  return (
    <div className='App'>
      <header className='App-header'>
        {isAuthenticated ? (
          <>
            <Profile/>
            <LogoutButton/>
            <button onClick={handleCancelRequest}>Cancelar Request</button>
            <input id='input' 
              value={inputValue} 
              onChange={(element) => setInputValue(element.target.value)}
            />
            <button onClick={buscarLibro}> Buscar libro </button>
            <br/>
            <div id="output"><h2>Resultados</h2></div>
            <br/>
            <div id="output2"><h2>Resultados Librero</h2></div>
            <br/>
          </>
          ) : (
            <>
              <LoginButton/>
            </>
          )
        }  
      </header>
    </div>
  );
}

export default App;
