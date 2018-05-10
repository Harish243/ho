var app = angular.module('iho');
app.controller('add_customerCtrl', ['$scope', '$http', '$state','appFactory', function($scope, $http, $state,appFactory) {

    $scope.goProfileList = function(){
        $state.go('profile');
    }

    $scope.goCustomerList = function(){
        $state.go('customer_list');
    }

    $scope.goFollowp = function(){
        $state.go('followp');
    }

    $scope.goExpireUsers = function(){
        $state.go('expire_users');
    }

    $scope.goAddCustomer = function(){
        $state.go('add_customer');
    }

    $scope.goChangePassword = function (){
        $state.go('evaidya_changepassword');
    }


   
    $scope.data = {};
    $scope.save = function () {
        console.log($scope.data);
        $scope.data.form_type='add';
        $scope.data.feedBack='';
        appFactory.saveCustomerData($scope.data).then(function (res) {
            console.log('customer data saved');
            $state.go('profile');
        }, function (err) {
            console.log('error occured', err);
        })
    };

    $scope.selectExpireDate = function () {
        var d = new Date();
        d.setDate(d.getDate() + 90);
        $scope.data.expire = d.getDate() + '-' + (d.getMonth() + 1) + '-' + d.getFullYear();
    };

    $scope.changeDates = function () {
        var d = angular.copy($scope.data.dates);
        d.setDate(d.getDate() + 30);
        console.log(d);
        $scope.data.next = d;
        // $scope.next = d.getDate() + '-' + (d.getMonth() + 1) + '-' + d.getFullYear();
        d = angular.copy($scope.data.next);
        d.setDate(d.getDate() + 15);
        $scope.data.next1 = d;

        d = angular.copy($scope.data.next1);
        d.setDate(d.getDate() + 15);
        $scope.data.next2 = d;
    };


   $scope.logout = function(){
       $state.go('Login');
   }

   $scope.a = JSON.parse(sessionStorage.getItem('user')).username;

   $scope.b = $scope.a.replace(/\b\w/g, function(l)
   {
        return l.toUpperCase() 
    });
    console.log( $scope.b);

}]);