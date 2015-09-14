(function() {
	'use strict';
	angular.module('app')
	.factory('HomeFactory', HomeFactory);

	HomeFactory.$inject = ['$http', '$q'];

	function HomeFactory($http, $q) {
		var o = {};
		
		o.createTopic = function(topic) {
			var q = $q.defer();
			$http.post("/api/topics", topic).success(function(res){
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

		function getAuth() {
			var auth = {
				headers: {
					Authorization: "Bearer " + localStorage.getItem("token")
				}
			}
			return auth;
		}

		//---------------------LIKES----------------------------------------------------
		o.likeClick = function(userName) {
			var q = $q.defer();
			$http.post("/api/topics/likes", userName).success(function(res){
				q.resolve(res);
			});
			return q.promise;
		};
 		//--------------------------------------------------------------------------------
 		o.createComment = function(comment) {
 			var q = $q.defer();
 			$http.post("/api/comments", comment, getAuth()).success(function(res){
 				q.resolve(res);
 			})
 			return q.promise;
 		}

 		o.deleteComment = function(comment) {
 			$http.delete("/api/comments/" + comment._id).success(function(res){
 				q.resolve(res);
 			})
 			return q.promise;
 		}

 		o.deleteTopic = function(topic) {
 			var q = $q.defer();
 			$http.delete("/api/topics/" + topic._id).success(function(res){
 				q.resolve(res);
 			})
 			return q.promise;
 		}

 		return o;
 	}
 })();