import { Schema, model } from 'mongoose';

import Team from './Team.js'


 
// Define the schema for the User document
const userSchema = new Schema(
    {
      username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
      },
      email: {
        type: String,
        required: true,
        unique: true,
        match: [/.+@.+\..+/, 'Must match an email address!'],
      },
      password: {
        type: String,
        required: true,
        minlength: 5,
      }
      ,
      savedTeams:[{
        type: Map,
        ref: 'Team', // Correct way to reference the Team model
      }]
    },
    {
      timestamps: true,
      toJSON: { getters: true },
      toObject: { getters: true },
    }
  );
  

  userSchema.methods.isCorrectPassword = function (password){
    return this.password===password;
  };
  
  const User = model('User', userSchema);
  
  export default User;