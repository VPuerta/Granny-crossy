
let gardenImage = new Image()
let rockImage = new Image()
let roadImage = new Image()
let carImage = new Image()
let carImage2 = new Image()
let carImage3 = new Image()
let carImage4 = new Image()

var game;

carImage.src = "./Images/car.png"
carImage2.src = "./Images/car2.png"
carImage3.src = "./Images/car3.png"
carImage4.src ="./Images/car4.png"
carImage.onload = function () {
    gardenImage.src = "./Images/garden.png"
    gardenImage.onload = function () {
        rockImage.src = "./Images/rocks.png"
        rockImage.onload = function () {
            roadImage.src = "./Images/road.png"
            roadImage.onload = function () {
                game = new Game()
                window.onload = function () {
                    document.getElementById("start-button").onclick = function () {
                        document.querySelector(".intro").style.display = "none"
                        document.body.style.backgroundImage ="none"
                        startGame();
                    };

                    startGame = () => {
                        game.initGame("canvas");
                    }
                };
            }
        }
    }
}