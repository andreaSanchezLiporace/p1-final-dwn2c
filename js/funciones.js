function mostrarPrecioEnPesos (precio){
    const precioPesos = precio.toLocaleString('es-AR', {
      style: 'currency',
      currency: 'ARS',
      minimumFractionDigits: 2
    });
  
    return precioPesos;
  };

window.addEventListener("keydown", (e) => {
  if(e.key == 'Escape'){
      let modalCarrito = document.querySelector("#modalCarrito");
      let modalCompra = document.querySelector("#modalCompra");
      let modalCompraRealizada = document.querySelector("#modalCompraRealizada");
      let modalDetalle = document.querySelector("#modalProducto"); 
      let modalPublicidades = document.querySelector("#modalPublicidades"); 
      
      if(modalCarrito){
          modalCarrito.remove();
      }
      if (modalCompra){
        modalCompra.remove();
      }
      if(modalCompraRealizada){
        modalCompraRealizada.remove();
      }
      if(modalDetalle){
        modalDetalle.remove();
      }
      if(modalPublicidades){
        modalPublicidades.remove();
      }
    }
});


//REVISAR PORQUE NO VA HACIA EL ADDEVENTLISTENER DEL SUBMIT

// window.addEventListener("keydown", (e) => {
//   if(e.key == 'Enter')
//   {
//     let formCompra = document.querySelector("#formularioCompra");
//     if(formCompra){
//       formCompra.submit();
//     }
    
//   }
// })