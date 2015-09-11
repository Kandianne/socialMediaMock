var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var topic = mongoose.model('topic');
var jwt = require("express-jwt");

var auth = jwt({
	secret: "_secret_sauce",
	userProperty: "payload"
})
//REQUIRED FOR GETTING ONE TOPIC & POPULATING COMMENTS-------------------------------------------------------
router.param('id', function(req, res, next, id) {
	topic.findOne({_id:id})
	.populate({ path: "comments"})
	.exec(function(err, comments) {
		topic.populate(comments, {
			path: 'comments.user',
			model: 'User',
			select: "username"
		}, function (err, topic) {
			if(err) return res.status(500).send({err: "Error inside the server."});
			if(!topic) return res.status(400).send({err: "That topic does not exist"});
			req.topic = topic;
			console.log(topic.comments)
			next();
		});

	});
});
//----------------------------------------------------------------------------------

router.post('/', function(req, res) {
	var newTopic = new topic(req.body); //cannot be same "topic" as line 4
	newTopic.save(function(err, result) {
		if(err) return res.status(500).send({err: "The server is having issues."});
		if(!result) return res.status(400).send({err: "Sorry! Could not create that topic."});
		res.send({_id: result._id});
	});
});

router.get('/', function(req, res) {
	topic.find({}) //"topic" is my whole object
	.exec(function(err, topics) {
		if(err) return res.status(500).send({err: "error getting all topics"});
		if(!topics) return res.status(500).send({err: "topics do not exist"});
		res.send(topics);

	});
});

router.get('/:id', function(req, res) {
	console.log(req.topic);
	res.send(req.topic);
});



module.exports = router;
