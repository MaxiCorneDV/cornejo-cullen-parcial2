import mongoose from 'mongoose';

const vinylSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'El título del disco es obligatorio'],
      trim: true
    },
    artist: {
      type: String,
      required: [true, 'El artista es obligatorio'],
      trim: true
    },
    year: {
      type: Number,
      required: [true, 'El año de lanzamiento es obligatorio'],
      min: [1940, 'Año inválido'],
      max: [2030, 'Año inválido']
    },
    price: {
      type: Number,
      required: [true, 'El precio es obligatorio'],
      min: [0, 'El precio no puede ser negativo']
    },
    stock: {
      type: Number,
      required: true,
      default: 10,
      min: [0, 'El stock no puede ser negativo']
    },
    genre: {
      type: String,
      required: [true, 'El género es obligatorio'],
      trim: true
    },
    coverUrl: {
      type: String,
      required: [true, 'La imagen de portada es obligatoria']
    },
    description: {
      type: String,
      required: [true, 'La descripción es obligatoria']
    },
    format: {
      type: String,
      default: 'LP 12" 180g'
    }
  },
  { timestamps: true }
);

export default mongoose.model('Vinyl', vinylSchema);
