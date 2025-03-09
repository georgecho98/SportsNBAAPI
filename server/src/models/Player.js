import { Schema } from 'mongoose';
import {Team} from './Team.js'
import { model, Schema } from 'mongoose';
// This is a subdocument schema, it won't become its own model but we'll use it as the schema for the User's `savedBooks` array in User.js
const playerSchema = new Schema({
  id,
  
  first_name: {
    type: String,
    required: true,
  },

  last_name: {
    type: String,
    required: true,
  },
  position: {
    type: String,
  },
  team: Team
});


const Player= model('playerSchema',playerSchema);

export default Player;
