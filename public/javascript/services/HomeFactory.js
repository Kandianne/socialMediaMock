(function() {
	'use strict';
	angular.module('app')
	.factory('HomeFactory', HomeFactory);

	HomeFactory.$inject = ['$http', '$q'];

	function HomeFactory($http, $q) {
		var o = {};

		//---------------------TOPICS----------------------------------------------------

		o.createTopic = function(topic, id) {
			console.log(id);
			var q = $q.defer();
			$http.post("/api/topics/" + id, topic).success(function(res){
				q.resolve();
			});
			return q.promise;
		};

		o.getTopics = function() {
			var q = $q.defer();
			$http.get("/api/topics").success(function(res){
				q.resolve(res);
			});
			return q.promise;
		};

		o.getTopic = function(id) {
			var q = $q.defer();
			$http.get("/api/topics/" + id).success(function(res){
				q.resolve(res);
			});
			return q.promise;
		};

		o.editTopic = function(topicToEdit) {
			console.log(topicToEdit);
			var q = $q.defer();
			$http.put("/api/topics/" + topicToEdit._id, topicToEdit).success(function(res){
				q.resolve(res);
			});
			return q.promise;
		};

		o.deleteTopic = function(topic) {
			var q = $q.defer();
			$http.delete("/api/topics/" + topic._id).success(function(res){
				q.resolve(res);
			})
			return q.promise;
		};
		//---------------------AUTHORIZATION----------------------------------------------------

		function getAuth() {
			var auth = {
				headers: {
					Authorization: "Bearer " + localStorage.getItem("token")
				}
			}
			return auth;
		};

		//---------------------LIKES----------------------------------------------------
		o.likeClick = function(userName) {
			var q = $q.defer();
			$http.post("/api/topics/likes", userName).success(function(res){
				q.resolve(res);
			});
			return q.promise;
		};

		//---------------------COMMENTS----------------------------------------------------
		o.createComment = function(comment) {
			var q = $q.defer();
			$http.post("/api/comments", comment, getAuth()).success(function(res){
				q.resolve(res);
			})
			return q.promise;
		};

		o.deleteComment = function(comment) {
			$http.delete("/api/comments/" + comment._id).success(function(res){
				q.resolve(res);
			})
			return q.promise;
		};

		return o;
	}
})();