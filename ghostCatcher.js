// Create the canvas
var canvas = document.createElement("canvas");
var ctx = canvas.getContext("2d");
canvas.width = 512;
canvas.height = 480;
document.body.appendChild(canvas);

// Background image
var bgReady = false;
var bgImage = new Image();
bgImage.onload = function () {
    bgReady = true;
};
bgImage.src = "images/dungen.jpg";

// Ghost image
var ghostReady = false;
var ghostImage = new Image();
ghostImage.onload = function () {
    ghostReady = true;
};
ghostImage.src = "images/ghost.png";

// Game objects
var ghost = {};
var ghostCaught = 0;

// Set ghost speed
var ghostSpeed = 40;

// Reset the game by placing the ghost randomly on the screen
var reset = function () {
    ghost.x = 32 + (Math.random() * (canvas.width - 64));
    ghost.y = 32 + (Math.random() * (canvas.height - 64));
};

// Update game objects
var update = function (modifier) {
    ghost.x += ghostSpeed * modifier;
    if (ghost.x > canvas.width) {
        ghost.x = -32;
        ghost.y = 32 + (Math.random() * (canvas.height - 64));
    }
};

// Draw everything
var render = function () {
    if (bgReady) {
        ctx.drawImage(bgImage, 0, 0);
    }
    if (ghostReady) {
        ctx.drawImage(ghostImage, ghost.x, ghost.y);
    }
    // Score
    ctx.fillStyle = "#FFFFFF";
    ctx.font = "bold 20px Helvetica";
    ctx.textAlign = "left";
    ctx.textBaseline = "top";
    ctx.fillText("Ghost caught: " + ghostCaught, 8, 455);
};

// The main game loop
var main = function () {
    var now = Date.now();
    var delta = now - then;
    update(delta / 1000);
    render();
    then = now;

    // Request to do this again ASAP
    requestAnimationFrame(main);
};

// Reset the game when the player catches a ghost by clicking on it
canvas.addEventListener("click", function (e) {
    if (
        e.offsetX >= ghost.x
        && e.offsetX <= ghost.x + 32
        && e.offsetY >= ghost.y
        && e.offsetY <= ghost.y + 32
    ) {
        ++ghostCaught;
		reset();
        ghostSpeed += 50; 
    }
});

//Reset the speed to the original speed 40
const resetSpeedBtn = document.querySelector('#reset-speed-btn');
resetSpeedBtn.addEventListener('click', resetSpeed);
function resetSpeed() {
	ghostSpeed = 40;
    reset(); 
}

// Cross-browser support for requestAnimationFrame
var w = window;
requestAnimationFrame = w.requestAnimationFrame || w.webkitRequestAnimationFrame || w.msRequestAnimationFrame || w.mozRequestAnimationFrame;

// Reset the score to 0
const resetScoreBtn = document.querySelector('#reset-score-btn');
resetScoreBtn.addEventListener('click', resetScore);

function resetScore() {
    ghostCaught = 0; 
	ghostSpeed = 40;
    reset();
}
// Create the footer element
var footer = document.createElement("footer");
footer.innerHTML = "<p>&#169 Copyright Fan Yang (#301295721) - COMP125 - Winter 2023</p>";

// Append the footer to the body of the HTML document
document.body.appendChild(footer);
// Let's play this game!
var then = Date.now();
reset();
main();
