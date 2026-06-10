app.service("ParadaServicio", function ($http) {

    const URL = "http://localhost:8080/api/paradas/";

    this.listarRuta = (idRuta) => {
        return $http.get(`${URL}ruta/${idRuta}`)
            .then(respuesta => respuesta.data);
    };

    this.agregar = (parada) => {
        return $http.post(URL, parada)
            .then(respuesta => respuesta.data);
    };

    this.modificar = (parada) => {
        return $http.put(URL, parada)
            .then(respuesta => respuesta.data);
    };

    this.eliminar = (id) => {
        return $http.delete(`${URL}${id}`)
            .then(respuesta => respuesta.data);
    };

});