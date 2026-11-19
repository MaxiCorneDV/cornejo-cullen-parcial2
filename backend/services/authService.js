import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../schemas/userSchema.js';

export const registerUserService = async ({ name, email, password }) => {
  const existingUser = await User.findOne({ email: email.toLowerCase() });
  if (existingUser) {
    throw new Error('El email ya está registrado.');
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // Todo usuario registrado desde la plataforma recibe siempre rol 'user' (nunca 'admin')
  const newUser = new User({
    name,
    email: email.toLowerCase(),
    password: hashedPassword,
    role: 'user'
  });

  await newUser.save();

  const secret = process.env.JWT_SECRET || 'clave_secreta_parcial2_aplicaciones_hibridas_2026';
  const token = jwt.sign(
    { id: newUser._id, email: newUser.email, role: newUser.role, name: newUser.name },
    secret,
    { expiresIn: process.env.JWT_EXPIRES_IN || '24h' }
  );

  return {
    token,
    user: {
      id: newUser._id,
      name: newUser.name,
      email: newUser.email,
      role: newUser.role
    }
  };
};

export const loginUserService = async ({ email, password }) => {
  const user = await User.findOne({ email: email.toLowerCase() });
  if (!user) {
    throw new Error('Credenciales inválidas.');
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new Error('Credenciales inválidas.');
  }

  const secret = process.env.JWT_SECRET || 'clave_secreta_parcial2_aplicaciones_hibridas_2026';
  const token = jwt.sign(
    { id: user._id, email: user.email, role: user.role, name: user.name },
    secret,
    { expiresIn: process.env.JWT_EXPIRES_IN || '24h' }
  );

  return {
    token,
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role
    }
  };
};
