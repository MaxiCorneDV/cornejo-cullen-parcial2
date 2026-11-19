import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import { connectDB } from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import vinylRoutes from './routes/vinylRoutes.js';
import genreRoutes from './routes/genreRoutes.js';
import userRoutes from './routes/userRoutes.js';
import User from './schemas/userSchema.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

// Middlewares globales
app.use(cors());
app.use(express.json({ limit: '5mb' }));

// Rutas de la API REST
app.use('/api/auth', authRoutes);
app.use('/api/vinyls', vinylRoutes);
app.use('/api/genres', genreRoutes);
app.use('/api/users', userRoutes);

// Ruta raíz informativa de la API
app.get('/', (req, res) => {
  res.json({
    name: 'API REST - E-commerce de Discos de Vinilo',
    author: 'Cornejo Cullen',
    course: 'Aplicaciones Híbridas - Parcial 2',
    endpoints: {
      auth: ['/api/auth/register', '/api/auth/login', '/api/auth/profile'],
      vinyls: ['/api/vinyls', '/api/vinyls/:id'],
      genres: ['/api/genres', '/api/genres/:id'],
      users: ['/api/users', '/api/users/:id']
    }
  });
});

// Asegura que exista el único administrador
const ensureInitialData = async () => {
  try {
    const adminEmail = 'admin@vinilos.com';
    const existingAdmin = await User.findOne({ email: adminEmail });
    if (!existingAdmin) {
      const hashedPassword = await bcrypt.hash('123456', 10);
      await User.create({
        name: 'Administrador',
        email: adminEmail,
        password: hashedPassword,
        role: 'admin'
      });
      console.log('👤 Administrador creado: admin@vinilos.com / 123456');
    } else if (existingAdmin.role !== 'admin') {
      existingAdmin.role = 'admin';
      await existingAdmin.save();
    }

    await User.updateMany(
      { email: { $ne: adminEmail }, role: 'admin' },
      { $set: { role: 'user' } }
    );
  } catch (error) {
    console.error('Error verificando datos iniciales:', error.message);
  }
};

// Iniciar servidor y conexión a DB
connectDB().then(async () => {
  await ensureInitialData();
  app.listen(PORT, () => {
    console.log(`Servidor Backend corriendo en http://localhost:${PORT}`);
  });
});
