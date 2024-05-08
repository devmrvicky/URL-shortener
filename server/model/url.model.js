import mongoose, { Schema } from "mongoose";

const URLSchema = new Schema({
  shortURLId: {
    type: String,
    unique: true,
    required: true,
  },
  redirectURL: {
    type: String,
    required: true,
  },
  clickHistory: [
    { 
      timestamp: Number
    }
  ],
}, {timestamps: true});

export const URLModel = mongoose.model("URLModel", URLSchema)
