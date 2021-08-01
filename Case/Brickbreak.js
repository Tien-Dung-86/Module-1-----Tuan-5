let canvas = document.getElementById("myCanvas");
let ctx = canvas.getContext("2d");
let x = canvas.width / 2;
let y = canvas.height - 38;
cx = 2;
cy = -2;


//Event control;
let leftPressed = false;
let rightPressed = false;

document.addEventListener("keyup", keyUpHandler, false);
document.addEventListener("keydown", keyDownHandler, false);

function keyUpHandler(evt) {
    if (evt.keyCode == 39) {
        rightPressed = false;
    } else if (evt.keyCode == 37) {
        leftPressed = false;
    }
}
function keyDownHandler(evt) {
    if (evt.keyCode == 39) {
        rightPressed = true;
    } else if (evt.keyCode == 37) {
        leftPressed = true;
    }
}


let brickColumn = 10;
let brickRow = 21;
let brickWidth = 50;
let brickHeight = 20;
let brickPadding = 10;
let brickOffsetLeft = 60;
let brickOffsetTop = 60;
let brick = [];
for (let i = 0; i < brickRow; i++) {
    brick[i] = [];
    for (let j = 0; j < brickColumn; j++) {
        brick[i][j] = {x: 0, y: 0, status: 1};
    }
}

function drawBricks() {
    for (let i = 0; i < brickRow; i++) {
        for (let j = 0; j < brickColumn; j++) {
            if (brick[i][j].status === 1) {
                let brickX = (i * (brickWidth + brickPadding)) + brickOffsetLeft;
                let brickY = (j * (brickHeight + brickPadding)) + brickOffsetTop;
                brick[i][j].x = brickX;
                brick[i][j].y = brickY;
                ctx.beginPath();
                ctx.rect(brickX, brickY, brickWidth, brickHeight);
                ctx.fillStyle = "green"
                ctx.fill();
            }
        }
    }
}


let status = 1;
function takeImpact() {
    for (let i = 0; i < brickRow; i++) {
        for (let j = 0; j < brickColumn; j++) {
            let a = brick[i][j];
            console.log(a)
            if (a.status === 1) {
                if (x > a.x && x < a.x + brickWidth && y > a.y && y < a.y + brickHeight) {
                    cy = -cy;
                    a.status = 0;
                    score++;
                    if (score === brickColumn * brickRow) {
                        alert("Mission Successful!");
                        document.location.reload();
                    }
                }
            }
        }
    }
}

let ballRadius = 18;

function drawBall() {
    ctx.beginPath();
    ctx.arc(x, y, ballRadius, 0, Math.PI * 2);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
}


let plateHeight = 20;
let plateWidth = 150;
let platePosition = (canvas.width - plateWidth) / 2;

function drawPlate() {
    ctx.beginPath();
    ctx.rect(platePosition, canvas.height - plateHeight, plateWidth, plateHeight);
    ctx.fillStyle = "black";
    ctx.fill();
}


let score = 0;

function takeScore() {
    ctx.font = "italic normal bold 20px arial"
    ctx.fillStyle = "Black"
    ctx.fillText("Score: " + score, 30, 30);
}

let lives = 2;

function drawLives() {
    ctx.font = "italic normal bold 20px arial"
    ctx.fillStyle = "red"
    ctx.fillText("Live: " + lives, canvas.width - 90, 30);
}

function playGame() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    //draw;
    drawBricks();
    drawBall();
    drawPlate()
    takeScore();
    drawLives();
    takeImpact();
    setInterval(drawPlate,drawBall, 5)


    // Plate impact ball , win and game over.
    if ((cx + x > canvas.width - ballRadius) || (cx + x < ballRadius)) {
        cx = -cx;
    }
    if (cy + y < ballRadius) {
        cy = -cy;
    } else if (cy + y > canvas.height - ballRadius) {
        if ((x > platePosition) && (x < platePosition + plateWidth)) {
            cy = -cy;
        } else {
            lives--;
            if (!lives) {
                alert("Game Over");
                document.location.reload();
            } else {
                let x = canvas.width / 2;
                let y = canvas.height - 60;
                cx = 2;
                cy = -2;
                platePosition = (canvas.width - plateWidth) / 2
            }
        }
    }

    // control
    if (rightPressed && platePosition < canvas.width - plateWidth) {    //Plate impact right boundary
        platePosition += 5;
    } else if (leftPressed && platePosition > 0) {     //Plate impact left boundary
        platePosition -= 5;
    }
    x += cx;
    y += cy;
    requestAnimationFrame(playGame)
}

playGame();