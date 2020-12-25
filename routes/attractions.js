var express    = require("express"),
	router     = express.Router(),
	Attraction = require("../models/attraction"),
	Comment    = require("../models/comment"),
	middleware = require("../middleware");


//Index
router.get("/", function(req, res){
	Attraction.find({}, function(err, allAttractions){
		if(err){
			console.log(err)
		} else {
			res.render("attractions/index", {attractions: allAttractions});
		}
	});
});

//Create new attractions
router.post("/", middleware.isLoggedIn, function(req, res){
	var name   = req.body.name;
	var image  = req.body.image;
	var price  = req.body.price;
	var desc   = req.body.description;
	var author = {
		id: req.user._id,
		username: req.user.username
	};
	var newAttraction = {name: name, image: image, price: price, description: desc, author: author};
	// create new attraction to DB
	Attraction.create(newAttraction, function(err, newlycreated){
		if(err){
			console.log(err)
		} else {
			req.flash("success", "Create New Attraction!");
			res.redirect("/attractions")
		}
	});
});

// New - show form to create new attraction
router.get("/new", middleware.isLoggedIn, function(req, res){
	res.render("attractions/new")
});

// Show 
router.get("/:id", function(req, res){
	// find the attraction with the provided ID
	Attraction.findById(req.params.id).populate("comments").exec(function(err, foundAttraction){
		if(err){
			console.log(err)
		} else {
			res.render("attractions/show", {attraction: foundAttraction})
		}
	});
});

// Edit route
router.get("/:id/edit", middleware.checkAttractionOwnership, function(req, res){
	Attraction.findById(req.params.id, function(err, foundAttraction){
		if(err){
			res.redirect("/attractions")
		} else {
			res.render("attractions/edit", {attraction: foundAttraction})
		}
	});
});

// Update route
router.put("/:id", middleware.checkAttractionOwnership, function(req, res){
	Attraction.findByIdAndUpdate(req.params.id, req.body.attraction, function(err, updatedAttraction){
		if(err){
			res.redirect("/attractions")
		} else {
			req.flash("success", "Successfully Edit And Update!");
			res.redirect("/attractions/" + req.params.id)
		}
	});
});

// Delete route
router.delete("/:id", middleware.checkAttractionOwnership, function(req, res){
	Attraction.findByIdAndRemove(req.params.id, function(err){
		if(err){
			res.redirect("/attractions")
		} else {
			req.flash("success", "Successfully Delete!");
			res.redirect("/attractions")
		}
	});
});

module.exports = router;