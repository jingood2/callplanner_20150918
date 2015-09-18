angular.module('callplanner.common')
.factory('FileUploadService', function($http, $cordovaFileTransfer) {
    return {
        uploadFile: function(container, file) {
            // var fd = new FormData();
            // fd.append('file', file);
            // console.log("Filename of greeting to be uploaded : " + file);
            // $http.post('http://192.168.4.29:3003/api/mentstorages/' + container + '/upload', fd, {
            //     transformRequest: angular.identity,
            //     headers: {'Content-Type': undefined}
            // })
            // .success(function(res){
            //   console.log("uploaded greeting. " + JSON.stringify(res))
            //   alert('Uploaded greeting successfully.');
            // })
            // .error(function(err){
            //   console.log("uploaded greeting. " + JSON.stringify(err))
            //   alert('Failed to uploading greeting file to server.');
            // });



            // $http({
            //     method: 'POST',
            //     url: 'http://192.168.4.29:3003/api/mentstorages/' + container + '/upload',
            //     headers: {
            //         'Content-Type': 'multipart/form-data'
            //     },
            //     data: {
            //         upload: file
            //     },
            //     transformRequest: function (data, headersGetter) {
            //         var formData = new FormData();
            //         angular.forEach(data, function (value, key) {
            //             console.log("key : " + key);
            //             console.log("value: " + value); 
            //             formData.append(key, value);
            //         });

            //         var headers = headersGetter();
            //         console.log("headers: " + JSON.stringify(headers));
            //         delete headers['Content-Type'];

            //         return formData;
            //     }
            // })
            // .success(function (data) {
            //     console.log("success to upload : " + JSON.stringify(data));
            // })
            // .error(function (data, status) {
            //     console.log("success to upload : " + JSON.stringify(data));
            // });

            var succ = function (r) {
                console.log("Code = " + r.responseCode);
                console.log("Response = " + r.response);
                console.log("Sent = " + r.bytesSent);
            }

            var fail = function (error) {
                alert("An error has occurred: Code = " + error.code);
                console.log("upload error source " + error.source);
                console.log("upload error target " + error.target);
            }

            var url = 'http://192.168.4.29:3003/api/mentstorages/' + container + '/upload';
            //target path may be local or url
            var targetPath = file;
            var filename = targetPath.split("/").pop();
            var options = {
                fileKey: "file",
                fileName: filename,
                chunkedMode: false,
                mimeType: "text/plain"
            };
            $cordovaFileTransfer.upload(url, targetPath, options).then(function(result) {
                console.log("SUCCESS: " + JSON.stringify(result.response));
                alert("success");
                alert(JSON.stringify(result.response));
            }, function(err) {
                console.log("ERROR: " + JSON.stringify(err));
                alert(JSON.stringify(err));
            });

            return;
        }
    }
});
