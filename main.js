'use strip';
var globalApi = "http://localhost/api/";

var app = angular.module('induparck', [
    'ngResource',
    'infinite-scroll',
    'angularSpinner',
    'jcs-autoValidate',
    'angular-ladda',
    'mgcrea.ngStrap',
    'toaster',
    'ngAnimate',
    'ui.router',
    'ngMaterial'
]);

app.config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider
        .state('home',{
            url: "/",
            views: {
                'main': {
                    templateUrl: 'templates/home.html',
                }
            }
        })
        .state('productlist', {
            url: "/product",
            views:{
                'main': {
                    templateUrl: 'templates/productList.html',
                    controller: 'ProductListController'
                },
                'search': {
                    templateUrl: 'templates/searchform.html',
                    controller: 'ProductListController'
                }
            }
        })
        .state('productcreate',{
            url:"/productcreate",
            views:{
                'main': {
                    templateUrl: 'templates/productEdit.html',
                    controller: 'ProductCreateController'
                }
            }
        })
        .state('productedit', {
            url: "/edit/:idproduct",
            views:{
                'main': {
                    templateUrl: 'templates/productEdit.html',
                    controller: 'ProductDetailController'
                }
            }
        })

        .state('servicelist', {
            url: "/service",
            views:{
                'main': {
                    templateUrl: 'templates/serviceList.html',
                    controller: 'ServiceListController'
                },
                'search': {
                    templateUrl: 'templates/searchform.html',
                    controller: 'ServiceListController'
                }
            }
        })

        .state('servicecreate', {
            url: "/servicecreate",
            views:{
                'main': {
                    templateUrl: 'templates/serviceEdit.html',
                    controller: 'ServiceCreateController'
                }
            }
        })

        .state('serviceedit', {
            url: "/editservice/:idservice",
            views:{
                'main': {
                    templateUrl: 'templates/serviceEdit.html',
                    controller: 'ServiceDetailController'
                }
            }
        })
        .state('orderproductionlist', {
            url: "/orderproduction",
            views:{
                'main': {
                    templateUrl: 'templates/orderProductionList.html',
                }
            }
        })
        .state('orderproduction', {
            url: "/orderproductioncreate",
            views:{
                'main': {
                    templateUrl: 'templates/orderProductionEdit.html',
                    controller: 'OrdenProductionCreateController'
                }
            }
        })

        /***************WAREHOUSE*****************/

        .state('warehouse', {
            url: "/warehouse/:idwarehouse",
            views:{
                'main': {
                    templateUrl: 'templates/warehouse.html',
                    controller: 'ProductWarehouseController'
                },
                'menuwarehouse':{
                    templateUrl: 'templates/menuWarehouse.html',
                    controller: 'ProductWarehouseController'
                }
            }
        })

        .state('warehouseProductList', {
            url: "/warehouseProduct/:idwarehouse",
            views: {
                'main': {
                    templateUrl: 'templates/warehouseProductList.html',
                    controller: 'ProductWarehouseListController'
                }
            }
        })

        .state('warehouseproductcreate', {
            url: "/warehouseproductcreate/:idwarehouse",
            views: {
                'main': {
                    templateUrl: 'templates/warehouseProductEdit.html',
                    controller: 'ProductWarehouseCreateController'
                }
            }
        })

        .state('warehouseproductedit', {
            url: "/warehouseproductedit/:idwarehouseproduct",
            views: {
                'main': {
                    templateUrl: 'templates/warehouseProductEdit.html',
                    controller: 'ProductWarehouseDetailController'
                }
            }
        })

        /********************* INVENTORY ************************/

        .state('warehouseproductinventory', {
            url: "/warehouseproductinventory/:idwarehouse",
            views: {
                'main': {
                    templateUrl: 'templates/warehouseProductInventory.html',
                    controller: 'ProductWarehouseInventoryListController'
                }
            }
        })


        /****************MOVEMENTES PRODUCTS**********************/

        .state('movementcreate', {
            url: "/movementcreate/:idwarehouse",
            views: {
                'main': {
                    templateUrl: 'templates/movementEdit.html',
                    controller: 'MovementCreateController'
                }
            }
        })


        /**************REQUERIMENTS*************/

        .state('requerimentlist', {
            url: "/requeriment/:idwarehouse",
            views: {
                'main': {
                    templateUrl: 'templates/requerimentList.html',
                    controller: 'RequerimentListController'
                }
            }
        })

        .state('requerimentcreate', {
            url: "/requerimentcreate/:idwarehouse",
            views: {
                'main': {
                    templateUrl: 'templates/requerimentEdit.html',
                    controller: 'RequerimentCreateController'
                }
            }
        })

        /***************CLIENT*****************/

        .state('clientlist', {
            url: "/client",
            views:{
                'menu': {
                    templateUrl: 'templates/menu.html',
                    controller: 'PersonListController' //No es necesario el controlador para el menu en todas la paginas=
                },
                'main': {
                    templateUrl: 'templates/productList.html',
                    controller: 'PersonListController'
                }
            }
        });

    $urlRouterProvider.otherwise('/');
});

app.config(function ($httpProvider, $resourceProvider, laddaProvider, $datepickerProvider) {
    $resourceProvider.defaults.stripTrailingSlashes = false;
    laddaProvider.setOption({
        style: 'expand-right'
    });
    angular.extend($datepickerProvider.defaults, {
        dateFormat: 'd/M/yyyy',
        autoclose: true
    });
});

app.filter('defaultImage', function () {
    return function (input, param) {
        if (!input) {
            return param;
        }
        return input;
    };
});

app.filter('currentdate',['$filter',  function($filter) {
    return function() {
        return $filter('date')(new Date(), 'dd-MM-yyyy');
    };
}]);

angular.module('phonecatFilters', []).filter('checkmark', function () {
    return function (input) {
        return input ? '\u2713' : '\u2718';
    };
});
