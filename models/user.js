const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// passportLocalMongoose adds username and hash,salt field by itself 
const passportLocalMongoose = require("passport-local-mongoose");

const userSchema = new Schema({
    email: {
        type: String,
        required: true
    }
});

// automatically adds username and password along with hashing and salting
userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", userSchema);
