import mongoose, {Schema} from 'mongoose'

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowerCase: true
  },
  password: {
    type: String,
    required: true,
    unique: true
  }
}, {timestamps: true})

const User = mongoose.model("User", userSchema)

export {User}