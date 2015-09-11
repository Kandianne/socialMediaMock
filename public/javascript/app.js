(function() {
	'use strict';
	angular.module('app', ['ui.router'])
	.config(Config);
	Config.$inject = ['$stateProvider', '$urlRouterProvider'];
	function Config($stateProvider, $urlRouterProvider) {
		$stateProvider.state('Home',{
			url: '/',
			templateUrl: 'views/home.html',
			controller: "HomeController",
			controllerAs: "vm"
		}).state("CreateTopic", {
			url: "/create",
			templateUrl: "views/create-topic.html",
			controller: "createTopicController",
			controllerAs: "vm"
		}).state('RegisterUser', {
			url: '/Register',
			templateUrl: 'views/register_user.html'
		}).state('LoginUser', {
			url: '/Login',
			templateUrl: 'views/login_user.html'
		}).state('TopicDetail', {
			url: '/Topic/:id',
			templateUrl: 'views/topicDetail.html',
			controller: 'TopicDetailsController',
			controllerAs: 'vm'
		});
		$urlRouterProvider.otherwise('/');
	}
})();
