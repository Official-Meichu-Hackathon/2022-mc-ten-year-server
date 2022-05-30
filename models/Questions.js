import mongoose from 'mongoose';

const QuestionSchema = new mongoose.Schema({
  question: {
    type: String,
    required: true
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
  // FIXME: change type
  createTime: {
    type: String,
    required: true
  }
});

QuestionSchema.index({ worthy: -1 }, { createTime: 1 });

export default mongoose.model('Question', QuestionSchema);
