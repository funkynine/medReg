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
    validate: [isEmail, 'Is not a valid email'],
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
});
