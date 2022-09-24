import mongoose from 'mongoose';

const QuestionSchema = new mongoose.Schema({
  question: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  name: {
    type: String,
    default: 'Meta'
  },
  tags: {
    type: Array,
    required: false
  },
  answer: {
    type: String,
    required: true
  },
  worthy: {
    type: Number,
    required: true
  },
  createTime: {
    type: Date,
    default: Date.now
  }
});

QuestionSchema.index({ worthy: -1 }, { createTime: 1 });

export default mongoose.model('Question', QuestionSchema);
