var express    = require("express"),
	app        = express(),
	bodyParser = require("body-parser"),
	mongoose   = require("mongoose"),
	passport   = require("passport"),
	flash      = require("connect-flash"),
	LocalStrategy = require("passport-local"),
	methodOverride = require("method-override"),
	Attraction = require("./models/attraction"),
	Comment    = require("./models/comment"),
	User       = require("./models/user"),
	seedDB     = require("./seeds");

var attractionRoutes = require("./routes/attractions"),
	commentRoutes    = require("./routes/comments"),
	indexRoutes      = require("./routes/index");

mongoose.connect("mongodb://localhost:27017/trip_advisor", { useNewUrlParser: true,  useUnifiedTopology: true })
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.use(flash());
// seedDB(); //seed the database

// Passport Configuration
app.use(require("express-session")({
	secret: "GT Orientation is on 5/31",
	resave: false,
	saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next){
	res.locals.currentUser = req.user;
	res.locals.error = req.flash("error");
	res.locals.success = req.flash("success");
	next();
});

app.use("/attractions", attractionRoutes);
app.use("/attractions/:id/comments", commentRoutes);
app.use(indexRoutes);


// Start Server
app.listen(3000, function(){
	console.log("Server Started!")
})