import { useState, useEffect, useRef } from 'react';
import {
  getVinyls,
  createVinyl,
  updateVinyl,
  deleteVinyl
} from '../services/vinylService';
import {
  getGenres,
  createGenre,
  updateGenre,
  deleteGenre
} from '../services/genreService';

const emptyVinyl = {
  title: '',
  artist: '',
  year: 2024,
  price: 58000,
  stock: 10,
  genre: 'Anime Soundtrack',
  coverUrl: '',
  description: '',
  format: 'LP 12" 180g'
};

const emptyGenre = {
  name: '',
  description: '',
  originDecade: '1970s'
};

function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('vinyls');
  const [vinyls, setVinyls] = useState([]);
  const [genres, setGenres] = useState([]);
  const [vinylForm, setVinylForm] = useState(emptyVinyl);
  const [editingVinylId, setEditingVinylId] = useState(null);

  const [genreForm, setGenreForm] = useState(emptyGenre);
  const [editingGenreId, setEditingGenreId] = useState(null);

  const [feedback, setFeedback] = useState({ type: '', message: '' });
  const fileInputRef = useRef(null);

  const loadData = async () => {
    const [vData, gData] = await Promise.all([getVinyls(), getGenres()]);
    setVinyls(vData);
    setGenres(gData);
  };

  useEffect(() => {
    loadData();
  }, []);

  const showMessage = (type, message) => {
    setFeedback({ type, message });
    setTimeout(() => setFeedback({ type: '', message: '' }), 4000);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      showMessage('error', 'El archivo seleccionado debe ser una imagen.');
      e.target.value = '';
      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      showMessage('error', 'La imagen es muy pesada.');
      e.target.value = '';
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setVinylForm((prev) => ({
        ...prev,
        coverUrl: reader.result
      }));
    };
    reader.readAsDataURL(file);
  };

  // Validación Frontend de Vinilo
  const validateVinylForm = () => {
    if (!vinylForm.title || vinylForm.title.trim().length < 2) {
      showMessage('error', 'El título del disco es obligatorio (mín. 2 caracteres).');
      return false;
    }
    if (!vinylForm.artist || vinylForm.artist.trim().length < 2) {
      showMessage('error', 'El artista es obligatorio.');
      return false;
    }
    if (Number(vinylForm.year) < 1940 || Number(vinylForm.year) > 2030) {
      showMessage('error', 'El año debe estar entre 1940 y 2030.');
      return false;
    }
    if (Number(vinylForm.price) <= 0) {
      showMessage('error', 'El precio debe ser mayor a 0.');
      return false;
    }
    if (!vinylForm.coverUrl || !vinylForm.coverUrl.trim()) {
      showMessage('error', 'Debes seleccionar una imagen de portada.');
      return false;
    }
    if (!vinylForm.description || vinylForm.description.trim().length < 10) {
      showMessage('error', 'La descripción debe tener al menos 10 caracteres.');
      return false;
    }
    return true;
  };

  const handleVinylSubmit = async (e) => {
    e.preventDefault();
    if (!validateVinylForm()) return;

    try {
      const payload = {
        ...vinylForm,
        year: Number(vinylForm.year),
        price: Number(vinylForm.price),
        stock: Number(vinylForm.stock)
      };

      if (editingVinylId) {
        await updateVinyl(editingVinylId, payload);
        showMessage('success', 'Vinilo actualizado correctamente.');
      } else {
        await createVinyl(payload);
        showMessage('success', 'Nuevo vinilo agregado al catálogo.');
      }
      setVinylForm(emptyVinyl);
      setEditingVinylId(null);
      if (fileInputRef.current) fileInputRef.current.value = '';
      loadData();
    } catch (err) {
      showMessage('error', err.message);
    }
  };

  const handleEditVinyl = (vinyl) => {
    setEditingVinylId(vinyl._id);
    if (fileInputRef.current) fileInputRef.current.value = '';
    setVinylForm({
      title: vinyl.title,
      artist: vinyl.artist,
      year: vinyl.year,
      price: vinyl.price,
      stock: vinyl.stock,
      genre: vinyl.genre,
      coverUrl: vinyl.coverUrl,
      description: vinyl.description,
      format: vinyl.format || 'LP 12" 180g'
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDeleteVinyl = async (id) => {
    if (!window.confirm('¿Seguro que deseas eliminar este disco de vinilo?')) return;
    try {
      await deleteVinyl(id);
      showMessage('success', 'Vinilo eliminado correctamente.');
      loadData();
    } catch (err) {
      showMessage('error', err.message);
    }
  };

  // Validación y CRUD de Géneros
  const handleGenreSubmit = async (e) => {
    e.preventDefault();
    if (!genreForm.name || genreForm.name.trim().length < 2) {
      showMessage('error', 'El nombre del género es obligatorio.');
      return;
    }
    if (!genreForm.description || genreForm.description.trim().length < 5) {
      showMessage('error', 'La descripción del género debe tener al menos 5 caracteres.');
      return;
    }

    try {
      if (editingGenreId) {
        await updateGenre(editingGenreId, genreForm);
        showMessage('success', 'Género actualizado correctamente.');
      } else {
        await createGenre(genreForm);
        showMessage('success', 'Género creado correctamente.');
      }
      setGenreForm(emptyGenre);
      setEditingGenreId(null);
      loadData();
    } catch (err) {
      showMessage('error', err.message);
    }
  };

  const handleEditGenre = (genre) => {
    setEditingGenreId(genre._id);
    setGenreForm({
      name: genre.name,
      description: genre.description,
      originDecade: genre.originDecade || '1970s'
    });
  };

  const handleDeleteGenre = async (id) => {
    if (!window.confirm('¿Seguro que deseas eliminar este género musical?')) return;
    try {
      await deleteGenre(id);
      showMessage('success', 'Género eliminado correctamente.');
      loadData();
    } catch (err) {
      showMessage('error', err.message);
    }
  };

  return (
    <section className="admin-page">
      <div className="admin-header">
        <h1>Panel de Administración CRUD</h1>
        <div className="admin-tabs">
          <button
            className={`tab-btn ${activeTab === 'vinyls' ? 'active' : ''}`}
            onClick={() => setActiveTab('vinyls')}
          >
            Vinilos ({vinyls.length})
          </button>
          <button
            className={`tab-btn ${activeTab === 'genres' ? 'active' : ''}`}
            onClick={() => setActiveTab('genres')}
          >
            Géneros ({genres.length})
          </button>
        </div>
      </div>

      {feedback.message && (
        <div className={feedback.type === 'error' ? 'alert-error' : 'alert-success'}>
          {feedback.message}
        </div>
      )}

      {activeTab === 'vinyls' ? (
        <div className="admin-grid">
          <div className="admin-form-card">
            <h2>{editingVinylId ? 'Editar Vinilo' : 'Nuevo Disco de Vinilo'}</h2>
            <form onSubmit={handleVinylSubmit} className="admin-form" noValidate>
              <div className="form-group">
                <label>Título del Disco</label>
                <input
                  type="text"
                  value={vinylForm.title}
                  onChange={(e) => setVinylForm({ ...vinylForm, title: e.target.value })}
                  placeholder="Ej: Wish You Were Here"
                />
              </div>

              <div className="form-group">
                <label>Artista / Banda</label>
                <input
                  type="text"
                  value={vinylForm.artist}
                  onChange={(e) => setVinylForm({ ...vinylForm, artist: e.target.value })}
                  placeholder="Ej: Pink Floyd"
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Año</label>
                  <input
                    type="number"
                    value={vinylForm.year}
                    onChange={(e) => setVinylForm({ ...vinylForm, year: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <label>Precio ($ ARS)</label>
                  <input
                    type="number"
                    value={vinylForm.price}
                    onChange={(e) => setVinylForm({ ...vinylForm, price: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <label>Stock</label>
                  <input
                    type="number"
                    value={vinylForm.stock}
                    onChange={(e) => setVinylForm({ ...vinylForm, stock: e.target.value })}
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Género</label>
                  <select
                    value={vinylForm.genre}
                    onChange={(e) => setVinylForm({ ...vinylForm, genre: e.target.value })}
                  >
                    {genres.map((g) => (
                      <option key={g._id || g.name} value={g.name}>
                        {g.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="form-group">
                  <label>Formato</label>
                  <input
                    type="text"
                    value={vinylForm.format}
                    onChange={(e) => setVinylForm({ ...vinylForm, format: e.target.value })}
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Imagen de Portada</label>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                />
                {vinylForm.coverUrl && (
                  <img
                    src={vinylForm.coverUrl}
                    alt="Vista previa de portada"
                    style={{
                      width: '100px',
                      height: '100px',
                      objectFit: 'cover',
                      borderRadius: '8px',
                      marginTop: '10px'
                    }}
                  />
                )}
              </div>

              <div className="form-group">
                <label>Descripción (mín. 10 caracteres)</label>
                <textarea
                  rows="3"
                  value={vinylForm.description}
                  onChange={(e) => setVinylForm({ ...vinylForm, description: e.target.value })}
                  placeholder="Descripción de la edición, tracks destacados, etc."
                />
              </div>

              <div className="form-actions">
                <button type="submit" className="btn-primary-sm">
                  {editingVinylId ? 'Guardar Cambios' : 'Crear Vinilo'}
                </button>
                {editingVinylId && (
                  <button
                    type="button"
                    className="btn-outline-sm"
                    onClick={() => {
                      setEditingVinylId(null);
                      setVinylForm(emptyVinyl);
                      if (fileInputRef.current) fileInputRef.current.value = '';
                    }}
                  >
                    Cancelar
                  </button>
                )}
              </div>
            </form>
          </div>

          <div className="admin-table-card">
            <h2>Listado de Vinilos ({vinyls.length})</h2>
            <div className="table-responsive">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Disco</th>
                    <th>Artista</th>
                    <th>Género</th>
                    <th>Precio</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {vinyls.map((v) => (
                    <tr key={v._id}>
                      <td>
                        <strong>{v.title}</strong> ({v.year})
                      </td>
                      <td>{v.artist}</td>
                      <td>{v.genre}</td>
                      <td>${Number(v.price).toLocaleString('es-AR')}</td>
                      <td className="table-actions">
                        <button onClick={() => handleEditVinyl(v)} className="btn-secondary-sm">
                          Editar
                        </button>
                        <button onClick={() => handleDeleteVinyl(v._id)} className="btn-danger-sm">
                          Borrar
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      ) : (
        <div className="admin-grid">
          <div className="admin-form-card">
            <h2>{editingGenreId ? 'Editar Género' : 'Nuevo Género Musical'}</h2>
            <form onSubmit={handleGenreSubmit} className="admin-form" noValidate>
              <div className="form-group">
                <label>Nombre del Género</label>
                <input
                  type="text"
                  value={genreForm.name}
                  onChange={(e) => setGenreForm({ ...genreForm, name: e.target.value })}
                  placeholder="Ej: Blues / Hard Rock"
                />
              </div>

              <div className="form-group">
                <label>Década de Origen</label>
                <input
                  type="text"
                  value={genreForm.originDecade}
                  onChange={(e) => setGenreForm({ ...genreForm, originDecade: e.target.value })}
                  placeholder="Ej: 1960s"
                />
              </div>

              <div className="form-group">
                <label>Descripción</label>
                <textarea
                  rows="3"
                  value={genreForm.description}
                  onChange={(e) => setGenreForm({ ...genreForm, description: e.target.value })}
                  placeholder="Características del género..."
                />
              </div>

              <div className="form-actions">
                <button type="submit" className="btn-primary-sm">
                  {editingGenreId ? 'Actualizar Género' : 'Crear Género'}
                </button>
                {editingGenreId && (
                  <button
                    type="button"
                    className="btn-outline-sm"
                    onClick={() => {
                      setEditingGenreId(null);
                      setGenreForm(emptyGenre);
                    }}
                  >
                    Cancelar
                  </button>
                )}
              </div>
            </form>
          </div>

          <div className="admin-table-card">
            <h2>Géneros Musicales ({genres.length})</h2>
            <div className="table-responsive">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Nombre</th>
                    <th>Década</th>
                    <th>Descripción</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {genres.map((g) => (
                    <tr key={g._id}>
                      <td>
                        <strong>{g.name}</strong>
                      </td>
                      <td>{g.originDecade}</td>
                      <td>{g.description}</td>
                      <td className="table-actions">
                        <button onClick={() => handleEditGenre(g)} className="btn-secondary-sm">
                          Editar
                        </button>
                        <button onClick={() => handleDeleteGenre(g._id)} className="btn-danger-sm">
                          Borrar
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

export default AdminDashboard;