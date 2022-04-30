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
  tag: [{
    type: String,
    required: true,
  }],
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
  award: [{
    type: String,
    required: true,
  }]
});

UserSchema.index({ 
    year: -1,
	ctr: -1,
	upvote: -1,
});

export default mongoose.model('User', TeamSchema);
