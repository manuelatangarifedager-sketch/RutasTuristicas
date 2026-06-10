class Tipo {

    constructor(data) {

        this.id = data ? (data.id || 0) : 0;

        this.nombre = data ? data.nombre : "";
    }

}