let player1body, player1head, player1, player2body, player2head, player2, floor, ampl1, ampl2, collisionFrame1, collisionFrame2, lastCollide1, lastCollide2, initRotation1, initRotation2, wall1, wall2, table, net

let backarm1, backarm2, forearm1, armjoint1, bodyjoint1, armjoint2, ball
let pixelFont, tableSound, paddleSound, pianoSound, fireSound
let score1 = 0, score2 = 0
let ballLastCollide = "NONE"
let lastPlayer = 0
let ballPosList = []
let roundFrame = -60
let rotateDire1 = "left"
let rotateDire2 = "right"
let scored = "NONE"
let armRotation1 = 180
let armRotation2 = 180
let songPlaying = false
let player1shot = "NONE", player2shot = "NONE"
let trailList = []
let gameStarted = false, controlScreen = false
let playButton
let playerImage, playerImage2, tableImage
let costume1 = 1, costume2 = 2
let powerup
let powerType = 1, powerFrame = -1000
let player1power = 0, player2power = 0
let leftControlImage, rightControlImage
let playClickedframe = -100
let superSmash = 0
let floorMode = 1
function preload(){
    pixelFont = loadFont("PressStart.ttf")
    tableSound = loadSound("table.mp3")
    paddleSound = loadSound("paddle.mp3")
    pianoSound = loadSound("piano.mp3")
    fireSound = loadSound("fire.mp3")
    playerImage = loadImage("assets/char1.png")
    playerImage2 = loadImage("assets/char1a.png")
    tableImage = loadImage("assets/table.png")
    leftControlImage = loadImage("assets/leftcontrols.png")
    rightControlImage = loadImage("assets/rightcontrols.png")

}

function setup(){
    createCanvas(1200, 600)
    angleMode(DEGREES)
    
    playButton = new Sprite(600, 400, 200, 100)
    playButton.textSize = 80/2
    playButton.text = "Play!"
    playButton.visible = false
    playButton.collider = "kinematic"
    player1 = new Sprite(100, 350, 50)
    player2 = new Sprite(1100, 350, 50)
    floor = new Sprite(600, 600, 1200, 4)
    wall1 = new Sprite(0, 200, 4, 800)
    wall2 = new Sprite(1200, 200, 4, 800)
    table = new Sprite(600, 590, 625, 150)
    net = new Sprite(600, 505, 8, 20)
    ball = new Sprite(800, 340, 20)
    powerup = new Sprite(600, 400, 30)
    powerup.collider = "none"
    
    backarm1 = new Sprite(100, 400-200, 30, 115)
    backarm1.offset.y = -50
    backarm2 = new Sprite(1000, 400-200, 30, 115)
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
    powerup.visible = false
    player1.d = 50
    player2.d = 50
    player1.rotation = 0
    player2.rotation = 0
    player1.bounciness = 0
    player2.bounciness = 0
    player1.rotationLock = true
    player2.rotationLock = true
    player1.friction = 1
    player2.friction = 1
    player1.visible = true
    player2.visible = true
    ball.visible = true
    player1.rotationDrag = 100
    player2.rotationDrag = 100
    // player1.addCollider(0,-125, 50, 200)
    // player2.addCollider(0,-125, 50, 200)
    floor.friction = 1
    world.gravity.y = 35
    ampl1 = 3
    ampl2 = 3
    collisionFrame1 = 0
    collisionFrame2 = 0
    lastCollide1 = 0
    lastCollide2 = 0
    ball.velocity.x = -15
    ball.bounciness = 0.92
    ball.color = "white"
    ball.mass = 10
    ball.drag = 0.5
    
    table.img = `assets/table.png`
    table.img.offset.y = -330
    table.img.scale.x = 0.7
    table.img.scale.y = 0.6
    powerup.img = `assets/power${powerType}.png`
    powerup.img.scale = 0.5
    textAlign(CENTER)
    leftControlImage.resize(500, 500)
    rightControlImage.resize(500, 500)
}

function drawPlayer1(){
    push()
    translate(player1.pos.x, player1.pos.y)
    rotate(player1.rotation)
    // fill(255, 0, 0)
    // circle(0, 0, 50)
    // rect(-25, -25-200, 50, 200)
    
    player1.img = `assets/char${costume1}.png`
    player1.img.scale.x = 1
    player1.img.offset.y = -110
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
    player2.img = `assets/char${costume2}a.png`
    player2.img.offset.y = -110
    player2.img.scale.x = -1
    pop()
}

function drawBall(){
    strokeWeight(2)
    stroke("black")
    if(superSmash == 0){
        fill("white")
        ball.color = "white"
    } else {
        fill("orange")
        ball.color = "orange"
    }


    
    circle(ball.pos.x, ball.pos.y, 20)
}

function drawTable(){
    image(tableImage, 600-312-18, 790-300)
}
    


function renderArm1(){
    backarm1.pos.x = player1.pos.x + 160*Math.sin(radians(player1.rotation))
    backarm1.pos.y = player1.pos.y - 140*Math.cos(radians(player1.rotation))
    backarm1.img = `assets/arm1-${costume1}.png`
    backarm1.img.scale.y = 1
    backarm1.img.scale.x = 1
    backarm1.img.offset.y = 0
    backarm1.img.offset.x = -5
    
}

function renderArm2(){
    backarm2.pos.x = player2.pos.x + 160*Math.sin(radians(player2.rotation))
    backarm2.pos.y = player2.pos.y - 140*Math.cos(radians(player2.rotation))
    backarm2.img = `assets/arm2-${costume2}.png`
    backarm2.img.scale.y = 1
    backarm2.img.scale.x = 1
    backarm2.img.offset.y = 0
    backarm2.img.offset.x = 5
   
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

function costumeChange(){
    costume1 = Math.floor(random(1, 6))
    costume2 = Math.floor(random(1, 6))
    player1.pos = createVector(200, 550-200)
    player2.pos = createVector(1000, 550-200)
    player1.vel.x = 0
    player2.vel.x = 0
}

function reset(){
    // frameCount = 0
    // roundFrame = 0
    lastPlayer = 0
    trailList = []
    ballLastCollide = "NONE"
    backarm1.rotation = 180
    backarm2.rotation = 180
    let nn = Math.floor(random(0, 2))
    if(nn == 0){
        ball.pos = createVector(800, 540-200)
        ball.velocity.x = -15
    } else {
        ball.pos = createVector(400, 540-200)
        ball.velocity.x = 15
    }
    nn = Math.floor(random(0, 3))
    console.log(floorMode)
    if(nn == 0){
        floorMode = 0
    } else {
        floorMode = 1
    }
    player1.pos = createVector(200, 550-200)
    player2.pos = createVector(1000, 550-200)
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
    ball.visible = true
    player1.friction = floorMode
    player2.friction = floorMode
    floor.friction = floorMode
    
    ampl1 = 3
    ampl2 = 3
    collisionFrame1 = 0
    collisionFrame2 = 0
    lastCollide1 = 0
    lastCollide2 = 0
    //wball.velocity.x = -15
    ball.velocity.y = 0
    ball.bounciness = 0.92
    ball.mass = 600
    ball.drag = 0.5 
    textAlign(CENTER)
    superSmash = 0
    
}

function renderRound(){
    noStroke()
    background(200)
    drawBall()
    //renderBallTrail()
    fill('red')
    
    text(score1, 500, 100)
    fill('blue')
    
    text(score2, 700, 100)
    drawPlayer1()
    drawPlayer2()
    renderArm1()
    renderArm2()
    drawTable()

    textFont(pixelFont, 60/2)
    if(frameCount%10 > 5){
        fill('orange')
    } else {
        fill(0, 0)
    }
    
    if(player1power == 1){
        text(`Super Smash!`, 200, 100)
        text(`▼`, 200, 150)
    } 
    if (player2power == 1){
        text(`Super Smash!`, 1000, 100)
        text(`▼`, 1000, 150)
    }

    

    if(frameCount - powerFrame > 300){
        powerup.visible = false
        if(frameCount - powerFrame > 400 && Math.floor(random(0, 400)) == 0){
            powerFrame = frameCount
        }
    } else {
        powerup.visible = true
        if(ball.overlaps(powerup)){
            if(lastPlayer == 1){
                player1power = powerType
                powerFrame -= 300
            } else if (lastPlayer == 2){
                player2power = powerType
                powerFrame -= 300
            }
        }
    }

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
        lastPlayer = 1
        paddleSound.play()
        // if(ball.vel.y < -max(6, ((295 - backarm1.pos.x)/295)*15)){
        //     ball.vel.y = -max(6, ((295 - backarm1.pos.x)/295)*15)
        // }

        if(superSmash == 2){
            superSmash = 0
        }
        
        if(player1shot == "NORM" || player1shot == "NONE"){
            ball.vel.x = map(300-backarm1.pos.x, 0, 300, 8, 18)
            ball.vel.y = max(-12, ball.vel.y)
        } else if (player1shot == "SMASH"){
            ball.vel.x = 23
            ball.pos.x += 40
            ball.vel.y = min(0, ball.vel.y)

            if(player1power == 1){
                ball.vel.mult(2)
                fireSound.play()
                player1power = 0
                ball.vel.y = ball.vel.y + 8
                superSmash = 1
            }
            
        }
           
        //backarm1.rotation = 180
        
    } 
    
    if (ball.collides(backarm2)){
        ballLastCollide = "RPADDLE"
        lastPlayer = 2
        paddleSound.play()
        // if(ball.vel.y < -max(6, ((backarm2.pos.x - 1065)/295)*15)){
        //     ball.vel.y = -max(6, ((backarm2.pos.x - 1065)/295)*15)
        // }

        if(superSmash == 1){
            superSmash = 0
        }
        if(player2shot == "NORM" || player2shot == "NONE"){
            ball.vel.x = -map(backarm2.pos.x-900, 0, 300, 8, 18)
            ball.vel.y = max(-12, ball.vel.y)
        } else if (player2shot == "SMASH"){
            ball.vel.x = -23
            ball.pos.x -= 40
            ball.vel.y = min(0, ball.vel.y)

            if(player2power == 1){
                ball.vel.mult(2)
                fireSound.play()
                player2power = 0
                ball.vel.y = ball.vel.y + 8
                superSmash = 2
            }
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

    if(ball.collides(floor) || ball.collides(player1) || ball.collides(player2)){
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
    //ball.vel.limit(20)
    
    // if(ball.vel.x > 0 && ball.vel.x < 6){
    //     ball.vel.x = 6
    // }

    // if(ball.vel.x < 0 && ball.vel.x > -6){
    //     ball.vel.x = -6
    // }

    if(ball.vel.y < -12){
        ball.vel.y = -12
    }

    // if(ball.vel.x > 20){
    //     ball.vel.x = 20
    // }

    // if(ball.vel.x < -20){
    //     ball.vel.x = -20
    // }


    
    //console.log(backarm1.rotation, player1.rotation)

    // if(ballLastCollide != "LPADDLE"){
        
    // } else {
    //     backarm1.rotation = 180
    // }
    if(backarm1.rotation == 90 && player1shot == "NORM" ){
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
        if(player1.pos.y > 725-200 && kb.pressing('w') < 10){
            player1.pos.y -= 2
            player1.velocity.y -= abs(1.35*Math.cos(radians(player2.rotation)))
            player1.velocity.x += 2*Math.sin(radians(player1.rotation))
        }

        
        //backarm1.rotation = armRotation1

    } 

    

    if(kb.pressing('o')){
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
        if(player2.pos.y > 725-200 && kb.pressing('o') < 10){
            player2.pos.y -= 2
            player2.velocity.y -= abs(1.35*Math.cos(radians(player2.rotation)))
            player2.velocity.x += 2*Math.sin(radians(player2.rotation))
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
    drawTable()
    if(!songPlaying){
        songPlaying = true
        //pianoSound.play()
    }
    textFont(pixelFont, 120/2)
    powerup.pos.y = 400 + 70*Math.sin(frameCount/20)

    
    // drawBall()
    if(gameStarted == false){
        if(controlScreen == false){
            fill(20)
            //frameCount -= 1
            rect(0, 0, 1200, 800)
            drawTable()
            playButton.draw()
            fill(255)
            textStyle(pixelFont, 20)
            textSize(80)
            text("Pong Random!", 600, 200)
            textStyle(pixelFont, 50)
            textSize(50)
            text("Game by V Sriram", 600, 700)
            //image(playerImage, 200, 400)
            if(mouse.pressing() && playButton.mouse.pressing()){
                //gameStarted = true
                controlScreen = true
                playClickedframe = frameCount
                // playButton.visible = false
                // playButton.collider = "none"
                // console.log("aarmabikalaam")
                // table.visible = false
                // net.visible = true
                // backarm1.visible = true
                // backarm2.visible = true
            }
        } else {
            fill(20)
            //frameCount -= 1
            rect(0, 0, 1200, 800)
            fill(255)
            text("Controls", 600, 100)
            image(leftControlImage, 20, 150)
            image(rightControlImage, 680, 150)
            playButton.text = "OK!"
            playButton.y = 500
            if(mouse.pressing() && playButton.mouse.pressing() && frameCount - playClickedframe > 2){
                gameStarted = true
                controlScreen = false
                playButton.visible = false
                playButton.collider = "none"
                console.log("aarmabikalaam")
                table.visible = false
                net.visible = true
                backarm1.visible = true
                backarm2.visible = true
                frameCount = 0
                roundFrame = -60
            }
    
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
            text(score1-1, 500 , 100 - min(20, (frameCount - roundFrame))*5)
            text(score1, 500 , 200 - min(20, (frameCount - roundFrame))*5)

            if((frameCount - roundFrame)%20 < 12){
                text("◀ Point Red", 600, 300)
            } else {
                fill(255, 0, 0, (20-(frameCount - roundFrame)%20)*31.8)
            }
        } else {
            text(score1, 500 , 100)
        }
        
        fill('blue')
        if(scored == "RIGHT"){
            text(score2-1, 700 , 100 - min(20, (frameCount - roundFrame))*5)
            text(score2, 700 , 200 - min(20, (frameCount - roundFrame))*5)
            if((frameCount - roundFrame)%20 < 12){
                text("Point Blue ▶", 600, 300)
            } else {
                fill(255, 0, 0, (20-(frameCount - roundFrame)%20)*31.8)
            }
        } else {
            text(score2, 700 , 100)
        }

        
    } else if (frameCount - roundFrame == 60 || frameCount - roundFrame == 150){
        if(frameCount - roundFrame == 60){
            costumeChange()
        }
        if(frameCount - roundFrame == 150){
            reset()
        }
        
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
    
        text(score1, 500, 100)
        fill('blue')
        
        text(score2, 700, 100)
        fill("yellow")
        if(floorMode == 0){
            text("Slippery", 600, 200)
        }
    } else {
        
        renderRound()
        textFont(pixelFont, 120/2)
        if(frameCount - roundFrame < 210 && frameCount - roundFrame > 2){
            fill(0, 0, 0, (210-(frameCount - roundFrame))*4.25)
            text("Play!", 600, 400)
        }
    }
    
    
}   