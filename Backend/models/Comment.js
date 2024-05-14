import mongoose from "mongoose";

const Schema = mongoose.Schema;

const CommentSchema = new Schema({
  postId: { type: Schema.Types.ObjectId, ref: 'Post', required: true },
  text: { type: String, required: true, trim: true },
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
//   comments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }]
});

const Comment = mongoose.model('Comment', CommentSchema);

export default Comment;