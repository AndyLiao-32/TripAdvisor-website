var express  = require("express"),
	router   = express.Router(),
	passport = require("passport"),
	User     = require("../models/user");

// Landing route
router.get("/", function(req, res){
	res.render("landing")
});

// show register form
router.get("/register", function(req, res){
	res.render("register");
});

//handle sign up logic
router.post("/register", function(req, res){
	var newUser = new User({username: req.body.username});
	User.register(newUser, req.body.password, function(err, user){
		if(err){
			req.flash("error", err.message);
			return res.render("register")
		}
		passport.authenticate("local")(req, res, function(){
			req.flash("success", "Welcome to TripAdvisor! " + user.username);
			res.redirect("/attractions")
		})
	});
});

// show login form
router.get("/login", function(req, res){
	res.render("login")
});

// handling login logic
router.post("/login", passport.authenticate("local", 
	{
		successRedirect: "/attractions",
		failureRedirect: "/login"
	}), function(req, res){
});

// logout routes
router.get("/logout", function(req, res){
	req.logout();
	req.flash("success", "Logged you out!")
	res.redirect("/attractions")
});

// middleware
function isLoggedIn(req, res, next){
	if(req.isAuthenticated()){
		return next();
	}
	res.redirect("/login");
};


module.exports = router;
