var cvs = document.getElementById("canvas");

var ctx = cvs.getContext("2d");

// load images

var bird = new Image();

var bg1 = new Image();

var fg = new Image();

var pipenorth = new Image();

var pipesouth = new Image();

bird.src = "dist/img/bird.png";

bg1.src = "dist/img/bg1.png";

fg.src = "dist/img/fg.png";

pipenorth.src = "dist/img/pipenorth.png";

pipesouth.src = "dist/img/pipesouth.png";

// some variables

var gap = 85;

var constant;

var bX = 10;

var bY = 150;

var gravity = 1.5;

var score = 0;

// audio files

var fly = new Audio();

var scor = new Audio();

fly.src = "dist/audio/fly.wav";

scor.src = "dist/audio/score.wav";

// on key down

document.addEventListener("keydown", moveUp);

function moveUp() {
  bY -= 25;

  fly.play();
}

// pipe coordinates

var pipe = [];

pipe[0] = {
  x: cvs.width,

  y: 0,
};

// draw images

function draw() {
  ctx.drawImage(bg1, 0, 0);

  for (var i = 0; i < pipe.length; i++) {
    constant = pipenorth.height + gap;

    ctx.drawImage(pipenorth, pipe[i].x, pipe[i].y);

    ctx.drawImage(pipesouth, pipe[i].x, pipe[i].y + constant);

    pipe[i].x--;

    if (pipe[i].x == 125) {
      pipe.push({
        x: cvs.width,

        y: Math.floor(Math.random() * pipenorth.height) - pipenorth.height,
      });
    }

    // detect collision

    if (
      (bX + bird.width >= pipe[i].x &&
        bX <= pipe[i].x + pipenorth.width &&
        (bY <= pipe[i].y + pipenorth.height ||
          bY + bird.height >= pipe[i].y + constant)) ||
      bY + bird.height >= cvs.height - fg.height
    ) {
      location.reload(); // reload the page
    }

    if (pipe[i].x == 5) {
      score++;

      scor.play();
    }
  }

  ctx.drawImage(fg, 0, cvs.height - fg.height);

  ctx.drawImage(bird, bX, bY);

  bY += gravity;

  ctx.fillStyle = "#000";

  ctx.font = "20px Verdana";

  ctx.fillText("Score : " + score, 10, cvs.height - 20);

  requestAnimationFrame(draw);
}

draw();
