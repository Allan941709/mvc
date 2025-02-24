////////////////////////////////////////////////////////////////////////////////// Modelo////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const model = {
    cars: [
        { name: "Toyota", clicks: 0, stock: 4, image: "img/toyota.jpg", price: 20000 },
        { name: "Honda", clicks: 0, stock: 3, image: "img/honda.jpg", price: 18000 },
        { name: "Ford", clicks: 0, stock: 2, image: "img/ford.jpg", price: 25000 },
    ],
    currentCar: null
};
//////////////////////////////////////////////////////////////////////////////////////////////CONTROLADOR////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const controller = {
    init() {
        model.currentCar = model.cars[0];
        carListView.render();
        carView.render();
    },
    getCars() {
        return model.cars;
    },
    getCurrentCar() {
        return model.currentCar;
    },
    setCurrentCar(car) {
        model.currentCar = car;
        carView.render();
    },
    incrementClicks() {
        if (model.currentCar.stock > 0) {
            model.currentCar.clicks++;
            model.currentCar.stock--;
            carView.render();
            carListView.render();
            this.checkStock();
        }
    },
    checkStock() {
        const allOutOfStock = model.cars.every(car => car.stock === 0);
        const stockMessageElem = document.getElementById("global-stock-message");
        const individualMessageElem = document.getElementById("stock-message");

        // Mensaje global si todos los coches se quedan sin stock
        if (allOutOfStock) {
            if (!stockMessageElem) {
                const message = document.createElement("p");
                message.id = "global-stock-message";
                message.style.color = "red";
                message.style.fontWeight = "bold";
                message.textContent = "Todos los coches se han quedado sin stock.";
                document.querySelector(".car-view").appendChild(message);
            }
        } else {
            if (stockMessageElem) {
                stockMessageElem.remove();
            }
        }
        // Mensaje individual para cada coche
        if (model.currentCar.stock === 0) {
            individualMessageElem.textContent = `No hay más stock disponible para ${model.currentCar.name}`;
        } else {
            individualMessageElem.textContent = "";
        }
    }
};
//////////////////////////////////////////////////////////////////////////////////////////////VISTA////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Vista de lista de coches
const carListView = {
    render() {
        const carListElem = document.getElementById("car-list");
        carListElem.innerHTML = controller.getCars().map(car => `
            <button onclick="controller.setCurrentCar(model.cars.find(c => c.name === '${car.name}'))">
                ${car.name}
            </button>
        `).join("");
    }
};

// Vista del carro actual
const carView = {
    render() {
        const car = controller.getCurrentCar();
        document.querySelector(".car-view").innerHTML = `
            <h2 id="car-name">${car.name}</h2>
            <p id="car-clicks">Clicks: ${car.clicks}</p>
            <p id="car-stock">Stock: ${car.stock}</p>
            <img id="car-image" class="img" src="${car.image}" alt="Imagen del coche">
            <button id="car-button" onclick="controller.incrementClicks()">Click</button>
            <p id="stock-message"></p> <!-- Mensaje individual de stock -->
        `;
        controller.checkStock(); 
    }
};
// Iniciar la aplicación
document.addEventListener("DOMContentLoaded", controller.init);