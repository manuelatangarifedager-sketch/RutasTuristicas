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

            // 💣 LIMPIAR TODO
            $scope.rutas = [];
            $scope.paradas = [];
            $scope.rutaSeleccionada = null;

            // 💣 DESTRUIR MAPA
            if (map) {
                map.remove();
                map = null;
            }

            RutaServicio
                .listarPorCiudad(ciudad.id)
                .then(data => {
                    $scope.rutas = data;
                })
                .catch(error => {
                    console.error("Error consultando rutas:", error);
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

            $scope.rutaSeleccionada = ruta;

            setTimeout(() => {

                let mapDiv = document.getElementById("map");

                if (!mapDiv) {
                    console.error("NO EXISTE EL DIV MAP");
                    return;
                }
                inicializarMapa();

                ParadaServicio.listarPorRuta(ruta.id).then(data => {

                    $scope.paradas = data.sort((a, b) => a.orden - b.orden);

                    dibujarRuta($scope.paradas);

                });

            }, 300);
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

            let parada = angular.copy($scope.formParada);


            parada.idRuta = $scope.rutaSeleccionada.id;
            delete parada.ruta;

            parada.latitud = parseFloat(parada.latitud);
            parada.longitud = parseFloat(parada.longitud);
            parada.tiempo = parseInt(parada.tiempo);

            console.log("JSON FINAL:", parada);

            if (parada.id) {

                ParadaServicio.modificar(parada)
                    .then(() => {
                        $scope.seleccionarRuta($scope.rutaSeleccionada);
                        $scope.formParada = {};
                    })
                    .catch(err => console.error(err));

            } else {

                ParadaServicio.agregar(parada)
                    .then(() => {
                        $scope.seleccionarRuta($scope.rutaSeleccionada);
                        $scope.formParada = {};
                    })
                    .catch(err => console.error(err));

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

        let map;
        let markers = [];
        let polyline;
        let controlRuta;

        function inicializarMapa() {

            let mapDiv = document.getElementById("map");


            if (mapDiv) {
                mapDiv.innerHTML = "";
            }


            if (map) {
                map.remove();
                map = null;
            }


            map = L.map('map').setView([4.6097, -74.0817], 13); // Bogotá base

            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '&copy; OpenStreetMap'
            }).addTo(map);
        }
        function dibujarRuta(paradas) {

            limpiarMapa();


            paradas.sort((a, b) => a.orden - b.orden);

            let waypoints = [];

            paradas.forEach(p => {
                if (p.latitud && p.longitud) {

                    waypoints.push(
                        L.latLng(p.latitud, p.longitud)
                    );


                    let marker = L.marker([p.latitud, p.longitud])
                        .addTo(map)
                        .bindPopup(`<b>${p.nombre}</b>`);

                    markers.push(marker);
                }
            });


            if (controlRuta) {
                map.removeControl(controlRuta);
            }

            if (waypoints.length > 1) {

                controlRuta = L.Routing.control({
                    waypoints: waypoints,
                    routeWhileDragging: false,
                    draggableWaypoints: false,
                    addWaypoints: false,
                    show: false
                }).addTo(map);
            }
            if (waypoints.length > 1) {
                map.fitBounds(L.latLngBounds(waypoints));
            }
        }


    });