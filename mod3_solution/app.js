//MOD_3  SOLUTION
(function(){
    'use strict';
    //
    angular.module('NarrowItDownApp', [])
    .controller('NarrowItDownController'  ,  NarrowItDownController)
    .service('MenuSearchService'   ,   MenuSearchService)
    .constant('ApiBasePath', "https://davids-restaurant.herokuapp.com")
    .directive('foundItems', FaundItemsDirective);


    function FaundItemsDirective() {
      var ddo = {
        templateUrl: 'foundItems.html',
        scope: {
          found: '<',
          onRemove: '&'
        },
          controller: NarrowItDownController,
          controllerAs: 'ctrlNarrow',
          bindToController: true
      };

      return ddo;
    }

   NarrowItDownController.$inject = ['MenuSearchService'];

    function NarrowItDownController(MenuSearchService) {
         var  ctrlNarrow = this            ;
              ctrlNarrow.searchTerm = ''   ;
              ctrlNarrow.arrFound = []     ;
              ctrlNarrow.found = []        ;
              ctrlNarrow.messW      = ""  ;
            //ctrlNarrow.boolV      = false ;
        var   arrAll = [] ;

        ctrlNarrow.setBoolTrue = function functionName() {
            ctrlNarrow.boolV = true ;
        }

        ctrlNarrow.getL = function functionName() {
            return ctrlNarrow.found.length ;
        }

        ctrlNarrow.getCtrlArrLen = function functionName() {
            return MenuSearchService.getArrLen() ;
        }

         ctrlNarrow.removeItem = function (itemIndex) {

            MenuSearchService.removeItem(itemIndex);

        };

              //
               var promise = MenuSearchService.getAllMenuItems();
              //
              promise.then(function (response) {
                       ctrlNarrow.arrAllItems = response.data.menu_items;
                       arrAll =  response.data.menu_items;
              })
              .catch(function (error) {
                console.log("Something went terribly wrong.");
              });
              ///////////////////////////////////////////////

              ctrlNarrow.getMatchedMenuItems = function() {
                                                            ctrlNarrow.boolV      = false ;
                                                            ctrlNarrow.setBoolTrue();
                                                            ctrlNarrow.boolV = true ;
                                                            ctrlNarrow.found  = MenuSearchService.getMatchedMenuItems(ctrlNarrow.searchTerm);
              }


    }


         MenuSearchService.$inject = ['$http', 'ApiBasePath'];

function MenuSearchService($http, ApiBasePath) {
      var     searchService = this ;
      var     foundItems    = []   ;
      var     aLen          = 0    ;


      searchService.removeItem = function (itemIndex) {
        foundItems.splice(itemIndex, 1);
      };

      searchService.getArrLen = function functionName() {
        return  foundItems.length ;
      }


        searchService.getAllMenuItems = function () {

             var response = $http({
               method: "GET",
               url: (ApiBasePath + "/menu_items.json")
             });

             return response;
           };



             searchService.getMatchedMenuItems = function(searchTerm) {
                                                     var someArg = 'qwerty' ;
                                                     var listAll = []       ;
                                                     var listFound = []     ;
                                                     var listLEN = 0        ;
                                                     var strS    = ""       ;

             if (searchTerm  === '') { return 0; } ;


             var promise = searchService.getAllMenuItems();

             promise.then(function (response) {
                      listAll = response.data.menu_items;
                      listLEN = listAll.length          ;

                     for (var i = 0 ; i < listLEN ; i++) {


                                                            if ( listAll[i].description !== undefined) {
                                                                         strS = "" ;
                                                                         strS =  (listAll[i].description).toLowerCase() ;


                                                                     if ( strS.indexOf( searchTerm.toLowerCase()  ) > -1 ) {

                                                                           listFound.push(listAll[i]) ;
                                                                           foundItems.push(listAll[i]) ;

                                                                     }
                                                              }
                     }


                     listLEN = listFound.length          ;


             })
             .catch(function (error) {
               console.log("Something went terribly wrong.");
             });
             ///////////////////////////////////////////////

             return foundItems ;
         }


}



 })();
