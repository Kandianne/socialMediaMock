var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var TopicComment = mongoose.model('TopicComment');
var topic = mongoose.model('topic');
var jwt = require('express-jwt');
var auth = jwt({
	'userProperty': 'payload',
	'secret': '_secret_sauce'
});
router.post("/", auth, function(req, res){
	var comment = new TopicComment(req.body);
	comment.created = new Date();
	comment.user = req.payload.id;
	comment.save(function(err, result){
		if(err) return res.status(500).send({err:"There's a problem"});
		if(!result) return res.status(400).send({err:"Couldn't create comment"});
		topic.update({_id: comment.topic}, {$push: {
			comments: {_id: result._id}
		}}, function(err, topic){
			if(err) return res.status(500).send({err:"there was an error"});
			if(!topic) return res.status(400).send({err:"This error should never happen"});
			TopicComment.findOne({_id: comment._id}).populate("user")
			.exec(function(err, comment){
				res.send(comment);
				console.log(comment);
			})
		})
	});
})

router.delete('/:id', function(req, res) {
	TopicComment.remove({_id:TopicComment._id})
	.exec(function(err, comments){
		if(err) return res.status(500).send({err: "error getting comment to delete"});
		if(!comments) return res.status(400).send({err: "comments aren't existing"});
		res.send(comments);
	});
});

module.exports = router;
