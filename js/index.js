'use strict';

/**
 * ARCHILLI, MATIAS
 * SANCHEZ LIPORACE, ANDREA
*/

let aCatalogo = [];
let aCarrito = [];
let precioTotal = 0;
let contadorProductos = 0;

/** 
 * Mostramos el catalogo en l aprimer vista del sitio
 * Buscamos la etiqueta section del HTML con el ID "contenedorProductos", section donde mostraremos la estructura creada con DOM para cada articulo de aCatalogo.
*/
let sectionPrincipal = document.getElementById("contenedorProductos");

fetch("js/productos.json").then(response => response.json()).then(jsonCatalogo => {

    jsonCatalogo.forEach(productoJson => {

    let nuevoProducto = new producto(
        productoJson.nombre,
        productoJson.imagen,
        productoJson.altImagen,
        productoJson.id,
        productoJson.categoria,
        productoJson.precio,
        productoJson.descripcion,
    );

    aCatalogo.push(nuevoProducto);

    }); 

    /** 
     * Con un for of, se recorre cada objeto en aProductos.
     * Se agrega el artículo del producto al elemento del DOM con el ID "contenedorProductos".
    */
    for (const producto of aCatalogo) {
        sectionPrincipal.append(producto.mostrarProducto());
    } 

});


/**
 * Filtra los productos por una categoría específica y muestra los resultados en la página.
 * @param {string} categoriaElegida - La categoría por la cual filtrar los productos.
 */
function filtrarPorCategoria(categoriaElegida) {
    // Limpiamos la section de productos
    sectionPrincipal.innerHTML = "";

    // Creamos un array para guardar los productos filtrados e indicamos como realizar el filtro por categoría
    let aCatalogoFiltrado = aCatalogo.filter((producto) => producto.getCategoria().includes(categoriaElegida));

    // Buscamos el div donde se encuentran los botones para filtrar la categoria
    let divFiltros = document.querySelector('.filtros');
    // Guardamos en una variable el boton EliminarFiltro
    let buttonEliminarFiltro = document.querySelector('.btn-eliminar');

    // Analizamos si ya hay un boton EliminarFiltro y lo eliminamos antes de agregar uno nuevo
    if (buttonEliminarFiltro) {
        buttonEliminarFiltro.remove();
    }

    // Creamos un botón para eliminar el filtro aplicado por el cliente
    buttonEliminarFiltro = document.createElement("button");
    buttonEliminarFiltro.innerText = 'Eliminar filtro';
    buttonEliminarFiltro.classList.add("btn-eliminar");
    buttonEliminarFiltro.addEventListener('click', () => {
        // Quitamos el botón directamente del divFiltros
        divFiltros.removeChild(buttonEliminarFiltro); 
        // Limpiamos la sección de productos
        sectionPrincipal.innerHTML = "";
        // Recorro aCatalogo para mostrar el catalogo completo nuevamente
        for (const producto of aCatalogo) {
            sectionPrincipal.append(producto.mostrarProducto());
        }
    });
    
    // Appendeo el boton EliminarFiltro al divFiltros
    divFiltros.append(buttonEliminarFiltro);
    // Recorro arrayFiltrado para mostrar los productos filtrados
    for (const producto of aCatalogoFiltrado) {
        sectionPrincipal.append(producto.mostrarProducto());
    }
}

/**
 * CARRITO *
*/
/** 
 * aCarrito: Lo uso para almacenar los productos que el cliente desea agregar a su carrito de compras.
*/
/**
 * Agrega un producto al carrito.
 * @param {Object} producto - El producto que se va a agregar al carrito.
*/
function agregarAlCarrito(producto){
    let itemCarrito = document.querySelector("#itemsCarrito");
    let precioFinal = document.querySelector("#totalPagar");
    let itemCarritoModal = document.querySelector("#pCantProductosModal");
    let precioFinalModal = document.querySelector("#pPrecioTotalModal");

    precioTotal += producto.getPrecio();
    if (aCarrito.length == 0) {
        producto.cantidad = 1;
        aCarrito.push(producto);
    } else {
        let productoExistente = false;
        for (let i = 0; i < aCarrito.length; i++) {
            if (aCarrito[i].getId() == producto.getId()) {
                aCarrito[i].cantidad += 1;
                productoExistente = true;
                break;
            }
        }
        if (!productoExistente) {
            producto.cantidad = 1;
            aCarrito.push(producto);
        }
    }

    contadorProductos++;
    if(itemCarritoModal || precioFinalModal != null){
        itemCarritoModal.innerText = "Cantidad de productos: " + contadorProductos;
        precioFinalModal.innerText = "Total a pagar: $" + precioTotal.toLocaleString();
    }
    itemCarrito.innerText = contadorProductos;
    precioFinal.innerText = precioTotal.toLocaleString();
}

/**
 * Elimina un producto del carrito de compras.
 * @param {Producto} producto - El producto a eliminar.
 * @param {number} indice - El índice del producto en el carrito.
*/
function eliminarDelCarrito(producto, contenedorProducto, indice){
    let itemCarrito = document.querySelector("#itemsCarrito");
    let precioFinal = document.querySelector("#totalPagar");
    let itemCarritoModal = document.querySelector("#pCantProductosModal");
    let precioFinalModal = document.querySelector("#pPrecioTotalModal");

    if(producto.cantidad > 1){
        precioTotal -= producto.getPrecio();
        for (let i = 0; i < aCarrito.length; i++) {
            if (aCarrito[i].getId() == producto.getId()) {
                aCarrito[i].cantidad -= 1;
                break;
            }
        }
    } else {
        precioTotal -= producto.getPrecio();
        aCarrito.splice(indice, 1);
        contenedorProducto.remove();
    }

    contadorProductos--;
        if(itemCarritoModal || precioFinalModal != null){
            itemCarritoModal.innerText = "Cantidad de productos: " + contadorProductos;
            precioFinalModal.innerText = "Total a pagar: $" + precioTotal.toLocaleString();
        }
        itemCarrito.innerText = contadorProductos;
        precioFinal.innerText = precioTotal.toLocaleString();
}

/**
 * Muestra el carrito de compras en una ventana modal.
 * @returns {Element} El elemento HTML que contiene los productos del carrito.
 * Se crea la siguiente estructura:
 * <div class="modalCarrito">
 *      <a href="javascript:void(0)"></a>
 *      <h3>Mi Carrito</h3>
 *          <div class="productosCarrito">Ejecuta el metodo producto.mostrarMiniProducto()</div>
 *          <div class="totalesCarrito">
 *              <p>Total a Pagar: pPrecioTotalModal</p>
 *              <p>Cantidad de productos: contadorProductos</p>
 *          </div>
 *          <div class="botonesCarrito">
 *              <button>Iniciar compra</button>
 *              <button>Vaciar carrito</button>
 *          </div>
 * </div>
*/
function verCarrito () {
    let modalDetalle = document.querySelector("#modalProducto");
    let modalCarrito = document.querySelector("#modalCarrito");
    if(modalDetalle){
        modalDetalle.remove();
    }
    if (modalCarrito) {
        modalCarrito.remove();
    }

    modalCarrito = document.createElement("div");
    modalCarrito.classList.add("modalCarrito");
    modalCarrito.setAttribute("id", "modalCarrito");
        const aCerrar = document.createElement("a");
        aCerrar.setAttribute("href", "javascript:void(0)");
        aCerrar.innerText = "X";
        aCerrar.addEventListener('click', () => {
            let cerrar = document.querySelector("#modalCarrito");
            cerrar.remove();
        });
        let h3Carrito = document.createElement("h3");
            h3Carrito.innerText = "Mi Carrito";

        let totalesCarrito = document.createElement("div");
            totalesCarrito.classList.add("totalesCarrito");
            let pPrecioTotal = document.createElement("p");
                pPrecioTotal.setAttribute('id','pPrecioTotalModal');
                pPrecioTotal.innerText = "Total a pagar: $" + precioTotal.toLocaleString();
            let pCantProductos = document.createElement("p");
                pCantProductos.setAttribute('id','pCantProductosModal');
                pCantProductos.innerText = "Cantidad de productos: " + contadorProductos;

            let divProductosCarrito = document.createElement("div");
                divProductosCarrito.classList.add("productosCarrito");
                for (const producto of aCarrito) {
                        divProductosCarrito.append(producto.mostrarMiniProducto());
                }

        let botonesCarrito = document.createElement("div");
            botonesCarrito.classList.add("botonesCarrito");
            let buttonVaciar = document.createElement("button");
                buttonVaciar.innerText = "Vaciar carrito";
                buttonVaciar.classList.add("btn-vaciarCarrito");
                buttonVaciar.addEventListener('click', () => {
                    aCarrito = [];
                    precioTotal = 0;
                    contadorProductos = 0;
                    divProductosCarrito.innerHTML = "";
                    pPrecioTotal.innerText = "Total a pagar: $" + precioTotal;
                    pCantProductos.innerText = "Cantidad de productos: " + contadorProductos;

                    let itemCarrito = document.querySelector("#itemsCarrito");
                    let precioFinal = document.querySelector("#totalPagar");
                    precioFinal.innerText = precioTotal;
                    itemCarrito.innerText = contadorProductos;
                });
            let buttonComprar = document.createElement("button");
                buttonComprar.innerText = "Iniciar Compra";
                buttonComprar.classList.add("btn-compra");
                buttonComprar.addEventListener('click', () => {
                    realizarCompra();
                });
    
    totalesCarrito.append(pPrecioTotal, pCantProductos)
    botonesCarrito.append(buttonComprar, buttonVaciar)
    modalCarrito.append(aCerrar, h3Carrito, divProductosCarrito, totalesCarrito, botonesCarrito);

    // Traemos el div que esta al mismo nivel de la seccion de productos
    const sectionProductos = document.querySelector("#contenedorProductos");
    sectionProductos.parentNode.appendChild(modalCarrito);
    return sectionProductos;
}

/**
 * Muestra un modal con form de compra.
 * @returns {Element} Una ventana modal con el form de compra
*/
function realizarCompra() {
    let modalDetalle = document.querySelector("#modalProducto");
    let modalCarrito = document.querySelector("#modalCarrito");
    if(modalDetalle){
        modalDetalle.remove();
    }
    if (modalCarrito) {
        modalCarrito.remove();
    }

    if(aCarrito.length > 0){
    let modalCompra = document.createElement("div");
        modalCompra.classList.add("modalCompra");
        modalCompra.setAttribute("id", "modalCompra");

    let aCerrar = document.createElement("a");
        aCerrar.setAttribute("href", "javascript:void(0)");
        aCerrar.innerText = "X";
        aCerrar.addEventListener('click', () => {
            let cerrar = document.querySelector("#modalCompra");
            cerrar.remove();
        });

    let h3Compra = document.createElement("h3");
        h3Compra.innerText = "Finalizar compra";

    let pCompra1 = document.createElement("p");
        pCompra1.innerText = "Completá el formulario con los tus datos y con los datos del medio de pago que utilizarás";

    let formCompra = document.createElement("form");

    let fieldsetCliente = document.createElement("fieldset");
    let legendCliente = document.createElement("legend");
        legendCliente.innerText = "Tus datos: ";

    let spanNombreCompleto = document.createElement("span");
        spanNombreCompleto.innerText = "Nombre completo";

    let inputNombreCompleto = document.createElement("input");
        inputNombreCompleto.setAttribute("type", "text");
        inputNombreCompleto.setAttribute("placeholder", "Ingrese su nombre y apellido");
        inputNombreCompleto.setAttribute("required", "true");

    let spanDireccion = document.createElement("span");
        spanDireccion.innerText = "Direccion completa";

    let inputDireccion = document.createElement("input");
        inputDireccion.setAttribute("type", "text");
        inputDireccion.setAttribute("placeholder", "Ingrese la direccion de entrega");
        inputDireccion.setAttribute("required", "true");

    let spanCodigoPostal = document.createElement("span");
        spanCodigoPostal.innerText = "Codigo postal";
    
    let inputCodigoPostal = document.createElement("input");
        inputCodigoPostal.setAttribute("type", "number");
        inputCodigoPostal.setAttribute("placeholder", "Ingrese su codigo postal");
        inputCodigoPostal.setAttribute("required", "true");  
        inputCodigoPostal.setAttribute("minlength", 4);
        inputCodigoPostal.setAttribute("maxlength", 4);

    fieldsetCliente.append(legendCliente, spanNombreCompleto, inputNombreCompleto, spanDireccion, inputDireccion, spanCodigoPostal, inputCodigoPostal);

    let fieldsetMetodoPago = document.createElement("fieldset");
    let legendMetodoPago = document.createElement("legend");
        legendMetodoPago.innerText = "Metodo de pago: ";

    let divTipoTarjetas = document.createElement("div");
        divTipoTarjetas.classList.add("divTipoTarjetas");
    let inputTarjetaDebito = document.createElement("input");
        inputTarjetaDebito.classList.add("radioInput");
        inputTarjetaDebito.setAttribute('type', "radio");
        inputTarjetaDebito.setAttribute('id', "radioDebito");
        inputTarjetaDebito.setAttribute('name', "radioDebito");
        inputTarjetaDebito.setAttribute('value', "debito");
    let labelTarjetaDebito = document.createElement("label");
        labelTarjetaDebito.setAttribute("for", "radioDebito");
        labelTarjetaDebito.innerText = "Tarjeta de Débito";

    let divInfoTarjetas = document.createElement("div");
        divInfoTarjetas.classList.add("divInfoTarjetas");
    let inputTarjetaCredito = document.createElement("input");
        inputTarjetaCredito.classList.add("radioInput");
        inputTarjetaCredito.setAttribute('type', "radio");
        inputTarjetaCredito.setAttribute('id', "radioCredito");
        inputTarjetaCredito.setAttribute('name', "radioCredito");
        inputTarjetaCredito.setAttribute('value', "credito");

    let labelTarjetaCredito = document.createElement("label");
        labelTarjetaCredito.setAttribute("for", "radioCredito");
        labelTarjetaCredito.innerText = "Tarjeta de Crédito";

    let spanNombre = document.createElement("span");
        spanNombre.innerText = "Nombre completo";

    let inputNombre = document.createElement("input");
        inputNombre.setAttribute("type", "text");
        inputNombre.setAttribute("placeholder", "Ingrese el nombre que figura en la tarjeta");
        inputNombre.setAttribute("required", "true");

    let spanNumeroTarjeta = document.createElement("span");
        spanNumeroTarjeta.innerText = "Numero de tarjeta";
    
    let inputNumeroTarjeta = document.createElement("input");
        inputNumeroTarjeta.setAttribute("type", "number");
        inputNumeroTarjeta.setAttribute("placeholder", "Ingrese el numero de la tarjeta");
        inputNumeroTarjeta.setAttribute("required", "true");  
        inputNumeroTarjeta.setAttribute("minlength", 1);
        inputNumeroTarjeta.setAttribute("maxlength", 16);

    let spanCodigoSeguridad = document.createElement("span");
        spanCodigoSeguridad.innerText = "Codigo de seguridad";
    
    let inputCodigoSeguridad = document.createElement("input");
        inputCodigoSeguridad.setAttribute("type", "number");
        inputCodigoSeguridad.setAttribute("placeholder", "Ingrese el codigo de seguridad");
        inputCodigoSeguridad.setAttribute("required", "true");  
        inputCodigoSeguridad.setAttribute("minlength", 3);
        inputCodigoSeguridad.setAttribute("maxlength", 4);

    let buttonComprar = document.createElement("button");
        buttonComprar.setAttribute("type", "submit");
        buttonComprar.innerText = "Comprar";
        buttonComprar.classList.add("btn-finCompra");
    
    formCompra.addEventListener('submit', (e) => {
        e.preventDefault();
        compraRealizada();
    })

    divTipoTarjetas.append(inputTarjetaDebito, labelTarjetaDebito, inputTarjetaCredito, labelTarjetaCredito);
    divInfoTarjetas.append(spanNombre, inputNombre, spanNumeroTarjeta, inputNumeroTarjeta, spanCodigoSeguridad, inputCodigoSeguridad);
    fieldsetMetodoPago.append(legendMetodoPago, divTipoTarjetas,  divInfoTarjetas);

    formCompra.append(fieldsetCliente, fieldsetMetodoPago, buttonComprar);

    modalCompra.append(aCerrar, h3Compra, pCompra1, formCompra);
    // Traemos el div que esta al mismo nivel de la seccion de productos
    // No termino de darme cuenta como crear un hijo de la modal carrito
    let sectionProductos = document.querySelector("#contenedorProductos");
        sectionProductos.parentNode.appendChild(modalCompra);
    return sectionProductos;
    } else {
        let modalCompra = document.createElement("div");
            modalCompra.classList.add("modalCompra");
            modalCompra.setAttribute("id", "modalCompra");

        let aCerrar = document.createElement("a");
            aCerrar.setAttribute("href", "javascript:void(0)");
            aCerrar.innerText = "X";
            aCerrar.addEventListener('click', () => {
                let cerrar = document.querySelector("#modalCompra");
                cerrar.remove();
            });

        let pCompra = document.createElement("p");
            pCompra.innerText = "Para iniciar una compra debe agregar productos al carrito";

        let buttonVolver = document.createElement("Button");
            buttonVolver.classList.add("btnVolver");
            buttonVolver.setAttribute("href", "javascript:void(0)");
            buttonVolver.innerText = "Volver al catalogo";
            buttonVolver.addEventListener('click', () => {
                let cerrar = document.querySelector("#modalCompra");
                cerrar.remove();
            });

        modalCompra.append(aCerrar, pCompra, buttonVolver);
        let sectionProductos = document.querySelector("#contenedorProductos");
        sectionProductos.parentNode.appendChild(modalCompra);
        return sectionProductos;
    }
}

/**
 * Muestra un modal de confirmación de compra.
 * @returns {Element} Una ventana modal con un mensaje de compra exitosa
*/
function compraRealizada(){
    let modalDetalle = document.querySelector("#modalProducto");
    let modalCarrito = document.querySelector("#modalCarrito");
    let modalCompra = document.querySelector("#modalCompra");
    if(modalDetalle){
        modalDetalle.remove();
    }
    if (modalCarrito) {
        modalCarrito.remove();
    }
    if (modalCompra) {
        modalCompra.remove();
    }

    let modalCompraRealizada = document.createElement("div");
        modalCompraRealizada.classList.add("modalCompraRealizada");
        modalCompraRealizada.setAttribute("id", "modalCompraRealizada");

    let aCerrar = document.createElement("a");
        aCerrar.setAttribute("href", "javascript:void(0)");
        aCerrar.innerText = "X";
        aCerrar.addEventListener('click', () => {
            let cerrar = document.querySelector("#modalCompraRealizada");
            cerrar.remove();
        });

    let h3CompraRealizada = document.createElement("h3");
        h3CompraRealizada.innerText = "Compra Exitosa";

    let pCompraRealizada1 = document.createElement("p");
        pCompraRealizada1.innerText = "Tu transacción se realizó con éxito";

    let pCompraRealizada2 = document.createElement("p");
        pCompraRealizada2.innerText = "¡¡Gracias por elegirnos!!";

    let buttonVolver = document.createElement("Button");
        buttonVolver.classList.add("btnVolver");
        buttonVolver.setAttribute("href", "javascript:void(0)");
        buttonVolver.innerText = "Volver al catalogo";
        buttonVolver.addEventListener('click', () => {
            let cerrar = document.querySelector("#modalCompraRealizada");
            
            aCarrito = [];
            precioTotal = 0;
            contadorProductos = 0;

            let itemCarrito = document.querySelector("#itemsCarrito");
            let precioFinal = document.querySelector("#totalPagar");

            precioFinal.innerText = precioTotal;
            itemCarrito.innerText = contadorProductos;
            
            cerrar.remove();
        });

    modalCompraRealizada.append(aCerrar, h3CompraRealizada, pCompraRealizada1, pCompraRealizada2, buttonVolver);
    // Traemos el div que esta al mismo nivel de la seccion de productos
    // No termino de darme cuenta como crear un hijo de la modal carrito
    let sectionProductos = document.querySelector("#contenedorProductos");
        sectionProductos.parentNode.appendChild(modalCompraRealizada);
    return sectionProductos;
}