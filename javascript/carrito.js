let productosEnCarrito = localStorage.getItem("productos-en-carrito");
productosEnCarrito = JSON.parse(productosEnCarrito);
const contenedorCarritoAcciones = document.getElementById("carrito-acciones");
const contenedorCarritoComprado = document.querySelector("#carrito-comprado");
const contenedorCarritoVacio = document.querySelector(".carrito-vacio");
const botonVaciar = document.getElementById("carrito-acciones-vaciar")
let botonesEliminar = document.querySelectorAll (".carrito-producto-eliminar");
const contenedorCarritoProductos = document.querySelector("#carrito-productos");
const contenedorTotal = document.getElementById("total")
const btn = document.querySelector ("#carrito-acciones-comprar")

function cargarProductosCarrito() {
    if (productosEnCarrito && productosEnCarrito.length >= 0) {
        contenedorCarritoProductos.innerHTML = "";
        productosEnCarrito.forEach((producto) => {
            const div = document.createElement("div");
            div.classList.add("carrito-producto");
            div.innerHTML = `
            <div class="informacion-de-producto">
                <img class="carrito-producto-imagen" src="${producto.imagen}" alt="${producto.titulo}">
                <div class="carrito-producto-titulo">
                    <h3>${producto.titulo}</h3>
                </div>
                <div class="carrito-producto-cantidad">
                    <p>Cantidad: ${producto.cantidad}</p>
                </div>
                <div class="carrito-producto-precio">
                    <p>Precio: $${producto.precio}</p>
                </div>
                <div class="carrito-producto-subtotal">
                    <p>Subtotal: $${producto.precio * producto.cantidad}</p>
                </div>
            </div>
                <button id="${producto.id}" class="carrito-producto-eliminar">Eliminar</button>
            `;
            contenedorCarritoProductos.append(div);
        });
        
    } else {
        contendorCarritoVacio.innerHTML = `
        <h2> El carrito esta vacio </h2>
        `
    }
    botonesEliminar = document.querySelectorAll(".carrito-producto-eliminar");
    botonesEliminar.forEach((boton) => {
        boton.addEventListener("click", eliminarDelCarrito);
    });
    actualizarTotal ();
}


function eliminarDelCarrito(e) {
    const productoId = e.target.id;

    const productoIndex = productosEnCarrito.findIndex(producto => producto.id === productoId);
    if (productoIndex !== -1) { 
        if (productosEnCarrito[productoIndex].cantidad > 1) {
            productosEnCarrito[productoIndex].cantidad -= 1;
        } else {
            productosEnCarrito.splice(productoIndex, 1);
        }

        localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));

        cargarProductosCarrito();
    } 
}

cargarProductosCarrito();
actualizarTotal();

botonVaciar.addEventListener("click", vaciarCarrito);
function vaciarCarrito() {
    productosEnCarrito.length = 0;
    localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));
    cargarProductosCarrito();
}

function actualizarTotal (){
    const totalCalculado = productosEnCarrito.reduce((acc, producto) => acc + (producto.precio * producto.cantidad),0);
    total.innerHTML = `$${totalCalculado}`;
}

btn.addEventListener("click", function(){
    if (productosEnCarrito.length > 0) {
        // Carrito con productos
        Swal.fire({
        icon: 'success',
        title: 'COMPRA CONFIRMADA.',
        text: 'Se enviaran los detalles al mail con el que registrastre tu cuenta en nuestra pagina.',
        footer: 'Gracias por confiar en nosotros.'
        });
    } else {
        // Carrito vacío
        Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Parece que no has seleccionado productos',
        footer: '<a href="../index.html" class="btn btn-outline-dark">Vuelve a nuestra tienda haciendo click aqui</a>'
        });
    }
})
