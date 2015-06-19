;(function(){
  angular.module('app').
    factory('dataService', function($http, $q){
      return {
        fetch : function(){
          var d = $q.defer();
          $http.
            get('data.txt').
            success(function(txt){
              d.resolve(txt);
            });
          return d.promise;
        }
      }
    }).
    controller('appController', function(dataService){
      var vm = this;
      vm.datas = [];
      var cnt = 0;
      vm.fetchData = function(){
        dataService.fetch().then(function(res){
          res.data.forEach(function(v){
            cnt ++;
            vm.datas.push({cnt:cnt, text: v});
          })
        })
      }
      vm.fetchData();
    });
})();
