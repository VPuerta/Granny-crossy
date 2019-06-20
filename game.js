var w = w;
var h = 502;
var w2 = w / 2;
var h2 = h / 2;

function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
};

class Game {
    constructor() {
        this.intervalId = ""
        this.fps = 60
        this.counter = 0
        this.canvas = undefined
        this.ctx = undefined
        this.backgroundDY = 1
        this.lanes = createLanes()
    }

    initGame = (id) => {
        /** @type HTMLCanvasElement */
        this.canvas = document.getElementById(id);

        /** @type CanvasRenderingContext2D */
        this.ctx = canvas.getContext("2d");

        this.start()
    }


    start = () => {

        this.reset()

        this.intervalId = setInterval(() => {
            this.counter++
            this.clearScreen()
            this.drawAll()
            this.moveAll()

            if (this.counter > 1000) {
                this.counter = 0
            }

            if (this.isCollision()) {
                this.gameOver();
            }

        }, 1000 / this.fps)
    }

    reset = () => {
        this.granny = new Player(this)
        this.counter = 0
        resetsLanes()
    }

    clearScreen = () => {
        this.ctx.clearRect(0, 0, w, h);
    }

    stop = () => {
        clearInterval(this.intervalId)
    }

    gameOver = () => {
        this.stop();

        if (confirm("GAME OVER. Play again?")) {
            this.reset();
            this.start();
        }
        console.log("game over")
    }

    isCollision = () => { 
        return lanes.some(lane => {
            if(lane instanceof RoadLane){
                let deltaX = Math.abs(lane.carPosX - this.granny.grannyPos.x)
                let deltaY = Math.abs(lane.y - this.granny.grannyPos.y)
                let isHorizonalCollision = this.leftWidth(this.granny,lane) > deltaX 
                let isVerticalCollision = this.topHeigth(this.granny,lane) > deltaY
                return isHorizonalCollision && isVerticalCollision
            }
        }); 
    }

    leftWidth = (granny,lane) =>{
        if (granny.grannyPos.x - 20 > lane.carPosX) {
            return lane.carW
        } else {
            return granny.grannyW
        }
    }

    topHeigth = (granny,lane) => {
        if (granny.grannyPos.y - 20 > lane.y){
            return lane.carH
        }else {
            return granny.grannyH
        }
    }

    // Draw

    drawAll = () => {
        this.drawLanes()
        this.granny.draw(this.ctx)
    }

    drawLanes = () => {
        lanes.forEach(lane => lane.draw())
    }
    
    // Move

    moveAll = () => {
        this.moveGranny()
    }

    moveGranny = () => {
        this.granny.grannyPos.y -= this.backgroundDY
    } 
}