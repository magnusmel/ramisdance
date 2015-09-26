// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('RDI', ['ionic','ngSanitize','ngS3upload','RDI.controllers','RDI.services','formlyIonic','ngCordova','firebase', 'tableSort','wt.responsive', 'ionic-datepicker','ionic-timepicker','angularMoment', 'ionicProcessSpinner'])
.constant('FIREBASE_URI', 'https://luminous-fire-9895.firebaseio.com/')
.constant('S3_STAFFPHOTO_URI', 'https://s3-us-west-2.amazonaws.com/rdiapp.ramisdanceinc.com/staff')

.run(function($ionicPlatform, $ionicLoading,$rootScope) {

 
  $rootScope.show = function(text) {
      $rootScope.loading = $ionicLoading.show({
        content: text ? text : 'Loading..',
        animation: 'fade-in',
        showBackdrop: true,
        maxWidth: 200,
        showDelay: 0
      });
    };

    $rootScope.hide = function() {
      $ionicLoading.hide();
    };

     $rootScope.notify = function(text) {
      $rootScope.show(text);
      $window.setTimeout(function() {
        $rootScope.hide();
      }, 300);
    };

  $ionicPlatform.ready(function() {

    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
        console.log('$ionicPlatform.ready - Statusbar');
    }
  });


})



.config(function($stateProvider,$compileProvider, $urlRouterProvider,$ionicConfigProvider) {
$ionicConfigProvider.tabs.position('bottom');
$ionicConfigProvider.navBar.alignTitle('center');
$ionicConfigProvider.navBar.positionPrimaryButtons('left') ;
$compileProvider.imgSrcSanitizationWhitelist(/^\s*(https?|ftp|mailto|file|tel|blob):|data:image\//);
 
  $stateProvider

    .state('app', {
      url: '/app',
      abstract: true,
      templateUrl: 'templates/social/menu.html',
      controller: 'AppCtrl as appCtrl'
    })

    .state('app.start', {
      url: '/start',
      views: {
        'menuContent' :{
          templateUrl: 'templates/social/start-fullscreen.html'

        }
      }
    })


    .state('app.feed', {
      url: '/feed',
      views: {
        'menuContent' :{
          templateUrl: 'templates/social/feed.html'
        }
      }
    })


    .state('app.fgrid', {
      url: '/fgrid',
      views: {
        'menuContent' :{
          templateUrl: 'templates/social/friend-grid.html',
         controller: 'MembersCtrl'

        }
      }
    })

    .state('app.flist', {
      url: '/flist',
      views: {
        'menuContent' :{
          templateUrl: 'templates/social/members.html',
          controller: 'MembersCtrl'

        }
      }
    })

    .state('app.slist', {
      url: '/slist',
      views: {
        'menuContent' :{
          templateUrl: 'templates/social/staff.html',
          controller: 'StaffCtrl'
        }
      }
    })

.state('app.programmeslist', {
      url: '/programmeslist',
      views: {
        'menuContent' :{
          templateUrl: 'templates/social/programmes.html',
           controller: 'ProgrammesCtrl'
        }
      }
    })

.state('app.timetable', {
      url: '/timetable',
      views: {
        'menuContent' :{
          templateUrl: 'templates/social/timetable.html',
           controller: 'TimeTableCtrl'
        }
      }
    })


 .state('app.sgrid', {
      url: '/sgrid',
      views: {
        'menuContent' :{
          templateUrl: 'templates/social/staff-grid.html',
          controller: 'StaffCtrl'

        }
      }
    })


    .state('app.newpost', {
      url: '/newpost',
      views: {
        'menuContent' :{
          templateUrl: 'templates/social/new-post.html'
        }
      }
    })

    .state('app.email', {
      url: '/email',
      views: {
        'menuContent' :{
          templateUrl: 'templates/social/send-email.html'
        }
      }
    })    

    .state('app.profile', {
      url: '/profile',
      views: {
        'menuContent' :{
          templateUrl: 'templates/social/profile.html'

        }
      }
    })

    .state('app.timeline', {
      url: '/timeline',
      views: {
        'menuContent' :{
          templateUrl: 'templates/social/timeline.html'
        }
      }
    })
  .state('app.addnewstaffmember', {
      url: '/addnewstaffmember',
      views: {  
        'menuContent' :{
          templateUrl: 'templates/social/staff-profile-add.html' ,
           controller: 'StaffCtrl'
        }
      }
    })

    .state('app.addmemberprofile', {
      url: '/addmemberprofile',
      views: {  
        'menuContent' :{
          templateUrl: 'templates/social/member-profile-add.html',
          controller: 'MembersCtrl'

        }
      }
    })

    .state('app.profiletwo', {
      url: '/profiletwo',
      views: {
        'menuContent' :{
          templateUrl: 'templates/social/profile2.html'
        }
      }
    })

    .state('app.profilethree', {
      url: '/profilethree',
      views: {
        'menuContent' :{
          templateUrl: 'templates/social/profile3.html'
        }
      }
    })

    .state('app.news', {
      url: '/news',
      views: {
        'menuContent' :{
          templateUrl: 'templates/social/news.html'
        }
      }
    })

    .state('app.viewpost', {
      url: '/viewpost',
      views: {
        'menuContent' :{
          templateUrl: 'templates/social/view-post.html'
        }
      }
    })

    .state('app.viewposttwo', {
      url: '/viewposttwo',
      views: {
        'menuContent' :{
          templateUrl: 'templates/social/view-post-2.html'
        }
      }
    })

    .state('app.invite', {
      url: '/invite',
      views: {
        'menuContent' :{
          templateUrl: 'templates/social/social-invite-friend.html',
        }
      }
    })


    
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/start');
});