app.controller("RutasTuristicasControlador", function ($scope) {

    $scope.vistaActual = "ciudades";

    $scope.cambiarVista = (vista) => {

        $scope.vistaActual = vista;

    };

});