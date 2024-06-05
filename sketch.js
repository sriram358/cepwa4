let player1body, player1head, player1, player2body, player2head, player2, floor, ampl1, ampl2, collisionFrame1, collisionFrame2

//let frameCount = 0;
let changeFrame = -100;
let rotateDire1 = "left"
let rotateDire2 = "right"

function setup(){
    createCanvas(1200, 800)
    angleMode(DEGREES)
   
    player1 = new Sprite(200, 550, 100)
    player2 = new Sprite(800, 550, 100)
    floor = new Sprite(600, 800, 1200, 4)
    floor.collider = "static"
    player1.d = 100
    player2.d = 100
    player1.rotation = -20
    player2.rotation = 20
    player1.bounciness = 0
    player2.bounciness = 0
    player1.rotationLock = true
    player2.rotationLock = true
    player1.friction = 1000
    player2.friction = 1000
    world.gravity.y = 10
    ampl1 = 10
    ampl2 = 10
    collisionFrame1 = 0
    collisionFrame2 = 0
}

function drawPlayer1(){
    push()
    translate(player1.pos.x, player1.pos.y)
    rotate(player1.rotation)
    fill(255, 0, 0)
    circle(0, 0, 100)
    rect(-50, -50-300, 100, 300)
    pop()
}

function drawPlayer2(){
    push()
    //console.log("skibidi")
    translate(player2.pos.x, player2.pos.y)
    rotate(player2.rotation)
    fill(0, 0, 255)
    circle(0, 0, 100)
    rect(-50, -50-300, 100, 300)
    pop()
}

function draw(){
    background(200)
    drawPlayer1()
    drawPlayer2()
    if(player1.colliding(floor)){
        player1.rotationLock = false
        
        collisionFrame1 += 1;
        if(ampl1 > 0){
            ampl1 -= 0.03
        } else {
            ampl1 = 0
        }
        
        player1.rotation = 5*ampl1*Math.sin(collisionFrame1/30)
    } else {
        player1.rotationLock = true
    }

    if(player2.colliding(floor)){
        player2.rotationLock = false
        collisionFrame2 += 1;
        if(ampl2 > 0){
            ampl2 -= 0.03
        } else {
            ampl2 = 0
        }
        
        player2.rotation = -5*ampl2*Math.sin(collisionFrame2/30)
    } else {
        player2.rotationLock = true
    }

    if(kb.presses('w')){
        player1.velocity.y -= 5
        player1.velocity.x += 5*Math.sin(radians(player1.rotation))
    }
    if(kb.presses('o')){
        player2.velocity.y -= 5
        player2.velocity.x += 5*Math.sin(radians(player2.rotation))
    }
    //player1head.rotateTowards(200, 400, 0.1, 0)
    
}   