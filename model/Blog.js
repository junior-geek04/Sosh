import mongoose from "mongoose";
import moment from "moment-timezone";
const Schema = mongoose.Schema;
// let currentdate = new Date();
// let indiandate = new Date().toLocaleString("en-Us", {timeZone: 'Asia/Kolkata'});
const blogSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  createdBy: {
    type: mongoose.Types.ObjectId,
    ref:"User",
    required: true,
  },
  createdOn: { 
    type: Date, 
    required: true, 
    default: moment().tz("Asia/Kolkata").format() },
});
export default mongoose.model("Blog",blogSchema);