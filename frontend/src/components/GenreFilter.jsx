function GenreFilter({ genres, selectedGenre, onSelectGenre, search, onSearchChange }) {
  return (
    <div className="filter-bar">
      <div className="genre-pills">
        <button
          className={`genre-pill ${selectedGenre === 'Todos' ? 'active' : ''}`}
          onClick={() => onSelectGenre('Todos')}
        >
          Todos
        </button>
        {genres.map((g) => (
          <button
            key={g._id || g.name}
            className={`genre-pill ${selectedGenre === g.name ? 'active' : ''}`}
            onClick={() => onSelectGenre(g.name)}
          >
            {g.name}
          </button>
        ))}
      </div>

      <div className="search-box">
        <input
          type="text"
          placeholder="Buscar por disco o artista..."
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>
    </div>
  );
}

export default GenreFilter;
