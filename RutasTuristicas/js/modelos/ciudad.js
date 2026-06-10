class Ciudad {

    constructor(data) {

        this.id = data ? (data.id || 0) : 0;

        this.nombre = data ? data.nombre : "";

        this.pais = data ? data.pais : null;

        this.longitud = data ? data.longitud : 0;

        this.latitud = data ? data.latitud : 0;
    }

}