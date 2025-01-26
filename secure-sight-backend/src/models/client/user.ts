import mongoose from "mongoose";
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    companyName: String,
    tenantCode: String,
    industry: String,
    hqLocation: String,
    dbName: String,
    fullName: String,
    email: String,
    password: String,
    role: String
})

export default UserSchema