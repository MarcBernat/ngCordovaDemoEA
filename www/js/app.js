angular.module('starter', ['ionic','ngCordova'])

.controller("ControllerCtrl", function ($scope, $cordovaCamera, $cordovaGeolocation) {

                $scope.takePhoto = function () {
                  var options = {
                    quality: 75,
                    destinationType: Camera.DestinationType.DATA_URL,
                    sourceType: Camera.PictureSourceType.CAMERA,
                    allowEdit: true,
                    encodingType: Camera.EncodingType.JPEG,
                    targetWidth: 300,
                    targetHeight: 300,
                    popoverOptions: CameraPopoverOptions,
                    saveToPhotoAlbum: false
                };

                    $cordovaCamera.getPicture(options).then(function (imageData) {
                        $scope.imgURI = "data:image/jpeg;base64," + imageData;
                    }, function (err) {
                        // An error occured. Show a message to the user
                    });
                }


        //GPS
                var posOptions = {timeout: 10000, enableHighAccuracy: false};
                $cordovaGeolocation
                .getCurrentPosition(posOptions)
                .then(function (position) {
                   $scope.lat  = position.coords.latitude
                   $scope.long = position.coords.longitude
                   console.log($scope.lat + '   ' + $scope.long)
                }, function(err) {
                   console.log(err)
                });

                var watchOptions = {timeout : 3000, enableHighAccuracy: false};
                var watch = $cordovaGeolocation.watchPosition(watchOptions);

                watch.then(
                   null,
                   function(err) {
                      console.log(err)
                   },
                   function(position) {
                      $scope.lat  = position.coords.latitude
                      $scope.long = position.coords.longitude
                      console.log($scope.lat + '' + $scope.long)
                   }
                );

                watch.clearWatch();

});
