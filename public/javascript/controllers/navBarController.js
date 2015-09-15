(function() {
	'use strict';
	angular.module('app')
	.controller('navBarController', navBarController);

	navBarController.$inject = ["$state", "UserFactory", "HomeFactory", "$rootScope"];

	function navBarController($state, UserFactory, HomeFactory, $rootScope ) {
		var vm = this;
		vm.user = {};
		vm.status = $rootScope._user;


		vm.register = function() {
			UserFactory.register(vm.user).then(function(){
				vm.user = {};
				vm.user.body = "";
				$state.go("Home");
			});
		};

		vm.login = function() {
			UserFactory.login(vm.user).then(function(){
				console.log("login function isn't working")
				vm.status = $rootScope._user;
				$state.go("Home");
			});
		};


		vm.logout = function() {
			UserFactory.logout();
			vm.status = $rootScope._user;
			$state.go("Home");
		};

		//-------------LIKES------------------------------------------------------------------

		vm.likeClick = function(userName, topicid) {
			HomeFactory.likeClick({user:userName, _id:topicid});
		};

	}
})();