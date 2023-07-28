'use strict';
/**
 * Clase que representa un producto.
*/
class producto {
    /**
     * Crea una instancia de la clase producto.
     * @param {string} nombre - El nombre del producto.
     * @param {string} imagen - La URL de la imagen del producto para agregarle al atributo src.
     * @param {string} altImagen - La descripciòn de la imágen para agregarle al atributo alt.
     * @param {number} id - El ID del producto.
     * @param {string} categoria - La categoría del producto.
     * @param {number} precio - El precio del producto.
     * @param {string} descripcion - La descripción del producto.
     * @param {number} cantidad - Es la única propiedad públic, la usamos para acumular la cantidad de productos iguales que tenemos en el carrito de compras.
    */
    nombre;
    imagen;
    altImagen;
    id;
    categoria;
    precio;
    descripcion;
    cantidad;
    stock;

    constructor(nombre, imagen, altImagen, id, categoria, precio, descripcion, cantidad, stock) {
        this.nombre = nombre;
        this.imagen = imagen;
        this.altImagen = altImagen;
        this.id = id;
        this.categoria = categoria;
        this.precio = precio;
        this.descripcion = descripcion;
        this.cantidad = cantidad;
        this.stock = stock;
    }

    /**
     * Obtiene el nombre del producto.
     * @returns {string} El nombre del producto.
    */
    getNombre () {
        return this.nombre;
    }

    /**
     * Obtiene la imagen del producto.
     * @returns {string} La URL de la imagen del producto para agregarle al atributo src.
    */
    getImagen () {
        return this.imagen;
    }
    
    /**
     * Obtiene el alt de la imagen del producto.
     * @returns {string} La descripciòn de la imágen para agregarle al atributo alt.
    */
    getAltImagen () {
        return this.altImagen;
    }

    /**
     * Obtiene el ID del producto.
     * @returns {number} El ID del producto.
    */
    getId () {
        return this.id;
    }

    /**
     * Obtiene la categoría del producto.
     * @returns {string} La categoría del producto.
    */
    getCategoria () {
        return this.categoria;
    }

    /**
     * Obtiene el precio del producto.
     * @returns {number} El precio del producto.
    */
    getPrecio () {
        return this.precio;
    }

    /**
     * Obtiene la descripción del producto.
     * @returns {string} La descripción del producto.
    */
    getDescripcion () {
        return this.descripcion;
    }

    /**
     * Obtiene el stock del producto.
     * @returns {number} El stock del producto.
    */
    getStock () {
        return this.stock;
    }

    /**
     * Obtiene el producto entero.
     * @returns {object} El stock del producto.
    */
    toJSON(){
        return{
            nombre: this.nombre,
            imagen: this.imagen,
            altImagen: this.altImagen,
            id: this.id,
            categoria: this.categoria,
            precio: this.precio,
            descripcion: this.descripcion,
            cantidad: this.cantidad,
        }
    }
    /**
     * Con este método se muestra el producto en el documento HTML.
     * Se crea la siguiente estructura:
     * <article class="card">
     *      <h3>${this.nombre}</h3>
     *          </img src="this.imagen">
     *          <p>Código: ${this.id}</p>
     *          <p>Categoria: ${this.categoria}</p>
     *          <p>Precio: ${this.precio}</p>
     *          <button>Agregar al carrito</button>
     *          <button>Ver más</button>
     *          Modal Detalle Producto
     *          <div>
     *              <h3>${this.nombre}</h3>
     *              <div class="datosProductos">
     *                  </img src="this.imagen">
     *                  <div class="detalleProductos">
        *                  <p>Código: ${this.id}</p>
        *                  <p>Categoria: ${this.categoria}</p>
        *                  <p>Precio: ${this.precio}</p>
        *                  <p>${this.descripcion}</p>
        *                  <button>Agregar al carrito</button>
        *              </div>
     *              </div>
     *          </div>
     * </article>
    */
    mostrarProducto() {
        let articleProducto = document.createElement("article");
            articleProducto.classList.add("card");
            articleProducto.dataset.id = this.id; // con .dataset creo el atributo data-id en la card, para que tome el id del producto y se lo asigne a la card. De esta forma puedo identificar el producto al momento de agregarlo al carrito
            let h3Nombre = document.createElement("h3");
            h3Nombre.innerText = `${this.nombre}`;
            let imgImagen = document.createElement("img");
                imgImagen.setAttribute("src", this.imagen);
                imgImagen.setAttribute("alt", this.altImagen);
            let pId = document.createElement("p");
                pId.innerText = `Codigo: ${this.id}`;
            let pCategoria = document.createElement("p");
                pCategoria.innerText = `Categoria: ${this.categoria}`;
            let pPrecio = document.createElement("p");
                pPrecio.innerText = `Precio: $ ${(this.precio).toLocaleString()}.-`;
            let pDescripcion = document.createElement("p");
                pDescripcion.classList.add("pDescripcionCard");
                pDescripcion.innerText = `Descripcion: ${this.descripcion}`;

            // Botón agregar - card producto
            let buttonAgregarCarrito = document.createElement ("button");
                buttonAgregarCarrito.innerText = `Agregar al carrito`;
                buttonAgregarCarrito.classList.add("btn-agregarCarrito");
                buttonAgregarCarrito.addEventListener('click', (e) => {
                    const button = e.target; // con el .target se identifica que boton del html dispara la acción 
                    const articleProducto = button.parentNode; // con .parentNode hago referencia al article que esta identificado con el id del producto.
                    const productoId = articleProducto.dataset.id;
                    for (let producto of aCatalogo){
                        if (producto.id == productoId){
                            agregarAlCarrito(producto);
                            break;
                        }
                    }
                });
            // Botón ver más - card producto
            let buttonVerMas = document.createElement("button");
                buttonVerMas.innerText = `Ver más`;
                buttonVerMas.classList.add("btn-verDetalle");
                buttonVerMas.addEventListener('click', () => {
                    // Antes de crear el html de la modal, limpio la vista de otras modales que pueden estar accionadas
                    let modalDetalle = document.querySelector("#modalProducto");
                    let modalCarrito = document.querySelector("#modalCarrito");
                    let modalCompra = document.querySelector("#modalCompra");
                    if(modalDetalle){
                        modalDetalle.remove();
                    } 
                    if(modalCarrito){
                        modalCarrito.remove();
                    }
                    if(modalCompra){
                        modalCompra.remove();
                    }
                    // Estructura html de la modal con el detalle del producto
                    modalDetalle = document.createElement("div");
                    modalDetalle.classList.add("modalDetalle"); 
                    modalDetalle.setAttribute("id", "modalProducto");
                    modalDetalle.dataset.id = this.id;
                        let aCerrar = document.createElement("a");
                            aCerrar.setAttribute("href", "javascript:void(0)");
                            aCerrar.innerText = "X";
                            aCerrar.addEventListener('click', () => {
                                let cerrar = document.querySelector("#modalProducto");
                                    cerrar.remove();
                            });
                        modalDetalle.appendChild(aCerrar);
                        let h3Nombre = document.createElement("h3");
                            h3Nombre.innerText = `${this.nombre}`;
                        // Div que contiene toda la información del producto
                        let datosProducto = document.createElement("div");
                            datosProducto.classList.add("datosProducto"); 
                            let imgImagen = document.createElement("img");
                                imgImagen.setAttribute("src", this.imagen);
                                imgImagen.setAttribute("alt", this.altImagen);
                            // Div que contiene la información en texto del producto
                            let detalleProducto = document.createElement("div");
                                detalleProducto.classList.add("detalleProducto"); 
                                let pId = document.createElement("p");
                                    pId.innerText = `Codigo: ${this.id}`;
                                let pCategoria = document.createElement("p");
                                    pCategoria.innerText = `Categoria: ${this.categoria}`;
                                let pPrecio = document.createElement("p");
                                    pPrecio.innerText = `Precio: $ ${this.precio.toLocaleString()}.-`;
                                let pDescripcion = document.createElement("p");
                                    pDescripcion.innerText = `${this.descripcion}`;
                            // Botón agregar - detalle producto
                            let buttonAgregarCarrito = document.createElement ("button");
                                buttonAgregarCarrito.innerText = `Agregar al carrito`;
                                buttonAgregarCarrito.classList.add("btn-agregarCarrito");
                                buttonAgregarCarrito.addEventListener('click', () => {
                                    const productoId = this.id;
                                    for (let producto of aCatalogo){
                                        if (producto.id == productoId){
                                            agregarAlCarrito(producto);
                                            break;
                                        }
                                    }
                                });
                    // Apendeamos estructura a la modal
                    detalleProducto.append(pId, pCategoria, pPrecio, pDescripcion, buttonAgregarCarrito);
                    datosProducto.append(imgImagen, detalleProducto);
                    modalDetalle.append(aCerrar, h3Nombre, datosProducto);
                    // Traemos el div que esta al mismo nivel de la seccion de productos
                    let sectionProductos = document.querySelector("#contenedorProductos");
                        sectionProductos.parentNode.appendChild(modalDetalle);
                        return sectionProductos;
                });
        // Apendeamos estructura al article del producto
        articleProducto.append(h3Nombre, imgImagen, pId, pCategoria, pPrecio, pDescripcion, buttonVerMas, buttonAgregarCarrito);
        return articleProducto;
    }

    /**
     * Crea y muestra un mini producto en la página.
     * @returns {HTMLDivElement} El elemento div que representa el mini producto.
     * Se crea la siguiente estructura:
     * <div data-id="valor igual al producto">
     *      <h3>${this.nombre}</h3>
     *      <p>${this.nombre}</p>
     *      <p>Subtotal: ${this.precio}</p>
     *      <div class="masMenosProductos">
     *          <button> + </button>
     *          <p>Cantidad productos con el mismo id</p>
     *          <button> - </button>    
     *      </div>
     * </div>
    */
    mostrarMiniProducto() {
        // Div que contiene la información mínima del producto
        let divMiniProducto = document.createElement("div");
            divMiniProducto.dataset.id = this.id;
            let pNombreMiniProducto = document.createElement("p");
                pNombreMiniProducto.innerText = `${this.nombre}`;
            let pPrecioMiniProducto = document.createElement("p");
            let precioSubtotalProducto = this.precio * this.cantidad;
                pPrecioMiniProducto.innerText = `Subtotal: $${precioSubtotalProducto.toLocaleString()}.-`;
            let masMenosProductos = document.createElement("div");
                masMenosProductos.classList.add("masMenosProductos")
            let pCantProducto = document.createElement("p");
                pCantProducto.classList.add("pCantidadProducto");
                pCantProducto.innerText = `${this.cantidad}`;
            // Mini botón agregar - carrito
            let buttonAgregarCarrito = document.createElement ("button");
                buttonAgregarCarrito.innerText = ` + `;
                buttonAgregarCarrito.classList.add("btn-agregarCarrito");
                buttonAgregarCarrito.addEventListener('click', () => {
                    const productoId = this.id;
                    if(productoId == divMiniProducto.dataset.id) {
                        for (let producto of aCarrito){
                            if (producto.id == productoId){
                                agregarAlCarrito(producto);
                                precioSubtotalProducto += this.precio;
                                pPrecioMiniProducto.innerText = `Subtotal: $${precioSubtotalProducto.toLocaleString()}.-`;
                                pCantProducto.innerText = `${this.cantidad}`;
                                break;
                            }
                        }
                    }
                });
            // Mini botón eliminar - carrito
            let buttonEliminarDelCarrito = document.createElement ("button");
                buttonEliminarDelCarrito.innerText = ` - `;
                buttonEliminarDelCarrito.classList.add("btn-eliminarCarrito");
                buttonEliminarDelCarrito.addEventListener('click', (e) => {
                    let contenedorProducto = e.target.parentNode.parentNode;
                const productoId = this.id;
                for(let i=0; i<aCarrito.length; i++){
                    if(aCarrito[i].id == productoId) {
                        eliminarDelCarrito(aCarrito[i], contenedorProducto, i);
                        precioSubtotalProducto -= this.precio;
                        pPrecioMiniProducto.innerText = `Subtotal: $${precioSubtotalProducto.toLocaleString()}.-`;
                        pCantProducto.innerText = `${this.cantidad}`;
                        break;
                    }
                }
            });
        // Apendeamos estructura a la modal
        masMenosProductos.append(buttonAgregarCarrito, pCantProducto, buttonEliminarDelCarrito)
        divMiniProducto.append(pNombreMiniProducto, pPrecioMiniProducto, masMenosProductos);
        return divMiniProducto;
    }
}