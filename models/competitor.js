import mongoose from 'mongoose';

const CompetitorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  phone_number: {
    type: String,
    required: false
  },
  email_address: {
    type: String,
    required: false
  },
  feedback: {
    type: String,
    required: false
  },
  team_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Team' 
  },
});


export default mongoose.model('Competitor', CompetitorSchema);
