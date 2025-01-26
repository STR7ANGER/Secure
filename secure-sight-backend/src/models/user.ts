import mongoose from "mongoose";
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: String,
    email: String,
    password: String
})

export = mongoose.model('User', userSchema)
