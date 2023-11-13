let productos; // Declarar la variable productos en un ámbito global
let botonesagregar;

fetch('../productosBD/productos.json')
  .then(response => response.json())
  .then(data => {
    productos = data.productos; // Asignar los datos a la variable productos
    cargarproductos(productos); // Cargar los productos en el DOM

    const productosEnCarritoLS = JSON.parse(localStorage.getItem("productos-en-carrito"));

    if (productosEnCarritoLS) {
      productosEnCarrito = productosEnCarritoLS;
    }
  })
  .catch(error => {
    console.error('Error al obtener los datos del archivo JSON:', error);
  });

function cargarproductos(productoselegidos) {
  // Obtén la referencia al contenedor de productos en el DOM
  const contenedorproductos = document.getElementById("contenedor-productos");
  
  // Elimina el contenido existente en el contenedor
  contenedorproductos.innerHTML = "";

  // Verifica si productoselegidos está definido
  if (productoselegidos) {
    // Recorre los productos y genera el contenido HTML para cada uno
    productoselegidos.forEach((producto) => {
      const div = document.createElement("div");
      div.classList.add("producto");
      div.innerHTML = `
        <img class="producto-imagen" src="${producto.imagen}" alt="${producto.titulo}">
        <div class="producto-detalles">
          <h3 class="producto-titulo">${producto.titulo}</h3>
          <p class="producto-precio">$${producto.precio}</p>
          <button class="producto-agregar" id="${producto.id}"><span>AGREGAR</span></button>
        </div>
      `;
      contenedorproductos.append(div);
    });

    // Actualiza los botones de agregar al carrito
    nuevosbotonesagregar();
  }
}

//array de categorias y botones

const productosboton = document.querySelectorAll(".boton-categoria");
const tituloprincipal = document.getElementById("titulo-principal");
cargarproductos(productos);

productosboton.forEach((boton) => {
  boton.addEventListener("click", (e) => {
    if (e.currentTarget.id != "todos") {
      const productocategoria = productos.find(
        (producto) => producto.categoria.id === e.currentTarget.id
      );
      tituloprincipal.innerText = productocategoria.categoria.nombre;
      const productosboton = productos.filter(
        (producto) => producto.categoria.id === e.currentTarget.id
      );
      cargarproductos(productosboton);
    } else {
      tituloprincipal.innerText = "todos los productos";
      cargarproductos(productos);
    }
  });
});

// botones de articulos

function nuevosbotonesagregar() {
  botonesagregar = document.querySelectorAll(".producto-agregar"); // Asignar los elementos a la variable botonesagregar
  botonesagregar.forEach((boton) => {
    boton.addEventListener("click", AgregarAlCarrito);
  });
}

//creando carrito y agregando productos


let productosEnCarrito;

const productosEnCarritoLS = JSON.parse(localStorage.getItem("productos-en-carrito"))

if (productosEnCarritoLS) {
  productosEnCarrito = productosEnCarritoLS
} else {
  productosEnCarrito = []
}


function AgregarAlCarrito(e) {
  const idboton = e.currentTarget.id;
  const productoAgregado = productos.find(
    (producto) => producto.id === idboton
  );
  if (productosEnCarrito.some((producto) => producto.id === idboton)) {
    const index = productosEnCarrito.findIndex(
      (producto) => producto.id === idboton
    );
    productosEnCarrito[index].cantidad++;
  } else {
    productoAgregado.cantidad = 1;
    productosEnCarrito.push(productoAgregado);
  }
  localStorage.setItem(
    "productos-en-carrito",
    JSON.stringify(productosEnCarrito)
  );
  const form = document.getElementById("form-" + idboton);
}

function nuevosbotonesagregar() {
  botonesagregar = document.querySelectorAll(".producto-agregar"); // Asignar los elementos a la variable botonesagregar
  botonesagregar.forEach((boton) => {
    boton.addEventListener("click", AgregarAlCarrito);
    boton.addEventListener("click", function(){
      const idProducto = boton.id;
      const producto = productos.find((p) => p.id === idProducto);

      Swal.fire({
        title: producto.titulo + ' se agregó al carrito', // Título del producto agregado
        imageUrl: producto.imagen,
        imageWidth: 350,
        imageHeight: 450,
        imageAlt: 'Custom image',
        timer: 2000, 
      });
    });
  });
}