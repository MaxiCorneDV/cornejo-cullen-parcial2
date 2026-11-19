import { registerUserService, loginUserService } from '../services/authService.js';

export const register = async (req, res) => {
  try {
    const result = await registerUserService(req.body);
    res.status(201).json({
      message: 'Usuario registrado con éxito',
      ...result
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const login = async (req, res) => {
  try {
    const result = await loginUserService(req.body);
    res.status(200).json({
      message: 'Inicio de sesión exitoso',
      ...result
    });
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
};

export const getProfile = async (req, res) => {
  res.status(200).json({
    user: req.user
  });
};
