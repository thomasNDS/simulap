'use strict'

//////////////////////////////////////CONTROLLER///////////////////////////////
function MainCtrl($routeParams, $scope) {

	// Functions ********************************************************************
	
	this.addVoeu = function() {
		var newVoeu = {}
		newVoeu.title = self.selectTitle
		newVoeu.isAcad = self.selectAcad
		newVoeu.type = self.selectType

		
		self.voeux.push(newVoeu)
		self.selectTitle = ""
		self.selectAcad = false
		self.selectType = ""
	}
		
	// Attributes ********************************************************************
	
	var self = this
	
	self.voeux = []
	
		self.selectTitle = ""
		self.selectAcad = false
		self.selectType = ""
	
	// Init
		  
	$scope.$on('$routeChangeSuccess', function() {
		var key = $routeParams.key
		var lang = $routeParams.lang

		if (key) {
			console.debug("key exist : " + key)
			
			if (key[0] === 'v') {
			 console.debug("lvl 1	: " + key)
			}
			if (key[0] === 'r') {
			 console.debug("lvl 2	: " + key)
			 self.lvl = 2
			}
		}
		console.debug($routeParams);
		
		if (lang) {
			console.debug("Lang detected : " + lang)
			self.switchLang(lang)
		}
		
	});
		 
}
MainCtrl.$inject = ['$routeParams', '$scope']

////////////////////////////////// APP DEFINITION ///////////////////////////////

var app = angular
    .module('MyPage', ['ngRoute'])
    .controller('MainCtrl', MainCtrl);

app.config(function($routeProvider, $locationProvider) {
		
	$routeProvider
		.when("/lang/:lang", { })
		.when("/:key", { })

});
	
////////////////////////////////// PROTO HELPER ///////////////////////////////
