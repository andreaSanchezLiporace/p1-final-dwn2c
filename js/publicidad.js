'use strict';
/**
 * Clase que representa una publicidad.
*/
class publicidad {
    /**
     * Crea una instancia de la clase producto.
     * @param {string} nombre - El nombre del producto.
     * @param {string} imagen - La URL de la imagen del producto para agregarle al atributo src.
     * @param {string} altImagen - La descripciòn de la imágen para agregarle al atributo alt.
    */
    #nombre;
    #imagenMobile;
    #imagenTablet;
    #ImagenPC;
    #altImagen;
    #id;

    constructor(nombre, imagenMobile, imagenTablet, imagenPC, altImagen, id){
        this.#nombre = nombre;
        this.#imagenMobile = imagenMobile;
        this.#imagenTablet = imagenTablet;
        this.#ImagenPC = imagenPC;
        this.#altImagen = altImagen;
        this.#id = id;
    }

     /**
     * Obtiene el ID de la publicidad.
     * @returns {number} El ID de la publicidad.
    */
    getId () {
        return this.#id;
    }

    mostrarPublicidad() {

        // let aPublicidad = document.createElement("a");
        // aPublicidad.setAttribute("href","https://www.google.com/");

        let picturePublicidad = document.createElement("picture");

        let sourceTablet = document.createElement("source");
        sourceTablet.setAttribute("media","min-width:768px");
        sourceTablet.setAttribute("srcset", this.#imagenTablet); 

        let sourcePC = document.createElement("source");
        sourcePC.setAttribute("media","min-width:992px");
        sourcePC.setAttribute("srcset", this.#ImagenPC); 

        let imgPublicidad = document.createElement("img");
        imgPublicidad.setAttribute("src",this.#imagenMobile); 
        imgPublicidad.setAttribute("alt",this.#altImagen);
        imgPublicidad.classList.add("img-fluid"); 

        picturePublicidad.append(sourceTablet,sourcePC,imgPublicidad);

        //aPublicidad.append(picturePublicidad);

        return(picturePublicidad);
    }


 }