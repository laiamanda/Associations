const mongoose = require('mongoose');

//create the mongo database
mongoose.connect('mongodb://localhost:27017/blog_demo', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('Connected to DB!'))
.catch(error => console.log(error.message));

// -- POST - TITLE , CONTENT
var postSchema = new mongoose.Schema({
	title: String,
	content: String
});

var Post = mongoose.model("Post", postSchema);

// -- USER - EMAIL, NAME
var userSchema = new mongoose.Schema({
	email: String,
	name: String,
	posts: [postSchema]
});

var User = mongoose.model("User", userSchema);

/*
var newUser = new User({
	email:"Tommy@Wales.edu",
	name: "Tommy Wales"
});

newUser.posts.push({
	title: "How to sleep",
	content: "Sleeping is very important"
});

newUser.save(function(err,user){
	if(err){
		console.log(err);
	}
	else{
		console.log(user);
	}
});


var newPost = new Post({
		title: "Reflections on Apples",
		content:" They are delicious"
});

newPost.save(function(err,post){
	if(err){
		console.log(err);
	}
	else{
		console.log(post);
	}
}); */

User.findOne({name:"Tommy Wales"},function(err,user){
	if(err){
		console.log(err);
	}
	else{
		user.posts.push({
			title: "Chav Check",
			content: "lil favor yuh all i ever need yuh"
		});
	}
	user.save(function(err,user){
		if(err){
			console.log(err);
		}
		else{
			console.log(user);
		}
	});
});
