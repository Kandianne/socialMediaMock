(function() {
	"use strict";
	angular.module('app').controller('TopicDetailsController', TopicDetailsController);
	TopicDetailsController.$inject = ['HomeFactory', '$state', '$stateParams'];

	function TopicDetailsController(HomeFactory, $state, $stateParams) {
		var vm = this;
		if (!$stateParams.id) $state.go('Home');
		else HomeFactory.getTopic($stateParams.id).then(function(res) {
			vm.topic = res;
		});

			vm.createComment = function() {
				var comment = {
					body: vm.newComment,
					topic: $stateParams.id
				};
				HomeFactory.createComment(comment).then(function(res) {
					vm.newComment = '';
					vm.topic.comments.push(res);
				})
			};

			vm.deleteComment = function(comment) {
				vm.topic.comments.splice(vm.topic.comments.indexOf(comment),1);
				HomeFactory.deleteComment(comment)
			};
		}
	})();