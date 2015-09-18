/*global cordova, module*/

module.exports = {
    create: function (data, successCallback, errorCallback) {
    	var obj = [data];
        cordova.exec(successCallback, errorCallback, "EWSHandler", "create", obj);
    }
};
