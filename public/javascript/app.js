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
		}).state('Users',{
			url: '/Users',
			templateUrl: 'views/users.html',
			controller: "UsersController",
			controllerAs: "vm"
		}).state("CreateTopic", {
			url: "/create/:id",
			templateUrl: "views/create-topic.html",
			controller: "createTopicController",
			controllerAs: "vm"
		}).state("EditTopic", {
			url: "/edit/:id",
			templateUrl: "views/edit-topic.html",
			controller: "EditController",
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
		}).state('UserProfile', {
			url: '/User/:id',
			templateUrl: 'views/userProfile.html',
			controller: 'UsersController',
			controllerAs: 'vm'
		});
		$urlRouterProvider.otherwise('/');
	}
})();
