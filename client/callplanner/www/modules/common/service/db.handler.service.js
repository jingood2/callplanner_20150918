angular.module('callplanner.common')
.factory('DBHandlerService', function($timeout, $q){
  var mydb;

  return {
    connect: function() {
      console.log("Connecting to DB");
      mydb = window.sqlitePlugin.openDatabase({name: "callplanner.db", androidLockWorkaround: 1, androidDatabaseImplementation: 2});
      console.log(JSON.stringify(mydb));
      if(mydb) return true;
      else return false;
    },
    // clean: function() {
    //   if(mydb) {
    //     mydb.transaction(function(tx) {
    //       tx.executeSql("drop table if exists plans");
    //       tx.executeSql("drop table if exists appcontext");
    //       tx.executeSql("drop table if exists history");

    //       tx.executeSql("create table if not exists plans (id text primary key, title text)");
    //       tx.executeSql("create table if not exists appcontext (propname text primary key, propval text)");
    //       tx.executeSql("create table if not exists history (id text primary key, title text)", [], 
    //         function(res) {
    //           console.log("SUCCESS initDb creation : " + JSON.stringify(res));
    //           deferred.resolve(res);
    //           // mydb.executeSql("pragma table_info (plans);", [], function(res) {
    //           //   console.log("PRAGMA res: " + JSON.stringify(res));
    //           // });
    //         },
    //         function(err){
    //           console.log("ERROR initDb creation : " + JSON.stringify(err));
    //           deferred.reject(err);
    //         }
    //       );

    //     }, 
    //     function(err) {
    //       console.log("ERROR initDb Transaction : " + JSON.stringify(err));
    //     });
    //   } else {
    //     console.log("ERROR while cleansing DB ");
    //   }

    // },
    init: function() {
      var deferred = $q.defer();
      mydb.transaction(function(tx) {
        // tx.executeSql("drop table if exists plans");
        // tx.executeSql("drop table if exists appcontext");
        // tx.executeSql("drop table if exists history");

        tx.executeSql("create table if not exists plans (id text primary key, title text)");
        tx.executeSql("create table if not exists appcontext (propname text primary key, propval text)");
        tx.executeSql("create table if not exists appsession (val1 text, val2 text, val3 text");
        tx.executeSql("create table if not exists history (id text primary key, title text)", [], 
          function(res) {

            console.log("SUCCESS init creation for DB : " + JSON.stringify(res));
            deferred.resolve(res);
            // mydb.executeSql("pragma table_info (plans);", [], function(res) {
            //   console.log("PRAGMA res: " + JSON.stringify(res));
            // });
          },
          function(err){
            console.log("ERROR init creation for DB : " + JSON.stringify(err));
            deferred.reject(err);
          }
        );

      }, 
      function(err) {
        console.log("ERROR init Transaction for DB creation : " + JSON.stringify(err));
      });

      return deferred.promise;      
    },
    addPlan: function(planObj) {
      var deferred = $q.defer();
      console.log("addplan");

      mydb.transaction(function(tx) {
        tx.executeSql("insert into plans(id, title) values(?,?)", [planObj.id, planObj.title], 
          function(res) {
            console.log("addplan success");
            deferred.resolve({
              result: res
            });
          },
          function(err) {
            console.log("addplan failed " + JSON.stringify(err));
            deferred.reject(err);
          }
        );
      },
      function(err) {
        console.log("error on transaction insert : " + JSON.stringify(err));
      });
      return deferred.promise;
    },
    getPlanList: function() { 
      var deferred = $q.defer();
      
      mydb.transaction(
        function(tx) {
          mydb.executeSql("select id,title from Plans", [],
            function(res){
              console.log("SUCCESS to get plan list from DB : " + JSON.stringify(res));
              deferred.resolve(res);
            },
            function(err){
              console.log("ERROR while getting plan list from DB : " + JSON.stringify(err));
              deferred.reject(err);
            }
          );
        },
        function(e) {
          console.log("Error : " + e.message);
          deferred.reject(err);
        }
      );
      return deferred.promise;
    },
    getHistoryList: function() {
      // var deferred = $q.defer();

      // var query = "select * from History";
      // mydb.executeSql(query, [],
      //   function(res){
      //     console.log("get histories from DB : " + JSON.stringify(res));
      //     deferred.resolve({
      //       result:res
      //     });
      //   },
      //   function(err){
      //     console.log("error while getting History list from DB : " + JSON.stringify(err));
      //     deferred.reject(err);
      //   }
      // );
      // return deferred.promise;
      return;
    },
    getConfiguration: function() {
      var deferred = $q.defer();
      var result='{';
      var query = "select propname, propval from appcontext";
      mydb.executeSql(query, [],
        function(res){
          for(var i=0 ; i<res.rows.length ; i++) {
            console.log("propname: " + res.rows.item(i)['propname'] + ", propval: " + res.rows.item(i)['propval']);
            result = result + "\"" + res.rows.item(i)['propname'] + "\"\:\"" + res.rows.item(i)['propval'] + "\"" ;
            if(i != res.rows.length-1)
              result = result + "\,";
            // result.push(res.rows.item(i)['propname'], res.rows.item(i)['propval']);
          }
          result = result + "}";
          console.log(result);
          deferred.resolve(JSON.parse(result));  
        },
        function(err){
          deferred.reject(err);
        }
      );
      return deferred.promise;
    },
    setConfiguration: function(name, val) {
      var deferred = $q.defer();
      var query = "insert or replace into appcontext(propname, propval) values(?,?)";
      
      mydb.transaction(
        function(tx) {
          mydb.executeSql(query, [name, val],
            function(res){
              console.log("SUCCESS to set config value to DB : " + JSON.stringify(res));
              // mydb.executeSql("select * from appcontext",[],function(res) {
              //   for(var i=0 ; i<res.rows.length ; i++) {
              //     console.log("propname:" + res.rows.item(i)['propname'] + ", propval:"+res.rows.item(i)['propval'])
              //   }
              // }, function() {
              // })
              deferred.resolve(res);
            },
            function(err){
              console.log("ERROR to set config value to DB : " + JSON.stringify(err));
              deferred.reject(err);
            }
          );
        },
        function(e) {
          console.log("Error : " + e.message);
          deferred.reject(err);
        }
      );
      return deferred.promise;
    }
    
  }
  
});