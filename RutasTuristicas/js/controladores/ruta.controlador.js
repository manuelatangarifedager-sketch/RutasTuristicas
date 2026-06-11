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
    $scope.mostrarFormularioRuta = false;

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

        RutaServicio
            .listarPorCiudad(ciudad.id)
            .then(data => {

                $scope.rutas = data;

            })
            .catch(error => {

                console.error(
                    "Error consultando rutas:",
                    error
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

    let ruta = new Ruta($scope.formRuta);

    ruta.ciudad = $scope.ciudadSeleccionada;

    if (!ruta.tipo) {

        alert("Seleccione un tipo.");

        return;

    }

    if ($scope.formRuta.id) {

        RutaServicio
            .modificar(ruta)
            .then(() => {

                $scope.seleccionarCiudad(
                    $scope.ciudadSeleccionada
                );

            });

    } else {

        RutaServicio
            .agregar(ruta)
            .then(() => {

                $scope.seleccionarCiudad(
                    $scope.ciudadSeleccionada
                );

            });

    }

    $scope.formRuta = {};

};

$scope.limpiarFormRuta = () => {

    $scope.formRuta = {};

};

$scope.eliminarRuta = (id) => {

    if (confirm("¿Desea eliminar esta ruta?")) {

        RutaServicio
            .eliminar(id)
            .then((respuesta) => {

                $scope.seleccionarCiudad(
                    $scope.ciudadSeleccionada
                );

                $scope.rutaSeleccionada = null;

            });

    }

};
    /********************************
     * PARADAS
     ********************************/
    $scope.seleccionarRuta = (ruta) => {

    console.log("Ruta seleccionada:", ruta); // 👈 DEBUG

    $scope.rutaSeleccionada = ruta;

    ParadaServicio
        .listarPorRuta(ruta.id)
        .then(data => {

            console.log("Paradas recibidas:", data); // 👈 DEBUG

            $scope.paradas = data.sort((a, b) => a.orden - b.orden);

        });

};

  //  $scope.seleccionarRuta = (ruta) => {

   // $scope.rutaSeleccionada = ruta;

  //  ParadaServicio
  //      .listarPorRuta(ruta.id)
   //     .then(data => {

            // ORDENAR POR CAMPO ORDEN
     //       $scope.paradas = data.sort((a, b) => a.orden - b.orden);

    //    })
   //     .catch(error => {

     //       console.error(
     //           "Error consultando paradas:",
     //           error
      //      );
//
    //    });

//};
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

        let parada =
            angular.copy($scope.formParada);

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