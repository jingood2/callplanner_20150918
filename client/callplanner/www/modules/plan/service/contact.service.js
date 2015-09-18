"use strict";
angular.module('callplanner.plan')
.factory('Contacts', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var contacts = [];
  var savedContacts = [];

  document.addEventListener("deviceready", init, false);

  function init() {
    console.log("called init");
    console.log(JSON.stringify(navigator));

    if(navigator.contactsPhoneNumbers === undefined) {
      savedContacts = [
      {
        name: "Kyunghun Kim",
        tel: "01042408370",
        checked : false,
        face: 'img/google-material.png',
        fromContacts: true
      },
      {
        name: "WanKyu Yu",
        tel: "01090323285",
        checked : false,
        face: 'img/google-material.png',
        fromContacts: true
      },
      {
        name: "JinYoung Kim",
        tel: "01044929599",
        checked : false,
        face: 'img/google-material.png',
        fromContacts: true
      },
      {
        name: "WonChang Shin",
        tel: "01089995723",
        checked : false,
        face: 'img/google-material.png',
        fromContacts: true
      },
      {
        name: "MinSoo Kim",
        tel: "01093645432",
        checked : false,
        face: 'img/google-material.png',
        fromContacts: true
      }
      ];
      contacts = JSON.parse(JSON.stringify(savedContacts));
      return;
    }

    navigator.contactsPhoneNumbers.list(function(contacts) {
      console.log(contacts.length + ' contacts found');
      savedContacts = [];
      for(var i = 0; i < contacts.length; i++) {
         for(var j = 0; j < contacts[i].phoneNumbers.length; j++) {
            var phone = contacts[i].phoneNumbers[j];
            savedContacts.push({
              name: contacts[i].displayName,
              tel: phone.number.replace(/[^0-9]/g,''),
              checked: false,
              face: contacts[i].photos != undefined && contacts[i].photos.length > 0 ? 
                contacts[i].photos[0] : 'img/google-material.png',
              fromContacts: true
            });
            break;
         }
      }
      function contactsSort(a, b) {
        if(a.name == b.name){ return 0} return  a.name > b.name ? 1 : -1;
      }
      savedContacts.sort(contactsSort);
      contacts = JSON.parse(JSON.stringify(savedContacts));
      contacts.sort(contactsSort);
   }, function(error) {
      console.error(error);
   });

  }

  function onError(contactError) {
    console.log('navigator error.');
  };
  
  return {

    getAll: function() {
      return savedContacts;
    },

    getForEdit: function() {
      contacts = JSON.parse(JSON.stringify(savedContacts));
      return contacts;
    },

    check: function(tel) {
      var found = false;
      for(var i=0 ; i<savedContacts.length ; i++) {
        
        if(savedContacts[i].tel == tel) {
          if(savedContacts[i].fromContacts) {
            savedContacts[i].checked = true;
            found = true;
          }
        }
      }
      if(!found) {
        savedContacts.push(
          {
            name: '',
            tel: tel,
            face: 'img/google-material.png',
            checked: true,
            fromContacts: false
          });
      }
    },

    uncheck: function(tel) {
      for(var i=0 ; i<savedContacts.length ; i++) {
        if(savedContacts[i].tel == tel) {
          if(savedContacts[i].fromContacts) {
            savedContacts[i].checked = false;
          }
          else 
            savedContacts.splice(i,1);
        }
      }
    },
    uncheckFromTemp: function(tel) {
      for(var i=0 ; i<contacts.length ; i++) {
        if(contacts[i].tel == tel) {
          if(contacts[i].fromContacts) {
            contacts[i].checked = false;
          }
          else 
            contacts.splice(i,1);
        }
      }
    },

    revert: function() {
      contacts = JSON.parse(JSON.stringify(savedContacts));
    },
    
    clear: function() {
      init();
    },
    apply: function() {
      savedContacts = JSON.parse(JSON.stringify(contacts));
    }
  }
})
.directive('ionSearch', function() {
    return {
        restrict: 'E',
        replace: true,
        scope: {
            getData: '&source',
            model: '=?',
            search: '=?filter'
        },
        link: function(scope, element, attrs) {
            attrs.minLength = attrs.minLength || 0;
            scope.placeholder = attrs.placeholder || '';
            scope.search = {value: ''};

            if (attrs.class)
                element.addClass(attrs.class);

            if (attrs.source) {
                scope.$watch('search.value', function (newValue, oldValue) {
                    if (newValue.length > attrs.minLength) {
                        scope.getData({str: newValue}).then(function (results) {
                            scope.model = results;
                        });
                    } else {
                        scope.model = [];
                    }
                });
            }

            scope.clearSearch = function() {
                scope.search.value = '';
            };
        },
        template: '<div class="item-input-wrapper">' +
                    '<i class="icon ion-android-search"></i>' +
                    '<input type="search" placeholder="{{placeholder}}" ng-model="search.value">' +
                    '<i ng-if="search.value.length > 0" ng-click="clearSearch()" class="icon ion-close"></i>' +
                  '</div>'
    };
});