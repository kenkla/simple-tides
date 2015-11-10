'use strict';

angular.module('tidesApp', [])
.controller('TidesController', function($scope, $http){
	
	// Fetch only if user stops typing for X milliseconds
	var userInput;
	$scope.change = function(){
		if(userInput){
			clearTimeout(userInput);
		}
		userInput = setTimeout(fetch, 1000);
	};
	
	// Highlight all text in textbox when user clicks on it
	$scope.select = function(){
		this.setSelectionRange(0, this.value.length);
	};
	
	// Update search parameter when user changes the text input
	$scope.update = function(location){
		$scope.search = location.Zipcode;
		$scope.change();
	};
	
	// Display some data if no value entered in search box
	if($scope.search === undefined){
		$scope.search = "33601";
		fetch();
	}
	
	// Make call to API to fetch data
	function fetch(){
		$http.get("http://APIPATHERE/?s=" + $scope.search)
		.success(function(response){ $scope.results = response; });
	}
	
	
	
});
