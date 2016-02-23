
app.service('ProductService', function (Product, $q, toaster) {
    return {
        'addPerson': function(producto){
            this.productos.push(producto);
        },
        'selectedPerson': null,
    };


});
