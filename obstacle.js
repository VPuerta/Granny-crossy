function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
};

class Lane {
    constructor(y) {
        this.y = y
        this.image = new Image()
    }

    draw() {
        this.y--
        game.ctx.drawImage(this.image, 0, this.y)
    }
}

class GardenLane extends Lane {
    constructor(y) {
        super(y)
        this.image = gardenImage
    }
}

class RocksLane extends Lane {
    constructor(y) {
        super(y)
        this.image = rockImage
    }
}

class RoadLane extends Lane {
    constructor(y) {
        super(y)
        this.carPosX = 0
        this.image = roadImage
        this.carW = 200
        this.carH = 100
        this.speed = randomInt(1, 7)

        var carType = randomInt(1, 4)
        switch (carType) {
            case 1:
                this.carImage = carImage;
                break;
            case 2:
                this.carImage = carImage2;
                break;
            case 3:
                this.carImage = carImage3;
                break;
            case 4:
                this.carImage = carImage4;
                break;
        }    
    }

    draw() {
        super.draw()
        game.ctx.drawImage(this.carImage, this.carPosX += this.speed, this.y, this.carW, this.carH)
        
        if (this.carPosX > 600) {
            this.carPosX = - this.carW
        }
    }
}

createLanes = () => {
    return Array(50).fill().map((x, idx) => {
        let laneType = randomInt(0, 3)
    
        if (laneType === 0) {
            return new GardenLane(idx * 197)
        }
    
        if (laneType === 1) {
            return new RocksLane(idx * 197)
        }
    
        if (laneType === 2) {
            return new RoadLane(idx * 197)
        }
        if (laneType === 3) {
            return new RoadLane(idx * 197)
        }
    })
}

resetsLanes = () => {
    lanes = createLanes()
}

var lanes = createLanes()