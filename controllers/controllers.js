app.controller('ProductDetailController', function($scope, Product, $stateParams, $state) {
  $scope.mode = "Modificar";
  $scope.selectedProduct = {};
  $scope.listar = {};
  Product.getProduct($stateParams.idproduct).then(function(response) {
    $scope.selectedProduct.codigo = response.producto.codeProduct;
    $scope.selectedProduct.producto = response.producto.nameProduct;

    $scope.listar.unidades = response.unidades;
    $scope.listar.categorias = response.categorias;
    $scope.listar.familias = response.familias;
    $scope.listar.subfamilias = response.subfamilias;

    $scope.selectedProduct.idProduct = $stateParams.idproduct;

    $scope.selectedProduct.unidad1 = response.producto.id_unit1;
    $scope.selectedProduct.unidad2 = response.producto.id_unit2;
    $scope.selectedProduct.categoria = response.producto.id_category;
    $scope.selectedProduct.familia = response.producto.id_family;
    $scope.selectedProduct.subfamilia = response.producto.id_subFamily;

  });
  //funcion actualiza el producto
  $scope.registrarProducto = function() {
    Product.updateProduct($scope.selectedProduct).then(function(response) {
      $state.go("productlist");
    });
  };

  $scope.eliminarProducto = function() {
    Product.deleteProduct($stateParams.idproduct).then(function(response) {
      $state.go("productlist");
    });
  };

});

app.controller('ProductListController', function($scope, $modal, Product) {
  $scope.selectedIndex = null;
  $scope.selectedProduct = null;
  Product.getProducts().then(function(response) {
    $scope.listar = response;
    console.log($scope.listar);
  });

  $scope.selectProduct = function(product, index) {
    $scope.selectedIndex = index;
    $scope.selectedProduct = product;
    console.log($scope.selectedProduct);
  };


});

app.controller('ProductCreateController', function($scope, $state, Product) {
  $scope.mode = "Registrar";
  $scope.selectedProduct = {};

  Product.getProducts().then(function(response) {
    $scope.listar = response;
  });

  $scope.registrarProducto = function() {
    console.log($scope.selectedProduct);
    Product.createProduct($scope.selectedProduct).then(function(response) {
      $scope.listar = response;
      $state.go("productlist");
    });
  };

  $scope.cargarFamilias = function() {
    //console.log($scope.selectedProduct.categoria);
    Product.loadFamily($scope.selectedProduct.categoria).then(function(response) {
      $scope.listar.familias = response.familias;
    });
  };

});

/*****************************************************************/
// ALMACENES
/*****************************************************************/

app.controller('ProductWarehouseController', function($scope, $state, $stateParams, $modal, ProductWarehouse) {
  $scope.idWarehouse = $stateParams.idwarehouse;
});

app.controller('ProductWarehouseListController', function($scope, $state, $stateParams, $modal, ProductWarehouse) {
  $scope.idWarehouse = $stateParams.idwarehouse;
  ProductWarehouse.getProductsWarehouse($stateParams.idwarehouse).then(function(response) {
    $scope.listProducts = response;
  });
});

app.controller('ProductWarehouseCreateController', function($scope, $state, $stateParams, ProductWarehouse) {
  $scope.mode = "Registrar";
  $scope.idWarehouse = $stateParams.idwarehouse;
  $scope.selectedProduct = {};

  $scope.registrarWarehouseProduct = function() {
    ProductWarehouse.updateProductWarehouse($scope.selectedWarehouseProduct).then(function(response) {
      //$state.go("warehouseProductList");
    });
  };

});

app.controller('ProductWarehouseDetailController', function($scope, ProductWarehouse, $stateParams, $state) {
  $scope.mode = "Modificar";
  $scope.selectedWarehouseProduct = {};
  console.log($stateParams.idwarehouseproduct);
  ProductWarehouse.getProductWarehouse($stateParams.idwarehouseproduct).then(function(response) {
    $scope.selectedWarehouseProduct.codigo = response.producto.codeProduct;
    $scope.selectedWarehouseProduct.producto = response.producto.nameProduct;
    $scope.selectedWarehouseProduct.seccion = response.producto.section;
    $scope.selectedWarehouseProduct.stockMinimo = response.producto.minStock;
    $scope.selectedWarehouseProduct.stockMaximo = response.producto.maxStock;
    $scope.selectedWarehouseProduct.almacen = response.producto.warehouseName;
    $scope.selectedWarehouseProduct.idWarehouseProduct = response.producto.id_productWarehouse;
    $scope.selectedWarehouseProduct.idWarehouse = response.producto.id_warehouse;
  });
  //funcion actualiza el producto
  $scope.registrarWarehouseProduct = function() {
    ProductWarehouse.updateProductWarehouse($scope.selectedWarehouseProduct).then(function(response) {
      //$state.go("warehouseProductList");
    });
  };

  $scope.eliminarWarehouseProduct = function() {
    //console.log($stateParams.idwarehouseproduct);
    ProductWarehouse.deleteWarehouseProduct($stateParams.idwarehouseproduct).then(function(response) {
      // $state.go("productlist");
    });
  };

});

/***********************************************************************/
//INVENTARIO DE ALMACENES
/***********************************************************************/
app.controller('ProductWarehouseInventoryListController', function($scope, $state, $stateParams, Inventory) {
  $scope.idWarehouse = $stateParams.idwarehouse;
  Inventory.getInventoryxWarehouse($stateParams.idWarehouse).then(function(response) {
    $scope.listar = response;
  });
});

/***********************************************************************/
//MOVIMIENTOS DE ALMACENES
/***********************************************************************/

app.controller('MovementCreateController', function($scope, $state, $stateParams, Movement, Operation, $timeout, $q ) {
   var results;
  $scope.mode = "Registrar";
  $scope.selectedMovement = {};
  $scope.listar = {};
  $scope.idWarehouse = $stateParams.idwarehouse;
  $scope.selectedMovement.movimientos = [{
    cantidad: 0,
    item: '',
    unidad: '',
    descripcion: ''
  }];

  $scope.cargarOperaciones = function() {
    Operation.loadOperation($scope.selectedMovement.tipo).then(function(response) {

      $scope.listar.operaciones = response.operaciones;
      console.log($scope.listar.operaciones);
    });
  };

  $scope.addForm = function() {
    $scope.selectedMovement.movimientos.push({
      cantidad: 0,
      item: '',
      unidad: '',
      descripcion: ''
    });
  };

 /***** comienzo de AUTOCOMPLETAR ***/
   var self = this;
   // list of `state` value/display objects
   self.states        = loadAll();
   self.selectedItem  = null;
   self.searchText    = null;
   self.querySearch   = querySearch;
   // ******************************
   // Internal methods
   // ******************************
   /**
    * Search for states... use $timeout to simulate
    * remote dataservice call.
    */
   function querySearch (query) {
     var results = query ? self.states.filter( createFilterFor(query) ) : [];
     return results;
   }
   /**
    * Build `states` list of key/value pairs
    */
   function loadAll() {
     var allStates = 'Alabama, Alaska, Arizona, Arkansas, California, Colorado, Connecticut, Delaware,\
             Florida, Georgia, Hawaii, Idaho, Illinois, Indiana, Iowa, Kansas, Kentucky, Louisiana,\
             Maine, Maryland, Massachusetts, Michigan, Minnesota, Mississippi, Missouri, Montana,\
             Nebraska, Nevada, New Hampshire, New Jersey, New Mexico, New York, North Carolina,\
             North Dakota, Ohio, Oklahoma, Oregon, Pennsylvania, Rhode Island, South Carolina,\
             South Dakota, Tennessee, Texas, Utah, Vermont, Virginia, Washington, West Virginia,\
             Wisconsin, Wyoming';
     return allStates.split(/, +/g).map( function (state) {
      return {
         value: state.toLowerCase(),
         display: state
      };
     });
   }
   /**
    * Create filter function for a query string
    */
   function createFilterFor(query) {
     var lowercaseQuery = angular.lowercase(query);
     return function filterFn(state) {
      return (state.value.indexOf(lowercaseQuery) === 0);
     };
   }


 /***************FIN DE AUTOCOMPLETAR*************/

});


/***********************************************************************/
//REQUERIMIENTOS
/***********************************************************************/

app.controller('RequerimentListController', function($scope, $state, $stateParams, $modal, Requeriment) {
  $scope.idWarehouse = $stateParams.idwarehouse;
  Requeriment.getRequerimentxWarehouse($stateParams.idwarehouse).then(function(response) {
    $scope.listar = response;
  });
});

app.controller('RequerimentCreateController', function($scope, $state, $stateParams, Requeriment) {
  $scope.mode = "Registrar";
  $scope.idWarehouse = $stateParams.idwarehouse;
  $scope.selectedRequeriment = {};
  $scope.selectedRequeriment.requerimientos = [{
    cantidad: 0,
    item: '',
    unidad: '',
    descripcion: ''
  }];

  $scope.registrarRequerimiento = function() {
    /* console.log($scope.selectedProduct);
         Product.createProduct($scope.selectedProduct).then(function (response) {
            $scope.listar = response;
            $state.go("productlist");
         });*/
  };

  $scope.addForm = function() {
    $scope.selectedRequeriment.requerimientos.push({
      cantidad: 0,
      item: '',
      unidad: '',
      descripcion: ''
    });
  };
});



/***********************************************************************/
//SERVICIOS
/***********************************************************************/

app.controller('ServiceListController', function($scope, $modal, Service) {
  Service.getServices().then(function(response) {
    $scope.listar = response;
    console.log($scope.listar);
  });
});

app.controller('ServiceCreateController', function($scope, $state, Service, Unit) {
  $scope.mode = "Registrar";
  $scope.selectedService = {};

  Unit.getUnits().then(function(response) {
    $scope.listar = response;
  });

  $scope.registrarServicio = function() {
    Service.createService($scope.selectedService).then(function(response) {
      $state.go("servicelist");
    });
  };
});

app.controller('ServiceDetailController', function($scope, Service, $stateParams, $state) {
  $scope.mode = "Modificar";
  $scope.selectedService = {};
  $scope.listar = {};
  Service.getService($stateParams.idservice).then(function(response) {

    $scope.selectedService.codigo = response.servicio.codeService;
    $scope.selectedService.servicio = response.servicio.nameService;

    $scope.listar.unidades = response.unidades;

    $scope.selectedService.unidad = response.servicio.id_unit;
    $scope.selectedService.idService = $stateParams.idservice;
  });

  $scope.registrarServicio = function() {
    Service.updateService($scope.selectedService).then(function(response) {
      $state.go("servicelist");
    });
  };

  $scope.eliminarServicio = function() {
    Service.deleteService($stateParams.idservice).then(function(response) {
      //$state.go("servicelist");
    });
  };

});

/***********************************************************************/
//ORDEN DE PEDIDO
/***********************************************************************/

app.controller('OrdenProductionCreateController', function($scope) {
  $scope.mode = "Registrar";
  $scope.selectedOrderProduction = {};

  $scope.selectedOrderProduction.pedido_productos = [{
    cantidad: 0,
    producto: '',
    fondo: 0,
    ancho: 0,
    largo: 0,
    alto: 0,
    espesor: 0,
    color: ''
  }];

  $scope.addForm = function() {
    $scope.selectedOrderProduction.pedido_productos.push({
      cantidad: 0,
      producto: '',
      fondo: 0,
      ancho: 0,
      largo: 0,
      alto: 0,
      espesor: 0,
      color: ''
    });
  };

  $scope.restForm = function() {
    console.log("restar formulario");
  };

  $scope.registrarOrden = function() {
    console.log($scope.selectedOrderProduction);
  };


});
