import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: false, // Not required for OAuth users
  },
  image: {
    type: String,
    required: false,
  },
}, {
  timestamps: true,
});

const User = mongoose.models.User || mongoose.model('User', userSchema);

export default User;