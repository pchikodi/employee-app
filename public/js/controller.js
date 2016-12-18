var employeeApp = angular.module('EmployeeApp', ['ng-bootstrap-datepicker']);

function mainController($scope, $http) {
	
	$scope.employees = {};

	$scope.datepickerOptions = {
			format: 'yyyy-mm-dd',
    		language: 'en',
    		autoclose: true,
    		weekStart: 0
    	};
	resetNewEmployee();

	console.log('controller loaded');
	$http.get('/employees')
		.success(function(data) {
			$scope.employees = data;
		})
		.error(function(data) {
			console.log('Error: ' + data);
		});

	$scope.addEmployee = function() {
		console.log($scope.newEmployee);
		$scope.newEmployee.age = calculateAge($scope.newEmployee.dob);
		$http.post('/employees', $scope.newEmployee)
			.success(function(data) {
				resetNewEmployee();
				$scope.employees = {}; 
				$scope.employees = data;
				console.log(data);
			})
			.error(function(data) {
				console.log('Error: ' + data);
			});
	};

	// delete a todo after checking it
	$scope.removeEmployee = function(id) {
		$http.delete('/employees/' + id)
			.success(function(data) {
				$scope.employees = data;
			})
			.error(function(data) {
				console.log('Error: ' + data);
			});
	};

	$scope.editEmployee = function(id){
		console.log(id);
		for (var i = 0, len = $scope.employees.length; i < len; i++) {
		  if ($scope.employees[i]._id === id) {
		     $scope.newEmployee._id = $scope.employees[i]._id;
		     $scope.newEmployee.name = $scope.employees[i].name;
		     $scope.newEmployee.email = $scope.employees[i].email;
		     $scope.newEmployee.dob = $scope.employees[i].dob;
		     $scope.newEmployee.department = $scope.employees[i].department;
		     $scope.newEmployee.gender = $scope.employees[i].gender;
		     $scope.newEmployee.age = $scope.employees[i].age;
		    break;
		  }
		}
	}

	$scope.updateEmployee = function(){
		console.log('$scope.newEmployee ',$scope.newEmployee);
		$scope.newEmployee.age = calculateAge($scope.newEmployee.dob);
		$http.post('/employees/update', $scope.newEmployee)
			.success(function(data) {
			resetNewEmployee();
			$scope.employees = {}; 
			$scope.employees = data;
			console.log(data);
		})
		.error(function(data) {
			console.log('Error: ' + data);
		});
	}

	function resetNewEmployee(){
		$scope.newEmployee = {_id: '',
						name : '',
						email : '',
						dob : '',
						department : '',
						gender : '',
						age :0}
	}

	function calculateAge(birthdayStr) {
		var birthday =  new Date(birthdayStr); 
	    var ageDifMs = Date.now() - birthday.getTime();
	    var ageDate = new Date(ageDifMs); 
	    return Math.abs(ageDate.getUTCFullYear() - 1970);
	}

}

