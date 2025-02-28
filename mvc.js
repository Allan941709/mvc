////////////////////////////////////////////////////////////////////////////////////////// Modelo///////////////////////////////////////////////////////////////////////////////
//Inventario
const modelo = {
    coches: [
        { name: "Toyota", clicks: 0, stock: 3, image: "img/toyota.jpg", price: 20000 },
        { name: "Honda", clicks: 0, stock: 2, image: "img/honda.jpg", price: 18000 },
        { name: "Ford", clicks: 0, stock: 1, image: "img/ford.jpg", price: 25000 },
    ],
};

////////////////////////////////////////////////////////////////////////////////Controlador///////////////////////////////////////////////////////////////////////////////
//Vendedor
const controlador = {
    // Inicializa la aplicación
    init() {
        modelo.cocheActual = modelo.coches[0]; // Selecciona el primer coche por defecto
        vista.render(); 
        vistaCoche.render(); 
    },
    // Devuelve la lista de coches del modelo
    obtenerCoches: () => modelo.coches,
    // Devuelve el coche actualmente seleccionado
    obtenerCocheActual: () => modelo.cocheActual,
    // Cambia el coche seleccionado y actualiza la vista
    seleccionCoche(car) {
        modelo.cocheActual = car;
        vistaCoche.render();
    },
    // Incrementa los clicks en el coche actual y reduce su stock
    incrementarCliks() {
        if (modelo.cocheActual.stock > 0) { // Verifica que haya stock disponible
            modelo.cocheActual.clicks++; 
            modelo.cocheActual.stock--; 
            vistaCoche.render(); 
            vista.render(); 
        }
    },
    // Comprueba si todos los coches se han quedado sin stock
    todoSinStock() {
        return modelo.coches.every(car => car.stock === 0); 
    }
};
////////////////////////////////////////////////////////////////////////////////Vista///////////////////////////////////////////////////////////////////////////////
//Tienda
// Vista de lista de coches
const vista = {
    // Renderiza la lista de coches 
    render() {
        const crearElementos = document.getElementById("car-list");
        crearElementos.innerHTML = ""; 
        // Recorre la lista de coches y crea un botón por cada uno segun el valor de name: en inventario
        controlador.obtenerCoches().forEach(car => {
            const button = document.createElement("button");
            button.textContent = car.name; 
            button.onclick = () => controlador.seleccionCoche(car); 
            crearElementos.appendChild(button); 
        });
    }
};
// Vista del coche actual
const vistaCoche = {
    // Renderiza la vista del coche seleccionado
    render() {
        const car = controlador.obtenerCocheActual(); // Obtiene el coche seleccionado
        const carViewElem = document.querySelector(".car-view");
        // Muestra los detalles del coche seleccionado
        carViewElem.innerHTML = `
            <h2>${car.name}</h2>
            <p>Clicks: ${car.clicks}</p>
            <p>Stock: ${car.stock}</p>
            <img src="${car.image}" alt="Imagen de ${car.name}">
            <button onclick="controlador.incrementarCliks()">Click</button>           
            <p class="mensaje" >${car.stock === 0 ? "Sin stock" : ""}</p>
            <p class="mensaje" >${controlador.todoSinStock() ? "Todos los coches se han quedado sin stock." : ""}</p>
        `;
    }
};
// Iniciar la aplicación cuando la página esté cargada
document.addEventListener("DOMContentLoaded", controlador.init);