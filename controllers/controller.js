import mongoose from 'mongoose';

// Config
import { config } from 'app/config';

// Schemas
import User from 'models/userSchema';
import Role from 'models/roleSchema';

mongoose.connect(config.dbUrl, { useNewUrlParser: true });

// eslint-disable-next-line no-console
console.log('Connect to DB');

const db = mongoose.connection;

const UserModel = db.model('users', User);
const RoleModel = db.model('role', Role);

export default {
  create: (data, callback) => {
    const newUser = new UserModel(data);
    newUser.save(callback);
  },
  getAllUsers: (callback) => {
    UserModel.find(callback).select('-password');
  },
  getOneId: (id, callback) => {
    UserModel.findById(id, callback);
  },
  getOne: (params, callback) => {
    UserModel.findOne(params, callback).lean();
  },
  findByIdAndUpdate: (id, update, callback) => {
    UserModel.findByIdAndUpdate(id, update, callback);
  },
  deleteUser: (data, callback) => {
    UserModel.findOneAndDelete(data, callback);
  },
  getAllUsersRole: (callback) => {
    RoleModel.find(callback);
  },
  createRole: (data, callback) => {
    const newURole = new RoleModel(data);
    newURole.save(callback);
  },
};
