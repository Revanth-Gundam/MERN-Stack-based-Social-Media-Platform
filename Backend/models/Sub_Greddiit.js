import mongoose from "mongoose";

const Schema = mongoose.Schema;

const SubgreddiitSchema = new Schema({
  name: { type: String, required: true, trim: true },
  description: { type: String, required: true, trim: false  },
  // image: { type: String },
  moderatorId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  date_Created: { type: Date, default: Date.now },
  tags: [{ type: String }],
  banned_Words: [{ type: String, trim: true, required:false }],
  users: [{
    status: { type: String, enum: ['joined', 'blocked', 'requested', 'moderator'], default: 'requested' },
    userId: { type: Schema.Types.ObjectId, ref: 'User' },
    date: { type: Date,  }
  }],
  posts: [{
    postId: { type: Schema.Types.ObjectId, ref: 'Post' },
    date: { type: Date, default: Date.now },
    status: { type: String, enum: ['allowed', 'deleted', 'reported_before'], default: 'allowed' }
  }],
  reports: [{
    reportId: { type: Schema.Types.ObjectId, ref: 'Report' },
  }]
});

const Subgreddiit = mongoose.model('Subgreddiit', SubgreddiitSchema);

export default Subgreddiit;