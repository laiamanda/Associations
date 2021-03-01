//OBJECT REFERENCES
const mongoose = require('mongoose');

//create the mongo database
mongoose.connect('mongodb://localhost:27017/blog_demo2', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('Connected to DB!'))
.catch(error => console.log(error.message));

 
var Post = require("./models/post");
var User = require("./models/user");
 
User.remove({}, function() {
    Post.remove({}, function() {
        User.create({
            email: "bob@gmail.com",
            name: "Bob Belcher"
        },
	function(err, user) {
		if(err) {
			console.log(err);
		} else {
			User.findOne({email: "bob@gmail.com"}).populate("posts").exec(function(err, foundUser){
				if(err) {
					console.log(err);
				} else {
					console.log(foundUser);
					Post.create({
					  title: "How to cook the best burger pt. 2",
					  content: "blah blah blah blah blah"
					}, 
			
		//POST
			function(err, post){
				if(err) {
					console.log(err);
				} else {
					User.findOne({email: "bob@gmail.com"}, function(err, foundUser){
						if(err){
							console.log(err);
						} else {
							foundUser.posts.push(post._id);
							foundUser.save(function(err, data){
								if(err){
									console.log(err);
								} else {
									console.log(data);
								}
							});
						}
					});
				}
			});
			}
			});
		}
	});
 
    });
});
