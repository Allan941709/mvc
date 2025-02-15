// Modelo
const model = {
    cars: [
        { name: "Toyota", clicks: 0 },
        { name: "Honda", clicks: 0 },
        { name: "Ford", clicks: 0 }
    ],
    currentCar: null
};

// Controlador
const controller = {
    init() {
        console.log("Inicializando la aplicación...");
        model.currentCar = model.cars[0];
        carListView.render();
        carView.render();
    },
    getCars() {
        console.log("Obteniendo lista de coches", model.cars);
        return model.cars;
    },
    getCurrentCar() {
        console.log("Coche actual:", model.currentCar);
        return model.currentCar;
    },
    setCurrentCar(car) {
        console.log("Cambiando coche a:", car.name);
        model.currentCar = car;
        carView.render();
    },
    incrementClicks() {
        model.currentCar.clicks++;
        console.log(`${model.currentCar.name} tiene ${model.currentCar.clicks} clics`);
        carView.render();
    }
};

// Vista de lista de coches
const carListView = {
    render() {
        const carListElem = document.getElementById("car-list");
        carListElem.innerHTML = "";
        controller.getCars().forEach(car => {
            const button = document.createElement("button");
            button.textContent = car.name;
            button.onclick = () => controller.setCurrentCar(car);
            carListElem.appendChild(button);
        });
    }
};

// Vista del carro actual
const carView = {
    render() {
        const car = controller.getCurrentCar();
        document.getElementById("car-name").textContent = car.name;
        document.getElementById("car-clicks").textContent = `Clicks: ${car.clicks}`;
        document.getElementById("car-button").onclick = controller.incrementClicks;
    }
};

// Iniciar la aplicación
document.addEventListener("DOMContentLoaded", controller.init);

