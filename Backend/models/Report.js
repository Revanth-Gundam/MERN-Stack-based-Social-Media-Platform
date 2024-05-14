import mongoose from "mongoose";

const Schema = mongoose.Schema;

const ReportSchema = new Schema({
  User_who_reported: { type: Schema.Types.ObjectId, ref: 'User', required: true  },
  User_whose_post_reported: { type: Schema.Types.ObjectId, ref: 'User', required: true  },
  Problem: { type: String, required: true, trim : true },
  subgreddiitId: { type: Schema.Types.ObjectId, ref: 'Subgreddiit', required: true },
  postId: { type: Schema.Types.ObjectId, ref: 'Post', required: true },
  date: { type: Date, default: Date.now },
  status_post: { type: String, enum: ['Neutral', 'Ignored', 'Blocked'], required: true, default: 'Neutral' }
});

const Report = mongoose.model('Report', ReportSchema);

export default Report;