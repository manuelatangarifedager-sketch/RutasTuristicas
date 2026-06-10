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

        CiudadServicio.listar().then(data => {

            $scope.ciudades = data.map(
                ciudad => new Ciudad(ciudad)
            );

        });

        TipoServicio.listar().then(data => {

            $scope.tipos = data.map(
                tipo => new Tipo(tipo)
            );

        });

    };



    /********************************
     * CIUDADES
     ********************************/

    $scope.seleccionarCiudad = (ciudad) => {

        $scope.ciudadSeleccionada = ciudad;

        $scope.rutaSeleccionada = null;
        $scope.paradas = [];
        $scope.formRuta = {};
        $scope.formParada = {};

        RutaServicio
            .listarPorCiudad(ciudad.id)
            .then(data => {

                $scope.rutas = data.map(
                    ruta => new Ruta(ruta)
                );

            });

    };



    /********************************
     * RUTAS
     ********************************/

    $scope.editarRuta = (ruta) => {

        $scope.formRuta = angular.copy(ruta);

    };



    $scope.guardarRuta = () => {

        if (!$scope.ciudadSeleccionada) {

            alert("Seleccione una ciudad.");

            return;
        }

        $scope.formRuta.idCiudad =
            $scope.ciudadSeleccionada.id;

        let ruta = angular.copy($scope.formRuta);

        if ($scope.formRuta.id) {

            RutaServicio
                .modificar(ruta)
                .then(() => {

                    $scope.seleccionarCiudad(
                        $scope.ciudadSeleccionada
                    );

                    $scope.formRuta = {};

                });

        } else {

            RutaServicio
                .agregar(ruta)
                .then(() => {

                    $scope.seleccionarCiudad(
                        $scope.ciudadSeleccionada
                    );

                    $scope.formRuta = {};

                });

        }

    };



    $scope.eliminarRuta = (id) => {

        if (confirm("¿Desea eliminar esta ruta?")) {

            RutaServicio
                .eliminar(id)
                .then(() => {

                    $scope.seleccionarCiudad(
                        $scope.ciudadSeleccionada
                    );

                    $scope.rutaSeleccionada = null;
                    $scope.paradas = [];

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

                $scope.paradas = data
                    .map(parada => new Parada(parada))
                    .sort((a, b) => a.orden - b.orden);

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

        if (!$scope.rutaSeleccionada) {

            alert("Seleccione una ruta.");

            return;
        }

        $scope.formParada.idRuta =
            $scope.rutaSeleccionada.id;

        let parada = angular.copy($scope.formParada);

        if ($scope.formParada.id) {

            ParadaServicio
                .modificar(parada)
                .then(() => {

                    $scope.seleccionarRuta(
                        $scope.rutaSeleccionada
                    );

                    $scope.formParada = {};

                });

        } else {

            ParadaServicio
                .agregar(parada)
                .then(() => {

                    $scope.seleccionarRuta(
                        $scope.rutaSeleccionada
                    );

                    $scope.formParada = {};

                });

        }

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