"use strict";
angular.module('callplanner.user')
.factory('AppAuth', function($cookies, Subscriber, LoopBackAuth, $http){

    return {

     login: function(data, cb){
       var self = data;

       LoopBackAuth.currentUserId = LoopBackAuth.accessTokenId = null;
       $http.post('/Subscribers/login?include=user', {
         email: data.email,
         password: data.password,
         tel: data.tel
       }).then(function(response){

         // login success
         if(response.data && response.data.id){
           LoopBackAuth.currentUserId = response.data.userId;
           LoopBackAuth.accessTokenId = response.data.id;
         }
         if(LoopBackAuth.currentUserId === null) {
           delete $cookies['access_token'];
           LoopBackAuth.accessTokenId = null;
         }

         LoopBackAuth.save();
         if(LoopBackAuth.currentUserId && response.data && response.data.user) {
           self.currentUser = response.data.user;
           cb(self.currentUser);
         } else {
           cb({});
         };

       },function(){

         // login request error
         console.log('Subscriber.login() error', arguments);
         LoopBackAuth.currentUserId = LoopBackAuth.accessTokenId = null;
         LoopBackAuth.save();
         cb({});
       });
     },

     logout: function() {

     },

     ensureHasCurrentUser: function(cb) {

     }
    }

});