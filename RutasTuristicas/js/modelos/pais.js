class Pais {

    constructor(json) {

        this.id = json ? (json.id || 0) : 0;
        this.nombre = json ? (json.nombre || "") : "";
        this.codigoAlfa2 = json ? (json.codigoAlfa2 || "") : "";

    }

}