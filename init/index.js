const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");

const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";

main()
  .then(() => {
    console.log("connected to DB");
    initDB(); // <-- Make sure to call initDB after connecting
  })
  .catch((err) => {
    console.log(err);
  });

async function main() {
  await mongoose.connect(MONGO_URL);
}

const initDB = async () => {
  await Listing.deleteMany({});
  const mappedData = initData.data.map((obj) => ({
    ...obj,
    owner: '68505ac83f50cc520d985f8c',
    image: {
      url: obj.image.url,
      filename: obj.image.filename
    }
  }));
  await Listing.insertMany(mappedData);
  console.log("data was initialized");
};