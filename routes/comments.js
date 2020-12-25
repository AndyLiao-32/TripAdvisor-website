var express    = require("express"),
	router     = express.Router({mergeParams: true}),
	Attraction = require("../models/attraction"),
	Comment    = require("../models/comment"),
	middleware = require("../middleware");

// comments new
router.get("/new", middleware.isLoggedIn, function(req, res){
	Attraction.findById(req.params.id, function(err, attraction){
		if(err){
			console.log(err)
		} else {
			res.render("comments/new", {attraction: attraction})
		}
	})
});

// comments create
router.post("/", middleware.isLoggedIn, function(req, res){
	Attraction.findById(req.params.id, function(err, attraction){
		if(err){
			console.log(err)
			res.redirect("/attractions")
		} else {
			Comment.create(req.body.comment, function(err, comment){
				if(err){
					req.flash("error", "Something Went Wrong!");
					console.log(err)
				} else {
					// add username and id to the comment
					comment.author.id = req.user._id;
					comment.author.username = req.user.username;
					//save comment
					comment.save();
					attraction.comments.push(comment);
					attraction.save();
					req.flash("success", "Successfully Added Comment!");
					res.redirect("/attractions/" + attraction._id)
				}
			});
		}
	});
});

//Edit route
router.get("/:comment_id/edit", middleware.checkCommentOwnership, function(req, res){
	Comment.findById(req.params.comment_id, function(err, foundComment){
		if(err){
			res.redirect("back")
		} else {
			res.render("comments/edit", {attraction_id: req.params.id, comment: foundComment})
		}
	});
});

// Update
router.put("/:comment_id", middleware.checkCommentOwnership, function(req, res){
	Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, updatedComment){
		if(err){
			res.redirect("back")
		} else {
			req.flash("success", "Successfully Edit And Update!");
			res.redirect("/attractions/" + req.params.id)
		}
	});
});

// Delete route
router.delete("/:comment_id", middleware.checkCommentOwnership, function(req, res){
	Comment.findByIdAndRemove(req.params.comment_id, function(err){
		if(err){
			res.redirect("back")
		} else {
			req.flash("success", "Comment Delete!");
			res.redirect("/attractions/" + req.params.id)
		}
	});
})


module.exports = router;