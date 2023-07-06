function mostrarPrecioEnPesos (precio){
    const precioPesos = precio.toLocaleString('es-AR', {
      style: 'currency',
      currency: 'ARS',
      minimumFractionDigits: 2
    });
  
    return precioPesos;
  };