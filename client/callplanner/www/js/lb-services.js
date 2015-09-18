(function(window, angular, undefined) {

'use strict';

// var urlBase = "/api/v2";
var urlBase = "http://192.168.4.29:4000/api/v2";
var authHeader = 'authorization';

/**
 * @ngdoc overview
 * @name lbServices
 * @module
 * @description
 *
 * The `lbServices` module provides services for interacting with
 * the models exposed by the LoopBack server via the REST API.
 *
 */
var module = angular.module("lbServices", ['ngResource']);

//var module = angular.module('callplannerApp');

/**
 * @ngdoc object
 * @name lbServices.Subscriber
 * @header lbServices.Subscriber
 * @object
 *
 * @description
 *
 * A $resource object for interacting with the `Subscriber` model.
 *
 * ## Example
 *
 * See
 * {@link http://docs.angularjs.org/api/ngResource.$resource#example $resource}
 * for an example of using this object.
 *
 */
module.factory(
  "Subscriber",
  ['LoopBackResource', 'LoopBackAuth', '$injector', function(Resource, LoopBackAuth, $injector) {
    var R = Resource(
      urlBase + "/Subscribers/:id",
      { 'id': '@id' },
      {

        /**
         * @ngdoc method
         * @name lbServices.Subscriber#prototype$__findById__accessTokens
         * @methodOf lbServices.Subscriber
         *
         * @description
         *
         * Find a related item by id for accessTokens.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - User id
         *
         *  - `fk` – `{*}` - Foreign key for accessTokens
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Subscriber` object.)
         * </em>
         */
        "prototype$__findById__accessTokens": {
          url: urlBase + "/Subscribers/:id/accessTokens/:fk",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.Subscriber#prototype$__destroyById__accessTokens
         * @methodOf lbServices.Subscriber
         *
         * @description
         *
         * Delete a related item by id for accessTokens.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - User id
         *
         *  - `fk` – `{*}` - Foreign key for accessTokens
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        "prototype$__destroyById__accessTokens": {
          url: urlBase + "/Subscribers/:id/accessTokens/:fk",
          method: "DELETE"
        },

        /**
         * @ngdoc method
         * @name lbServices.Subscriber#prototype$__updateById__accessTokens
         * @methodOf lbServices.Subscriber
         *
         * @description
         *
         * Update a related item by id for accessTokens.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - User id
         *
         *  - `fk` – `{*}` - Foreign key for accessTokens
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Subscriber` object.)
         * </em>
         */
        "prototype$__updateById__accessTokens": {
          url: urlBase + "/Subscribers/:id/accessTokens/:fk",
          method: "PUT"
        },

        // INTERNAL. Use Subscriber.plans.findById() instead.
        "prototype$__findById__plans": {
          url: urlBase + "/Subscribers/:id/plans/:fk",
          method: "GET"
        },

        // INTERNAL. Use Subscriber.plans.destroyById() instead.
        "prototype$__destroyById__plans": {
          url: urlBase + "/Subscribers/:id/plans/:fk",
          method: "DELETE"
        },

        // INTERNAL. Use Subscriber.plans.updateById() instead.
        "prototype$__updateById__plans": {
          url: urlBase + "/Subscribers/:id/plans/:fk",
          method: "PUT"
        },

        // INTERNAL. Use Subscriber.attendees.findById() instead.
        "prototype$__findById__attendees": {
          url: urlBase + "/Subscribers/:id/attendees/:fk",
          method: "GET"
        },

        // INTERNAL. Use Subscriber.attendees.destroyById() instead.
        "prototype$__destroyById__attendees": {
          url: urlBase + "/Subscribers/:id/attendees/:fk",
          method: "DELETE"
        },

        // INTERNAL. Use Subscriber.attendees.updateById() instead.
        "prototype$__updateById__attendees": {
          url: urlBase + "/Subscribers/:id/attendees/:fk",
          method: "PUT"
        },

        // INTERNAL. Use Subscriber.histories.findById() instead.
        "prototype$__findById__histories": {
          url: urlBase + "/Subscribers/:id/histories/:fk",
          method: "GET"
        },

        // INTERNAL. Use Subscriber.histories.destroyById() instead.
        "prototype$__destroyById__histories": {
          url: urlBase + "/Subscribers/:id/histories/:fk",
          method: "DELETE"
        },

        // INTERNAL. Use Subscriber.histories.updateById() instead.
        "prototype$__updateById__histories": {
          url: urlBase + "/Subscribers/:id/histories/:fk",
          method: "PUT"
        },

        /**
         * @ngdoc method
         * @name lbServices.Subscriber#prototype$__get__accessTokens
         * @methodOf lbServices.Subscriber
         *
         * @description
         *
         * Queries accessTokens of Subscriber.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - User id
         *
         *  - `filter` – `{object=}` -
         *
         * @param {function(Array.<Object>,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Array.<Object>} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Subscriber` object.)
         * </em>
         */
        "prototype$__get__accessTokens": {
          isArray: true,
          url: urlBase + "/Subscribers/:id/accessTokens",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.Subscriber#prototype$__create__accessTokens
         * @methodOf lbServices.Subscriber
         *
         * @description
         *
         * Creates a new instance in accessTokens of this model.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - User id
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Subscriber` object.)
         * </em>
         */
        "prototype$__create__accessTokens": {
          url: urlBase + "/Subscribers/:id/accessTokens",
          method: "POST"
        },

        /**
         * @ngdoc method
         * @name lbServices.Subscriber#prototype$__delete__accessTokens
         * @methodOf lbServices.Subscriber
         *
         * @description
         *
         * Deletes all accessTokens of this model.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - User id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        "prototype$__delete__accessTokens": {
          url: urlBase + "/Subscribers/:id/accessTokens",
          method: "DELETE"
        },

        /**
         * @ngdoc method
         * @name lbServices.Subscriber#prototype$__count__accessTokens
         * @methodOf lbServices.Subscriber
         *
         * @description
         *
         * Counts accessTokens of Subscriber.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - User id
         *
         *  - `where` – `{object=}` - Criteria to match model instances
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `count` – `{number=}` -
         */
        "prototype$__count__accessTokens": {
          url: urlBase + "/Subscribers/:id/accessTokens/count",
          method: "GET"
        },

        // INTERNAL. Use Subscriber.plans() instead.
        "prototype$__get__plans": {
          isArray: true,
          url: urlBase + "/Subscribers/:id/plans",
          method: "GET"
        },

        // INTERNAL. Use Subscriber.plans.create() instead.
        "prototype$__create__plans": {
          url: urlBase + "/Subscribers/:id/plans",
          method: "POST"
        },

        // INTERNAL. Use Subscriber.plans.destroyAll() instead.
        "prototype$__delete__plans": {
          url: urlBase + "/Subscribers/:id/plans",
          method: "DELETE"
        },

        // INTERNAL. Use Subscriber.plans.count() instead.
        "prototype$__count__plans": {
          url: urlBase + "/Subscribers/:id/plans/count",
          method: "GET"
        },

        // INTERNAL. Use Subscriber.attendees() instead.
        "prototype$__get__attendees": {
          isArray: true,
          url: urlBase + "/Subscribers/:id/attendees",
          method: "GET"
        },

        // INTERNAL. Use Subscriber.attendees.create() instead.
        "prototype$__create__attendees": {
          url: urlBase + "/Subscribers/:id/attendees",
          method: "POST"
        },

        // INTERNAL. Use Subscriber.attendees.destroyAll() instead.
        "prototype$__delete__attendees": {
          url: urlBase + "/Subscribers/:id/attendees",
          method: "DELETE"
        },

        // INTERNAL. Use Subscriber.attendees.count() instead.
        "prototype$__count__attendees": {
          url: urlBase + "/Subscribers/:id/attendees/count",
          method: "GET"
        },

        // INTERNAL. Use Subscriber.histories() instead.
        "prototype$__get__histories": {
          isArray: true,
          url: urlBase + "/Subscribers/:id/histories",
          method: "GET"
        },

        // INTERNAL. Use Subscriber.histories.create() instead.
        "prototype$__create__histories": {
          url: urlBase + "/Subscribers/:id/histories",
          method: "POST"
        },

        // INTERNAL. Use Subscriber.histories.destroyAll() instead.
        "prototype$__delete__histories": {
          url: urlBase + "/Subscribers/:id/histories",
          method: "DELETE"
        },

        // INTERNAL. Use Subscriber.histories.count() instead.
        "prototype$__count__histories": {
          url: urlBase + "/Subscribers/:id/histories/count",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.Subscriber#create
         * @methodOf lbServices.Subscriber
         *
         * @description
         *
         * Create a new instance of the model and persist it into the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Subscriber` object.)
         * </em>
         */
        "create": {
          url: urlBase + "/Subscribers",
          method: "POST"
        },

        /**
         * @ngdoc method
         * @name lbServices.Subscriber#upsert
         * @methodOf lbServices.Subscriber
         *
         * @description
         *
         * Update an existing model instance or insert a new one into the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Subscriber` object.)
         * </em>
         */
        "upsert": {
          url: urlBase + "/Subscribers",
          method: "PUT"
        },

        /**
         * @ngdoc method
         * @name lbServices.Subscriber#exists
         * @methodOf lbServices.Subscriber
         *
         * @description
         *
         * Check whether a model instance exists in the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `exists` – `{boolean=}` -
         */
        "exists": {
          url: urlBase + "/Subscribers/:id/exists",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.Subscriber#findById
         * @methodOf lbServices.Subscriber
         *
         * @description
         *
         * Find a model instance by id from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         *  - `filter` – `{object=}` - Filter defining fields and include
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Subscriber` object.)
         * </em>
         */
        "findById": {
          url: urlBase + "/Subscribers/:id",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.Subscriber#find
         * @methodOf lbServices.Subscriber
         *
         * @description
         *
         * Find all instances of the model matched by filter from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `filter` – `{object=}` - Filter defining fields, where, include, order, offset, and limit
         *
         * @param {function(Array.<Object>,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Array.<Object>} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Subscriber` object.)
         * </em>
         */
        "find": {
          isArray: true,
          url: urlBase + "/Subscribers",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.Subscriber#findOne
         * @methodOf lbServices.Subscriber
         *
         * @description
         *
         * Find first instance of the model matched by filter from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `filter` – `{object=}` - Filter defining fields, where, include, order, offset, and limit
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Subscriber` object.)
         * </em>
         */
        "findOne": {
          url: urlBase + "/Subscribers/findOne",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.Subscriber#updateAll
         * @methodOf lbServices.Subscriber
         *
         * @description
         *
         * Update instances of the model matched by where from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `where` – `{object=}` - Criteria to match model instances
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        "updateAll": {
          url: urlBase + "/Subscribers/update",
          method: "POST"
        },

        /**
         * @ngdoc method
         * @name lbServices.Subscriber#deleteById
         * @methodOf lbServices.Subscriber
         *
         * @description
         *
         * Delete a model instance by id from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        "deleteById": {
          url: urlBase + "/Subscribers/:id",
          method: "DELETE"
        },

        /**
         * @ngdoc method
         * @name lbServices.Subscriber#count
         * @methodOf lbServices.Subscriber
         *
         * @description
         *
         * Count instances of the model matched by where from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `where` – `{object=}` - Criteria to match model instances
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `count` – `{number=}` -
         */
        "count": {
          url: urlBase + "/Subscribers/count",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.Subscriber#prototype$updateAttributes
         * @methodOf lbServices.Subscriber
         *
         * @description
         *
         * Update attributes for a model instance and persist it into the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - User id
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Subscriber` object.)
         * </em>
         */
        "prototype$updateAttributes": {
          url: urlBase + "/Subscribers/:id",
          method: "PUT"
        },

        /**
         * @ngdoc method
         * @name lbServices.Subscriber#login
         * @methodOf lbServices.Subscriber
         *
         * @description
         *
         * Login a user with username/email and password.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `include` – `{string=}` - Related objects to include in the response. See the description of return value for more details.
         *   Default value: `user`.
         *
         *  - `rememberMe` - `boolean` - Whether the authentication credentials
         *     should be remembered in localStorage across app/browser restarts.
         *     Default: `true`.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * The response body contains properties of the AccessToken created on login.
         * Depending on the value of `include` parameter, the body may contain additional properties:
         *
         *   - `user` - `{User}` - Data of the currently logged in user. (`include=user`)
         *
         *
         */
        "login": {
          params: {
            include: "user"
          },
          interceptor: {
            response: function(response) {
              var accessToken = response.data;
              LoopBackAuth.setUser(accessToken.id, accessToken.userId, accessToken.user);
              LoopBackAuth.rememberMe = response.config.params.rememberMe !== false;
              LoopBackAuth.save();
              return response.resource;
            }
          },
          url: urlBase + "/Subscribers/login",
          method: "POST"
        },

        /**
         * @ngdoc method
         * @name lbServices.Subscriber#logout
         * @methodOf lbServices.Subscriber
         *
         * @description
         *
         * Logout a user with access token
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         *  - `access_token` – `{string}` - Do not supply this argument, it is automatically extracted from request headers.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        "logout": {
          interceptor: {
            response: function(response) {
              LoopBackAuth.clearUser();
              LoopBackAuth.clearStorage();
              return response.resource;
            }
          },
          url: urlBase + "/Subscribers/logout",
          method: "POST"
        },

        /**
         * @ngdoc method
         * @name lbServices.Subscriber#confirm
         * @methodOf lbServices.Subscriber
         *
         * @description
         *
         * Confirm a user registration with email verification token
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `uid` – `{string}` -
         *
         *  - `token` – `{string}` -
         *
         *  - `redirect` – `{string=}` -
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        "confirm": {
          url: urlBase + "/Subscribers/confirm",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.Subscriber#resetPassword
         * @methodOf lbServices.Subscriber
         *
         * @description
         *
         * Reset password for a user with email
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        "resetPassword": {
          url: urlBase + "/Subscribers/reset",
          method: "POST"
        },

        // INTERNAL. Use Plan.subscriber() instead.
        "::get::Plan::subscriber": {
          url: urlBase + "/Plans/:id/subscriber",
          method: "GET"
        },

        // INTERNAL. Use Attendee.subscriber() instead.
        "::get::Attendee::subscriber": {
          url: urlBase + "/Attendees/:id/subscriber",
          method: "GET"
        },

        // INTERNAL. Use History.subscriber() instead.
        "::get::History::subscriber": {
          url: urlBase + "/Histories/:id/subscriber",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.Subscriber#getCurrent
         * @methodOf lbServices.Subscriber
         *
         * @description
         *
         * Get data of the currently logged user. Fail with HTTP result 401
         * when there is no user logged in.
         *
         * @param {function(Object,Object)=} successCb
         *    Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *    `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         */
        "getCurrent": {
           url: urlBase + "/Subscribers" + "/:id",
           method: "GET",
           params: {
             id: function() {
              var id = LoopBackAuth.currentUserId;
              if (id == null) id = '__anonymous__';
              return id;
            },
          },
          interceptor: {
            response: function(response) {
              LoopBackAuth.currentUserData = response.data;
              return response.resource;
            }
          },
          __isGetCurrentUser__ : true
        }
      }
    );



        /**
         * @ngdoc method
         * @name lbServices.Subscriber#updateOrCreate
         * @methodOf lbServices.Subscriber
         *
         * @description
         *
         * Update an existing model instance or insert a new one into the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Subscriber` object.)
         * </em>
         */
        R["updateOrCreate"] = R["upsert"];

        /**
         * @ngdoc method
         * @name lbServices.Subscriber#update
         * @methodOf lbServices.Subscriber
         *
         * @description
         *
         * Update instances of the model matched by where from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `where` – `{object=}` - Criteria to match model instances
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        R["update"] = R["updateAll"];

        /**
         * @ngdoc method
         * @name lbServices.Subscriber#destroyById
         * @methodOf lbServices.Subscriber
         *
         * @description
         *
         * Delete a model instance by id from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        R["destroyById"] = R["deleteById"];

        /**
         * @ngdoc method
         * @name lbServices.Subscriber#removeById
         * @methodOf lbServices.Subscriber
         *
         * @description
         *
         * Delete a model instance by id from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        R["removeById"] = R["deleteById"];

        /**
         * @ngdoc method
         * @name lbServices.Subscriber#getCachedCurrent
         * @methodOf lbServices.Subscriber
         *
         * @description
         *
         * Get data of the currently logged user that was returned by the last
         * call to {@link lbServices.Subscriber#login} or
         * {@link lbServices.Subscriber#getCurrent}. Return null when there
         * is no user logged in or the data of the current user were not fetched
         * yet.
         *
         * @returns {Object} A Subscriber instance.
         */
        R.getCachedCurrent = function() {
          var data = LoopBackAuth.currentUserData;
          return data ? new R(data) : null;
        };

        /**
         * @ngdoc method
         * @name lbServices.Subscriber#isAuthenticated
         * @methodOf lbServices.Subscriber
         *
         * @returns {boolean} True if the current user is authenticated (logged in).
         */
        R.isAuthenticated = function() {
          return this.getCurrentId() != null;
        };

        /**
         * @ngdoc method
         * @name lbServices.Subscriber#getCurrentId
         * @methodOf lbServices.Subscriber
         *
         * @returns {Object} Id of the currently logged-in user or null.
         */
        R.getCurrentId = function() {
          return LoopBackAuth.currentUserId;
        };

    /**
    * @ngdoc property
    * @name lbServices.Subscriber#modelName
    * @propertyOf lbServices.Subscriber
    * @description
    * The name of the model represented by this $resource,
    * i.e. `Subscriber`.
    */
    R.modelName = "Subscriber";

    /**
     * @ngdoc object
     * @name lbServices.Subscriber.plans
     * @header lbServices.Subscriber.plans
     * @object
     * @description
     *
     * The object `Subscriber.plans` groups methods
     * manipulating `Plan` instances related to `Subscriber`.
     *
     * Call {@link lbServices.Subscriber#plans Subscriber.plans()}
     * to query all related instances.
     */


        /**
         * @ngdoc method
         * @name lbServices.Subscriber#plans
         * @methodOf lbServices.Subscriber
         *
         * @description
         *
         * Queries plans of Subscriber.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - User id
         *
         *  - `filter` – `{object=}` -
         *
         * @param {function(Array.<Object>,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Array.<Object>} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Plan` object.)
         * </em>
         */
        R.plans = function() {
          var TargetResource = $injector.get("Plan");
          var action = TargetResource["::get::Subscriber::plans"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.Subscriber.plans#count
         * @methodOf lbServices.Subscriber.plans
         *
         * @description
         *
         * Counts plans of Subscriber.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - User id
         *
         *  - `where` – `{object=}` - Criteria to match model instances
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `count` – `{number=}` -
         */
        R.plans.count = function() {
          var TargetResource = $injector.get("Plan");
          var action = TargetResource["::count::Subscriber::plans"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.Subscriber.plans#create
         * @methodOf lbServices.Subscriber.plans
         *
         * @description
         *
         * Creates a new instance in plans of this model.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - User id
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Plan` object.)
         * </em>
         */
        R.plans.create = function() {
          var TargetResource = $injector.get("Plan");
          var action = TargetResource["::create::Subscriber::plans"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.Subscriber.plans#destroyAll
         * @methodOf lbServices.Subscriber.plans
         *
         * @description
         *
         * Deletes all plans of this model.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - User id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        R.plans.destroyAll = function() {
          var TargetResource = $injector.get("Plan");
          var action = TargetResource["::delete::Subscriber::plans"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.Subscriber.plans#destroyById
         * @methodOf lbServices.Subscriber.plans
         *
         * @description
         *
         * Delete a related item by id for plans.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - User id
         *
         *  - `fk` – `{*}` - Foreign key for plans
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        R.plans.destroyById = function() {
          var TargetResource = $injector.get("Plan");
          var action = TargetResource["::destroyById::Subscriber::plans"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.Subscriber.plans#findById
         * @methodOf lbServices.Subscriber.plans
         *
         * @description
         *
         * Find a related item by id for plans.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - User id
         *
         *  - `fk` – `{*}` - Foreign key for plans
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Plan` object.)
         * </em>
         */
        R.plans.findById = function() {
          var TargetResource = $injector.get("Plan");
          var action = TargetResource["::findById::Subscriber::plans"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.Subscriber.plans#updateById
         * @methodOf lbServices.Subscriber.plans
         *
         * @description
         *
         * Update a related item by id for plans.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - User id
         *
         *  - `fk` – `{*}` - Foreign key for plans
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Plan` object.)
         * </em>
         */
        R.plans.updateById = function() {
          var TargetResource = $injector.get("Plan");
          var action = TargetResource["::updateById::Subscriber::plans"];
          return action.apply(R, arguments);
        };
    /**
     * @ngdoc object
     * @name lbServices.Subscriber.attendees
     * @header lbServices.Subscriber.attendees
     * @object
     * @description
     *
     * The object `Subscriber.attendees` groups methods
     * manipulating `Attendee` instances related to `Subscriber`.
     *
     * Call {@link lbServices.Subscriber#attendees Subscriber.attendees()}
     * to query all related instances.
     */


        /**
         * @ngdoc method
         * @name lbServices.Subscriber#attendees
         * @methodOf lbServices.Subscriber
         *
         * @description
         *
         * Queries attendees of Subscriber.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - User id
         *
         *  - `filter` – `{object=}` -
         *
         * @param {function(Array.<Object>,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Array.<Object>} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Attendee` object.)
         * </em>
         */
        R.attendees = function() {
          var TargetResource = $injector.get("Attendee");
          var action = TargetResource["::get::Subscriber::attendees"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.Subscriber.attendees#count
         * @methodOf lbServices.Subscriber.attendees
         *
         * @description
         *
         * Counts attendees of Subscriber.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - User id
         *
         *  - `where` – `{object=}` - Criteria to match model instances
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `count` – `{number=}` -
         */
        R.attendees.count = function() {
          var TargetResource = $injector.get("Attendee");
          var action = TargetResource["::count::Subscriber::attendees"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.Subscriber.attendees#create
         * @methodOf lbServices.Subscriber.attendees
         *
         * @description
         *
         * Creates a new instance in attendees of this model.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - User id
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Attendee` object.)
         * </em>
         */
        R.attendees.create = function() {
          var TargetResource = $injector.get("Attendee");
          var action = TargetResource["::create::Subscriber::attendees"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.Subscriber.attendees#destroyAll
         * @methodOf lbServices.Subscriber.attendees
         *
         * @description
         *
         * Deletes all attendees of this model.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - User id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        R.attendees.destroyAll = function() {
          var TargetResource = $injector.get("Attendee");
          var action = TargetResource["::delete::Subscriber::attendees"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.Subscriber.attendees#destroyById
         * @methodOf lbServices.Subscriber.attendees
         *
         * @description
         *
         * Delete a related item by id for attendees.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - User id
         *
         *  - `fk` – `{*}` - Foreign key for attendees
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        R.attendees.destroyById = function() {
          var TargetResource = $injector.get("Attendee");
          var action = TargetResource["::destroyById::Subscriber::attendees"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.Subscriber.attendees#findById
         * @methodOf lbServices.Subscriber.attendees
         *
         * @description
         *
         * Find a related item by id for attendees.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - User id
         *
         *  - `fk` – `{*}` - Foreign key for attendees
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Attendee` object.)
         * </em>
         */
        R.attendees.findById = function() {
          var TargetResource = $injector.get("Attendee");
          var action = TargetResource["::findById::Subscriber::attendees"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.Subscriber.attendees#updateById
         * @methodOf lbServices.Subscriber.attendees
         *
         * @description
         *
         * Update a related item by id for attendees.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - User id
         *
         *  - `fk` – `{*}` - Foreign key for attendees
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Attendee` object.)
         * </em>
         */
        R.attendees.updateById = function() {
          var TargetResource = $injector.get("Attendee");
          var action = TargetResource["::updateById::Subscriber::attendees"];
          return action.apply(R, arguments);
        };
    /**
     * @ngdoc object
     * @name lbServices.Subscriber.histories
     * @header lbServices.Subscriber.histories
     * @object
     * @description
     *
     * The object `Subscriber.histories` groups methods
     * manipulating `History` instances related to `Subscriber`.
     *
     * Call {@link lbServices.Subscriber#histories Subscriber.histories()}
     * to query all related instances.
     */


        /**
         * @ngdoc method
         * @name lbServices.Subscriber#histories
         * @methodOf lbServices.Subscriber
         *
         * @description
         *
         * Queries histories of Subscriber.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - User id
         *
         *  - `filter` – `{object=}` -
         *
         * @param {function(Array.<Object>,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Array.<Object>} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `History` object.)
         * </em>
         */
        R.histories = function() {
          var TargetResource = $injector.get("History");
          var action = TargetResource["::get::Subscriber::histories"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.Subscriber.histories#count
         * @methodOf lbServices.Subscriber.histories
         *
         * @description
         *
         * Counts histories of Subscriber.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - User id
         *
         *  - `where` – `{object=}` - Criteria to match model instances
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `count` – `{number=}` -
         */
        R.histories.count = function() {
          var TargetResource = $injector.get("History");
          var action = TargetResource["::count::Subscriber::histories"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.Subscriber.histories#create
         * @methodOf lbServices.Subscriber.histories
         *
         * @description
         *
         * Creates a new instance in histories of this model.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - User id
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `History` object.)
         * </em>
         */
        R.histories.create = function() {
          var TargetResource = $injector.get("History");
          var action = TargetResource["::create::Subscriber::histories"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.Subscriber.histories#destroyAll
         * @methodOf lbServices.Subscriber.histories
         *
         * @description
         *
         * Deletes all histories of this model.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - User id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        R.histories.destroyAll = function() {
          var TargetResource = $injector.get("History");
          var action = TargetResource["::delete::Subscriber::histories"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.Subscriber.histories#destroyById
         * @methodOf lbServices.Subscriber.histories
         *
         * @description
         *
         * Delete a related item by id for histories.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - User id
         *
         *  - `fk` – `{*}` - Foreign key for histories
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        R.histories.destroyById = function() {
          var TargetResource = $injector.get("History");
          var action = TargetResource["::destroyById::Subscriber::histories"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.Subscriber.histories#findById
         * @methodOf lbServices.Subscriber.histories
         *
         * @description
         *
         * Find a related item by id for histories.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - User id
         *
         *  - `fk` – `{*}` - Foreign key for histories
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `History` object.)
         * </em>
         */
        R.histories.findById = function() {
          var TargetResource = $injector.get("History");
          var action = TargetResource["::findById::Subscriber::histories"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.Subscriber.histories#updateById
         * @methodOf lbServices.Subscriber.histories
         *
         * @description
         *
         * Update a related item by id for histories.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - User id
         *
         *  - `fk` – `{*}` - Foreign key for histories
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `History` object.)
         * </em>
         */
        R.histories.updateById = function() {
          var TargetResource = $injector.get("History");
          var action = TargetResource["::updateById::Subscriber::histories"];
          return action.apply(R, arguments);
        };

    return R;
  }]);

/**
 * @ngdoc object
 * @name lbServices.Plan
 * @header lbServices.Plan
 * @object
 *
 * @description
 *
 * A $resource object for interacting with the `Plan` model.
 *
 * ## Example
 *
 * See
 * {@link http://docs.angularjs.org/api/ngResource.$resource#example $resource}
 * for an example of using this object.
 *
 */
module.factory(
  "Plan",
  ['LoopBackResource', 'LoopBackAuth', '$injector', function(Resource, LoopBackAuth, $injector) {
    var R = Resource(
      urlBase + "/Plans/:id",
      { 'id': '@id' },
      {

        // INTERNAL. Use Plan.subscriber() instead.
        "prototype$__get__subscriber": {
          url: urlBase + "/Plans/:id/subscriber",
          method: "GET"
        },

        // INTERNAL. Use Plan.attendees.findById() instead.
        "prototype$__findById__attendees": {
          url: urlBase + "/Plans/:id/attendees/:fk",
          method: "GET"
        },

        // INTERNAL. Use Plan.attendees.destroyById() instead.
        "prototype$__destroyById__attendees": {
          url: urlBase + "/Plans/:id/attendees/:fk",
          method: "DELETE"
        },

        // INTERNAL. Use Plan.attendees.updateById() instead.
        "prototype$__updateById__attendees": {
          url: urlBase + "/Plans/:id/attendees/:fk",
          method: "PUT"
        },

        // INTERNAL. Use Plan.attendees() instead.
        "prototype$__get__attendees": {
          isArray: true,
          url: urlBase + "/Plans/:id/attendees",
          method: "GET"
        },

        // INTERNAL. Use Plan.attendees.create() instead.
        "prototype$__create__attendees": {
          url: urlBase + "/Plans/:id/attendees",
          method: "POST"
        },

        // INTERNAL. Use Plan.attendees.destroyAll() instead.
        "prototype$__delete__attendees": {
          url: urlBase + "/Plans/:id/attendees",
          method: "DELETE"
        },

        // INTERNAL. Use Plan.attendees.count() instead.
        "prototype$__count__attendees": {
          url: urlBase + "/Plans/:id/attendees/count",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.Plan#create
         * @methodOf lbServices.Plan
         *
         * @description
         *
         * Create a new instance of the model and persist it into the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Plan` object.)
         * </em>
         */
        "create": {
          url: urlBase + "/Plans",
          method: "POST"
        },

        /**
         * @ngdoc method
         * @name lbServices.Plan#upsert
         * @methodOf lbServices.Plan
         *
         * @description
         *
         * Update an existing model instance or insert a new one into the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Plan` object.)
         * </em>
         */
        "upsert": {
          url: urlBase + "/Plans",
          method: "PUT"
        },

        /**
         * @ngdoc method
         * @name lbServices.Plan#exists
         * @methodOf lbServices.Plan
         *
         * @description
         *
         * Check whether a model instance exists in the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `exists` – `{boolean=}` -
         */
        "exists": {
          url: urlBase + "/Plans/:id/exists",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.Plan#findById
         * @methodOf lbServices.Plan
         *
         * @description
         *
         * Find a model instance by id from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         *  - `filter` – `{object=}` - Filter defining fields and include
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Plan` object.)
         * </em>
         */
        "findById": {
          url: urlBase + "/Plans/:id",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.Plan#find
         * @methodOf lbServices.Plan
         *
         * @description
         *
         * Find all instances of the model matched by filter from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `filter` – `{object=}` - Filter defining fields, where, include, order, offset, and limit
         *
         * @param {function(Array.<Object>,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Array.<Object>} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Plan` object.)
         * </em>
         */
        "find": {
          isArray: true,
          url: urlBase + "/Plans",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.Plan#findOne
         * @methodOf lbServices.Plan
         *
         * @description
         *
         * Find first instance of the model matched by filter from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `filter` – `{object=}` - Filter defining fields, where, include, order, offset, and limit
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Plan` object.)
         * </em>
         */
        "findOne": {
          url: urlBase + "/Plans/findOne",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.Plan#updateAll
         * @methodOf lbServices.Plan
         *
         * @description
         *
         * Update instances of the model matched by where from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `where` – `{object=}` - Criteria to match model instances
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        "updateAll": {
          url: urlBase + "/Plans/update",
          method: "POST"
        },

        /**
         * @ngdoc method
         * @name lbServices.Plan#deleteById
         * @methodOf lbServices.Plan
         *
         * @description
         *
         * Delete a model instance by id from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        "deleteById": {
          url: urlBase + "/Plans/:id",
          method: "DELETE"
        },

        /**
         * @ngdoc method
         * @name lbServices.Plan#count
         * @methodOf lbServices.Plan
         *
         * @description
         *
         * Count instances of the model matched by where from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `where` – `{object=}` - Criteria to match model instances
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `count` – `{number=}` -
         */
        "count": {
          url: urlBase + "/Plans/count",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.Plan#prototype$updateAttributes
         * @methodOf lbServices.Plan
         *
         * @description
         *
         * Update attributes for a model instance and persist it into the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Plan` object.)
         * </em>
         */
        "prototype$updateAttributes": {
          url: urlBase + "/Plans/:id",
          method: "PUT"
        },

        /**
         * @ngdoc method
         * @name lbServices.Plan#listPlans
         * @methodOf lbServices.Plan
         *
         * @description
         *
         * <em>
         * (The remote method definition does not provide any description.)
         * </em>
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `request` – `{object=}` -
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `listPlans` – `{*=}` -
         */
        "listPlans": {
          url: urlBase + "/Plans/listPlans",
          method: "GET"
        },

        // INTERNAL. Use Subscriber.plans.findById() instead.
        "::findById::Subscriber::plans": {
          url: urlBase + "/Subscribers/:id/plans/:fk",
          method: "GET"
        },

        // INTERNAL. Use Subscriber.plans.destroyById() instead.
        "::destroyById::Subscriber::plans": {
          url: urlBase + "/Subscribers/:id/plans/:fk",
          method: "DELETE"
        },

        // INTERNAL. Use Subscriber.plans.updateById() instead.
        "::updateById::Subscriber::plans": {
          url: urlBase + "/Subscribers/:id/plans/:fk",
          method: "PUT"
        },

        // INTERNAL. Use Subscriber.plans() instead.
        "::get::Subscriber::plans": {
          isArray: true,
          url: urlBase + "/Subscribers/:id/plans",
          method: "GET"
        },

        // INTERNAL. Use Subscriber.plans.create() instead.
        "::create::Subscriber::plans": {
          url: urlBase + "/Subscribers/:id/plans",
          method: "POST"
        },

        // INTERNAL. Use Subscriber.plans.destroyAll() instead.
        "::delete::Subscriber::plans": {
          url: urlBase + "/Subscribers/:id/plans",
          method: "DELETE"
        },

        // INTERNAL. Use Subscriber.plans.count() instead.
        "::count::Subscriber::plans": {
          url: urlBase + "/Subscribers/:id/plans/count",
          method: "GET"
        },

        // INTERNAL. Use Attendee.plan() instead.
        "::get::Attendee::plan": {
          url: urlBase + "/Attendees/:id/plan",
          method: "GET"
        },
      }
    );



        /**
         * @ngdoc method
         * @name lbServices.Plan#updateOrCreate
         * @methodOf lbServices.Plan
         *
         * @description
         *
         * Update an existing model instance or insert a new one into the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Plan` object.)
         * </em>
         */
        R["updateOrCreate"] = R["upsert"];

        /**
         * @ngdoc method
         * @name lbServices.Plan#update
         * @methodOf lbServices.Plan
         *
         * @description
         *
         * Update instances of the model matched by where from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `where` – `{object=}` - Criteria to match model instances
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        R["update"] = R["updateAll"];

        /**
         * @ngdoc method
         * @name lbServices.Plan#destroyById
         * @methodOf lbServices.Plan
         *
         * @description
         *
         * Delete a model instance by id from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        R["destroyById"] = R["deleteById"];

        /**
         * @ngdoc method
         * @name lbServices.Plan#removeById
         * @methodOf lbServices.Plan
         *
         * @description
         *
         * Delete a model instance by id from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        R["removeById"] = R["deleteById"];


    /**
    * @ngdoc property
    * @name lbServices.Plan#modelName
    * @propertyOf lbServices.Plan
    * @description
    * The name of the model represented by this $resource,
    * i.e. `Plan`.
    */
    R.modelName = "Plan";


        /**
         * @ngdoc method
         * @name lbServices.Plan#subscriber
         * @methodOf lbServices.Plan
         *
         * @description
         *
         * Fetches belongsTo relation subscriber.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         *  - `refresh` – `{boolean=}` -
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Subscriber` object.)
         * </em>
         */
        R.subscriber = function() {
          var TargetResource = $injector.get("Subscriber");
          var action = TargetResource["::get::Plan::subscriber"];
          return action.apply(R, arguments);
        };
    /**
     * @ngdoc object
     * @name lbServices.Plan.attendees
     * @header lbServices.Plan.attendees
     * @object
     * @description
     *
     * The object `Plan.attendees` groups methods
     * manipulating `Attendee` instances related to `Plan`.
     *
     * Call {@link lbServices.Plan#attendees Plan.attendees()}
     * to query all related instances.
     */


        /**
         * @ngdoc method
         * @name lbServices.Plan#attendees
         * @methodOf lbServices.Plan
         *
         * @description
         *
         * Queries attendees of Plan.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         *  - `filter` – `{object=}` -
         *
         * @param {function(Array.<Object>,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Array.<Object>} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Attendee` object.)
         * </em>
         */
        R.attendees = function() {
          var TargetResource = $injector.get("Attendee");
          var action = TargetResource["::get::Plan::attendees"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.Plan.attendees#count
         * @methodOf lbServices.Plan.attendees
         *
         * @description
         *
         * Counts attendees of Plan.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         *  - `where` – `{object=}` - Criteria to match model instances
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `count` – `{number=}` -
         */
        R.attendees.count = function() {
          var TargetResource = $injector.get("Attendee");
          var action = TargetResource["::count::Plan::attendees"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.Plan.attendees#create
         * @methodOf lbServices.Plan.attendees
         *
         * @description
         *
         * Creates a new instance in attendees of this model.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Attendee` object.)
         * </em>
         */
        R.attendees.create = function() {
          var TargetResource = $injector.get("Attendee");
          var action = TargetResource["::create::Plan::attendees"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.Plan.attendees#destroyAll
         * @methodOf lbServices.Plan.attendees
         *
         * @description
         *
         * Deletes all attendees of this model.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        R.attendees.destroyAll = function() {
          var TargetResource = $injector.get("Attendee");
          var action = TargetResource["::delete::Plan::attendees"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.Plan.attendees#destroyById
         * @methodOf lbServices.Plan.attendees
         *
         * @description
         *
         * Delete a related item by id for attendees.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         *  - `fk` – `{*}` - Foreign key for attendees
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        R.attendees.destroyById = function() {
          var TargetResource = $injector.get("Attendee");
          var action = TargetResource["::destroyById::Plan::attendees"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.Plan.attendees#findById
         * @methodOf lbServices.Plan.attendees
         *
         * @description
         *
         * Find a related item by id for attendees.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         *  - `fk` – `{*}` - Foreign key for attendees
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Attendee` object.)
         * </em>
         */
        R.attendees.findById = function() {
          var TargetResource = $injector.get("Attendee");
          var action = TargetResource["::findById::Plan::attendees"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.Plan.attendees#updateById
         * @methodOf lbServices.Plan.attendees
         *
         * @description
         *
         * Update a related item by id for attendees.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         *  - `fk` – `{*}` - Foreign key for attendees
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Attendee` object.)
         * </em>
         */
        R.attendees.updateById = function() {
          var TargetResource = $injector.get("Attendee");
          var action = TargetResource["::updateById::Plan::attendees"];
          return action.apply(R, arguments);
        };

    return R;
  }]);

/**
 * @ngdoc object
 * @name lbServices.Attendee
 * @header lbServices.Attendee
 * @object
 *
 * @description
 *
 * A $resource object for interacting with the `Attendee` model.
 *
 * ## Example
 *
 * See
 * {@link http://docs.angularjs.org/api/ngResource.$resource#example $resource}
 * for an example of using this object.
 *
 */
module.factory(
  "Attendee",
  ['LoopBackResource', 'LoopBackAuth', '$injector', function(Resource, LoopBackAuth, $injector) {
    var R = Resource(
      urlBase + "/Attendees/:id",
      { 'id': '@id' },
      {

        // INTERNAL. Use Attendee.plan() instead.
        "prototype$__get__plan": {
          url: urlBase + "/Attendees/:id/plan",
          method: "GET"
        },

        // INTERNAL. Use Attendee.subscriber() instead.
        "prototype$__get__subscriber": {
          url: urlBase + "/Attendees/:id/subscriber",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.Attendee#create
         * @methodOf lbServices.Attendee
         *
         * @description
         *
         * Create a new instance of the model and persist it into the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Attendee` object.)
         * </em>
         */
        "create": {
          url: urlBase + "/Attendees",
          method: "POST"
        },

        /**
         * @ngdoc method
         * @name lbServices.Attendee#upsert
         * @methodOf lbServices.Attendee
         *
         * @description
         *
         * Update an existing model instance or insert a new one into the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Attendee` object.)
         * </em>
         */
        "upsert": {
          url: urlBase + "/Attendees",
          method: "PUT"
        },

        /**
         * @ngdoc method
         * @name lbServices.Attendee#exists
         * @methodOf lbServices.Attendee
         *
         * @description
         *
         * Check whether a model instance exists in the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `exists` – `{boolean=}` -
         */
        "exists": {
          url: urlBase + "/Attendees/:id/exists",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.Attendee#findById
         * @methodOf lbServices.Attendee
         *
         * @description
         *
         * Find a model instance by id from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         *  - `filter` – `{object=}` - Filter defining fields and include
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Attendee` object.)
         * </em>
         */
        "findById": {
          url: urlBase + "/Attendees/:id",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.Attendee#find
         * @methodOf lbServices.Attendee
         *
         * @description
         *
         * Find all instances of the model matched by filter from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `filter` – `{object=}` - Filter defining fields, where, include, order, offset, and limit
         *
         * @param {function(Array.<Object>,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Array.<Object>} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Attendee` object.)
         * </em>
         */
        "find": {
          isArray: true,
          url: urlBase + "/Attendees",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.Attendee#findOne
         * @methodOf lbServices.Attendee
         *
         * @description
         *
         * Find first instance of the model matched by filter from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `filter` – `{object=}` - Filter defining fields, where, include, order, offset, and limit
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Attendee` object.)
         * </em>
         */
        "findOne": {
          url: urlBase + "/Attendees/findOne",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.Attendee#updateAll
         * @methodOf lbServices.Attendee
         *
         * @description
         *
         * Update instances of the model matched by where from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `where` – `{object=}` - Criteria to match model instances
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        "updateAll": {
          url: urlBase + "/Attendees/update",
          method: "POST"
        },

        /**
         * @ngdoc method
         * @name lbServices.Attendee#deleteById
         * @methodOf lbServices.Attendee
         *
         * @description
         *
         * Delete a model instance by id from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        "deleteById": {
          url: urlBase + "/Attendees/:id",
          method: "DELETE"
        },

        /**
         * @ngdoc method
         * @name lbServices.Attendee#count
         * @methodOf lbServices.Attendee
         *
         * @description
         *
         * Count instances of the model matched by where from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `where` – `{object=}` - Criteria to match model instances
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `count` – `{number=}` -
         */
        "count": {
          url: urlBase + "/Attendees/count",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.Attendee#prototype$updateAttributes
         * @methodOf lbServices.Attendee
         *
         * @description
         *
         * Update attributes for a model instance and persist it into the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Attendee` object.)
         * </em>
         */
        "prototype$updateAttributes": {
          url: urlBase + "/Attendees/:id",
          method: "PUT"
        },

        // INTERNAL. Use Subscriber.attendees.findById() instead.
        "::findById::Subscriber::attendees": {
          url: urlBase + "/Subscribers/:id/attendees/:fk",
          method: "GET"
        },

        // INTERNAL. Use Subscriber.attendees.destroyById() instead.
        "::destroyById::Subscriber::attendees": {
          url: urlBase + "/Subscribers/:id/attendees/:fk",
          method: "DELETE"
        },

        // INTERNAL. Use Subscriber.attendees.updateById() instead.
        "::updateById::Subscriber::attendees": {
          url: urlBase + "/Subscribers/:id/attendees/:fk",
          method: "PUT"
        },

        // INTERNAL. Use Subscriber.attendees() instead.
        "::get::Subscriber::attendees": {
          isArray: true,
          url: urlBase + "/Subscribers/:id/attendees",
          method: "GET"
        },

        // INTERNAL. Use Subscriber.attendees.create() instead.
        "::create::Subscriber::attendees": {
          url: urlBase + "/Subscribers/:id/attendees",
          method: "POST"
        },

        // INTERNAL. Use Subscriber.attendees.destroyAll() instead.
        "::delete::Subscriber::attendees": {
          url: urlBase + "/Subscribers/:id/attendees",
          method: "DELETE"
        },

        // INTERNAL. Use Subscriber.attendees.count() instead.
        "::count::Subscriber::attendees": {
          url: urlBase + "/Subscribers/:id/attendees/count",
          method: "GET"
        },

        // INTERNAL. Use Plan.attendees.findById() instead.
        "::findById::Plan::attendees": {
          url: urlBase + "/Plans/:id/attendees/:fk",
          method: "GET"
        },

        // INTERNAL. Use Plan.attendees.destroyById() instead.
        "::destroyById::Plan::attendees": {
          url: urlBase + "/Plans/:id/attendees/:fk",
          method: "DELETE"
        },

        // INTERNAL. Use Plan.attendees.updateById() instead.
        "::updateById::Plan::attendees": {
          url: urlBase + "/Plans/:id/attendees/:fk",
          method: "PUT"
        },

        // INTERNAL. Use Plan.attendees() instead.
        "::get::Plan::attendees": {
          isArray: true,
          url: urlBase + "/Plans/:id/attendees",
          method: "GET"
        },

        // INTERNAL. Use Plan.attendees.create() instead.
        "::create::Plan::attendees": {
          url: urlBase + "/Plans/:id/attendees",
          method: "POST"
        },

        // INTERNAL. Use Plan.attendees.destroyAll() instead.
        "::delete::Plan::attendees": {
          url: urlBase + "/Plans/:id/attendees",
          method: "DELETE"
        },

        // INTERNAL. Use Plan.attendees.count() instead.
        "::count::Plan::attendees": {
          url: urlBase + "/Plans/:id/attendees/count",
          method: "GET"
        },
      }
    );



        /**
         * @ngdoc method
         * @name lbServices.Attendee#updateOrCreate
         * @methodOf lbServices.Attendee
         *
         * @description
         *
         * Update an existing model instance or insert a new one into the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Attendee` object.)
         * </em>
         */
        R["updateOrCreate"] = R["upsert"];

        /**
         * @ngdoc method
         * @name lbServices.Attendee#update
         * @methodOf lbServices.Attendee
         *
         * @description
         *
         * Update instances of the model matched by where from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `where` – `{object=}` - Criteria to match model instances
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        R["update"] = R["updateAll"];

        /**
         * @ngdoc method
         * @name lbServices.Attendee#destroyById
         * @methodOf lbServices.Attendee
         *
         * @description
         *
         * Delete a model instance by id from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        R["destroyById"] = R["deleteById"];

        /**
         * @ngdoc method
         * @name lbServices.Attendee#removeById
         * @methodOf lbServices.Attendee
         *
         * @description
         *
         * Delete a model instance by id from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        R["removeById"] = R["deleteById"];


    /**
    * @ngdoc property
    * @name lbServices.Attendee#modelName
    * @propertyOf lbServices.Attendee
    * @description
    * The name of the model represented by this $resource,
    * i.e. `Attendee`.
    */
    R.modelName = "Attendee";


        /**
         * @ngdoc method
         * @name lbServices.Attendee#plan
         * @methodOf lbServices.Attendee
         *
         * @description
         *
         * Fetches belongsTo relation plan.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         *  - `refresh` – `{boolean=}` -
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Plan` object.)
         * </em>
         */
        R.plan = function() {
          var TargetResource = $injector.get("Plan");
          var action = TargetResource["::get::Attendee::plan"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.Attendee#subscriber
         * @methodOf lbServices.Attendee
         *
         * @description
         *
         * Fetches belongsTo relation subscriber.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         *  - `refresh` – `{boolean=}` -
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Subscriber` object.)
         * </em>
         */
        R.subscriber = function() {
          var TargetResource = $injector.get("Subscriber");
          var action = TargetResource["::get::Attendee::subscriber"];
          return action.apply(R, arguments);
        };

    return R;
  }]);

/**
 * @ngdoc object
 * @name lbServices.History
 * @header lbServices.History
 * @object
 *
 * @description
 *
 * A $resource object for interacting with the `History` model.
 *
 * ## Example
 *
 * See
 * {@link http://docs.angularjs.org/api/ngResource.$resource#example $resource}
 * for an example of using this object.
 *
 */
module.factory(
  "History",
  ['LoopBackResource', 'LoopBackAuth', '$injector', function(Resource, LoopBackAuth, $injector) {
    var R = Resource(
      urlBase + "/Histories/:id",
      { 'id': '@id' },
      {

        // INTERNAL. Use History.subscriber() instead.
        "prototype$__get__subscriber": {
          url: urlBase + "/Histories/:id/subscriber",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.History#create
         * @methodOf lbServices.History
         *
         * @description
         *
         * Create a new instance of the model and persist it into the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `History` object.)
         * </em>
         */
        "create": {
          url: urlBase + "/Histories",
          method: "POST"
        },

        /**
         * @ngdoc method
         * @name lbServices.History#upsert
         * @methodOf lbServices.History
         *
         * @description
         *
         * Update an existing model instance or insert a new one into the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `History` object.)
         * </em>
         */
        "upsert": {
          url: urlBase + "/Histories",
          method: "PUT"
        },

        /**
         * @ngdoc method
         * @name lbServices.History#exists
         * @methodOf lbServices.History
         *
         * @description
         *
         * Check whether a model instance exists in the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `exists` – `{boolean=}` -
         */
        "exists": {
          url: urlBase + "/Histories/:id/exists",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.History#findById
         * @methodOf lbServices.History
         *
         * @description
         *
         * Find a model instance by id from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         *  - `filter` – `{object=}` - Filter defining fields and include
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `History` object.)
         * </em>
         */
        "findById": {
          url: urlBase + "/Histories/:id",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.History#find
         * @methodOf lbServices.History
         *
         * @description
         *
         * Find all instances of the model matched by filter from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `filter` – `{object=}` - Filter defining fields, where, include, order, offset, and limit
         *
         * @param {function(Array.<Object>,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Array.<Object>} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `History` object.)
         * </em>
         */
        "find": {
          isArray: true,
          url: urlBase + "/Histories",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.History#findOne
         * @methodOf lbServices.History
         *
         * @description
         *
         * Find first instance of the model matched by filter from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `filter` – `{object=}` - Filter defining fields, where, include, order, offset, and limit
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `History` object.)
         * </em>
         */
        "findOne": {
          url: urlBase + "/Histories/findOne",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.History#updateAll
         * @methodOf lbServices.History
         *
         * @description
         *
         * Update instances of the model matched by where from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `where` – `{object=}` - Criteria to match model instances
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        "updateAll": {
          url: urlBase + "/Histories/update",
          method: "POST"
        },

        /**
         * @ngdoc method
         * @name lbServices.History#deleteById
         * @methodOf lbServices.History
         *
         * @description
         *
         * Delete a model instance by id from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        "deleteById": {
          url: urlBase + "/Histories/:id",
          method: "DELETE"
        },

        /**
         * @ngdoc method
         * @name lbServices.History#count
         * @methodOf lbServices.History
         *
         * @description
         *
         * Count instances of the model matched by where from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `where` – `{object=}` - Criteria to match model instances
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `count` – `{number=}` -
         */
        "count": {
          url: urlBase + "/Histories/count",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.History#prototype$updateAttributes
         * @methodOf lbServices.History
         *
         * @description
         *
         * Update attributes for a model instance and persist it into the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `History` object.)
         * </em>
         */
        "prototype$updateAttributes": {
          url: urlBase + "/Histories/:id",
          method: "PUT"
        },

        // INTERNAL. Use Subscriber.histories.findById() instead.
        "::findById::Subscriber::histories": {
          url: urlBase + "/Subscribers/:id/histories/:fk",
          method: "GET"
        },

        // INTERNAL. Use Subscriber.histories.destroyById() instead.
        "::destroyById::Subscriber::histories": {
          url: urlBase + "/Subscribers/:id/histories/:fk",
          method: "DELETE"
        },

        // INTERNAL. Use Subscriber.histories.updateById() instead.
        "::updateById::Subscriber::histories": {
          url: urlBase + "/Subscribers/:id/histories/:fk",
          method: "PUT"
        },

        // INTERNAL. Use Subscriber.histories() instead.
        "::get::Subscriber::histories": {
          isArray: true,
          url: urlBase + "/Subscribers/:id/histories",
          method: "GET"
        },

        // INTERNAL. Use Subscriber.histories.create() instead.
        "::create::Subscriber::histories": {
          url: urlBase + "/Subscribers/:id/histories",
          method: "POST"
        },

        // INTERNAL. Use Subscriber.histories.destroyAll() instead.
        "::delete::Subscriber::histories": {
          url: urlBase + "/Subscribers/:id/histories",
          method: "DELETE"
        },

        // INTERNAL. Use Subscriber.histories.count() instead.
        "::count::Subscriber::histories": {
          url: urlBase + "/Subscribers/:id/histories/count",
          method: "GET"
        },
      }
    );



        /**
         * @ngdoc method
         * @name lbServices.History#updateOrCreate
         * @methodOf lbServices.History
         *
         * @description
         *
         * Update an existing model instance or insert a new one into the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `History` object.)
         * </em>
         */
        R["updateOrCreate"] = R["upsert"];

        /**
         * @ngdoc method
         * @name lbServices.History#update
         * @methodOf lbServices.History
         *
         * @description
         *
         * Update instances of the model matched by where from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `where` – `{object=}` - Criteria to match model instances
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        R["update"] = R["updateAll"];

        /**
         * @ngdoc method
         * @name lbServices.History#destroyById
         * @methodOf lbServices.History
         *
         * @description
         *
         * Delete a model instance by id from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        R["destroyById"] = R["deleteById"];

        /**
         * @ngdoc method
         * @name lbServices.History#removeById
         * @methodOf lbServices.History
         *
         * @description
         *
         * Delete a model instance by id from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        R["removeById"] = R["deleteById"];


    /**
    * @ngdoc property
    * @name lbServices.History#modelName
    * @propertyOf lbServices.History
    * @description
    * The name of the model represented by this $resource,
    * i.e. `History`.
    */
    R.modelName = "History";


        /**
         * @ngdoc method
         * @name lbServices.History#subscriber
         * @methodOf lbServices.History
         *
         * @description
         *
         * Fetches belongsTo relation subscriber.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         *  - `refresh` – `{boolean=}` -
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Subscriber` object.)
         * </em>
         */
        R.subscriber = function() {
          var TargetResource = $injector.get("Subscriber");
          var action = TargetResource["::get::History::subscriber"];
          return action.apply(R, arguments);
        };

    return R;
  }]);


module
  .factory('LoopBackAuth', function() {
    var props = ['accessTokenId', 'currentUserId'];
    var propsPrefix = '$LoopBack$';

    function LoopBackAuth() {
      var self = this;
      props.forEach(function(name) {
        self[name] = load(name);
      });
      this.rememberMe = undefined;
      this.currentUserData = null;
    }

    LoopBackAuth.prototype.save = function() {
      var self = this;
      var storage = this.rememberMe ? localStorage : sessionStorage;
      props.forEach(function(name) {
        save(storage, name, self[name]);
      });
    };

    LoopBackAuth.prototype.setUser = function(accessTokenId, userId, userData) {
      this.accessTokenId = accessTokenId;
      this.currentUserId = userId;
      this.currentUserData = userData;
    }

    LoopBackAuth.prototype.clearUser = function() {
      this.accessTokenId = null;
      this.currentUserId = null;
      this.currentUserData = null;
    }

    LoopBackAuth.prototype.clearStorage = function() {
      props.forEach(function(name) {
        save(sessionStorage, name, null);
        save(localStorage, name, null);
      });
    };

    return new LoopBackAuth();

    // Note: LocalStorage converts the value to string
    // We are using empty string as a marker for null/undefined values.
    function save(storage, name, value) {
      var key = propsPrefix + name;
      if (value == null) value = '';
      storage[key] = value;
    }

    function load(name) {
      var key = propsPrefix + name;
      return localStorage[key] || sessionStorage[key] || null;
    }
  })
  .config(['$httpProvider', function($httpProvider) {
    $httpProvider.interceptors.push('LoopBackAuthRequestInterceptor');
  }])
  .factory('LoopBackAuthRequestInterceptor', [ '$q', 'LoopBackAuth',
    function($q, LoopBackAuth) {
      return {
        'request': function(config) {

          // filter out non urlBase requests
          if (config.url.substr(0, urlBase.length) !== urlBase) {
            return config;
          }

          if (LoopBackAuth.accessTokenId) {
            config.headers[authHeader] = LoopBackAuth.accessTokenId;
          } else if (config.__isGetCurrentUser__) {
            // Return a stub 401 error for User.getCurrent() when
            // there is no user logged in
            var res = {
              body: { error: { status: 401 } },
              status: 401,
              config: config,
              headers: function() { return undefined; }
            };
            return $q.reject(res);
          }
          return config || $q.when(config);
        }
      }
    }])

  /**
   * @ngdoc object
   * @name lbServices.LoopBackResourceProvider
   * @header lbServices.LoopBackResourceProvider
   * @description
   * Use `LoopBackResourceProvider` to change the global configuration
   * settings used by all models. Note that the provider is available
   * to Configuration Blocks only, see
   * {@link https://docs.angularjs.org/guide/module#module-loading-dependencies Module Loading & Dependencies}
   * for more details.
   *
   * ## Example
   *
   * ```js
   * angular.module('app')
   *  .config(function(LoopBackResourceProvider) {
   *     LoopBackResourceProvider.setAuthHeader('X-Access-Token');
   *  });
   * ```
   */
  .provider('LoopBackResource', function LoopBackResourceProvider() {
    /**
     * @ngdoc method
     * @name lbServices.LoopBackResourceProvider#setAuthHeader
     * @methodOf lbServices.LoopBackResourceProvider
     * @param {string} header The header name to use, e.g. `X-Access-Token`
     * @description
     * Configure the REST transport to use a different header for sending
     * the authentication token. It is sent in the `Authorization` header
     * by default.
     */
    this.setAuthHeader = function(header) {
      authHeader = header;
    };

    /**
     * @ngdoc method
     * @name lbServices.LoopBackResourceProvider#setUrlBase
     * @methodOf lbServices.LoopBackResourceProvider
     * @param {string} url The URL to use, e.g. `/api` or `//example.com/api`.
     * @description
     * Change the URL of the REST API server. By default, the URL provided
     * to the code generator (`lb-ng` or `grunt-loopback-sdk-angular`) is used.
     */
    this.setUrlBase = function(url) {
      urlBase = url;
    };

    this.$get = ['$resource', function($resource) {
      return function(url, params, actions) {
        var resource = $resource(url, params, actions);

        // Angular always calls POST on $save()
        // This hack is based on
        // http://kirkbushell.me/angular-js-using-ng-resource-in-a-more-restful-manner/
        resource.prototype.$save = function(success, error) {
          // Fortunately, LoopBack provides a convenient `upsert` method
          // that exactly fits our needs.
          var result = resource.upsert.call(this, {}, this, success, error);
          return result.$promise || result;
        };
        return resource;
      };
    }];
  });

})(window, window.angular);
