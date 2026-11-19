import mongoose from 'mongoose';

const genreSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'El nombre del género es obligatorio'],
      unique: true,
      trim: true
    },
    description: {
      type: String,
      required: [true, 'La descripción del género es obligatoria'],
      trim: true
    },
    originDecade: {
      type: String,
      default: '1970s'
    }
  },
  { timestamps: true }
);

export default mongoose.model('Genre', genreSchema);
