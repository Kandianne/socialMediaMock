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
				console.log(res);
			});
			return q.promise;
		};

		return o;
	}
})();