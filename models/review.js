const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const reviewSchema = new Schema({
    comment : String,
    rating : {
        type: Number,
        min:1,
        max:5
    },
    createdAt : {
        type : Date ,
        default : Date.now()
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: "User",
    },
});

module.exports = mongoose.model("Review",reviewSchema);
 // one to many relation , one listing to many reviews
// we need to associate an array for every listing
