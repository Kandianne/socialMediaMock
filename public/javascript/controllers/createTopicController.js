
(function() {
	'use strict';
	angular.module('app')
	.controller('createTopicController', createTopicController);

	createTopicController.$inject = ['HomeFactory', '$state'];

	function createTopicController(HomeFactory, $state) {
		var vm = this;
		vm.title = '#hashItOut';
		vm.topic = {};

		vm.createTopic = function(){
			HomeFactory.createTopic(vm.topic).then(function(){
				console.log("controller hitting");
				$state.go("Home");
			});
		};
	}
})();