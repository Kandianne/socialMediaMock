
(function() {
	'use strict';
	angular.module('app')
	.controller('createTopicController', createTopicController);

	createTopicController.$inject = ['HomeFactory', 'UserFactory', '$state', '$stateParams'];

	function createTopicController(HomeFactory, UserFactory, $state, $stateParams) {
		var vm = this;
		vm.title = '#hashItOut';
		vm.topic = {};

		console.log($stateParams.id);
		vm.createTopic = function(){
			if (!$stateParams.id) $state.go('CreateTopic');
			else HomeFactory.createTopic(vm.topic, $stateParams.id).then(function(res){
				$state.go("Home");
				vm.user = res;
			});

		};


	}
})();




