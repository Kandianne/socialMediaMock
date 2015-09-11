var mongoose = require("mongoose");

var topicSchema = new mongoose.Schema({
	hashtopic: String,
	summary: String
});

mongoose.model("topic", topicSchema);






