import mongoose from 'mongoose';

const googleFormSchema = new mongoose.Schema({
  total: {
    type: Number,
    required: true
  }
});

export default mongoose.model('GoogleForm', googleFormSchema);
