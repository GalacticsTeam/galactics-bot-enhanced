import { Schema, model } from 'mongoose';

export const UserSchema = model(
  'user',
  new Schema({
    serverId: String,
    user: String,
    warns: {
      number: Number,
      reasons: [String],
    },
  })
);
