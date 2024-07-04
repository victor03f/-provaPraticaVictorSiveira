import React, { useState, useEffect } from 'react';
import './Clubs.css'
export default function Clubs() {
  const [clubes, setClubes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); 

  useEffect(() => {
    const fetchClubes = async () => {
      try {
        const response = await fetch('https://api.cartola.globo.com/clubes');
        if (!response.ok) {
          throw new Error('Erro ao encontrar clubes');
        }
        const data = await response.json();
        const clubesArray = Object.values(data); 
        setClubes(clubesArray);
        setLoading(false);
      } catch (error) {
        console.error('Erro ao encontar clubes:', error);
        setError(error.message);
        setLoading(false);
      }
    };

    fetchClubes();
  }, []);

  return (
    <div className="Pagina-clube">
        
        <div className='Titulo'>
        <h1>Clubes do Cartola FC:</h1>
        </div>
      
      {loading ? (
        <p>Carregando...</p>
      ) : error ? (
        <h2>{error}</h2>
      ) : (
        <ul>
          {clubes.map((clube) => (
            <p key={clube.id}>
                <div className='escudos'>
                <img src={clube.escudos['60x60']}  key={clube.id + '-img'} />
              <div className='nomes-clubes'>
            <p>{clube.nome}</p>
            <p>{clube.apelido}</p>
              </div>
                </div>
            </p>
          ))}
        </ul>
      )}
    </div>
  );
}
