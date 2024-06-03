let player1body, player1head, player1, player2body, player2head, player2, floor, ampl

//let frameCount = 0;
let changeFrame = -100;
let rotateDire1 = "left"
let rotateDire2 = "right"

function setup(){
    createCanvas(1200, 800)
    angleMode(DEGREES)
    player1head = new Sprite(200, 400, 100, 300)
    player2head = new Sprite(800, 400, 100, 300)
    player1body = new Sprite(200, 550, 100)
    player2body = new Sprite(800, 550, 100)

    player1 = new GlueJoint(player1head, player1body)
    player2 = new GlueJoint(player2head, player2body)
    floor = new Sprite(600, 800, 1200, 1)
    world.gravity.y = 10
    floor.collider = "static"
    player1head.rotation = 1
    player2head.rotation = 1
    player1head.rotationLock = true
    player2head.rotationLock = true
    player1body.friction = 1000
    player2body.friction = 1000
    player1body.rotationDrag = 10
    player2body.rotationDrag = 10
    ampl = 10
}

function draw(){
    background(200)
   
    if(player1body.colliding(floor)){
        // if(player1body.rotation > 0){
        //     if(frameCount - changeFrame > 30){
        //         player1head.rotateTowards(200, 400, 0.01, 0)
        //         changeFrame = frameCount
        //         print("tick")
                
        //     }
            
        // } else{
        //     if(frameCount - changeFrame > 30){
        //         player1head.rotateTowards(200, 400, 0.01, 180)
        //         changeFrame = frameCount
        //         print("tock")
                
        //     }
            
        // }
        if(ampl > 0){
            ampl -= 0.1
        } else {
            ampl = 0
        }
        
        player1head.rotation = 5*ampl*Math.cos(frameCount/60)
    }

    if(kb.presses('w')){
        player1head.position.y += 10
        player1head.position.x += Math.cos(player1head.rotation)
    }
    //player1head.rotateTowards(200, 400, 0.1, 0)
    
}   