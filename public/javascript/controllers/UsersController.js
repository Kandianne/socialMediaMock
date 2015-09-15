(function() {
	"use strict";
	angular.module('app').controller('UsersController', UsersController);
	UsersController.$inject = ['UserFactory', '$state', '$stateParams'];

	function UsersController(UserFactory, $state, $stateParams) {
		var vm = this;


		if(!$stateParams.id) {
			UserFactory.getUsers().then(function(res) {
				vm.users = res;				
			});
		}
		else UserFactory.getUser($stateParams.id).then(function(res) {
			vm.user = res;
		});
	}
	
})();
