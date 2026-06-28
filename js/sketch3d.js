let sketch3d = function (p) {

  let contenedor;
  let angulo = 0;

 
  p.setup = function () {
    contenedor = p.select("#canvas-3d");

    let canvas = p.createCanvas(anchoContenedor(), altoContenedor(), p.WEBGL);
    canvas.parent("canvas-3d");

    p.angleMode(p.RADIANS);
    p.noStroke();
  };

  p.draw = function () {
    p.background(255, 250, 242);
    p.orbitControl();
    p.lights();

    p.rotateX(-0.4);
    p.rotateY(angulo);

    angulo = angulo + 0.005;

    dibujarSuelo();

    for (let i = 0; i < 8; i++) {
      let x = p.cos(i * p.TWO_PI / 8) * 180;
      let z = p.sin(i * p.TWO_PI / 8) * 180;
      let alto = 100 + p.sin(p.frameCount * 0.02 + i) * 25;

      dibujarFlor(x, alto, z, i);
    }

    dibujarPetalosFlotantes();
  };

  
  p.windowResized = function () {
    p.resizeCanvas(anchoContenedor(), altoContenedor());
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

    if (alto < 320) {
      alto = 320;
    }

    return alto;
  }

 
  function dibujarSuelo() {
    p.push();
    p.translate(0, 140, 0);
    p.rotateX(p.HALF_PI);
    p.ambientMaterial(143, 215, 182);
    p.plane(550, 550);
    p.pop();
  }

  
  function dibujarFlor(x, alto, z, numero) {
    p.push();
    p.translate(x, 140, z);

    p.push();
    p.translate(0, -alto / 2, 0);
    p.ambientMaterial(31, 111, 74);
    p.cylinder(4, alto);
    p.pop();

    p.translate(0, -alto, 0);
    p.rotateY(p.frameCount * 0.01 + numero);

    for (let i = 0; i < 8; i++) {
      p.push();
      p.rotateZ(i * p.TWO_PI / 8);
      p.translate(28, 0, 0);
      p.ambientMaterial(239, 111, 97);
      p.sphere(18, 12, 8);
      p.pop();
    }

    p.ambientMaterial(229, 182, 77);
    p.sphere(16, 16, 12);

    p.pop();
  }

  // Dibuja pétalos flotantes animados alrededor
  function dibujarPetalosFlotantes() {
    for (let i = 0; i < 18; i++) {
      let x = p.sin(p.frameCount * 0.01 + i) * 250;
      let y = p.sin(p.frameCount * 0.02 + i * 2) * 80;
      let z = p.cos(p.frameCount * 0.01 + i) * 250;

      p.push();
      p.translate(x, y, z);
      p.rotateX(p.frameCount * 0.02 + i);
      p.rotateY(p.frameCount * 0.01);
      p.ambientMaterial(255, 190, 180);
      p.ellipsoid(12, 5, 2);
      p.pop();
    }
  }
};

new p5(sketch3d);
