app.factory("Product", function ($http) {

    var baseUrl = "http://localhost/api/";

    function product() {};

    product.getProducts = function () {
        var url = baseUrl+"product";
        //var url = "http://localhost/api/product";
        return $http.get(url).then(function (response) {
            return response.data;
        });
    };

    product.getProduct = function (idProduct) {
        var url = baseUrl+"edit_product/"+idProduct;
        //var url = "http://localhost/api/edit_product/"+idProduct;
        return $http.get(url).then(function (response) {
            return response.data;
        });
    };

    product.updateProduct = function (params) {
        var url = baseUrl+"edit_product";
        return $http.put(url,params).then(function (response) {
            return response.data;
        });
    };


    product.createProduct = function (params) {
        var url = baseUrl+"create_product";
        return $http.post(url, params).then(function (response){
            return response.data;
        });

    };

    product.deleteProduct = function (idProduct) {
        var url = baseUrl+"delete_product/"+idProduct;
        //var url = "http://localhost/api/delete_product/"+idProduct;
        return $http.delete(url).then(function (response) {
            return response.data;
        });
    };

    product.loadFamily = function (idCategory) {
        var url = baseUrl+"familyByCategory/"+idCategory;
        //var url = "http://localhost/api/familyByCategory/"+idCategory;
        return $http.get(url).then(function (response){
            return response.data;
        });
    };

    return product;

});

app.factory("Service", function ($http) {

    var baseUrl = "http://localhost/api/";

    function service() {
    };

    service.getServices = function() {
        var url = baseUrl+"service";
        var url = "http://localhost/api/service";
        return $http.get(url).then(function (response){
            return response.data;
        });
    };

    service.getService = function (idService) {
        var url = baseUrl+"edit_service/"+idService;
        //var url = "http://localhost/api/edit_service/"+idService;
        return $http.get(url).then(function (response) {
            return response.data;
        });
    };

    service.createService = function(params){
        var url=baseUrl+"create_service";
        //var url="http://localhost/api/create_service";
        return $http.post(url, params).then(function (response){
            return response.data;
        });

    };

    service.updateService = function(params){
        var url=baseUrl+"edit_service";
        //var url="http://localhost/api/edit_service";
        return $http.put(url, params).then(function (response){
            return response.data;
        });
    };

    service.deleteService = function(idService) {
        var url = baseUrl+"delete_service/"+idService;
        //var url = "http://localhost/api/delete_service/"+idService;
        return $http.delete(url).then(function (response) {
            return response.data;
        });
    };

    return service;
});

app.factory("Unit", function ($http) {
    var baseUrl = "http://localhost/api/";
    function unit(){
    };

    unit.getUnits = function(){
        var url = baseUrl+"unit";
        //var url = "http://localhost/api/unit";
        return $http.get(url).then(function (response){
            return response.data;
        });
    };

    return unit;
});

app.factory("ProductWarehouse", function ($http) {
    var baseUrl = "http://localhost/api/";
    function productWarehouse(){
    };

    productWarehouse.getProductsWarehouse = function(idWarehouse){
        var url = baseUrl+"productwarehouse/"+idWarehouse;
        return $http.get(url).then(function (response){
            return response.data;
        });
    };
//llamar al producto de un almacen pasarle Idwarehouse y IdProduct
    productWarehouse.getProductWarehouse = function (idWarehouseProduct) {
        var url = baseUrl+"edit_productwarehouse/"+idWarehouseProduct;
        return $http.get(url).then(function (response) {
            return response.data;
        });
        console.log(response.data);
    };

    productWarehouse.createWarehouseProduct = function (params) {
        var url = baseUrl+"create_productwarehouse";
        return $http.post(url, params).then(function (response){
            return response.data;
        });

    };

    productWarehouse.updateProductWarehouse = function (params) {
        var url = baseUrl+"edit_productwarehouse";
        return $http.put(url,params).then(function (response) {
            return response.data;
        });
    };

    productWarehouse.deleteWarehouseProduct = function (idWarehouseProduct) {
        var url = baseUrl+"delete_productwarehouse/"+idWarehouseProduct;
        return $http.delete(url).then(function (response) {
            return response.data;
        });
    };

    return productWarehouse;
});
/********** Inventory **************/

app.factory("Inventory", function ($http) {
    var baseUrl = "http://localhost/api/";
    function inventory(){};

    inventory.getInventoryxWarehouse = function(idWarehouse){
        var url = baseUrl+"inventory/"+idWarehouse;
        return $http.get(url).then(function (response){
            return response.data;
        });
    };

    return inventory;
});


/************** Movimiento **********/

app.factory("Movement", function ($http) {
    var baseUrl = "http://localhost/api/";
    function movement(){};

    movement.createMovement = function(params){

    };

    return movement;
});

/*************Operaciones**********/

app.factory("Operation", function ($http) {
    var baseUrl = "http://localhost/api/";
    function operation(){};

    operation.loadOperation = function (operationType) {
        var url = baseUrl+"operationByType/"+operationType;
        return $http.get(url).then(function (response){
            return response.data;
        });
    };

    return operation;
});

/***********Requerimientos*************/
app.factory("Requeriment", function ($http) {
    var baseUrl = "http://localhost/api/";
    function requeriment(){
    };

    requeriment.getRequerimentxWarehouse = function(idWarehouse){
        var url = baseUrl+"requeriment/"+idWarehouse;
        return $http.get(url).then(function (response){
            return response.data;
        });
    };
    return requeriment;
});
