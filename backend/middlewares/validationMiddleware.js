export const validateRegister = (req, res, next) => {
  const { name, email, password } = req.body;
  const errors = [];

  if (!name || name.trim().length < 3) {
    errors.push('El nombre debe tener al menos 3 caracteres.');
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email || !emailRegex.test(email)) {
    errors.push('Debe ingresar un email válido.');
  }

  if (!password || password.length < 6) {
    errors.push('La contraseña debe tener al menos 6 caracteres.');
  }

  if (errors.length > 0) {
    return res.status(400).json({ message: 'Error de validación', errors });
  }

  next();
};

export const validateLogin = (req, res, next) => {
  const { email, password } = req.body;
  const errors = [];

  if (!email || !email.trim()) {
    errors.push('El email es obligatorio.');
  }

  if (!password || !password.trim()) {
    errors.push('La contraseña es obligatoria.');
  }

  if (errors.length > 0) {
    return res.status(400).json({ message: 'Error de validación', errors });
  }

  next();
};

export const validateVinyl = (req, res, next) => {
  const { title, artist, year, price, genre, coverUrl, description } = req.body;
  const errors = [];

  if (!title || title.trim().length < 2) {
    errors.push('El título del vinilo es obligatorio (mínimo 2 caracteres).');
  }
  if (!artist || artist.trim().length < 2) {
    errors.push('El artista es obligatorio (mínimo 2 caracteres).');
  }
  if (!year || isNaN(year) || Number(year) < 1940 || Number(year) > 2030) {
    errors.push('El año debe estar entre 1940 y 2030.');
  }
  if (price === undefined || isNaN(price) || Number(price) <= 0) {
    errors.push('El precio debe ser un número mayor a 0.');
  }
  if (!genre || !genre.trim()) {
    errors.push('El género es obligatorio.');
  }
  if (!coverUrl || !coverUrl.trim()) {
    errors.push('La imagen de portada es obligatoria.');
  }
  if (!description || description.trim().length < 10) {
    errors.push('La descripción debe tener al menos 10 caracteres.');
  }

  if (errors.length > 0) {
    return res.status(400).json({ message: 'Error de validación en el vinilo', errors });
  }

  next();
};

export const validateGenre = (req, res, next) => {
  const { name, description } = req.body;
  const errors = [];

  if (!name || name.trim().length < 2) {
    errors.push('El nombre del género es obligatorio.');
  }
  if (!description || description.trim().length < 5) {
    errors.push('La descripción del género debe tener al menos 5 caracteres.');
  }

  if (errors.length > 0) {
    return res.status(400).json({ message: 'Error de validación en el género', errors });
  }

  next();
};