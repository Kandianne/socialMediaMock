(function() {
	'use strict';
	angular.module('app')
	.controller('EditController', EditController);

	EditController.$inject = ["HomeFactory", "$stateParams", "$state"];

	function EditController(HomeFactory, $stateParams, $state) {
		var vm = this;

		if(!$stateParams.id) {
			$state.go("Home");
		}else {
			HomeFactory.getTopic($stateParams.id).then(function(res){
				vm.topic = res;
			});
		};

		vm.editTopic = function() {
			HomeFactory.editTopic(vm.topic);
			$state.go("Home");
		};


	};

})();