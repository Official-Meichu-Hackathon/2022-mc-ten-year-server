import mongoose from 'mongoose';

const TeamSchema = new mongoose.Schema({
  teamname: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  year: {
    type: Number,
    required: true
  },
  tag: {
    type: Array,
    required: true
  },
  description: {
    type: String,
    required: false
  },
  ctr: {
    type: Number,
    required: true,
    default: 0
  },
  upvote: {
    type: Number,
    required: true,
    default: 0
  },
  award: {
    type: Array,
    required: false
  }
});

TeamSchema.index({
  year: -1,
  ctr: -1,
  upvote: -1
});

export default mongoose.model('Team', TeamSchema);
