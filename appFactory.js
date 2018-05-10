var app = angular.module('iho');
app.factory('appFactory',['$http','$q',function($http, $q){
    return {
        'saveCustomerData': saveCustomerData,
        'getCustomerData': getCustomerData,
        'updateCustomerData': updateCustomerData,
        'changePassword':changePassword,
        'getFeedback':getFeedback,
        'getDoctors':getDoctors,
        'allocateDoctor':allocateDoctor
    }
    function saveCustomerData(data) {
        var req = $http({
            'url': url+'/saveCustomer',
            'method': 'post',
            'data': data
        })
        return req.then(handleSuccess,handleFailure);
    }
    function allocateDoctor(data) {
        var req = $http({
            'url': url+'/allocateDoctor',
            'method': 'post',
            'data': data
        })
        return req.then(handleSuccess,handleFailure);
    }
    function getCustomerData() {
        var req = $http({
            'url': url+'/getCustomer',
            'method': 'get'
        })
        return req.then(handleSuccess,handleFailure);
    }
    function getDoctors() {
        var req = $http({
            'url': url+'/getDoctors',
            'method': 'get'
        })
        return req.then(handleSuccess,handleFailure);
    }
    function changePassword(data) {
        var req = $http({
            'url': url+'/changepass',
            'method': 'post',
            'data': data
        })
        return req.then(handleSuccess,handleFailure);
    }

    function getFeedback(data) {
        var req = $http({
            'url': url+'/feedback',
            'method': 'post',
            'data':data
        })
        return req.then(handleSuccess,handleFailure);
    }

    function updateCustomerData(data) {
        var req = $http({
            'url': url+'/updateCustomer',
            'method': 'put',
            'data': data
        })
        return req.then(handleSuccess,handleFailure);
    }

    function handleSuccess(res){
        return res.data;
    }
    function handleFailure(err){
        var promise = $q.defer();
        return promise.reject(err.message);
    }
    

}]);