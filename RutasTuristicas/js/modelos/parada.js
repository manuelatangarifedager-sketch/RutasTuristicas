class Parada {

    constructor(data) {

        this.id = data ? (data.id || 0) : 0;

        this.orden = data ? data.orden : 1;

        this.nombre = data ? data.nombre : "";

        this.ruta = data ? new Ruta(data.ruta) : null;

        this.longitud = data ? data.longitud : 0;

        this.latitud = data ? data.latitud : 0;

        this.tiempo = data ? data.tiempo : 0;

        this.descripcion = data ? data.descripcion : "";
    }

}