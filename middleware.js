const Listing = require("./models/listing.js");
const Review = require("./models/review.js");
const {listingSchema,reviewSchema}=require("./schema.js");
const ExpressError=require("./utils/ExpressError.js");



module.exports.isLoggedIn = function(req, res, next) {
    if (!req.isAuthenticated()) {
        req.session.redirectUrl = req.originalUrl; // Store the original URL
        req.flash("error", "You must be signed in first!");
        return res.redirect("/login");
    }
    next();
};



module.exports.saveRedirectUrl = (req,res,next)=>{
    if(req.session.redirectUrl){
        res.locals.redirectUrl=req.session.redirectUrl;
    }
    next();
}

module.exports.isOwner = async function(req, res, next) {
    const { id } = req.params;
    const listing = await Listing.findById(id);
    if (!listing) {
        req.flash("error", "Listing not found!");
        return res.redirect("/listings");
    }
    if (!listing.owner.equals(req.user._id)) {
        req.flash("error", "You do not have permission to do that!");
        return res.redirect(`/listings/${id}`);
    }
    next();
};

module.exports.validateListing =(req,res,next)=>{
  let {error} =listingSchema.validate(req.body);
    
  if(error){
    let errMsg=error.details.map((el)=>el.
message).join(",");
    throw new ExpressError(400,errMsg);
  }
  else {
    next();
  }

};

module.exports.validateReview=(req,res,next)=>{
  let {error} =reviewSchema.validate(req.body);
    
  if(error){
    let errMsg=error.details.map((el)=>el.
message).join(",");
    throw new ExpressError(400,errMsg);
  }
  else {
    next();
  }
};

module.exports.isReviewAuthor = async function(req, 
res, next) {
    let  {id ,  reviewId } = req.params;
    let listing = await Review.findById(reviewId);
    if (!review.author.equals(res.locals.currUser._id)) {
        req.flash("error", "You did not create this review!");
        return res.redirect(`/listings/${id}`);
    }
    next();
};
