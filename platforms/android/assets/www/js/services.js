angular.module('RDI.services', [])

.directive('file', function() {
  return {
    restrict: 'AE',
    scope: {
      file: '@'
    },
    link: function(scope, el, attrs){
      el.bind('change', function(event){
        var files = event.target.files;
        var file = files[0];
        scope.file = file;
        scope.$parent.file = file;
        scope.$apply();
      });
    }
  };
})


.service('authSvc', ['FIREBASE_URI', '$firebaseAuth',
  function(FIREBASE_URI, $firebaseAuth) {
    console.log('authSvc init')
    var ref = new Firebase(FIREBASE_URI);
    var auth = $firebaseAuth(ref);

    var login = function () {

       return auth.$authAnonymously();
    };

    var logout = function () {
      return auth.$unauth();
    };

    return {
      login: login,
      logout: logout
    }
  }])

.factory('authTokenFactory', function (authSvc,FIREBASE_URI) {
  var authTokenFactory = {};
    console.log('@ authTokenFactory init - FIREBASE_URI = ' + FIREBASE_URI);
    
    authTokenFactory.login = function () {
      authSvc.login().then(function (authData) {
        authTokenFactory.authData = authData;
        console.log('aTF.aD: ' + authTokenFactory.authData);
      }).catch(function (error) {
        authTokenFactory.error = error;
      });
    };

    authTokenFactory.logout = function () {
      authSvc.logout();
      authTokenFactory.authData = null;
      authTokenFactory.error = null;
    };

    authTokenFactory.isLoggedIn = function () {
      return (typeof authTokenFactory.authData !== 'undefined')
        && authTokenFactory.authData !== null;
    };

    authTokenFactory.errorDuringLoggingIn = function () {
      return (typeof authTokenFactory.error !== 'undefined')
        && authTokenFactory.error !== null;
    };


  // authTokenFactory.authWithPassword({
  //      /*     email    : $scope.loginData.username,
  //           password : $scope.loginData.password*/
  //           email    : 'test@demo.com',
  //           password : 'test21'
  //       },function(error, authData) {
  //           if (error === null) {
  //               console.log("User ID: " + authData.uid +
  //                           ", Provider: " + authData.provider);
  //               $scope.user = ref.getAuth();
  //              // $scope.showLoginForm = false;
  //                $scope.closeLogin();

  //              $scope.$apply();   

  //           } else {
  //               console.log("Error authenticating user:", error);
  //               $scope.showErrorForm=false;
  //               authTokenFactory.error = null;
  //           }
  //       });


      return authTokenFactory;
  })


.factory('Camera', function($q) {

  return {
    getPicture: function(options) {
      var q = $q.defer();

      navigator.camera.getPicture(function(result) {
        // Do any magic you need
        q.resolve(result);
      }, function(err) {
        q.reject(err);
      }, options);

      return q.promise;
    }
  }
})

.factory("ItemsFactory", function($firebaseArray,FIREBASE_URI) {
  var itemsRef = new Firebase(FIREBASE_URI + "/ramis-program-fees");
  console.log('@ ItemsFactory init - itemsRef = ' +  itemsRef);
  return $firebaseArray(itemsRef);
})



.factory('StaffMembersFactory',function($firebaseArray,FIREBASE_URI) {
    var StaffMembersFactory = {};

  console.log("@ Factory Init - StaffMembers");
  var refStaff = new Firebase( FIREBASE_URI + "/ramis-staff");
  
// Get a database reference to our posts

// Attach an asynchronous callback to read the data at our posts reference
refStaff.on("value", function(snapshot) {
  console.log("reading all data");
  console.log(snapshot.val());
}, function (errorObject) {
  console.log("The read failed: " + errorObject.code);
});


 StaffMembersFactory.setSignInStatus = function (id) {     
       console.log('@ StaffMembersFactory.setSignInStatus - init' + id);
    };


  console.log("@ Factory Init - StaffMembers - refStaff", refStaff);

  return $firebaseArray(refStaff);
})



.factory('MembersFactory',function($firebaseArray,FIREBASE_URI) {
  var MembersFactory = {};
  console.log("Factory Init - MembersFactory");
  var refMembers = new Firebase(FIREBASE_URI + "/ramis-customers");
    console.log("@ Factory Init - Members - refMembers", refMembers);

    
// Get a database reference to our posts

// Attach an asynchronous callback to read the data at our posts reference
refMembers.on("value", function(snapshot) {
  console.log("reading all data");
  console.log(snapshot.val());
}, function (errorObject) {
  console.log("The read failed: " + errorObject.code);
});


 MembersFactory.setSignInStatus = function (id) {     
       console.log('@ MembersFactory.setSignInStatus - init' + id);
    };



  console.log("@ Factory Init - Members - refMembers", refMembers);

  return $firebaseArray(refMembers);
})


.factory('ProgramsFactory',function($firebaseArray,FIREBASE_URI) {

  var ProgramsFactory = {};
  console.log("Factory Init - ProgramsFactory");
  var refPrograms = new Firebase(FIREBASE_URI + "/ramis-program-fees");
    console.log("Factory Init - ProgramsFactory - refPrograms", refPrograms.$id);
  

  return $firebaseArray(refPrograms);
})


.factory('TimeTableFactory',function($firebaseArray,FIREBASE_URI) {
  var TimeTableList = {}
 console.log("@ TimeTableFactory  Init -  ");


  var refTimeTable = new Firebase( FIREBASE_URI + "/ramis-timetable");
  
// Get a database reference to our time

// Attach an asynchronous callback to read the data at our posts reference
refTimeTable.on("value", function(snapshot) {
  console.log("reading all data");
  console.log(snapshot.val());
}, function (errorObject) {
  console.log("The read failed: " + errorObject.code);
});



  var refPrograms = new Firebase(FIREBASE_URI + "/ramis-program-fees");
  var ProgramsList = $firebaseArray(refPrograms);
   ProgramsList.$loaded().then(function() {
          console.log("loaded record", ProgramsList.$id);

          angular.forEach(ProgramsList, function(value,key){
            console.log(key,value);
          });
      });


 var refStaff = new Firebase( FIREBASE_URI + "/ramis-staff");
 var StaffList = $firebaseArray(refStaff);
 console.log("@ TimeTableFactory Init - StaffMembers",StaffList );
 StaffList.$loaded().then(function() {
          console.log("loaded record", StaffList.$id);

          angular.forEach(StaffList, function(value,key){
            console.log(key,value);
          });
      });

angular.forEach(TimeTableList, function(value,key){
            console.log(key,value);
          });
  TimeTableList = {"hello":"world"};
  return TimeTableList;
})

.factory('Camera', ['$q', function($q,$cordovaCamera) {

  return {
    getPicture: function(options) {
      var q = $q.defer();

      navigator.camera.getPicture(function(result) {
        // Do any magic you need
        q.resolve(result);
      }, function(err) {
        q.reject(err);
      }, options);

      return q.promise;
    }
  }
}]);