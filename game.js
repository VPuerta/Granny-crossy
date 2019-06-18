var w = w;
var h = 502;
var w2 = w / 2;
var h2 = h / 2;

function randomInt(min, max){
    return Math.floor(Math.random() * (max - min + 1) + min);
};

class Game {
    constructor() {
        this.intervalId = ""
        this.fps = 60
        this.counter = 0
        this.canvas = undefined
        this.ctx = undefined
        this.backgroundImag = new Image()
        this.backgroundImag.src = "./images/bg.jpg"

        this.obstacles = []
    }

    initGame = (id) => {
        /** @type HTMLCanvasElement */
        this.canvas = document.getElementById(id);

        /** @type CanvasRenderingContext2D */
        this.ctx = canvas.getContext("2d");

        this.start()
    }


    start = () => {
        this.granny = new Player()
        this.granny.listener()

        this.draw()

        this.intervalId = setInterval(() => {
            this.counter++
            this.counter %= this.backgroundImag.height 
            this.clearScreen()
            this.draw()
            // this.colisions();
            if (this.counter % 200 == 0) {
                for (var i = 0; i <= 24; i++){
                    this.generateObstacle(i)
                }
            }
        }, 1000 / this.fps)

    }

    clearScreen = () => {
        this.ctx.clearRect(0, 0, w, h);
    }

    stop = () => {
        this.clear.intervalId(this.intervalId)
    }

    draw = () => {
        this.drawBackground()
        this.drawObstacles()
        this.granny.draw(this.ctx,this.counter)
    }

    drawBackground = () => {
        this.ctx.beginPath();
        this.ctx.fillStyle = "rgb(153, 255, 102)";
        this.ctx.fillRect(0, 0, 900, 700);
        this.ctx.closePath();

        var ratio = 384 / 1536
        var imageWidth = this.canvas.width
        var imageHeight =  imageWidth / ratio

        this.ctx.drawImage(this.backgroundImag, 0, - this.counter, imageWidth, imageHeight);
        this.ctx.drawImage(this.backgroundImag, 0, this.counter - this.backgroundImag.height, imageWidth, imageHeight);

    }

    drawObstacles = () => {
        this.obstacles.forEach(element => {
            element.draw(this.ctx,this.counter);
        });

    }

    generateObstacle = (lane) => { 
        var speed = randomInt(2,4)
        var roadHeigth = this.backgroundImag.height/24
        var yObs = roadHeigth * lane

        this.obstacles.push(
            new Obstacle(yObs, speed)
        );
    }

    // drawGranny = () => {
    //     this.ctx.drawImage(this.grannyImg, this.granny.x, this.granny.y, 50, 100);
    // }

}

class Obstacle {
    constructor(yObs,speed) {
        this.xObs = -250;
        this.yObs = yObs;
        this.speed = speed;
        this.height = 150;
        this.width = 250;
        this.obstacles = new Image()
        this.obstacles.src = "./images/car.png"

    }

    draw = (ctx, counter) => {
        ctx.drawImage(this.obstacles, this.xObs+=this.speed, this.yObs-counter, this.width, this.height);
    }
}

class Player {
    constructor() {
        this.grannyImg = new Image();
        this.grannyImg.src = "./images/abuela.png";
        this.grannyPos = {
            x: 200,
            y: 400
        }
    }

    draw = (ctx,counter) => {
        ctx.drawImage(this.grannyImg, this.grannyPos.x, this.grannyPos.y - counter, 50, 100);
    }

    listener = () =>{
        document.onkeydown = (e) => {
            console.log (e.keyCode)
            var grannySpeed = 20;
            switch (e.keyCode) {
                case 39: // "ArrowRight"
                    this.grannyPos.x += grannySpeed;
                    console.log ("asdasds")
                    break;
                
                case 37: // "ArrowLeft"
                    this.grannyPos.x -= grannySpeed;
                    break;

                case 38: // "ArrowUp"
                    this.grannyPos.y -= grannySpeed;
                    break;

                case 40: // "ArrowDown"
                    this.grannyPos.y += grannySpeed;
                    break;
            }
        }
    }
}