app.service("CiudadServicio", function ($http) {

    const URL = "http://localhost:8080/api/ciudades/";

    this.listar = () => {
        return $http.get(URL)
            .then(respuesta => respuesta.data);
    };

});