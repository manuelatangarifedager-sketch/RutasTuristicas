app.controller("RutasTuristicasControlador", function ($scope) {

    $scope.vistaActual = "rutas";

    $scope.cambiarVista = (vista) => {

        $scope.vistaActual = vista;

    };

});