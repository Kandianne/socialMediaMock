var mongoose = require("mongoose");

var topicSchema = new mongoose.Schema({
	hashtopic: String,
	summary: String,
	created: Date,
	// dateDeleted: Null,
	createdBy: {type: mongoose.Schema.Types.ObjectId, ref: "User"},
	likedBy: Array,
	comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "TopicComment"}]
});

mongoose.model("topic", topicSchema);






