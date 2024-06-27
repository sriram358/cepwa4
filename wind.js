class Wind{
    constructor(){
        this.x = random(60, 1100)
        this.y = random(50, 750)
        this.age = 30
    }

    draw(){
        stroke(255, 255, 255, 240 - 16*abs(15-this.age))
        line(this.x, this.y, this.x+(windSpeed*50), this.y)
        if(Math.floor(random(0, 2)) == 0){
            this.age -= 1
        }
        
        this.x += windSpeed*2
        
    }
}