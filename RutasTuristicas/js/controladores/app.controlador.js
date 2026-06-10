app.controller("RutasTuristicasControlador", function ($scope) {

    $scope.vistaActual = "";

    $scope.cambiarVista = (vista) => {
        $scope.vistaActual = vista;
    };

});