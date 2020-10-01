import {Document, Model, model, Schema} from 'mongoose';

export const UserSchema: Schema = new Schema<any>({ //TODO interface
  name: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    required: true,
    default: 'user'
  },
  age: {
    type: Number,
    required: true
  },
  gender: {
    type: String,
    required: false
  },
  photo: {
    type: String,
    required: true
  },
  status: {
    type: String,
    required: true,
    default: 'pending'
  },
  createAt: {
    type: Date,
    default: Date.now
  },

});

export const User: Model<any> = model( name: 'users',  UserSchema);