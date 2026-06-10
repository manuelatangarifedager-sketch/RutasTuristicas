class Ruta {

    constructor(json) {

        this.id = json ? (json.id || 0) : 0;
        this.nombre = json ? (json.nombre || "") : "";

        this.descripcion = json
            ? (json.descripcion || "")
            : "";

        this.ciudad = json && json.ciudad
            ? new Ciudad(json.ciudad)
            : null;

        this.tipo = json && json.tipo
            ? new Tipo(json.tipo)
            : null;
    }

}