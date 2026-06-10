class Ruta {

    constructor(data) {

        this.id = data ? (data.id || 0) : 0;

        this.nombre = data ? data.nombre : "";

        this.descripcion = data ? data.descripcion : "";

        this.ciudad = data ? new Ciudad(data.ciudad) : null;

        this.tipo = data ? new Tipo(data.tipo) : null;
    }

}