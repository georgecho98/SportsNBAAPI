import { Schema, model, Document } from 'mongoose';
import bcrypt from 'bcrypt';



// Define an interface for the User document
class IUser  {
    constructor(username, email, password){
    this.username= username;
    this.email=email;
    this.password= password;
    }
  }
  
// Define the schema for the User document
const userSchema = new Schema<IUser>(
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
    },
    {
      timestamps: true,
      toJSON: { getters: true },
      toObject: { getters: true },
    }
  );
  
  userSchema.pre<IUser>('save', async function (next) {
    if (this.isNew || this.isModified('password')) {
      const saltRounds = 10;
      this.password =  bcrypt.hash(this.password, saltRounds); 
    }
  
    next();
  });
  
  userSchema.methods.isCorrectPassword = async function (password){
    return bcrypt.compare(password, this.password);
  };
  
  const User = model<IUser>('User', userSchema);
  
  export default User;