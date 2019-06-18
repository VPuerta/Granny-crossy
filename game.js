var w = w;
var h = 502;
var w2 = w / 2;
var h2 = h / 2;

class Game{
        constructor(){
            this.intervalId = ""
            this.fps= 60
            this.counter= 0
            this.canvas = ""
            this.ctx = ""
            this.backgroundImag = new Image()
            this.backgroundImag.src = "./images/Sin-título.png"
            this.granny = new Image();
            this.granny.src = "";
            // this.granny = {
            //     x: w2,
            //     y: h2
            // }
        }
    
        initGame = (id) => {
            /** @type HTMLCanvasElement */
            this.canvas = document.getElementById(id);
    
            /** @type CanvasRenderingContext2D */
            this.ctx = canvas.getContext("2d");
    
            this.start()
        }

    
        start = () => {
            this.draw()
            this.intervalId = setInterval( () => {
                this.counter++
                this.counter %= canvas.width
    
                this.clearScreen()
                this.draw()
                // this.listener()
                // this.colision()
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
            this.obstacles()
            // this.drawGranny()
        }
    
        drawBackground = () =>{

            this.ctx.beginPath();
            this.ctx.fillStyle = "rgb(153, 255, 102)";
            this.ctx.fillRect(0, 0, 900, 700);
            this.ctx.closePath();

            this.ctx.beginPath();
            this.ctx.fillStyle = "rgb(128, 128, 128)";
            this.ctx.fillRect(0, 460, 900, 110);
            this.ctx.closePath();


            this.ctx.beginPath();
            this.ctx.fillStyle = "white";
            this.ctx.fillRect(0, 470, 900, 5);
            this.ctx.closePath();

            this.ctx.beginPath();
            this.ctx.fillStyle = "white";
            this.ctx.fillRect(0, 555, 900, 5);
            this.ctx.closePath();

            this.ctx.drawImage(this.backgroundImag, 0, 0, 900, 450);

        }

        drawObstacles = ()=>{
            this.obstacles.forEach(element => {
                element.draw(this.ctx);
              });
          }

          generateObstacle = () => {
            this.obstacles.push(
              new Obstacle(
                Math.floor(Math.random() * 250),
                Math.floor(Math.random() * 250)
              )
            );
          }

        // drawGranny = () => {
        //     this.ctx.drawImage(this.img, this.xgranny, this.ygranny, 50, 100);

        // }
        
}