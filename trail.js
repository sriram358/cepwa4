class Trail{
    constructor(x, y, xoff, yoff){
        this.x = x;
        this.y = y;
        this.age = 15;
        this.spe = createVector(xoff, yoff)
    }

    draw(){
        if(superSmash == 0){
            fill("white")
        } else {
            fill(min(200, 210 - (this.age*12)))
        }
        
        noStroke()
        let posChange = (this.spe.normalize()).mult((15-this.age))
        //let posChange = createVector(0, 0)
        circle(this.x - posChange.x, this.y - posChange.y, this.age*4/3)
    }
}