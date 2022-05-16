import mongoose from 'mongoose';

const QuestionSchema = new mongoose.Schema({
  question: {
    type: String,
    required: true
  },
  tags: [{
    type: String,
    required: false
  }],
  answer: {
    type: String,
    required: true
  },
  worthy: {
    type: Number,
    required: true
  },
  createTime: {
    type: String,
    required: true
  }
});

QuestionSchema.index({ worty: -1 }, { createTime: 1 });

export default mongoose.model('Question', QuestionSchema);
