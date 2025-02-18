// Modelo
const model = {
    cars: [
        { name: "Toyota", clicks: 0, stock: 10, image: "img/toyota.jpg", color: "red", year: 2020, price: 20000 },
        { name: "Honda", clicks: 0, stock: 8, image: "img/honda.jpg", tipo: "sedan", transmicion: "manual", estado: "nuevo" },
        { name: "Ford", clicks: 0, stock: 5, image: "img/ford.jpg", tipo: "camioneta", transmicion: "automatico", estado: "usado" },
    ],
    currentCar: null
};

// Controlador
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
            document.getElementById("stock-message").textContent = "";
        } else {
            document.getElementById("stock-message").textContent = "No hay más stock disponible para " + model.currentCar.name;
        }
    }
};

// Vista de lista de coches
const carListView = {
    render() {
        const carListElem = document.getElementById("car-list");
        carListElem.innerHTML = "";
        controller.getCars().forEach(car => {
            const button = document.createElement("button");
            button.textContent = `${car.name}`;
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
        document.getElementById("car-stock").textContent = `Stock: ${car.stock}`;
        document.getElementById("car-image").src = car.image;
        document.getElementById("car-button").onclick = controller.incrementClicks;
    }
};

// Iniciar la aplicación
document.addEventListener("DOMContentLoaded", controller.init);
