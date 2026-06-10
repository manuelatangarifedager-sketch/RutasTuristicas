app.controller("RutaControlador",
function (
    $scope,
    CiudadServicio,
    TipoServicio,
    RutaServicio,
    ParadaServicio
) {

    /********************************
     * CIUDADES
     ********************************/

    $scope.ciudades = [];
    $scope.ciudadSeleccionada = null;

    /********************************
     * TIPOS
     ********************************/

    $scope.tipos = [];

    /********************************
     * RUTAS
     ********************************/

    $scope.rutas = [];
    $scope.formRuta = {};
    $scope.rutaSeleccionada = null;

    /********************************
     * PARADAS
     ********************************/

    $scope.paradas = [];
    $scope.formParada = {};



    /********************************
     * INICIALIZAR
     ********************************/

    $scope.inicializar = () => {

        CiudadServicio.listar()
            .then(data => {

                $scope.ciudades = data;

            });

        TipoServicio.listar()
            .then(data => {

                $scope.tipos = data;

            });

    };



    /********************************
     * CIUDADES
     ********************************/

    $scope.seleccionarCiudad = (ciudad) => {

        $scope.ciudadSeleccionada = ciudad;

        $scope.rutaSeleccionada = null;
        $scope.paradas = [];

        RutaServicio
            .listarPorCiudad(ciudad.id)
            .then(data => {

                $scope.rutas = data;

            });

    };



    /********************************
     * RUTAS
     ********************************/

    $scope.editarRuta = (ruta) => {

        $scope.formRuta = angular.copy(ruta);

    };



    $scope.guardarRuta = () => {

        $scope.formRuta.idCiudad =
            $scope.ciudadSeleccionada.id;

        if ($scope.formRuta.id) {

            RutaServicio
                .modificar($scope.formRuta)
                .then(() => {

                    $scope.seleccionarCiudad(
                        $scope.ciudadSeleccionada
                    );

                });

        } else {

            RutaServicio
                .agregar($scope.formRuta)
                .then(() => {

                    $scope.seleccionarCiudad(
                        $scope.ciudadSeleccionada
                    );

                });

        }

        $scope.formRuta = {};

    };



    $scope.eliminarRuta = (id) => {

        if (confirm("¿Desea eliminar esta ruta?")) {

            RutaServicio
                .eliminar(id)
                .then(() => {

                    $scope.seleccionarCiudad(
                        $scope.ciudadSeleccionada
                    );

                });

        }

    };



    $scope.limpiarFormRuta = () => {

        $scope.formRuta = {};

    };



    $scope.seleccionarRuta = (ruta) => {

        $scope.rutaSeleccionada = ruta;

        $scope.formParada = {
            idRuta: ruta.id
        };

        ParadaServicio
            .listarPorRuta(ruta.id)
            .then(data => {

                $scope.paradas = data.sort(
                    (a, b) => a.orden - b.orden
                );

            });

    };



    /********************************
     * PARADAS
     ********************************/

    $scope.editarParada = (parada) => {

        $scope.formParada =
            angular.copy(parada);

    };



    $scope.guardarParada = () => {

        $scope.formParada.idRuta =
            $scope.rutaSeleccionada.id;

        if ($scope.formParada.id) {

            ParadaServicio
                .modificar($scope.formParada)
                .then(() => {

                    $scope.seleccionarRuta(
                        $scope.rutaSeleccionada
                    );

                });

        } else {

            ParadaServicio
                .agregar($scope.formParada)
                .then(() => {

                    $scope.seleccionarRuta(
                        $scope.rutaSeleccionada
                    );

                });

        }

        $scope.formParada = {};

    };



    $scope.eliminarParada = (id) => {

        if (confirm("¿Desea eliminar esta parada?")) {

            ParadaServicio
                .eliminar(id)
                .then(() => {

                    $scope.seleccionarRuta(
                        $scope.rutaSeleccionada
                    );

                });

        }

    };



    $scope.limpiarFormParada = () => {

        $scope.formParada = {};

    };



    $scope.inicializar();

});