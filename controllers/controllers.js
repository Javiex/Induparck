/********Sidenav ***********/
app.controller('SidenavCtrl', function($scope, $timeout, $mdSidenav, $log) {

   $scope.SidenavToggle = function() {
      return $mdSidenav('left').toggle().then(function() {
         $log.debug('close sidenav');
      });
   };

   $scope.close = function() {
      return $mdSidenav('left').toggle().then(function() {});
   };

});


/********************************/
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
   $scope.search = "";

   Product.getProducts().then(function(response) {
      $scope.listar = response;
      $scope.products = response.productos;
      console.log(response);
      console.log('productos', $scope.products);
      console.log($scope.listar);
   });

   $scope.selectProduct = function(product, index) {
      $scope.selectedIndex = index;
      $scope.selectedProduct = product;
      console.log($scope.selectedProduct);
   };

   $scope.sensitiveSearch = function(products) {
      if ($scope.search) {
         return products.nameProduct.indexOf($scope.search.toUpperCase()) === 0 ||
            products.codeProduct.indexOf($scope.search.toUpperCase()) === 0;
      }
      return true;
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
         // $state.go("warehouseProductList");
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
   console.log('State Params:' + $stateParams.idwarehouse);
   console.log('Scope:' + $scope.idWarehouse);
   Inventory.getInventoryxWarehouse($stateParams.idwarehouse).then(function(response) {
      $scope.listar = response;
   });
});

/************************************************/
//MOVIMIENTOS DE ALMACENES
/********************************************************/
app.controller('MovementDocumentController', function($scope, $state, $stateParams, Movement) {
   $scope.idMovement = $stateParams.idmovement;
   Movement.getMovement($scope.idMovement).then(function(response) {
      $scope.movement = response.movimiento;
      $scope.details = response.detalle;
      switch (response.movimiento.id_warehouse) {
         case '1':
            $scope.almacen = "ALMACEN DE INSUMOS";
            break;
         case '2':
            $scope.almacen = "ALMACEN DE PRODUCTO TERMINADO";
            break;
         case '3':
            $scope.almacen = "ALMACEN ADMINISTRATIVO";
            break;
      }

      switch (response.movimiento.movementType) {
         case '1':
            $scope.parte = "PARTE DE ENTRADA";
            break;
         case '2':
            $scope.parte = "PARTE DE SALIDA";
            break;
      }

      switch (response.movimiento.order_type) {
         case '1':
            $scope.labelorden = 'ORDEN DE PEDIDO:';
            break;
         case '2':
            $scope.labelorden = 'ORDEN DE COMPRA:';
            break;
         case '3':
            $scope.labelorden = 'ORDEN DE SERVICIO:';
            break;
      }

      console.log('$scope', response);
   });

});

app.controller('MovementCreateController', function($scope, $state, $stateParams, Movement, Operation, Inventory, $timeout, $q, $log, ProductWarehouse, PaymentDocument) {
   var results;
   $scope.mode = "Registrar";
   $scope.selectedMovement = {};
   $scope.listar = {};
   $scope.selectedMovement.idWarehouse = $stateParams.idwarehouse;
   $scope.idWarehouse = $stateParams.idwarehouse;
   $scope.selectedMovement.movimientos = [{
      cantidad: 0,
      item: '',
      valortotal: 0
   }];

   $scope.selectedMovement.product = [];

   $scope.cargarOperaciones = function() {
      Operation.loadOperation($scope.selectedMovement.tipo).then(function(response) {
         $scope.listar.operaciones = response.operaciones;
         console.log('operaciones', $scope.listar.operaciones);
      });
   };

   $scope.cargarDocumetos = function() {
      PaymentDocument.loadDocument().then(function(response) {
         $scope.listar.documentos = response.documentos;

         angular.forEach($scope.listar.documentos, function(item) {
            item.selects = item.abreviatura + ' | ' + item.paymentDocument;
         });

         console.log('documentos', response);
         console.log('documentos listar', $scope.listar);
      });
   };

   // $scope.cargarAbreviatura = function(item){
   //    console.log('abreviatura',item);
   //    console.log($scope.listar.documentos);
   // };

   $scope.cargarDocumetos();

   $scope.addForm = function() {
      $scope.selectedMovement.movimientos.push({
         cantidad: 0,
         item: '',
         valortotal: 0
      });
   };

   $scope.remove = function(index) {
      $scope.selectedMovement.movimientos.splice(index, 1);
   };


   $scope.registrarMovimiento = function() {
      console.log($scope.selectedMovement);
      //REGISTRAR EL MOVIMIENTO
      Movement.codeMovement($scope.selectedMovement.tipo).then(function(response) {
         $scope.selectedMovement.codeMovementProduct = response.codeMovimiento;
         Movement.createMovement($scope.selectedMovement).then(function(response) {
            $scope.idMovimiento = response.movimiento;
            //registrar el detalle
            $state.go('movementdocument', {
               idmovement: $scope.idMovimiento
            });
         });
      });

      //ACTULIZAR EL INVENTARIO
   };

   /*************AUTOCOMPLETE**************/
   var allowSelection = function() {

      ProductWarehouse.getProductsWarehouse($scope.idWarehouse).then(function(response) {
         $scope.products = response.productos;
         console.log('Productos almacen', $scope.products);
      });
   };

   new allowSelection();
   $scope.FilterAlumnos = function(text) {
      var data = [];
      angular.forEach($scope.products, function(item) {
         var index = item.nameProduct.search(new RegExp(text, 'i'));
         if (index >= 0) {
            data.push(item);
         }
      });
      if (data.length > 0) {
         return data;
      } else {
         return false;
      }
   };

   /*******AUTOCOMPLETE********************/


});


/***********************************************************************/
//REQUERIMIENTOS
/***********************************************************************/

app.controller('RequerimentListController', function($scope, $state, $stateParams, $modal, Requeriment) {
   $scope.idWarehouse = $stateParams.idwarehouse;
   $scope.search = "";
   Requeriment.getRequerimentxWarehouse($stateParams.idwarehouse).then(function(response) {
      $scope.listar = response;
   });

   $scope.sensitiveSearch = function(item) {
      if ($scope.search) {
         return item.codeRequeriment.indexOf($scope.search.toUpperCase()) === 0 ||
            item.solicitant.indexOf($scope.search.toUpperCase()) === 0;
      }
      return true;
   };

});

app.controller('RequerimentCreateController', function($scope, $state, $stateParams, Requeriment, ProductWarehouse) {
   $scope.mode = "Registrar";
   $scope.idWarehouse = $stateParams.idwarehouse;
   $scope.selectedRequeriment = {};
   $scope.selectedRequeriment.idWarehouse = $stateParams.idwarehouse;
   $scope.selectedRequeriment.requerimientos = [{
      cantidad: 0,
      item: '',
      unidad: '',
      descripcion: ''
   }];

   $scope.registrarRequerimiento = function() {
      console.log($scope.selectedRequeriment);
      Requeriment.createRequerimentxWarehouse($scope.selectedRequeriment).then(function(response) {
         $scope.idRequeriment = response;
         $state.go('requerimentlist', {
            idwarehouse: $scope.idWarehouse
         });
      });
   };

   $scope.addForm = function() {
      $scope.selectedRequeriment.requerimientos.push({
         cantidad: 0,
         item: '',
         unidad: '',
         descripcion: ''
      });
   };

   $scope.remove = function(index) {
      $scope.selectedRequeriment.requerimientos.splice(index, 1);
   };

   /*************AUTOCOMPLETE**************/
   var allowSelection = function() {

      ProductWarehouse.getProductsWarehouse($scope.idWarehouse).then(function(response) {
         $scope.products = response.productos;
         console.log('Productos almacen', $scope.products);
      });
   };

   new allowSelection();
   $scope.FilterAlumnos = function(text) {
      var data = [];
      angular.forEach($scope.products, function(item) {
         var index = item.nameProduct.search(new RegExp(text, 'i'));
         if (index >= 0) {
            data.push(item);
         }
      });
      if (data.length > 0) {
         return data;
      } else {
         return false;
      }
   };

   /*******AUTOCOMPLETE********************/
});

app.controller('RequerimentDetailController', function($scope, $state, $stateParams, Requeriment) {
   $scope.mode = "Modificar";
   $scope.idRequeriment = $stateParams.idrequeriment;
   $scope.idWarehouse =
      $scope.selectedRequeriment = {};

   Requeriment.getOneRequeriment($scope.idRequeriment).then(function(response) {
      console.log('response', response);
      $scope.selectedRequeriment.tipo = response.requerimentos.typeRequeriment;
      $scope.selectedRequeriment.solicitante = response.requerimentos.solicitant;
      $scope.selectedRequeriment.supervisor = response.requerimentos.supervisor;
      $scope.selectedRequeriment.descripcion = response.requerimentos.description;
      $scope.selectedRequeriment.fechaEntrega = response.requerimentos.dateDeadline;
      $scope.idWarehouse = response.requerimentos.id_warehouse;

      Requeriment.getOneRequerimentDetail($scope.idRequeriment).then(function(response) {
         $scope.selectedRequeriment.requerimientos = response.detalle;
         angular.forEach($scope.selectedRequeriment.requerimientos, function(item) {
            item.cantidad = parseFloat(item.quantity);
            item.product = item.nameProduct;
            item.abrevUnit = item.abrevUnit;
            item.descripcion = item.description;

         });

         console.log('requeriment array', $scope.selectedRequeriment);
      });

   });


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
