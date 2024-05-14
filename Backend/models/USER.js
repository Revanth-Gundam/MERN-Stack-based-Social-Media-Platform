import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const Schema = mongoose.Schema;

const userSchema = new mongoose.Schema({
  FirstName: { type: String, required: true, trim: true},
  MiddleName: { type: String, trim: true},
  LastName: { type: String, required: true, trim: true },
  Email: { type: String, required: true, trim: false, unique: true },
  UserName: { type: String, required: true, trim: true, unique: true },
  Age: { type: Number, required: true, trim: true, min: 13, max: 100 },
  Contact_Number: { type: String, required: true, unique: true, trim: true },
  Password: { type: String, required: true, minlength: 4 },
  Saved_Posts: [{post_id : { type: Schema.Types.ObjectId, ref: 'Post' }}],
  Followers: [{
  userid: { type: Schema.Types.ObjectId, ref: 'User' },
  UserName: { type: String, required: true, trim: true },
  }],
  Following: [{
  userid: { type: Schema.Types.ObjectId, ref: 'User' },
  UserName: { type: String, required: true, trim: true },
  }],
  Sub_Greddiits: [{
    status: { type: String, required: true, enum: ['joined', 'blocked', 'requested','moderator'] },
    Sub_GreddiitId: { type: Schema.Types.ObjectId, ref: 'Subgreddiit' },
    Date: { type: Date }
  }],
  
  
},{
  methods : {
    checkPassword(password) {
      // console.log("check Password", password, this.Password)
      return bcrypt.compare(password, this.Password);
    }
  }
});
// userSchema.methods.checkPassword = function (password) {
  // console.log("check Password", password, this.password)
//     return bcrypt.compare(password, this.password);
//     };

userSchema.methods.genToken = function () {
    return jwt.sign({user: {id: this._id}}, process.env.JWT_SECRET_KEYS, {
        expiresIn: process.env.JWT_EXPIRE_DAYS,
    })
}

const User = mongoose.model("User", userSchema);

export default User;