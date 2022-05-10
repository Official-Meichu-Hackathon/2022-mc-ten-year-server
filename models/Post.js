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
  slide: {
    type: String,
    required: true
  },
  link: {
    type: [String]
  },
  thumbnail_path: {
    type: String,
    required: true,
    default: ''
  },
  team_id: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'Team'
  }
});

export default mongoose.model('Post', PostSchema);
