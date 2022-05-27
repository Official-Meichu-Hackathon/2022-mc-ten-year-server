import mongoose from 'mongoose';

const PostSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  short_description: {
    type: String,
    maxLength: 30,
    required: true
  },
  slide: {
    type: String,
    required: true
  },
  link: {
    type: [String]
  },
  thumbnail_path: {
    type: String,
    default: 'placeHolder'
  },
  team_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Team'
  }
});

export default mongoose.model('Post', PostSchema);
