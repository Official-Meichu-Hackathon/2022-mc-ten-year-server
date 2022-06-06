import mongoose from 'mongoose';

const StaffSchema = new mongoose.Schema({
  memory: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Memory'
  },
  dept: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: false
  },
  name: {
    type: String,
    required: true
  }
});

StaffSchema.index({ name: 1, dept: 1 });

export default mongoose.model('Staff', StaffSchema);
