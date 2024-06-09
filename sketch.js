let player1body, player1head, player1, player2body, player2head, player2, floor, ampl1, ampl2, collisionFrame1, collisionFrame2, lastCollide1, lastCollide2, initRotation1, initRotation2, wall1, wall2

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
    wall1 = new Sprite(0, 400, 4, 800)
    wall2 = new Sprite(1200, 400, 4, 800)
    floor.collider = "static"
    wall1.collider = "static"
    wall2.collider = "static"
    floor.visible = false
    wall1.visible = false
    wall2.visible = false
    player1.d = 100
    player2.d = 100
    player1.rotation = 0
    player2.rotation = 0
    player1.bounciness = 0
    player2.bounciness = 0
    player1.rotationLock = true
    player2.rotationLock = true
    player1.friction = 1000
    player2.friction = 1000
    player1.visible = false
    player2.visible = false
    floor.friction = 100
    world.gravity.y = 20
    ampl1 = 1
    ampl2 = 1
    collisionFrame1 = 0
    collisionFrame2 = 0
    lastCollide1 = 0
    lastCollide2 = 0
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
    // Fixes bounce bug in planck (inherent of p5play sadly)
    
    if(player1.colliding(floor)){
        lastCollide1 = frameCount
        player1.vel.y = 0
        player1.rotationLock = true
        
        collisionFrame1 += 1;
        if(ampl1 > 0){
            ampl1 -= 0.03
        } else {
            ampl1 = 0
        }

        if(kb.presses('w')){
            player1.pos.y -= 2
            player1.velocity.y -= 8
            player1.velocity.x += 8*Math.sin(radians(player1.rotation))
        }
        
        
    } else {
       
        if(frameCount - lastCollide1 > 2){
            player1.rotationLock = false
            if(player1.rotation > 0){
                collisionFrame1 = 0
            } else {
                collisionFrame1 = Math.PI*15 
            }
            ampl1 = abs(player1.rotation/5)
            ampl1 += min(0.1, max(2, ampl1)/50)
        }
        //collisionFrame1 += 0.8
    }

    //console.log(player1.colliding(floor))

    if(player2.colliding(floor)){
        lastCollide2 = frameCount
        player2.vel.y = 0
        player2.rotationLock = true
        collisionFrame2 += 1;
        if(ampl2 > 0){
            ampl2 -= 0.03
        } else {
            ampl2 = 0
        }

        if(kb.presses('o')){
            player2.pos.y -= 2
            player2.velocity.y -= 8
            player2.velocity.x += 8*Math.sin(radians(player2.rotation))
        }
    } else {
        
        if(frameCount - lastCollide2 > 2){
            player2.rotationLock = false
            if(player2.rotation < 0){
                collisionFrame2 = 0
            } else {
                collisionFrame2 = Math.PI*15
            }
            ampl2 = abs(player2.rotation/5)
            ampl2 += min(0.1, max(2, ampl2)/50)
        } 
        
        //collisionFrame2 += 0.8
    }


    player1.rotation = 5*ampl1*Math.cos(collisionFrame1/15)
    player2.rotation = -5*ampl2*Math.cos(collisionFrame2/15)
    
    //player1head.rotateTowards(200, 400, 0.1, 0)
    
}   