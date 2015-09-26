angular.module('RDI.controllers',  [])


.controller('AppCtrl', function($scope, $ionicLoading ,$ionicModal, $timeout,  $state,  $window, FIREBASE_URI, $ionicPopup) {
$scope.processing = false; // for ionic-process-spinner

console.log('AppCtrl - init - FIREBASE_URI = ' + FIREBASE_URI);
  // Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/social/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {

    $scope.modal.show();
  };

// logout modal pops up
// Open the login modal


  $scope.dologout = function() {


    var confirmPopup = $ionicPopup.confirm({
     title: 'Confirm Logout',
     template: 'Are you sure you want to Logout?'
   });
   confirmPopup.then(function(res) {
     if(res) {
       console.log('You are sure');
        $state.go('app.start');
    window.plugins.toast.showWithOptions(
    {
      message: "user logged out",
      duration: "short",
      position: "bottom",
      addPixelsY: -40  // added a negative value to move it up a bit (default 0)
    }  );



     } else {
       console.log('You are not sure');
     }
   });

     console.log("dologout()" + $scope.user);

  };

 
  // Perform the login action when the user submits the login form
  $scope.doLogin = function(loginData) {
    console.log('Dologin init', loginData);
    $scope.processing = true;
    var ref = new Firebase(FIREBASE_URI);
    console.log('Firebase  ref - ' + ref);
   
      $ionicLoading.show({
      content: 'Trying to Log on',
      animation: 'fade-in',
      showBackdrop: true,
      maxWidth: 200,
      showDelay: 0
    });

    window.plugins.toast.showWithOptions(
    {
      message: "loggin' on user",
      duration: "short",
      position: "bottom",
      addPixelsY: -40  // added a negative value to move it up a bit (default 0)
    });
      
      ref.authWithPassword({
       /*     email    : $scope.loginData.username,
            password : $scope.loginData.password*/
            email    : 'test@demo.com',
            password : 'test21'
        },function(error, authData) {
            if (error === null) {
                console.log("User ID: " + authData.uid +
                            ", Provider: " + authData.provider);
                $scope.user = ref.getAuth();
               // $scope.showLoginForm = false;
                 $scope.closeLogin();
               $scope.$apply();   
               
               $state.go('app.viewpost');
               $ionicLoading.hide();

            } else {
                console.log("Error authenticating user:", error);
                $scope.showErrorForm=false;
            }
        });
  };
})



.controller('ProgrammesCtrl', function($scope, FIREBASE_URI, $firebaseArray, ItemsFactory,authTokenFactory,ProgramsFactory) {
 
  $size = ProgramsFactory.length;
  $scope.programsList = ProgramsFactory;
  console.log('ProgrammesCtrl - init - programmesRef = ' + ProgramsFactory);
  console.log('ProgrammesCtrl - init - $scope.$size = ' + $size);
  console.log($scope.programsList);

})


.controller('PopoverCtrl', function($scope, $ionicActionSheet, $ionicPopover) {
      
$scope.closePopover = function() {
    $scope.popover.hide();
  };

  //Cleanup the popover when we're done with it!
  $scope.$on('$destroy', function() {
    $scope.popover.remove();
  });
  // Execute action on hide popover
  $scope.$on('popover.hidden', function() {
    // Execute action
  });
  // Execute action on remove popover
  $scope.$on('popover.removed', function() {
    // Execute action
  });


 })      
//*****************
// TIMETABLECTRL
//*****************

.controller('TimeTableCtrl', function($scope, ProgramsFactory, StaffMembersFactory, TimeTableFactory, formlyConfig, $cordovaDatePicker ) {
$size = StaffMembersFactory.length;
$scope.staffMembers = StaffMembersFactory;
$size = ProgramsFactory.length;
$scope.programsList = ProgramsFactory;
console.log($scope.programsList);

console.log('TimeTableCtrl - init -TimeTableFactory',TimeTableFactory );
$scope.currentDate = new Date();


 
$scope.addTimeItem = function  (time) {
    
    var id = time.$id;
    var record = {};
    angular.copy(time,record);
/*    record.SIGNINFLAG = "TRUE";  
   
      
    var FB = new Firebase(FIREBASE_URI+"ramis-timetable/" );
     console.log('^^^FB = ' + FB)
     var fbr = $firebaseObject(FB);
              fbr.$loaded().then(function() {
              fbr.SIGNINFLAG = "TRUE"; //set siginflag in db to true
              fbr.$save();
          });*/

};



 $scope.datepickerObject = {
      titleLabel: 'Select Date',  //Optional
      todayLabel: 'Today',  //Optional
      closeLabel: 'Close',  //Optional
      setLabel: 'Set',  //Optional
      setButtonType : 'button-assertive',  //Optional
      todayButtonType : 'button-assertive',  //Optional
      closeButtonType : 'button-assertive',  //Optional
      inputDate: new Date(),    //Optional
      mondayFirst: true,    //Optional
      templateType: 'popup', //Optional
      modalHeaderColor: 'bar-positive', //Optional
      modalFooterColor: 'bar-positive', //Optional
      from: new Date(2015, 8, 2),   //Optional
      to: new Date(2050, 8, 25),    //Optional
  
      callback: function (val) {    //Mandatory
        datePickerCallback(val);
      }
    };


$scope.timePickerObject = {
  inputEpochTime: ((new Date()).getHours() * 60 * 60),  //Optional
  step: 15,  //Optional
  format: 12,  //Optional
  titleLabel: '12-hour Format',  //Optional
  setLabel: 'Set',  //Optional
  closeLabel: 'Close',  //Optional
  setButtonType: 'button-positive',  //Optional
  closeButtonType: 'button-stable',  //Optional
  callback: function (val) {    //Mandatory
    timePickerCallback(val);
  }
};

$scope.timeEndPickerObject = {
  inputEpochTime: ((new Date()).getHours() * 60 * 60),  //Optional
  step: 15,  //Optional
  format: 12,  //Optional
  titleLabel: '12-hour Format',  //Optional
  setLabel: 'Set',  //Optional
  closeLabel: 'Close',  //Optional
  setButtonType: 'button-positive',  //Optional
  closeButtonType: 'button-stable',  //Optional
  callback: function (val) {    //Mandatory
    timeEndPickerCallback(val);
  }
};

var datePickerCallback = function (val) {
  if (typeof(val) === 'undefined') {
    console.log('No date selected');
  } else {
    console.log('Selected date is : ', val)
    $scope.datepickerObject.inputDate = val;
    }
};

function timePickerCallback(val) {
  if (typeof (val) === 'undefined') {
    console.log('Time not selected');
  } else {
    $scope.timePickerObject.inputEpochTime = val;
    var selectedTime = new Date(val * 1000);
    console.log('Selected epoch is : ', val, 'and the time is ', selectedTime.getUTCHours(), ':', selectedTime.getUTCMinutes(), 'in UTC');

  }
};


function timeEndPickerCallback(val) {
  if (typeof (val) === 'undefined') {
    console.log('Time not selected');
  } else {
      $scope.timeEndPickerObject.inputEpochTime = val;
      var selectedTime = new Date(val * 1000);
      console.log('Selected epoch is : ', val, 'and the time is ', selectedTime.getUTCHours(), ':', selectedTime.getUTCMinutes(), 'in UTC');
  }
};



})


.directive('standardTimeMeridian', function() {
  return {
    restrict: 'AE',
    replace: true,
    scope: {
      etime: '=etime'
    },
    template: "<strong>{{stime}}</strong>",
    link: function(scope, elem, attrs) {

      scope.stime = epochParser(scope.etime, 'time');

      function prependZero(param) {
        if (String(param).length < 2) {
          return "0" + String(param);
        }
        return param;
      }

      function epochParser(val, opType) {
        if (val === null) {
          return "00:00";
        } else {
          var meridian = ['AM', 'PM'];

          if (opType === 'time') {
            var hours = parseInt(val / 3600);
            var minutes = (val / 60) % 60;
            var hoursRes = hours > 12 ? (hours - 12) : hours;

            var currentMeridian = meridian[parseInt(hours / 12)];

            return (prependZero(hoursRes) + ":" + prependZero(minutes) + " " + currentMeridian);
          }
        }
      }

      scope.$watch('etime', function(newValue, oldValue) {
        scope.stime = epochParser(scope.etime, 'time');
      });

    }
  };
})
//********************************
//End Of TimeTableCtrl Controller
//*******************************


.controller('StaffCtrl', function($scope,$state,$ionicLoading, $cordovaFileTransfer, $cordovaCamera, Camera, $ionicPopover, $rootScope, FIREBASE_URI, $firebaseArray, authTokenFactory,StaffMembersFactory, $firebase, $firebaseObject) {
$scope.settings = {
        enableFriends: true
    };
//$scope.settings.enableFriends = true;
//for karma unit test

$size = StaffMembersFactory.length;
$scope.staffMembers = StaffMembersFactory;
$scope.processing = false; // for ionic-process-spinner




$scope.doRefresh = function() {
    $scope.$broadcast('scroll.refreshComplete');
    $scope.$apply();
  };
  

//Popup window to confirm user signin -yes/no window
$scope.popover = {};
$scope.popover = $ionicPopover.fromTemplateUrl('templates/social/staffSignInPopover.html',  {
    scope: $scope
  }).then(function(popover) {
    $scope.popover = popover;
      console.log('Popover.fromTemplateUrl - init');
      console.log('Popover.fromTemplateUrl - init - ' +   $scope.popover);

       $scope.popover.staffMember = {};
  });

$scope.checkSignInTime = function (staffMember) {
    $scope.myvar = staffMember.FULLNAME;
        $scope.statusChk = staffMember.SIGNINFLAG;
        $scope.expireTime = staffMember.LASTSIGNINTIME;
        console.log('checkSignInTime has expired');
        var timeNow = new Date().getTime();
        
};

$scope.checkStaffSignedStatus = function (staffMember) {
        var id = staffMember.$id;
        $scope.myvar = staffMember.FULLNAME;
        $scope.statusChk = staffMember.SIGNINFLAG;
        $scope.expireTime = staffMember.LASTSIGNINTIME;
        
       // the return values below of 0 and 1 are used in the ng-switch-case (in staff.html line:56)
       // to disable user from repeat signins
       // do timer check here 
        var timeNow = new Date().getTime();
        console.log('checkStaffSignedStatus init',  $scope.totalclasses);
        if(timeNow >= $scope.expireTime && $scope.statusChk === "TRUE"  ) {
            console.log("signin has expired");
            $scope.statusChk === "FALSE" ;

            var FB = new Firebase(FIREBASE_URI+"ramis-staff/" +id);
            console.log('^^^FB = ' + FB)
            var fbr = $firebaseObject(FB);
              fbr.$loaded().then(function() {
              fbr.SIGNINFLAG = "FALSE"; //set siginflag in db to true
              $scope.totalclasses = parseInt(staffMember.CLASSESCONDUCTED) + 1;
              fbr.CLASSESCONDUCTED = $scope.totalclasses;//update counter after sigin time has expired 
              fbr.$save();
          });

      }
         if ( $scope.statusChk === "TRUE" ) {
        
                    return 0; //used in staff.html switch-case
         } else {
                    return 1;
            //used in staff.html switch-case
        }
  };

$scope.addStaffPhoto = function  () {
  console.log("addStaffPhoto XXXXX");


};


/*
var s3Uploader = (function () {
 
    var s3URI = encodeURI("https://s3-us-west-2.amazonaws.com/rdiapp.ramisdanceinc.com/staff/"),
        awsKey = 'AKIAIJEIE5MV3Q24HN5A',
        acl = "public-write";
 
    function upload(imageURI, fileName) {
 
        var deferred = $.Deferred(),
            ft = new FileTransfer(),
            options = new FileUploadOptions();
 
        options.fileKey = "file";
        options.fileName = fileName;
        options.mimeType = "image/jpeg";
        options.chunkedMode = false;
        options.params = {
            "AWSAccessKeyId": awsKey,
            "Content-Type": "image/jpeg"
        };
 
        ft.upload(imageURI, s3URI,
            function (e) {
                deferred.resolve(e);
            },
            function (e) {
                deferred.reject(e);
            }, options);
 
        return deferred.promise();
 
    }
 
    return {
        upload: upload
    }
 
}());

*/
$scope.lastPhoto = {};
$scope.getPhoto = function() {
    console.log('Getting camera');
    Camera.getPicture({
      quality: 80,
      destinationType : 0, 
      sourceType : 1, 
      encodingType: 0,
      allowEdit: true,
      targetWidth: 200,
      targetHeight: 200,
      saveToPhotoAlbum: false,
      correctOrientation:true
    }).then(function(imgURI) {
       $scope.imgURI =   imgURI;
       $scope.lastPhoto = imgURI; //unused

    }, function(err) {
      console.err(err);
    });
};



$scope.staffMemberAdd = function  (staffData) {
  $scope.processing = true; // for ionic-process-spinner

  $ionicLoading.show({
      content: 'Trying to Log on',
      animation: 'fade-in',
      showBackdrop: true,
      maxWidth: 200,
      showDelay: 0
    });


  $scope.firstname = staffData.firstname;
  console.log("***",staffData.firstname);
  $scope.lastname = staffData.lastname;
  $scope.fullname =  $scope.firstname +" " + $scope.lastname ;
  $scope.dateNow = moment().format('llll');
  $scope.address = staffData.address ;
  $scope.emailid = staffData.emailid ;
  $scope.alternateno = staffData.alternatephone;
  $scope.mobileno = staffData.mobileno;
  $scope.registeredby = "RAMI";
  $scope.username = $scope.fullname.replace(/\s+/g, '_'); //remove white space between first and lastname& replace with underscore 
  $scope.filename = $scope.username;
  $scope.photourl = "https://s3-us-west-2.amazonaws.com/rdiapp.ramisdanceinc.com/staff/johndoeplaceholder-100x95.jpg";
  $scope.photo =   staffData.photoImage;
  console.log("****staffData.photoImage", $scope.lastPhoto);
  console.log("****$scope.photo", $scope.photo);

 var FB2 = new Firebase(FIREBASE_URI + "ramis-staff");
    var fbr2 = $firebaseArray(FB2);
          fbr2.$loaded().then(function() {
                  fbr2.$add({
                  ADDRESS : $scope.address,
                  ALTERNATECONTACTNO : $scope.alternateno,
                  CLASSESCONDUCTED : 0,
                  EMAILID : $scope.emailid,
                  FULLNAME : $scope.fullname,
                  JOINDATE :$scope.dateNow,
                  LASTSEENDATE : $scope.dateNow ,
                  LASTSIGNINTIME : 0,
                  MOBILENO : $scope.mobileno ,
                  PHOTOURL : $scope.photourl ,
                  REGISTEREDBY : $scope.registeredby ,
                  SIGNINFLAG : "FALSE",
                  STATUS  : "Active",
                  USERNAME: $scope.username,
                  PHOTO: $scope.lastPhoto
              });
          });

 window.plugins.toast.showWithOptions(
    {
      message: "Added new Staff",
      duration: "short",
      position: "bottom",
      addPixelsY: -40  // added a negative value to move it up a bit (default 0)
    }  );


    /*
 var s3URI = encodeURI("https://s3-us-west-2.amazonaws.com/rdiapp.ramisdanceinc.com/staff/"), 
    awsKey = 'AKIAIJEIE5MV3Q24HN5A',
    acl = "public-write";

var targetPath = cordova.file.applicationDirectory + "../img/ionic.png";*/
/*
 var params = new Object();
 params.AWSAccessKeyId = "hElLGkESDZfbLEOxS2v2hTmc+kNFp89Ui3SEgih2";
  var options = {
            fileKey: "avatar",
            httpMethod : 'PUT',
            chunkedMode: false,
            mimeType: "image/png"
        };
options.params = params;     
var trustAllHosts = true;*/
/*
document.addEventListener("deviceready", function () {
  AWS.config.region = 'us-west-2';
});
*/
/*
// instantiate an object to interact with this Amazon Web Services (AWS) service
var bucket = new AWS.S3({params: {Bucket: 'rdiapp.ramisdanceinc.com/'}}); // bucket name must be all lowercase

// call a method on the service object - it expects a callback with an error and data object
bucket.listObjects(function (err, data) {
  if (err) {
    alert("error:",JSON.stringify(err));
  } else {
    alert(JSON.stringify(data));
  }
});*/

/*var file = new Object();
file.name = $scope.username + $scope.mobileno +".jpg";
file.type =  "image/jpeg";
file = $scope.lastPhoto;
var params = {Key: file.name, ContentType: file.type, Body: file};
 bucket.upload(params, function (err, data) {
        console.log("****", err ? 'ERROR!' : 'UPLOADED.');
      });
  */

/*

    $cordovaFileTransfer.upload(s3URI, targetPath, options,trustAllHosts)
    .then(function(result) {
                 console.log("SUCCESS: " + JSON.stringify(result.response));
       }, function(error) {
        // Error
        alert(JSON.stringify(error));
      });
*/

 $state.go('app.slist');
 $ionicLoading.hide(); 

};

$scope.staffMemberEdit = function  (staffMember) {

var FB = new Firebase(FIREBASE_URI+"ramis-staff/" +id);
     console.log('^^^FB = ' + FB)
     var fbr = $firebaseObject(FB);
              fbr.$loaded().then(function() {
              fbr.SIGNINFLAG = "TRUE"; //set siginflag in db to true
              fbr.LASTSIGNINTIME = timeIntoFuture; //add timestamp    
              fbr.LASTSEENDATE = dateNow;//update date field using moment format
          
              fbr.$save();
          });

};

$scope.staffMemberDisable = function  (staffMember) {

var FB = new Firebase(FIREBASE_URI+"ramis-staff/" +id);
     console.log('^^^FB = ' + FB)
     var fbr = $firebaseObject(FB);
              fbr.$loaded().then(function() {
              fbr.SIGNINFLAG = "TRUE"; //set siginflag in db to true
              fbr.LASTSIGNINTIME = timeIntoFuture; //add timestamp    
              fbr.LASTSEENDATE = dateNow;//update date field using moment format
          
              fbr.$save();
          });

};

// signin status update in database
$scope.staffMemberSignIn = function  (staffMember) {
    console.log('staffMemberSignIn - - staffMember: staffname' + staffMember.FULLNAME);
    console.log('staffMemberSignIn - - staffMember: username' + staffMember.USERNAME);
    console.log('staffMemberSignIn- -setStaffMemberSignINFlag - ' + staffMember.SIGNINFLAG);
  
    var id = staffMember.$id;
    var record = {};
    angular.copy(staffMember,record);
    record.SIGNINFLAG = "TRUE";  
    // time in minutes check & store
    var timeNow = new Date().getTime();
    var dateNow = moment().format('llll');

    console.log('staffMemberSignIn******* timeNow', dateNow);

    // 1 min = 60000 ms
    var oneMinutetoMilliSec = 60000;
    var lockinminutes = 3; //for signin timer in minutes - how long to keep them logged on
    var fiftyMinstoMilliSec = oneMinutetoMilliSec * lockinminutes;

    var timeIntoFuture = timeNow + fiftyMinstoMilliSec;
    
    console.log('**staffMemberSignIn---staffMember =' + angular.toJson(staffMember)  );
    console.log('**staffMemberSignIn--twoHoursIntoFuture=',timeIntoFuture); 
    console.log('**staffMemberSignIn--timeNow=',timeNow); 
    // log signin details to ramis-staff-signin-log  
    // data to be used for dashboard reporting
    var FB2 = new Firebase(FIREBASE_URI+"ramis-staff-signin-log/");
    var fbr2 = $firebaseArray(FB2);
          fbr2.$loaded().then(function() {
            
              fbr2.$add({
                  ID : id,
                  NAME : staffMember.FULLNAME,
                  LASTSIGNINTIME : timeNow,     
                  LASTSEENDATE : dateNow
              });
              console.log('2^^^^^^^');

          });
    // log signin details & set sigininflag to true in ramis-staff db
    var FB = new Firebase(FIREBASE_URI+"ramis-staff/" +id);
     console.log('^^^FB = ' + FB);
     var fbr = $firebaseObject(FB);
              fbr.$loaded().then(function() {
              fbr.SIGNINFLAG = "TRUE"; //set siginflag in db to true
              fbr.LASTSIGNINTIME = timeIntoFuture; //add timestamp    
              fbr.LASTSEENDATE = dateNow;//update date field using moment format
          
              fbr.$save();
          });


    $scope.closePopover();
   


};


$scope.openPopover = function ($event,staffMember) {
    $scope.popover.staffMember =  staffMember;
    console.log('openPopover - init');
   $scope.popover.show($event);
  };


$scope.closePopover = function($event) {
    $scope.popover.hide();
  };


  //Cleanup the popover when we're done with it!
$scope.$on('$destroy', function() {
    $scope.popover.remove();
  });
  // Execute action on hide popover
$scope.$on('popover.hidden', function() {

    // Execute action
  });
  // Execute action on remove popover
$scope.$on('popover.removed', function() {
    // Execute action
  });

})

//**********************
// END OF STAFFCTRL
//*********************
.controller('MembersCtrl', function($scope,$state,$ionicLoading, $cordovaFileTransfer, $cordovaCamera, Camera, $ionicPopover, $rootScope, FIREBASE_URI, $firebaseArray, authTokenFactory,MembersFactory, ProgramsFactory,$firebase, $firebaseObject) {
$scope.settings = {
        enableFriends: true
    };
//$scope.settings.enableFriends = true;
//for karma unit test

//$size = ProgramsFactory.length;
$scope.programsList = ProgramsFactory;
console.log('ProgrammesCtrl - init - programmesRef and size ' + ProgramsFactory );
console.log($scope.programsList);

$size = MembersFactory.length;
$scope.MembersList = MembersFactory;
$scope.Members = MembersFactory;

$scope.processing = false; 
// for ionic-process-spinner
//console.log('MembersList init -',$scope.MembersList);
console.log('MembersCtrl init -',$scope.Members);

$scope.doRefresh = function() {
    $scope.$broadcast('scroll.refreshComplete');
    $scope.$apply();
  };
  

//Popup window to confirm user signin -yes/no window
$scope.popover = {};
$scope.popover = $ionicPopover.fromTemplateUrl('templates/social/MembersSignInPopover.html',  {
    scope: $scope
  }).then(function(popover) {
    $scope.popover = popover;
      console.log('Popover.fromTemplateUrl - init');
      console.log('Popover.fromTemplateUrl - init - ' +   $scope.popover);

       $scope.popover.Member = {};
  });

$scope.checkSignInTime = function (Member) {
    $scope.myvar = Member.FULLNAME;
        $scope.statusChk = Member.SIGNINFLAG;
        $scope.expireTime = Member.LASTSIGNINTIME;
        console.log('checkSignInTime has expired');
        var timeNow = new Date().getTime();
        
};

$scope.checkMemberSignedStatus = function (Member) {
        var id = Member.$id;
        $scope.myvar = Member.FULLNAME;
        $scope.statusChk = Member.SIGNINFLAG;
        $scope.expireTime = Member.LASTSIGNINTIME;
        
       // the return values below of 0 and 1 are used in the ng-switch-case (in staff.html line:56)
       // to disable user from repeat signins
       // do timer check here 
        var timeNow = new Date().getTime();
        console.log('checkMemberSignedStatus init',  $scope.totalclasses);
        if(timeNow >= $scope.expireTime && $scope.statusChk === "TRUE"  ) {
            console.log("signin has expired");
            $scope.statusChk === "FALSE" ;

            var FB = new Firebase(FIREBASE_URI+"ramis-customers/" +id);
            console.log('^^^FB = ' + FB);
            var fbr = $firebaseObject(FB);
              fbr.$loaded().then(function() {
              fbr.SIGNINFLAG = "FALSE"; //set siginflag in db to true
              $scope.totalclasses = parseInt(Member.CLASSESCONDUCTED) + 1;
              fbr.CLASSESCONDUCTED = $scope.totalclasses;//update counter after sigin time has expired 
              fbr.$save();
          });

      }
         if ( $scope.statusChk === "TRUE" ) {
        
                    return 0; //used in staff.html switch-case
         } else {
                    return 1;
            //used in staff.html switch-case
        }
  };


$scope.lastMemberPhoto = {};
$scope.getPhoto = function() {
    console.log('Getting camera');
    Camera.getPicture({
      quality: 80,
      destinationType : 0, 
      sourceType : 1, 
      encodingType: 0,
      allowEdit: true,
      targetWidth: 200,
      targetHeight: 200,
      saveToPhotoAlbum: false,
      correctOrientation:true
    }).then(function(imgURI) {
       $scope.imgURI =   imgURI;
       $scope.lastMemberPhoto = imgURI; //unused

    }, function(err) {
      console.err(err);
    });
};



$scope.MemberAdd = function  (MemberData) {
  $scope.processing = true; // for ionic-process-spinner

  $ionicLoading.show({
      content: 'Trying to add',
      animation: 'fade-in',
      showBackdrop: true,
      maxWidth: 200,
      showDelay: 0
    });


  $scope.firstname = MemberData.firstname;
  console.log("***",MemberData.firstname);
  $scope.lastname = MemberData.lastname;
  $scope.fullname =  $scope.firstname +" " + $scope.lastname ;
  $scope.dateNow = moment().format('llll');
  $scope.address = MemberData.address ;
  $scope.emailid = MemberData.emailid ;
  $scope.alternateno = MemberData.alternatephone;
  $scope.mobileno = MemberData.mobileno;
  $scope.registeredby = "RAMI";
  $scope.username = $scope.fullname.replace(/\s+/g, '_'); //remove white space between first and lastname& replace with underscore 
  $scope.filename = $scope.username;
  $scope.photourl = "https://s3-us-west-2.amazonaws.com/rdiapp.ramisdanceinc.com/staff/johndoeplaceholder-100x95.jpg";
  $scope.photo =   MemberData.photoImage;
  console.log("****MemberData.photoImage", $scope.lastMemberPhoto);
  console.log("****$scope.photo", $scope.photo);

 var FB2 = new Firebase(FIREBASE_URI + "ramis-customers");
    var fbr2 = $firebaseArray(FB2);
          fbr2.$loaded().then(function() {
                  fbr2.$add({
                  ADDRESS : $scope.address,
                  ALTERNATECONTACTNO : $scope.alternateno,
                  CLASSESCONDUCTED : 0,
                  EMAILID : $scope.emailid,
                  FULLNAME : $scope.fullname,
                  JOINDATE :$scope.dateNow,
                  LASTSEENDATE : $scope.dateNow ,
                  LASTSIGNINTIME : 0,
                  MOBILENO : $scope.mobileno ,
                  PHOTOURL : $scope.photourl ,
                  REGISTEREDBY : $scope.registeredby ,
                  SIGNINFLAG : "FALSE",
                  STATUS  : "Active",
                  USERNAME: $scope.username,
                  PHOTO: $scope.lastMemberPhoto
              });
          });

 window.plugins.toast.showWithOptions(
    {
      message: "Added new Member",
      duration: "short",
      position: "bottom",
      addPixelsY: -40  // added a negative value to move it up a bit (default 0)
    }  );



 $state.go('app.flist');
 $ionicLoading.hide(); 

};

$scope.MemberEdit = function  (Member) {

var FB = new Firebase(FIREBASE_URI+"ramis-customers/" +id);
     console.log('^^^FB = ' + FB)
     var fbr = $firebaseObject(FB);
              fbr.$loaded().then(function() {
              fbr.SIGNINFLAG = "TRUE"; //set siginflag in db to true
              fbr.LASTSIGNINTIME = timeIntoFuture; //add timestamp    
              fbr.LASTSEENDATE = dateNow;//update date field using moment format
          
              fbr.$save();
          });

};

$scope.MemberDisable = function  (Member) {

var FB = new Firebase(FIREBASE_URI+"ramis-customers/" +id);
     console.log('^^^FB = ' + FB);
     var fbr = $firebaseObject(FB);
              fbr.$loaded().then(function() {
              fbr.SIGNINFLAG = "TRUE"; //set siginflag in db to true
              fbr.LASTSIGNINTIME = timeIntoFuture; //add timestamp    
              fbr.LASTSEENDATE = dateNow;//update date field using moment format
          
              fbr.$save();
          });

};

// signin status update in database
$scope.MemberSignIn = function  (Member) {
    console.log('MemberSignIn - - Member: staffname' + Member.FULLNAME);
    console.log('MemberSignIn - - Member: username' + Member.USERNAME);
    console.log('MemberSignIn- -setMemberSignINFlag - ' + Member.SIGNINFLAG);
  
    var id = Member.$id;
    var record = {};
    angular.copy(Member,record);
    record.SIGNINFLAG = "TRUE";  
    // time in minutes check & store
    var timeNow = new Date().getTime();
    var dateNow = moment().format('llll');

    console.log('MemberSignIn******* timeNow', dateNow);

    // 1 min = 60000 ms
    var oneMinutetoMilliSec = 60000;
    var lockinminutes = 3; //for signin timer in minutes - how long to keep them logged on
    var fiftyMinstoMilliSec = oneMinutetoMilliSec * lockinminutes;

    var timeIntoFuture = timeNow + fiftyMinstoMilliSec;
    
    console.log('**MemberSignIn---Member =' + angular.toJson(Member)  );
    console.log('**MemberSignIn--twoHoursIntoFuture=',timeIntoFuture); 
    console.log('**MemberSignIn--timeNow=',timeNow); 
    // log signin details to ramis-staff-signin-log  
    // data to be used for dashboard reporting
    var FB2 = new Firebase(FIREBASE_URI+"ramis-customers-signin-log/");
    var fbr2 = $firebaseArray(FB2);
          fbr2.$loaded().then(function() {
            
              fbr2.$add({
                  ID : id,
                  NAME : Member.FULLNAME,
                  LASTSIGNINTIME : timeNow,     
                  LASTSEENDATE : dateNow
              });
              console.log('2^^^^^^^');

          });
    // log signin details & set sigininflag to true in ramis-staff db
    var FB = new Firebase(FIREBASE_URI+"ramis-customers/" +id);
     console.log('^^^FB = ' + FB)
     var fbr = $firebaseObject(FB);
              fbr.$loaded().then(function() {
              fbr.SIGNINFLAG = "TRUE"; //set siginflag in db to true
              fbr.LASTSIGNINTIME = timeIntoFuture; //add timestamp    
              fbr.LASTSEENDATE = dateNow;//update date field using moment format
          
              fbr.$save();
          });


    $scope.closePopover();
   
};


$scope.openPopover = function ($event,Member) {
    $scope.popover.Member =  Member;
    console.log('openPopover - init');
   $scope.popover.show($event);
  };


$scope.closePopover = function($event) {
    $scope.popover.hide();
  };


  //Cleanup the popover when we're done with it!
$scope.$on('$destroy', function() {
    $scope.popover.remove();
  });
  // Execute action on hide popover
$scope.$on('popover.hidden', function() {

    // Execute action
  });
  // Execute action on remove popover
$scope.$on('popover.removed', function() {
    // Execute action
  });

})


.controller('myCtrl',function(authTokenFactory,$scope) {

    this.isLoggedIn = function () {
      return authTokenFactory.isLoggedIn();
    };

    this.errorDuringLoggingIn = function () {
      return authTokenFactory.errorDuringLoggingIn();
    };
  });