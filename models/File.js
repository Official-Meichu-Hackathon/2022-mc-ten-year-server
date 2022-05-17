import mongoose from 'mongoose';

const fileSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  url: {
    type: String,
    required: true
  },
  type: {
    type: String,
    enum: ['slide', 'thumbnial'],
    required: true
  }
});

export default mongoose.model('File', fileSchema);
