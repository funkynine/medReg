import mongoose from 'mongoose';
import isEmail from 'validator/lib/isEmail';

const { Schema } = mongoose;

export default new Schema({
  name: {
    type: String,
    required: true,
    minlength: 3,
  },
  last_name: {
    type: String,
    required: true,
    minlength: 3,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: [isEmail, 'Is not a valid email'],
    message: 'User already exists',
  },
  password: {
    type: String,
    required: true,
    message: 'password not correct',
  },
  token: {
    type: String,
    default: '',
  },
  smart_card: {
    number: {
      type: Number,
      default: null,
    },
    pin: {
      type: Number,
      default: null,
    },
  },
  role: {
    type: mongoose.Schema.Types.ObjectId, ref: 'Role',
  },
});
