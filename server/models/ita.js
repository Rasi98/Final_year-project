import mongoose from "mongoose";

const Schema = mongoose.Schema;

const itaSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  designation: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  role:{
    type:String,
    required:true,
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  company: {
    type: String,
    required: true,
  },
  stuname:{
    type:String,
    default:''
  },
  stuid:{
    type:String,
    default:''
  }
});

const ITA = mongoose.model("ita", itaSchema);
export default ITA;
