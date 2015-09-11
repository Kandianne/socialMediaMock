(function() {
	'use strict';
	angular.module('app')
	.controller('navBarController', navBarController);

	navBarController.$inject = ["$state", "UserFactory", "$rootScope"];

	function navBarController($state, UserFactory, $rootScope) {
		var vm = this;
		vm.user = {};
		vm.status = $rootScope._user;

		vm.register = function() {
			UserFactory.register(vm.user).then(function(){
				vm.user = {};
				$state.go("Home");
			});
		};

		vm.login = function() {
			UserFactory.login(vm.user).then(function(){
				vm.status = $rootScope._user;
				$state.go("Home");
			});
		};

		vm.logout = function() {
			UserFactory.logout();
			vm.status = $rootScope._user;
			$state.go("Home");
		}
	}
})();