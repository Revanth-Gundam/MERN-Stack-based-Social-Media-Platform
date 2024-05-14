import mongoose from "mongoose";

const Schema = mongoose.Schema;

const PostSchema = new Schema({
  text: { type: String, required: true, trim: true },
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  subgreddiitId: { type: Schema.Types.ObjectId, ref: 'Subgreddiit', required: true },
  likes: { type: Number, required: true, default: 0 },
  dislikes: { type: Number, required: true, default: 0 },
  date: { type: Date, default: Date.now },
  status: { type: String, enum: ['allowed', 'deleted', 'reported_before'], required: true, default: 'allowed' },
  comments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }],
  saved_By: [{ type: Schema.Types.ObjectId, ref: 'User' }]
});

const Post = mongoose.model('Post', PostSchema);

export default Post;