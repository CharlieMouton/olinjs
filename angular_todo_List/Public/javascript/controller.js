var controllers = angular.module('ToDoApp', []);
controllers.controller('ToDoController', ['$scope', '$http', function ($scope, $http) {
     $scope.tasks = [];
     $scope.completed = [];

     $http.get('/api/todos')
        .success(function(data) {
            $scope.tasks = data;
            console.log(data);
        })
        .error(function(data) {
            console.log('Error: ' + data);
        });

     $scope.add = function() {
      $scope.tasks.push($scope.task)

      $http.post('/api/todos', $scope.task)
            .success(function(data) {
                $scope.task = {}; // clear the form so our user is ready to enter another
                console.log(data);
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    };

     $scope.complete = function() {
      //  console.log($scope.tasks.this.$index);
      remov = $scope.tasks.splice(this.$index, 1)
      $scope.completed.push(remov[0]);

      $http.delete('/api/todos/' + id)
            .success(function(data) {
                $scope.todos = data;
                console.log(data);
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    };

}]);
