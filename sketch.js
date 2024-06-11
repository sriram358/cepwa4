let player1body, player1head, player1, player2body, player2head, player2, floor, ampl1, ampl2, collisionFrame1, collisionFrame2, lastCollide1, lastCollide2, initRotation1, initRotation2, wall1, wall2, table, net

let backarm1, backarm2, forearm1, armjoint1, bodyjoint1, armjoint2, ball
//let frameCount = 0;
let changeFrame = -100;
let rotateDire1 = "left"
let rotateDire2 = "right"
let armRotation1 = 180
let armRotation2 = 180
function setup(){
    createCanvas(1200, 800)
    angleMode(DEGREES)
   
    player1 = new Sprite(100, 550, 50)
    player2 = new Sprite(1000, 550, 50)
    floor = new Sprite(600, 800, 1200, 4)
    wall1 = new Sprite(0, 400, 4, 800)
    wall2 = new Sprite(1200, 400, 4, 800)
    table = new Sprite(600, 800, 500, 150)
    net = new Sprite(600, 700, 20, 50)
    ball = new Sprite(800, 500, 20)
    
    
    backarm1 = new Sprite(100, 400, 30, 100)
    backarm1.offset.y = -50
    backarm2 = new Sprite(1000, 400, 30, 100)
    backarm2.offset.y = -50
    forearm1 = new Sprite(100, 480, 30, 100)
    forearm1.offset.y = 50
    ball.collider = "dynamic"
    backarm1.collider = "kinematic"
    backarm2.collider = "kinematic"
    forearm1.collider = "kinematic"
    net.collider = "static"
    //bodyjoint1 = new GlueJoint(backarm1, player1)
    //armjoint1 = new GlueJoint(backarm1, forearm1)
    floor.collider = "kinematic"
    wall1.collider = "static"
    wall2.collider = "static"
    table.collider = "static"
    player1.collider = "dynamic"
    player2.collider = "dynamic"
    backarm1.rotation = 180
    backarm2.rotation = 180

    floor.visible = false
    wall1.visible = false
    wall2.visible = false
    player1.d = 50
    player2.d = 50
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
    player1.rotationDrag = 100
    player2.rotationDrag = 100
    // player1.addCollider(0,-125, 50, 200)
    // player2.addCollider(0,-125, 50, 200)
    floor.friction = 100
    world.gravity.y = 20
    ampl1 = 1
    ampl2 = 1
    collisionFrame1 = 0
    collisionFrame2 = 0
    lastCollide1 = 0
    lastCollide2 = 0
    ball.velocity.x = -10
    ball.bounciness = 0.9
}

function drawPlayer1(){
    push()
    translate(player1.pos.x, player1.pos.y)
    rotate(player1.rotation)
    fill(255, 0, 0)
    circle(0, 0, 50)
    rect(-25, -25-200, 50, 200)
    pop()
}

function drawPlayer2(){
    push()
    //console.log("skibidi")
    translate(player2.pos.x, player2.pos.y)
    rotate(player2.rotation)
    fill(0, 0, 255)
    circle(0, 0, 50)
    rect(-25, -25-200, 50, 200)
    pop()
}

function renderArm1(){
    backarm1.pos.x = player1.pos.x + 180*Math.sin(radians(player1.rotation))
    backarm1.pos.y = player1.pos.y - 180*Math.cos(radians(player1.rotation))
}

function renderArm2(){
    backarm2.pos.x = player2.pos.x + 180*Math.sin(radians(player2.rotation))
    backarm2.pos.y = player2.pos.y - 180*Math.cos(radians(player2.rotation))
}

function draw(){
    background(200)
    drawPlayer1()
    drawPlayer2()
    renderArm1()
    renderArm2()
    // Fixes bounce bug in planck (inherent of p5play sadly)

    
    if(ball.colliding(backarm1)){
        ball.vel.x = 10
    } 
    
    if(ball.colliding(backarm2)){
        ball.vel.x = -10
    }
    

    if(kb.pressing('w')){
        if(player1.pos.y > 760){
            player1.pos.y -= 2
            player1.velocity.y -= 2
            player1.velocity.x += 2*Math.sin(radians(player1.rotation))
        }
        if(armRotation1 > 0 + player1.rotation){
            armRotation1 = max(0 + player1.rotation, armRotation1 - 10)
           //wwbackarm1.rotation -= 5
        } else {
            armRotation1 = armRotation1
        }

        //backarm1.rotateTo((armRotation1%360)-180, 1) 
        backarm1.rotation = armRotation1

    } else {
        
        
        if(armRotation1 < 180 + player1.rotation){
            armRotation1 = min(180 + player1.rotation, armRotation1 + 10)
            //armRotation1 += 5
        } else {
            armRotation1 = 180 + player1.rotation
        }

        //backarm1.rotateTo((armRotation1%360)-180, 1) 
        backarm1.rotation = armRotation1
        
        
    }

    if(kb.pressing('o')){
        if(player2.pos.y > 760){
            player2.pos.y -= 2
            player2.velocity.y -= 2
            player2.velocity.x += 2*Math.sin(radians(player2.rotation))
        }

        if(armRotation2 < 360 + player2.rotation){
            armRotation2 = min(360 + player2.rotation, armRotation2 + 10)
            //armRotation1 += 5
        } else {
            armRotation2 = 360 + player2.rotation
        }

        backarm2.rotation = armRotation2

    } else {
        
        if(armRotation2 > 180 + player2.rotation){
            armRotation2 = max(180 + player2.rotation, armRotation2 - 10)
           //wwbackarm1.rotation -= 5
        } else {
            armRotation2 = armRotation2
        }

        backarm2.rotation = armRotation2
        
        
        
        
    }

    console.log(armRotation1)
    
    
    
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

        // if(kb.presses('w')){
        //     player1.pos.y -= 2
        //     player1.velocity.y -= 8
        //     player1.velocity.x += 8*Math.sin(radians(player1.rotation))
        // }
        
        
        
    } else {
        player1.velocity.y += 0.1
    
       
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

        // if(kb.presses('o')){
        //     player2.pos.y -= 2
        //     player2.velocity.y -= 8
        //     player2.velocity.x += 8*Math.sin(radians(player2.rotation))
        // }
    } else {
        player2.velocity.y += 0.1
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