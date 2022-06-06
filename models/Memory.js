import mongoose from 'mongoose';

const MemorySchema = new mongoose.Schema({
  year: {
    type: Number,
    required: true
  },
  theme: {
    type: String,
    required: true
  },
  design_thought: {
    type: String,
    required: true
  },
  innovation: {
    type: String,
    required: true
  },
  convenor: {
    type: String,
    required: true
  },
  dept: [{
    type: String,
    required: true
  }],
  participant: {
    type: Number,
    required: true
  },
  system: [{
    type: String,
    required: true
  }],
  place: {
    type: String,
    required: true
  }
});

MemorySchema.index({ year: -1 });

export default mongoose.model('Memory', MemorySchema);
// add commit because git doesn't let upload files ==
