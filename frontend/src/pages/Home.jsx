import { useState, useEffect } from 'react';
import { getVinyls } from '../services/vinylService';
import { getGenres } from '../services/genreService';
import VinylCard from '../components/VinylCard';
import GenreFilter from '../components/GenreFilter';

function Home() {
  const [vinyls, setVinyls] = useState([]);
  const [genres, setGenres] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState('Todos');
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadGenres = async () => {
      const data = await getGenres();
      setGenres(data);
    };
    loadGenres();
  }, []);

  useEffect(() => {
    const loadVinyls = async () => {
      setLoading(true);
      const data = await getVinyls(selectedGenre, search);
      setVinyls(data);
      setLoading(false);
    };
    loadVinyls();
  }, [selectedGenre, search]);

  return (
    <div className="home-page">
      <section className="hero-banner">
        <div className="hero-content">
          <span className="hero-tag">EDICIONES ESPECIALES • SOUNDTRACKS & THE WEEKND COLLECTION</span>
          <h1>Colección Exclusiva de Discos de Vinilo</h1>
          <p>
            Explorá nuestros 12 vinilos de colección: bandas sonoras de Anime y Videojuegos (Berserk, NieR:Automata, Cyberpunk: Edgerunners, Persona 3 Reload, Stellar Blade, Evangelion) y la discografía esencial de The Weeknd.
          </p>
        </div>
      </section>

      <GenreFilter
        genres={genres}
        selectedGenre={selectedGenre}
        onSelectGenre={setSelectedGenre}
        search={search}
        onSearchChange={setSearch}
      />

      {loading ? (
        <div className="loading-state">Cargando catálogo de vinilos...</div>
      ) : vinyls.length === 0 ? (
        <div className="empty-state">
          <p>No se encontraron discos con esos filtros.</p>
          <button
            className="btn-primary-sm"
            onClick={() => {
              setSelectedGenre('Todos');
              setSearch('');
            }}
          >
            Restablecer filtros
          </button>
        </div>
      ) : (
        <section className="vinyl-grid">
          {vinyls.map((vinyl) => (
            <VinylCard key={vinyl._id} vinyl={vinyl} />
          ))}
        </section>
      )}
    </div>
  );
}

export default Home;
