var mongoose = require("mongoose");

var TopicCommentSchema = new mongoose.Schema({
	created: Date,
	body: String,
	topic: {type: mongoose.Schema.Types.ObjectId, ref:"topic"},
	user : {type: mongoose.Schema.Types.ObjectId, ref: "User"}
});

mongoose.model("TopicComment", TopicCommentSchema);