import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
      default: 'https://res.cloudinary.com/djz3p6h2w/image/upload/v1631600006/avatars/avatar-1_vwv9z4.png',
    },
    
  },
  { timestamps: true }
);

const User = mongoose.model('User', userSchema);

export default User;