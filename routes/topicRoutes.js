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
	req._id = id;
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

router.param('topicWithUser', function(req, res, next, topicWithUser) {
	console.log("this is router param - topicWithUser")
	req._id = topicWithUser;
	next();
});


//----------------------------------------------------------------------------------

//-------------------POSTING FOR LIKES---------------------------------------------------
router.post("/likes", function(req, res) {
	console.log("likes param runs")
	topic.update({_id: req.body._id}, {$push: {
		likedBy: {username: req.body.user}
	}}, function(err, result){
		if(err) return res.status(500).send({err: "error getting topic to delete"});
		if(!result) return res.status(400).send({err: "topics aren't existing"});
		res.send();
	});
});
//----------------------------------------------------------------------------------

router.post('/:topicWithUser', function(req, res) {
	req.body.createdBy = req._id;
	var newTopic = new topic(req.body);
	newTopic.created = new Date();
	console.log(newTopic);
	newTopic.save(function(err, result) {
		if(err) return res.status(500).send({err: "The server is having issues."});
		if(!result) return res.status(400).send({err: "Sorry! Could not create that topic."});
		res.send()
	});
});

router.get('/', function(req, res) {
	topic.find({})
	.populate({
		path: "createdBy",
		model: "User",
		select: "username"
	})
	.exec(function(err, topics) {
		if(err) return res.status(500).send({err: "error getting all topics"});
		if(!topics) return res.status(400).send({err: "topics do not exist"});
		res.send(topics);
	});
});

router.get('/:id', function(req, res) {
	res.send(req.topic);
});

router.put('/:id', function(req, res) {
	var topicObject = req.body;
	topic.update({_id:req._id}, topicObject)
	.exec(function(err, topics){
		if(err) return res.status(500).send({err: "error getting topic to edit"});
		if(!topics) return res.status(400).send({err: "Topic to edit aren't existing"});
		res.send(topics);
	});
})

router.delete('/:id', function(req, res) {
	topic.remove({_id:req._id})
	.exec(function(err, topics){
		if(err) return res.status(500).send({err: "error getting topic to delete"});
		if(!topics) return res.status(400).send({err: "topics aren't existing"});
		res.send(topics);
	});
});

//------------------------------------------------------------------------------------

module.exports = router;
