

//////////////////////////////////////CONTROLLER///////////////////////////////
function MainCtrl($routeParams, $scope) {

	// Functions ********************************************************************
	
	/**
	 *
	 */
	this.addVoeu = function() {
		var newVoeu = {}
		newVoeu.title = self.selectTitle
		newVoeu.isAcad = self.selectAcad
		newVoeu.type = self.selectType
		newVoeu.isRanked = (newVoeu.type == '')
		newVoeu.color = "grey"
		
		self.voeux.push(newVoeu)
		self.selectTitle = ""
		self.selectAcad = false
		self.selectType = ""
		
		this.updateRanks()
	}
	
	/**
	 *
	 */
	this.updateRanks = function() {
		var countVoeuxRelatif = 1
		
		for (var i = 0; i < self.voeux.length; i++) {
			var curVoeu = self.voeux[i]
			
			if (curVoeu.isRanked) {
				// Update rang relatif
				curVoeu.rangRelatif = countVoeuxRelatif
				countVoeuxRelatif++
				
				// Compute category
				curVoeu.classement = Math.min(curVoeu.rangRelatif * 100, 400)
				curVoeu.classement += i
				
				curVoeu.prio = []
				curVoeu.nonPrio = []
				
				if (!curVoeu.isAcad) {
					curVoeu.classement += 500
					curVoeu.nonPrio.push("Tout les élèves de l'académie de l'établissement, quelque soit leurs voeux.")
				} else {
					curVoeu.prio.push("Tout les élèves qui ne sont pas dans l'académie, quelque soit leurs voeux.")
				}
				
				// color
				if (curVoeu.classement < 300) {
					curVoeu.color = "green"	
					
				} else if (curVoeu.classement < 600) {
					curVoeu.color = "orange"	
					
				} else {
					curVoeu.color = "red"	
				}
				
				// lighten / darken
				var unit = curVoeu.classement % 100
				if (unit < 1) {
					curVoeu.color += " lighten-3"
				} else if (unit < 2) {
					curVoeu.color += " lighten-2"
				 } else if (unit < 3) {
				 	curVoeu.color += " lighten-1"
				 } else if (unit < 4) {
					curVoeu.color += " darken-1"
				 } else if (unit < 6) {	
					curVoeu.color += " darken-2"	
				 } else if (unit < 8) {	
					curVoeu.color += " darken-3"					
				} else {
					curVoeu.color += " darken-4"
				}	

				// labels prio / non prio
				if (curVoeu.classement < 200) {
					// 1 er voeu relatif
					curVoeu.prio.push(" Les élèves pour lequels c'est le 2 ème (ou plus) voeu en Université avec sélection (position relative)")
					
					if (unit > 0) {
						self.addStepsLabelAbsolu("1er", curVoeu, unit)
					}
					
				} else if (curVoeu.classement < 300) {
					// 2 eme voeu relatif
					curVoeu.nonPrio.push(" Les élèves pour lequels c'est le 1er voeu en Université avec sélection (position relative)")
					curVoeu.prio.push(" Les élèves pour lequels c'est le 3 ème (ou plus) voeu en Université avec sélection (position relative)")
					
					if (unit > 0) {
						self.addStepsLabelAbsolu("2 eme", curVoeu, unit)
					}
					
				} else {
					// N eme voeu relatif
					var nRelatif = (curVoeu.classement - unit)/100
					curVoeu.nonPrio.push(" Les élèves pour lequels c'est le 1er voeu en Université avec sélection (position relative)")
					curVoeu.prio.push(" Les élèves pour lequels c'est le " + nRelatif + " ème (ou plus) voeu en Université avec sélection (position relative)")
					
					if (unit > 0) {
						self.addStepsLabelAbsolu(nRelatif + " ème", curVoeu, unit)
					}
				}	
			}	
			
		}
	}
	
	/**
	 *
	 */
	this.addStepsLabelAbsolu = function(lvlRelatif, curVoeu, unit) {
	
		var start = " Les élèves pour lequels c'est le " + lvlRelatif + " voeu en Université avec sélection (position relative), mais placé "
		if (unit < 3) {
			// 2er choix absolu
			curVoeu.nonPrio.push(start + "en 1 er position sur l'ensemble de ses voeux.")
			curVoeu.prio.push(start + "en 3 ème position (ou plus) sur l'ensemble de ses voeux.")
		} else if (unit < 4) {
			// 3eme choix absolu
			curVoeu.nonPrio.push(start + "en 1 ère ou 2 ème position sur l'ensemble de ses voeux.")
			curVoeu.prio.push(start + "en 4 ème position (ou plus) sur l'ensemble de ses voeux.")
		} else {
			// Neme choix absolu
			var txt = start + "en 1 ère, 2" 
			
			for (j=3; j < unit; j ++) {
				txt += ", " + j
			}
			txt += " ème ou " + j + " ème position sur l'ensemble de ses voeux."
			curVoeu.nonPrio.push(txt)
			curVoeu.prio.push(start + "en " + (j + 2) + " ème position (ou plus) sur l'ensemble de ses voeux.")
		}
	}
		
	// Attributes ********************************************************************
	
	var self = this
	self.voeux = []
	
		self.selectTitle = ""
		self.selectAcad = false
		self.selectType = ""
	
	// Init
	
	/**
	 *
	 */
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
