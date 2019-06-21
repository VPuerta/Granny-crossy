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
        this.soundClaxon = new Audio ("./sonidos/claxon.mp3") 
        this.soundClaxon.volume = 0.3
        this.soundBocina = new Audio ("./sonidos/bocina.mp3")
        this.soundBocina.volume = 0.3
        this.soundAccident = new Audio ("./sonidos/accidente.mp3")
        this.soundAccident.volume = 1

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
            if (this.counter % 300 === 0){
                this.soundClaxon.play()
            }
            if (this.counter % 500 === 0){
                this.soundBocina.play()
            }

            if (this.isCollision()) {
                this.soundAccident.play()
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
     
    }

    isCollision = () => { 
        
        return lanes.some(lane => {
            if(lane instanceof RoadLane){
                // valor absoluto de la diferencia con abs
                let deltaX = Math.abs(lane.carPosX - 20 - this.granny.grannyPos.x)
                let deltaY = Math.abs(lane.y - this.granny.grannyPos.y)

                // comprobamos colisiones horizontales y verticales
                let isHorizonalCollision = this.leftWidth(this.granny,lane) > deltaX 
                let isVerticalCollision = this.topHeigth(this.granny,lane) > deltaY
                return isHorizonalCollision && isVerticalCollision
            }
        }); 
    }

    leftWidth = (granny,lane) => {
        if (granny.grannyPos.x > lane.carPosX) {
            return lane.carW
        } else {
            return granny.grannyW
        }
    }

    topHeigth = (granny,lane) => {
        if (granny.grannyPos.y > lane.y){
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