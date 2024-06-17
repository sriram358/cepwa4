let player1body, player1head, player1, player2body, player2head, player2, floor, ampl1, ampl2, collisionFrame1, collisionFrame2, lastCollide1, lastCollide2, initRotation1, initRotation2, wall1, wall2, table, net

let backarm1, backarm2, forearm1, armjoint1, bodyjoint1, armjoint2, ball
let pixelFont, tableSound, paddleSound, pianoSound
let score1 = 0, score2 = 0
let ballLastCollide = "NONE"
let ballPosList = []
let roundFrame = -60
//let frameCount = 0;
let changeFrame = -1000;
let rotateDire1 = "left"
let rotateDire2 = "right"
let scored = "NONE"
let armRotation1 = 180
let armRotation2 = 180
let songPlaying = false
let player1shot = "NONE", player2shot = "NONE"
let trailList = []
let gameStarted = false
let playButton
let playerImage, playerImage2
function preload(){
    pixelFont = loadFont("Overpass.ttf")
    tableSound = loadSound("table.mp3")
    paddleSound = loadSound("paddle.mp3")
    pianoSound = loadSound("piano.mp3")
    playerImage = loadImage("assets/char1.png")
    playerImage2 = loadImage("assets/char1a.png")

}

function setup(){
    createCanvas(1200, 800)
    angleMode(DEGREES)
    
    playButton = new Sprite(600, 400, 200, 100)
    playButton.textSize = 80
    playButton.text = "Play!"
    playButton.visible = false
    playButton.collider = "kinematic"
    player1 = new Sprite(100, 550, 50)
    player2 = new Sprite(1100, 550, 50)
    floor = new Sprite(600, 800, 1200, 4)
    wall1 = new Sprite(0, 400, 4, 800)
    wall2 = new Sprite(1200, 400, 4, 800)
    table = new Sprite(600, 790, 625, 150)
    net = new Sprite(600, 700, 10, 30)
    ball = new Sprite(800, 540, 20)
    
    
    backarm1 = new Sprite(100, 400, 30, 115)
    backarm1.offset.y = -50
    backarm2 = new Sprite(1000, 400, 30, 115)
    backarm2.offset.y = -50
    
    ball.collider = "dynamic"
    backarm1.collider = "kinematic"
    backarm2.collider = "kinematic"
    backarm1.mass = 1
    backarm2.mass = 1
    player1.mass = 1000
    player2.mass = 1000
    
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
    table.visible = false
    net.visible = false
    backarm1.visible = false
    backarm2.visible = false
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
    player1.visible = true
    player2.visible = true
    ball.visible = false
    player1.rotationDrag = 100
    player2.rotationDrag = 100
    // player1.addCollider(0,-125, 50, 200)
    // player2.addCollider(0,-125, 50, 200)
    floor.friction = 100
    world.gravity.y = 35
    ampl1 = 3
    ampl2 = 3
    collisionFrame1 = 0
    collisionFrame2 = 0
    lastCollide1 = 0
    lastCollide2 = 0
    ball.velocity.x = -15
    ball.bounciness = 0.85
    ball.mass = 10
    ball.drag = 0.5
    textAlign(CENTER)
}

function drawPlayer1(){
    push()
    translate(player1.pos.x, player1.pos.y)
    rotate(player1.rotation)
    // fill(255, 0, 0)
    // circle(0, 0, 50)
    // rect(-25, -25-200, 50, 200)
    
    player1.img = playerImage
    player1.img.scale.x = 1
    player1.img.offset.y = -100
    //player1.img.scale.x = -11
    pop()

}

function drawPlayer2(){
    push()
    //console.log("skibidi")
    translate(player2.pos.x, player2.pos.y)
    rotate(player2.rotation)
    // fill(0, 0, 255)
    // circle(0, 0, 50)
    // rect(-25, -25-200, 50, 200)
    player2.img = playerImage2
    player2.img.offset.y = -100
    player2.img.scale.x = -1
    pop()
}

function drawBall(){
    strokeWeight(2)
    stroke("black")
    fill("white")
    circle(ball.pos.x, ball.pos.y, 20)
}
    


function renderArm1(){
    backarm1.pos.x = player1.pos.x + 160*Math.sin(radians(player1.rotation))
    backarm1.pos.y = player1.pos.y - 140*Math.cos(radians(player1.rotation))
}

function renderArm2(){
    backarm2.pos.x = player2.pos.x + 160*Math.sin(radians(player2.rotation))
    backarm2.pos.y = player2.pos.y - 140*Math.cos(radians(player2.rotation))
}

function renderBallTrail(){
    ballPosList.push(ball.pos)
    if(ballPosList.length > 60){
        //console.log("LOLOLOLOL")
        ballPosList.shift()
    }
    for(let i = min(59, ballPosList.length-1); i >= 0; i -= 1){
        fill("white")
        
        circle(ballPosList[i].x, ballPosList[i].y, (60-i)/1)
        //circle(i*20, ballPosList[0].y, (60-i)/1)
        //console.log(i)
        
    }
    //console.log(ballPosList)
}

function reset(){

    
    trailList = []
    ballLastCollide = "NONE"
    backarm1.rotation = 180
    backarm2.rotation = 180
    let x = Math.floor(Math.random()*2)
    if(x >= 0){
        ball.pos = createVector(800, 540)
        ball.velocity.x = -15
    } else {
        ball.pos = createVector(400, 540)
        ball.velocity.x = 15
    }
    player1.pos = createVector(200, 550)
    player2.pos = createVector(1000, 550)
    player1.vel.x = 0
    player2.vel.x = 0
    floor.visible = false
    wall1.visible = false
    wall2.visible = false
    player1.rotation = 0
    player2.rotation = 0
    player1.rotationLock = true
    player2.rotationLock = true
    player1.visible = true
    player2.visible = true
    ball.visible = false
    
    ampl1 = 3
    ampl2 = 3
    collisionFrame1 = 0
    collisionFrame2 = 0
    lastCollide1 = 0
    lastCollide2 = 0
    //wball.velocity.x = -15
    ball.velocity.y = 0
    ball.bounciness = 0.85
    ball.mass = 600
    ball.drag = 0.5 
    textAlign(CENTER)
}

function renderRound(){
    noStroke()
    background(200)
    drawBall()
    //renderBallTrail()
    fill('red')
    
    text(score1, 200, 100)
    fill('blue')
    
    text(score2, 1000, 100)
    drawPlayer1()
    drawPlayer2()
    renderArm1()
    renderArm2()
    //drawBall()

    textFont(pixelFont, 30)
    fill('black')

    text(`Ball Speed: ${Math.floor(ball.vel.mag())}`, 600, 600)

    trailList.push(new Trail(ball.pos.x, ball.pos.y, ball.vel.x, ball.vel.y))

    for(let i = 0; i < trailList.length; i++){
        trailList[i].age -= 1
        if(trailList[i].age <= 0){
            trailList.splice(i, 1)
        } else {
            trailList[i].draw()
        }
    }

    if(ball.collides(backarm1)){
        ballLastCollide = "LPADDLE"
        paddleSound.play()
        if(ball.vel.y < -max(6, ((295 - backarm1.pos.x)/295)*15)){
            ball.vel.y = -max(6, ((295 - backarm1.pos.x)/295)*15)
        }
    } else if (ball.collides(backarm2)){
        ballLastCollide = "RPADDLE"
        paddleSound.play()
        if(ball.vel.y < -max(6, ((backarm2.pos.x - 1065)/295)*15)){
            ball.vel.y = -max(6, ((backarm2.pos.x - 1065)/295)*15)
        }
    }

    if(ball.collides(table)){
        tableSound.play()
        if(ball.pos.x < 600){
            if(ballLastCollide == "LEFT" || ballLastCollide == "LPADDLE"){
                score2 += 1
                scored = "RIGHT"
                roundFrame = frameCount
                //reset()
            } else {
                ballLastCollide = "LEFT"
            }
            
        } else {
            if(ballLastCollide == "RIGHT" || ballLastCollide == "RPADDLE"){
                score1 += 1
                scored = "LEFT"
                roundFrame = frameCount
                //reset()
            } else {
                ballLastCollide = "RIGHT"
            }
        }
    }

    if(ball.collides(floor)){
        if(ball.pos.x < 600){
            if(ballLastCollide == "LEFT" || ballLastCollide == "LPADDLE"){
                score2 += 1
                scored = "RIGHT"
                
                //reset()
            } else {
                score1 += 1
                scored = "LEFT"
                
            }
            
            roundFrame = frameCount
            //reset()
        } else {
            if(ballLastCollide == "RIGHT" || ballLastCollide == "RPADDLE"){
                score1 += 1
                scored = "LEFT"
                //reset()
            } else {
                score2 += 1
                scored = "RIGHT"
            }
            
            roundFrame = frameCount
        }
    }
    

    
    
        
    // Fixes bounce bug in planck (inherent of p5play sadly)

    
    // if(ball.colliding(backarm1)){
    //     ball.vel.x = 10
    // } 
    
    // if(ball.colliding(backarm2)){
    //     ball.vel.x = -10
    // }
    ////ball.rotationSpeed = 50
    ball.vel.limit(20)
    
    if(ball.vel.x > 0 && ball.vel.x < 10){
        ball.vel.x = 10
    }

    if(ball.vel.x < 0 && ball.vel.x > -10){
        ball.vel.x = -10
    }

    // if(ball.vel.y > 15){
    //     ball.vel.y = 15
    // }

    // if(ball.vel.y < -15){
    //     ball.vel.y = -15
    // }

    // if(ball.vel.x > 20){
    //     ball.vel.x = 20
    // }

    // if(ball.vel.x < -20){
    //     ball.vel.x = -20
    // }


    
    //console.log(backarm1.rotation, player1.rotation)

    if(backarm1.rotation == 90 && player1shot == "NORM"){
        backarm1.rotate(90, 10)
        player1shot = "NONE"
    }

    if(backarm1.rotation == 180 && player1shot == "SMASH"){
        player1shot = "NONE"
    }

    if(backarm2.rotation == -90 && player2shot == "NORM"){
        backarm2.rotate(-90, 10)
        player2shot = "NONE"
    }

    if(abs(backarm2.rotation) == 180 && player2shot == "SMASH"){
        player2shot = "NONE"
    }

    // if(player1.colliding(table)){
    //     player1.rotationLock = true
    //     ampl1 += 0.03
    // }

    // if(player2.colliding(table)){
    //     player2.rotationLock = true
    //     ampl2 += 0.03
    // }

    if(kb.presses('d')){
        if(armRotation1 > 0){
            backarm1.rotation = 180
            backarm1.rotate(-90, 10)
            player1shot = "NORM"
            
            
            if(backarm1.rotation <= -90){
                armRotation1 = backarm1.rotation + 360
            } else {
                armRotation1 = backarm1.rotation
            }
            
            
        } else {
            if(backarm1.rotation <= -90){
                armRotation1 = backarm1.rotation + 360
            } else {
                armRotation1 = backarm1.rotation
            }
            backarm1.rotation = armRotation1
        } 
        
    } 

    if(kb.presses('e')){
        
        backarm1.rotation = 0
        backarm1.rotate(180, 10)
        player1shot = "SMASH"
        
        
        if(backarm1.rotation <= -90){
            armRotation1 = backarm1.rotation + 360
        } else {
            armRotation1 = backarm1.rotation
        }
            
        
        
    } 
    
    if(kb.presses('j')){
        
        backarm2.rotation = -180
        backarm2.rotate(90, 10)
        player2shot = "NORM"
        
        
        if(backarm2.rotation <= -90){
            armRotation2 = backarm2.rotation + 360
        } else {
            armRotation2 = backarm2.rotation
        }
            
            
        
        
    } 

    if(kb.presses('i')){
        
        backarm2.rotation = 0
        backarm2.rotate(-180, 10)
        player2shot = "SMASH"
        
        
        if(backarm2.rotation <= -90){
            armRotation2 = backarm2.rotation + 360
        } else {
            armRotation2 = backarm2.rotation
        }
            
        
        
    } 

    if(kb.pressing('w')){
        if(player1.pos.y > 750 && kb.pressing('w') < 40){
            player1.pos.y -= 5
            player1.velocity.y -= 3.1
            player1.velocity.x += min(3,5*Math.sin(radians(player1.rotation)))
        }

        
        //backarm1.rotation = armRotation1

    } 

    

    if(kb.pressing('o')){
        if(player2.pos.y > 750 && kb.pressing('o') < 40){
            player2.pos.y -= 5
            player2.velocity.y -= 3.1
            player2.velocity.x += max(-3, 5*Math.sin(radians(player2.rotation)))
        }

        // if(armRotation2 < 360 + player2.rotation){
        //     armRotation2 = min(360 + player2.rotation, armRotation2 + 10)
        //     //armRotation1 += 5
        // } else {
        //     armRotation2 = 360 + player2.rotation
        // }

        

    } else {
        
        // if(armRotation2 > 180 + player2.rotation){
        //     armRotation2 = max(180 + player2.rotation, armRotation2 - 10)
        //    //wwbackarm1.rotation -= 5
        // } else {
        //     armRotation2 = armRotation2
        // }

        

        //backarm2.rotation = armRotation2
        
        
        
        
    }

    
    
    
    if(player1.colliding(floor) || player1.colliding(table)){
        lastCollide1 = frameCount
        player1.vel.y = 0.2
        player1.rotationLock = true
        
        collisionFrame1 += 1;
        if(ampl1 > 3){
            ampl1 -= 0.03
        } else {
            ampl1 = 3
        }

        // if(kb.presses('w')){
        //     player1.pos.y -= 2
        //     player1.velocity.y -= 8
        //     player1.velocity.x += 8*Math.sin(radians(player1.rotation))
        // }
        
        
        
    } else {
        //player1.velocity.y += 0.1
    
    
        if(frameCount - lastCollide1 > 2){
            //player1.rotationLock = false
            if(player1.rotation > 0){
                collisionFrame1 = 0
            } else {
                collisionFrame1 = Math.PI*8
            }
            ampl1 = abs(player1.rotation/5)
            ampl1 += min(0.1, max(2, ampl1)/20)
        }
        //collisionFrame1 += 0.8
    }

    //console.log(player1.colliding(floor))

    if(player2.colliding(floor) || player2.colliding(table)){
        lastCollide2 = frameCount
        player2.vel.y = 0.2
        player2.rotationLock = true
        collisionFrame2 += 1;
        if(ampl2 > 3){
            ampl2 -= 0.03
        } else {
            ampl2 = 3
        }

        // if(kb.presses('o')){
        //     player2.pos.y -= 2
        //     player2.velocity.y -= 8
        //     player2.velocity.x += 8*Math.sin(radians(player2.rotation))
        // }
    } else {
        //player2.velocity.y += 0.1
        if(frameCount - lastCollide2 > 2){
            //player2.rotationLock = false
            if(player2.rotation < 0){
                collisionFrame2 = 0
            } else {
                collisionFrame2 = Math.PI*8
            }
            ampl2 = abs(player2.rotation/5)
            ampl2 += min(0.1, max(2, ampl2)/20)
        } 
        
        //collisionFrame2 += 0.8
    }

    


    player1.rotation = 5*ampl1*Math.cos(collisionFrame1/8)
    player2.rotation = -5*ampl2*Math.cos(collisionFrame2/8)
    
    //player1head.rotateTowards(200, 400, 0.1, 0)
}

function draw(){
    background(200)
    drawPlayer1()
    drawPlayer2()
    renderArm1()
    renderArm2()
    if(!songPlaying){
        songPlaying = true
        //pianoSound.play()
    }
    textFont(pixelFont, 120)
    // drawBall()
    if(gameStarted == false){
        fill(20)
        frameCount -= 1
        rect(0, 0, 1200, 800)
        playButton.draw()
        fill(255)
        textStyle(pixelFont, 20)
        textSize(120)
        text("Pong Random!", 600, 200)
        textStyle(pixelFont, 50)
        textSize(50)
        text("Game by V Sriram", 600, 700)
        //image(playerImage, 200, 400)
        if(mouse.pressing()){
            gameStarted = true
            playButton.visible = false
            playButton.collider = "none"
            console.log("aarmabikalaam")
            table.visible = true
            net.visible = true
            backarm1.visible = true
            backarm2.visible = true
        }

    } else if(frameCount - roundFrame < 60){
        drawBall()
        if(ball.collides(backarm1)){
            paddleSound.play()
        } else if (ball.collides(backarm2)){
            paddleSound.play()
        } else if(ball.collides(table) || ball.collides(floor)){
            tableSound.play()
        }
        fill(200)
        noStroke()
        rect(0, 0, 1200, 400)
        fill(200)
        noStroke()
        rect(0, 150, 1200, 200)
        
        fill('red')
        if(scored == "LEFT"){
            text(score1-1, 200 , 100 - min(20, (frameCount - roundFrame))*5)
            text(score1, 200 , 200 - min(20, (frameCount - roundFrame))*5)

            if((frameCount - roundFrame)%20 < 12){
                text("◀ Point Red", 600, 400)
            } else {
                fill(255, 0, 0, (20-(frameCount - roundFrame)%20)*31.8)
            }
        } else {
            text(score1, 200 , 100)
        }
        
        fill('blue')
        if(scored == "RIGHT"){
            text(score2-1, 1000 , 100 - min(20, (frameCount - roundFrame))*5)
            text(score2, 1000 , 200 - min(20, (frameCount - roundFrame))*5)
            if((frameCount - roundFrame)%20 < 12){
                text("Point Blue ▶", 600, 400)
            } else {
                fill(255, 0, 0, (20-(frameCount - roundFrame)%20)*31.8)
            }
        } else {
            text(score2, 1000 , 100)
        }

        
    } else if (frameCount - roundFrame == 60 || frameCount - roundFrame == 150){
        reset()
        world.gravity.y = 35
    } else if (frameCount - roundFrame < 150){
        fill(0, 0, 0, min(25, 150-(frameCount - roundFrame))*5)
        rect(0, 0, 1200, 800)
        world.gravity.y = 0
        ball.velocity.x = 0
        ball.velocity.y = 0
        fill("white")
        text(Math.ceil((150 - (frameCount - roundFrame))/30), 600, 400)
        fill('red')
    
        text(score1, 200, 100)
        fill('blue')
        
        text(score2, 1000, 100)
    } else {
        
        renderRound()
        textFont(pixelFont, 120)
        if(frameCount - roundFrame < 210 && frameCount - roundFrame > 2){
            fill(0, 0, 0, (210-(frameCount - roundFrame))*4.25)
            text("Play!", 600, 400)
        }
    }
    
    
}   