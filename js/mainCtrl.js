

//////////////////////////////////////CONTROLLER///////////////////////////////
function MainCtrl($routeParams, $scope) {

	// Functions ********************************************************************
	
	/**
	 *
	 */
	this.addVoeu = function() {
		var newVoeu = {}

		newVoeu.isAcad = self.selectAcad
		newVoeu.type = self.selectType
		
		newVoeu.title = self.selectTitle
								
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
	this.updateRankUnivAvecSelection = function(rgAbsolu, curVoeu, countVoeuxRelatif) {
		// Update rang relatif
		curVoeu.rangRelatif = countVoeuxRelatif
		
		// Compute category
		curVoeu.classement = Math.min(curVoeu.rangRelatif * 100, 400)
		curVoeu.classement += rgAbsolu
		
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
		if (curVoeu.rangRelatif < 2) {
			// 1 er voeu relatif
			curVoeu.prio.push(" Les élèves pour lequels c'est le 2 ème (ou plus) voeu en Université avec sélection (position relative)")
			
		} else if (curVoeu.rangRelatif < 3) {
			// 2 eme voeu relatif
			curVoeu.nonPrio.push(" Les élèves pour lequels c'est le 1er voeu en Université avec sélection (position relative)")
			curVoeu.prio.push(" Les élèves pour lequels c'est le 3 ème (ou plus) voeu en Université avec sélection (position relative)")
			
		} else {
			// N eme voeu relatif (N>2)
			var txt = " Les élèves pour lequels c'est le 1er ou 2"
								
			for (j=3; j < curVoeu.rangRelatif; j ++) {
				txt += ", " + j
			}
			curVoeu.nonPrio.push(txt + " ème voeu en Université avec sélection (position relative)")
			
			curVoeu.prio.push(" Les élèves pour lequels c'est le " + curVoeu.rangRelatif + " ème (ou plus) voeux en Université avec sélection (position relative)")
		}	
		if (unit > 0) {
			self.addStepsLabelAbsolu(curVoeu, rgAbsolu)
		}
	}
	
	/**
	 *
	 */
	this.updateRanks = function() {
		var countVoeuxRelatif = 1
		
		for (var rgAbsolu = 0; rgAbsolu < self.voeux.length; rgAbsolu++) {
		
			var curVoeu = self.voeux[rgAbsolu]
			
			if (curVoeu.type === '1') {
				// Simple université
				countVoeuxRelatif++
			}
			
			if (curVoeu.isRanked) {
				this.updateRankUnivAvecSelection(rgAbsolu, curVoeu, countVoeuxRelatif)
				countVoeuxRelatif++
			}
			
			if (curVoeu.title == '') {
		
			switch (curVoeu.type) {
				case '':
					curVoeu.title = "Université avec sélection"
					break;
				case '1':
					curVoeu.title = "Université"
					break;
				case '2':
					curVoeu.title = "CPGE"
					break;
				case '3':
					curVoeu.title = "DUT/BTS" 
					break;		
				case '4':
					curVoeu.title = "Autres établissement"
					break;
			}
		}
			
		} // end for
	}
	
	/**
	 *
	 */
	this.addStepsLabelAbsolu = function(curVoeu, unit) {
	
		var rgAbsolu = unit + 1
		var lvlRelatif = curVoeu.rangRelatif + " ème"
		
		if (curVoeu.rangRelatif == 1) {
			lvlRelatif = curVoeu.rangRelatif + " er"
		}
		var start = " Les élèves pour lequels c'est le " + lvlRelatif + " voeu en Université avec sélection (position relative), mais placé "
		console.log("rangRelatif=" + curVoeu.rangRelatif )
		console.log("rgAbsolu=" + rgAbsolu )

		if (curVoeu.rangRelatif  < rgAbsolu) {
				
				// rang absolu
				var txt = start + "en " 
				
				if (curVoeu.rangRelatif == 1) {
					txt += "1 ère"
				} else {
					txt +=  curVoeu.rangRelatif 
				}
					
				for (j=curVoeu.rangRelatif + 1; j < rgAbsolu; j ++) {
						txt += ", " + j
				}
				
				if (j>2) {
					txt += " ème"
				}
				txt += " position sur l'ensemble de ses voeux."
				curVoeu.nonPrio.push(txt)
				curVoeu.prio.push(start + "en " + (rgAbsolu + 1) + " ème position (ou plus) sur l'ensemble de ses voeux.")
			//}
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
		var data = $routeParams.inject

		if (data) {
			console.debug("key exist : " + data)
			
		}
		console.debug($routeParams);
		
	});
		 
}
MainCtrl.$inject = ['$routeParams', '$scope']

/**
 *
 */
function NavCtrl($location) {

	/**
	 *
	 */
	this.getClass = function (path) {
	  return ($location.path().substr(0, path.length) === path) ? 'active' : '';
	}
}
NavCtrl.$inject = ['$location']

////////////////////////////////// APP DEFINITION ///////////////////////////////

var app = angular
    .module('MyPage', ['ngRoute'])
	.controller('NavCtrl', NavCtrl)
    .controller('MainCtrl', MainCtrl);

app.config(function($routeProvider) {
		
	$routeProvider
		.when("/mentions-legales", { templateUrl: 'templates/mentions-legales.html'})
		.when("/apropos", { templateUrl: 'templates/apropos.html'})
		.when("/exemples", { templateUrl: 'templates/exemples.html'})
		.when("/algorithme", { templateUrl: 'templates/algorithme.html'})
		.when("/simulateur", { templateUrl: 'templates/simulateur.html'})
		.when("/", { templateUrl: 'templates/main.html'})
		.when("/data/:inject", { templateUrl: 'templates/main.html'})

});
	
////////////////////////////////// PROTO HELPER ///////////////////////////////
