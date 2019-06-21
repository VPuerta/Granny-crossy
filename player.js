class Player {
    constructor(game) {
        this.game = game;
        this.grannyImg = new Image();
        this.grannyImg.src = "./images/abuela2.png";
        this.grannyPos = {
            x: 300,
            y: 200
        }

        this.states = {
            left: false,
            right: false,
            up: false,
            down: true
        }
        this.grannyW = 66
        this.grannyH = 64
        this.grannyCounter = 0
        this.spriteDimensions = {
            w: 96,
            h: 128
        }
        this.grannyImg.frames = 3
        this.grannyImg.frameIndex = 0
        this.listener()
    }

    draw = (ctx) => {
        if (this.states.down) {
            this.drawDown(ctx)
        }
        if (this.states.left) {
            this.drawLeft(ctx)

        }
        if (this.states.right) {
            this.drawRight(ctx)

        }
        if (this.states.up  ) {
            this.drawUp(ctx)

        }
    }

    drawDown = (ctx) => {
        ctx.drawImage(
            this.grannyImg,
            this.grannyImg.frameIndex * Math.floor(this.spriteDimensions.w / this.grannyImg.frames),
            0,
            Math.floor(this.spriteDimensions.w / this.grannyImg.frames),
            32,
            this.grannyPos.x,
            this.grannyPos.y,
            this.grannyW,
            this.grannyH);
    }

    drawLeft = (ctx) => {
            ctx.drawImage(
                this.grannyImg,
                this.grannyImg.frameIndex * Math.floor(this.spriteDimensions.w / this.grannyImg.frames),
                32,
                Math.floor(this.spriteDimensions.w / this.grannyImg.frames),
                32,
                this.grannyPos.x,
                this.grannyPos.y, 
                this.grannyW, 
                this.grannyH);

        }
    drawRight = (ctx) => {
        ctx.drawImage(
            this.grannyImg,
            this.grannyImg.frameIndex * Math.floor(this.spriteDimensions.w / this.grannyImg.frames),
            64,
            Math.floor(this.spriteDimensions.w / this.grannyImg.frames),
            32,
            this.grannyPos.x,
            this.grannyPos.y, 
            this.grannyW, 
            this.grannyH);

        }

        drawUp = (ctx) => {
            ctx.drawImage(
                this.grannyImg,
                this.grannyImg.frameIndex * Math.floor(this.spriteDimensions.w / this.grannyImg.frames),
                96,
                Math.floor(this.spriteDimensions.w / this.grannyImg.frames),
                32,
                this.grannyPos.x,
                this.grannyPos.y,
                this.grannyW, 
                this.grannyH);

        }

    animateGranny(counter) {
        if (counter % 30 === 0) {
            this.grannyImg.frameIndex += 1
        }
        if (this.grannyImg.frameIndex > 2) this.grannyImg.frameIndex = 0;
    }

    listener = () => {
        document.onkeydown = (e) => {
            this.grannyCounter += 25
            var grannySpeed = 10;

            switch (e.keyCode) {
                case 39: // "ArrowRight"
                this.states = {
                    left: false,
                    right: true,
                    up: false,
                    down: false
                }
                    this.grannyPos.x += grannySpeed;
                    this.animateGranny(this.grannyCounter)
                    break;

                case 37: // "ArrowLeft"
                this.states = {
                    left: true,
                    right: false,
                    up: false,
                    down: false
                }
                    this.grannyPos.x -= grannySpeed;
                    this.animateGranny(this.grannyCounter)
                    break;

                case 38: // "ArrowUp"
                this.states = {
                    left: false,
                    right: false,
                    up: true,
                    down: false
                }
                    this.grannyPos.y -= grannySpeed;
                    this.animateGranny(this.grannyCounter)
                    break;

                case 40: // "ArrowDown"
                this.states = {
                    left: false,
                    right: false,
                    up: false,
                    down: true
                }

                if (this.grannyPos.y < 700- this.grannyH ){
                    this.grannyPos.y += grannySpeed;
                    this.animateGranny(this.grannyCounter)
                }
                    break;
            }

            if (this.grannyPos.y < -this.grannyH) {
                this.game.gameOver()
            }
            if (this.grannyPos.x < - this.grannyW){
                this.grannyPos.x = 600 - this.grannyW
            }
            if (this.grannyPos.x > 600 - this.grannyW){
                this.grannyPos.x = 0       
            }
           
        }

    }
    
}