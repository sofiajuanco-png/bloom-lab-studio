let sketchParticulas = function (p) {

  let contenedor;
  let flores = [];


  p.setup = function () {
    contenedor = p.select("#canvas-network");

    let canvas = p.createCanvas(anchoContenedor(), altoContenedor());
    canvas.parent("canvas-network");

    crearFloresIniciales();
  };

  p.draw = function () {
    p.background(255, 250, 242);
    dibujarSuelo();

    for (let i = 0; i < flores.length; i++) {
      crecerFlor(flores[i]);
      dibujarFlor(flores[i]);
    }
  };


  p.mousePressed = function () {
    if (mouseDentro()) {
      crearFlor(p.mouseX, p.height - 60);
    }
  };

  p.windowResized = function () {
    p.resizeCanvas(anchoContenedor(), altoContenedor());
    crearFloresIniciales();
  };

  function anchoContenedor() {
    let ancho = contenedor.width;

    if (ancho < 320) {
      ancho = 320;
    }

    return ancho;
  }

  function altoContenedor() {
    let alto = contenedor.height;

    if (alto < 360) {
      alto = 360;
    }

    return alto;
  }

  function crearFloresIniciales() {
    flores = [];

    for (let i = 0; i < 10; i++) {
      crearFlor(p.random(80, p.width - 80), p.height - 60);
    }
  }

  function crearFlor(x, y) {
    let flor = {
      x: x,
      y: y,
      alto: 0,
      altoFinal: p.random(90, 220),
      apertura: 0,
      tam: p.random(18, 34),
      colorR: p.random(220, 255),
      colorG: p.random(100, 180),
      colorB: p.random(130, 190)
    };

    flores.push(flor);
  }

  function crecerFlor(flor) {
    if (flor.alto < flor.altoFinal) {
      flor.alto = flor.alto + 1.2;
    } else if (flor.apertura < 1) {
      flor.apertura = flor.apertura + 0.015;
    }

    abrirConMouse(flor);
  }

  // Abre más los pétalos si el mouse está cerca
  function abrirConMouse(flor) {
    let distancia = p.dist(p.mouseX, p.mouseY, flor.x, flor.y - flor.alto);

    if (distancia < 120) {
      flor.apertura = flor.apertura + 0.01;
    }

    if (flor.apertura > 1) {
      flor.apertura = 1;
    }
  }
  function dibujarFlor(flor) {
    let florX = flor.x;
    let florY = flor.y - flor.alto;

    p.stroke(31, 111, 74);
    p.strokeWeight(4);
    p.line(flor.x, flor.y, florX, florY);

    dibujarHoja(flor.x, flor.y - flor.alto * 0.45, -1);
    dibujarHoja(flor.x, flor.y - flor.alto * 0.65, 1);
    dibujarPetalos(flor, florX, florY);

    p.fill(229, 182, 77);
    p.noStroke();
    p.circle(florX, florY, flor.tam * 0.7);
  }

  function dibujarPetalos(flor, x, y) {
    p.noStroke();
    p.fill(flor.colorR, flor.colorG, flor.colorB, 210);

    for (let i = 0; i < 8; i++) {
      p.push();
      p.translate(x, y);
      p.rotate(i * p.TWO_PI / 8);
      p.ellipse(flor.apertura * flor.tam, 0, flor.tam, flor.tam / 2);
      p.pop();
    }
  }

  function dibujarHoja(x, y, lado) {
    p.push();
    p.translate(x, y);
    p.rotate(lado * 0.6);
    p.noStroke();
    p.fill(143, 215, 182, 190);
    p.ellipse(lado * 18, 0, 36, 14);
    p.pop();
  }

  function dibujarSuelo() {
    p.noStroke();
    p.fill(237, 247, 239);
    p.rect(0, p.height - 65, p.width, 65);

    p.fill(31, 111, 74, 80);
    p.rect(0, p.height - 65, p.width, 2);
  }

  function mouseDentro() {
    if (p.mouseX >= 0 && p.mouseX <= p.width && p.mouseY >= 0 && p.mouseY <= p.height) {
      return true;
    } else {
      return false;
    }
  }
};

new p5(sketchParticulas);
