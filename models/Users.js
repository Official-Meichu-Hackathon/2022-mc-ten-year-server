import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  isAdmin: {
    type: Boolean,
    required: true,
    default: false
  },
  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  goodPost: [{
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Post' // fileSchema
  }],
  questions: [{
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Questions'
  }]
});

UserSchema.index({ username: 1 });

export default mongoose.model('User', UserSchema);
