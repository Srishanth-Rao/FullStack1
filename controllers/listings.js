const Listing = require("../models/listing");

// index route
module.exports.index = async (req, res) => {
    const allListings = await Listing.find({});
    res.render("listings/index.ejs", { allListings });
};

// Render new listing form or new route
module.exports.renderNewForm = async (req, res) => {
    res.render('listings/new');
};

// Show route
module.exports.showListing = async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id)
        .populate({
            path: "reviews",
            populate: { path: "author" }
        })
        .populate("owner");
    if (!listing) {
        req.flash("error", "Listing you requested does not exist");
        return res.redirect("/listings");
    }
    // Use actual coordinates if present, otherwise default to [51.505, -0.09]
    const coordinates = listing.coordinates || [51.505, -0.09];
    res.render("listings/show.ejs", { listing, currentUser: req.user, mapToken: process.env.MAP_TOKEN, coordinates });
};

// create
module.exports.createListing  = async (req, res,next) => {
    let url =req.file.path;
    let filename = req.file.filename;
const newListing = new Listing(req.body.listing);
newListing.owner = req.user._id;
newListing.image={url,filename};
await newListing.save();
req.flash("success","New listing created!");
res.redirect("/listings");}


//edit 
module.exports.renderEditForm=  async (req, res) => {
let { id } = req.params;
const listing = await Listing.findById(id);
if(!listing){
req.flash("error","Listing you requested does not exist");
res.redirect("/listings");
 }
 let originalImageUrl=listing.image.url;
   originalImageUrl=originalImageUrl.replace("/upload","/upload/h_300,w_250")
res.render("listings/edit.ejs", { listing ,originalImageUrl});}


//update
module.exports.updateListing = async (req, res) => {
    let { id } = req.params;
    let listing = await Listing.findById(id);

    // Update listing fields
    await Listing.findByIdAndUpdate(id, { ...req.body.listing });

    // If a new image was uploaded, update the image field
    if (req.file) {
        listing.image = {
            url: req.file.path,
            filename: req.file.filename
        };
        await listing.save();
    }

    req.flash("success", "Listing updated!");
    res.redirect(`/listings/${id}`);
}
//delete or destroy
 module.exports.destroyListing =async (req, res) => {
let { id } = req.params;
let deletedListing = await Listing.
findByIdAndDelete(id);
console.log(deletedListing);
req.flash("success","Listing Deleted!");
res.redirect("/listings");}