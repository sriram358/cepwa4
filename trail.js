class Trail{
    constructor(x, y, xoff, yoff){
        this.x = x;
        this.y = y;
        this.age = 30;
        this.spe = createVector(xoff, yoff)
    }

    draw(){
        fill("white")
        noStroke()
        let posChange = (this.spe.normalize()).mult((30-this.age))
        //let posChange = createVector(0, 0)
        circle(this.x - posChange.x, this.y - posChange.y, this.age*2/3)
    }
}