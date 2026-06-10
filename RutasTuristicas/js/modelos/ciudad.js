class Ciudad {

    constructor(json) {

        this.id = json ? (json.id || 0) : 0;
        this.nombre = json ? (json.nombre || "") : "";

        this.longitud = json ? (json.longitud || 0) : 0;
        this.latitud = json ? (json.latitud || 0) : 0;

        this.pais = json && json.pais
            ? new Pais(json.pais)
            : null;

    }

}