"use strict";

angular.module('config', [])

  .constant('ENV', {name:'development',apiUrl:'http://localhost:4000',siteUrl:'http://192.168.4.29:4000'})
  // .constant('ENV', {name:'development',apiUrl:'http://ec2-52-69-70-46.ap-northeast-1.compute.amazonaws.com:3002',siteUrl:'http://ec2-52-69-70-46.ap-northeast-1.compute.amazonaws.com:3002'})
