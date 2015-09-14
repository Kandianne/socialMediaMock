(function() {
	'use strict';
	angular.module('app')
	.controller('HomeController', HomeController);

	HomeController.$inject = ["HomeFactory"];

	function HomeController(HomeFactory) {
		var vm = this;
		vm.title = '#hashItOut';

		HomeFactory.getTopics().then(function(res) {
			vm.topics = res;


			vm.deleteTopic = function(topic) {
				vm.topics.splice(vm.topics.indexOf(topic), 1);
				HomeFactory.deleteTopic(topic);
			};

			vm.likeClick = function() {
				HomeFactory.getTopics().then(function(res) {
					vm.topics = res;
				})
			};

			
			// var hasLiked = false;
			// vm.likeClick = function() {
			// 	if (!hasLiked) {
			// 		hasLiked = true;
			// 		vm.liked = "Unlike";
			// 		vm.likeCount += 1;
			// 	}else {
			// 		hasLiked = false;
			// 		vm.liked = "Like";
			// 		vm.likeCount -= 1;
			// 	}
			// };

		});
	};

	


})();