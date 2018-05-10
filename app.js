angular.module('iho', ['ui.router','toaster'])
    .config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
        
        $urlRouterProvider.otherwise('/Login');


        $stateProvider
            .state('Login', {
                url: '/Login',
                templateUrl: 'templates/login.html',
                controller: 'LoginCtrl'
            })
            .state('main', {
                url: '/main',
                templateUrl: 'templates/iho_customercare/main.html',
                controller: 'mainCtrl'
            })
            .state('addCustomer', {
                url: '/addCustomer',
                templateUrl: 'templates/iho_customercare/add_customer.html',
                controller: 'customerCtrl'
            })   
            .state('terms', {
                url: '/terms',
                templateUrl: 'templates/iho_customercare/terms_conditions.html',
                controller: 'termsCtrl'
            }) 
            
            .state('use', {
                url: '/use',
                templateUrl: 'templates/iho_customercare/how_to_use.html',
                controller: 'useCtrl'
            })   

            .state('faq', {
                url: '/faq',
                templateUrl: 'templates/iho_customercare/faq.html',
                controller: 'faqCtrl'
            })   

            .state('mis', {
                url: '/mis',
                templateUrl: 'templates/iho_customercare/mis.html',
                controller: 'misCtrl'
            })   

            .state('add_customer', {
                url: '/add_customer',
                templateUrl: 'templates/eVaidya_customercare/addCustomer.html',
                controller: 'add_customerCtrl'
            }) 
            
            .state('profile', {
                url: '/profile',
                templateUrl: 'templates/eVaidya_customercare/profilelist.html',
                controller: 'profileCtrl'
            })   

            .state('customer_list', {
                url: '/customer_list',
                templateUrl: 'templates/eVaidya_customercare/customer_list.html',
                controller: 'customer_listCtrl'
            })   

            .state('followp', {
                url: '/followp',
                templateUrl: 'templates/eVaidya_customercare/followupdates.html',
                controller: 'fallowupCtrl'
            })   

            .state('expire_users', {
                url: '/expire_users',
                templateUrl: 'templates/eVaidya_customercare/expiredates.html',
                controller: 'expireCtrl'
            })   

            .state('appoinment', {
                url: '/appoinment',
                templateUrl: 'templates/Dietitian/appoinment.html',
                controller: 'appoinmentCtrl'
            })   

            .state('feedback', {
                url: '/feedback',
                templateUrl: 'templates/Dietitian/feedback.html',
                controller: 'feedbackCtrl'
            })   

            .state('health_records', {
                url: '/health_records',
                templateUrl: 'templates/enduser/HealthRecords.html',
                controller: 'healthCtrl'
            })   

            .state('password_change', {
                url: '/password_change',
                templateUrl: 'templates/enduser/changepassword.html',
                controller: 'passwordCtrl'
            })   

            .state('contact_us', {
                url: '/contact_us',
                templateUrl: 'templates/enduser/contactus.html',
                controller: 'contactCtrl'
            })   

            .state('faq1', {
                url: '/faq1',
                templateUrl: 'templates/enduser/faq.html',
                controller: 'faq1Ctrl'
            })   

            .state('how_to_use', {
                url: '/how_to_use',
                templateUrl: 'templates/enduser/how_to_use.html',
                controller: 'how_to_useCtrl'
            })   

            .state('terms_conditions', {
                url: '/terms_conditions',
                templateUrl: 'templates/enduser/terms_conditions.html',
                controller: 'terms_conditionsCtrl'
            }) 
            
            .state('appointment_dates', {
                url: '/appointment_dates',
                templateUrl: 'templates/iho_customercare/appointment_dates.html',
                controller: 'appointment_datesCtrl'
            })   

            .state('iho_changepassword', {
                url: '/iho_changepassword',
                templateUrl: 'templates/iho_customercare/iho_changepassword.html',
                controller: 'iho_changepasswordCtrl'
            })   

            .state('evaidya_changepassword', {
                url: '/evaidya_changepassword',
                templateUrl: 'templates/eVaidya_customercare/evaidya_changepassword.html',
                controller: 'evaidya_changepasswordCtrl'
            })   

            .state('appointment_dates1', {
                url: '/appointment_dates1',
                templateUrl: 'templates/eVaidya_customercare/appointment_dates1.html',
                controller: 'appointment_datesCtrl1'
            })   

            .state('enduser_changepassword', {
                url: '/enduser_changepassword',
                templateUrl: 'templates/enduser/enduser_changepassword.html',
                controller: 'enduser_changepasswordCtrl'
            })   



            
    }]).filter('startFrom', function() {
        return function(input, start) {
            start = +start; //parse to int
            return input.slice(start);
        }
    });
    ;