import mongoose from 'mongoose';

const fileSchema = new mongoose.Schema({
  fileName: {
    type: String,
    required: true
  },
  url: {
    type: String,
    required: true
  },
  fileType: {
    type: String,
    enum: ['ten_year_slide', 'ten_year_thumbnail'],
    required: true
  }
});

export default mongoose.model('File', fileSchema);
