let player1body, player1head, player1, player2body, player2head, player2, floor, ampl, collisionFrame

//let frameCount = 0;
let changeFrame = -100;
let rotateDire1 = "left"
let rotateDire2 = "right"

function setup(){
    createCanvas(1200, 800)
    angleMode(DEGREES)
    player1head = new Sprite(200, 600, 100, 300)
    player2head = new Sprite(800, 600, 100, 300)
    player1body = new Sprite(200, 750, 100)
    player2body = new Sprite(800, 750, 100)

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
    collisionFrame = 0
}

function draw(){
    background(200)
   
    if(player1body.colliding(floor)){
        collisionFrame += 1;
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
            ampl -= 0.03
        } else {
            ampl = 0
        }
        
        player1head.rotation = 5*ampl*Math.cos(collisionFrame/30)
    }

    if(kb.presses('w')){
        player1head.velocity.y -= 10
        player1head.velocity.x += 10*Math.sin(radians(player1head.rotation))
    }
    //player1head.rotateTowards(200, 400, 0.1, 0)
    
}   