
let proyectos = document.querySelectorAll(".project");
let galerias = [];
let videos = [];

for (let i = 0; i < proyectos.length; i++) {
  prepararProyecto(proyectos[i]);
}


window.addEventListener("load", revisarProyectos);
window.addEventListener("scroll", revisarProyectos);
window.addEventListener("resize", revisarProyectos);

revisarProyectos();

function prepararProyecto(proyecto) {
  let imagenes = proyecto.querySelectorAll(".project__asset");
  let video = proyecto.querySelector(".project__video");

  if (imagenes.length > 1) {
    crearGaleria(proyecto, imagenes);
  }

  if (video) {
    crearVideo(proyecto, video);
  }
}

function crearGaleria(proyecto, imagenes) {
  let cajaMedia = proyecto.querySelector(".project__media");
  let etiqueta = proyecto.querySelector(".project__media-label");
  let textos = [];
  let galeria = {
    proyecto: proyecto,
    imagenes: imagenes,
    etiqueta: etiqueta,
    textos: textos,
    actual: 0,
    intervalo: null,
    mouseActivo: false
  };

  if (cajaMedia && cajaMedia.dataset.labels) {
    galeria.textos = cajaMedia.dataset.labels.split(",");
  }

  proyecto.addEventListener("mouseenter", function () {
    galeria.mouseActivo = true;
    iniciarGaleria(galeria);
  });

  proyecto.addEventListener("mouseleave", function () {
    galeria.mouseActivo = false;

    if (!estaEnPantalla(proyecto)) {
      detenerGaleria(galeria);
    }
  });

  proyecto.addEventListener("focusin", function () {
    galeria.mouseActivo = true;
    iniciarGaleria(galeria);
  });

  proyecto.addEventListener("focusout", function () {
    galeria.mouseActivo = false;

    if (!estaEnPantalla(proyecto)) {
      detenerGaleria(galeria);
    }
  });

  galerias.push(galeria);
}

function crearVideo(proyecto, video) {
  configurarVideo(video);

  videos.push({
    proyecto: proyecto,
    video: video
  });
}

function revisarProyectos() {
  for (let i = 0; i < galerias.length; i++) {
    if (estaEnPantalla(galerias[i].proyecto)) {
      iniciarGaleria(galerias[i]);
    } else if (!galerias[i].mouseActivo) {
      detenerGaleria(galerias[i]);
    }
  }

  for (let i = 0; i < videos.length; i++) {
    if (estaEnPantalla(videos[i].proyecto)) {
      reproducirVideo(videos[i]);
    } else {
      pausarVideo(videos[i]);
    }
  }
}

function iniciarGaleria(galeria) {
  galeria.proyecto.classList.add("is-visible");

  if (galeria.intervalo == null) {
    galeria.intervalo = setInterval(function () {
      cambiarImagen(galeria);
    }, 2000);
  }
}

function detenerGaleria(galeria) {
  galeria.proyecto.classList.remove("is-visible");
  clearInterval(galeria.intervalo);
  galeria.intervalo = null;
  galeria.actual = 0;
  mostrarImagen(galeria);
}

function cambiarImagen(galeria) {
  galeria.actual = galeria.actual + 1;

  if (galeria.actual >= galeria.imagenes.length) {
    galeria.actual = 0;
  }

  mostrarImagen(galeria);
}

function mostrarImagen(galeria) {
  for (let i = 0; i < galeria.imagenes.length; i++) {
    galeria.imagenes[i].classList.remove("is-active");
  }

  galeria.imagenes[galeria.actual].classList.add("is-active");

  if (galeria.etiqueta && galeria.textos[galeria.actual]) {
    galeria.etiqueta.textContent = galeria.textos[galeria.actual];
  }
}

function configurarVideo(video) {
  video.muted = true;
  video.defaultMuted = true;
  video.loop = true;
  video.playsInline = true;
  video.controls = false;

  video.setAttribute("muted", "");
  video.setAttribute("loop", "");
  video.setAttribute("playsinline", "");
  video.setAttribute("webkit-playsinline", "");
  video.removeAttribute("controls");
}


function reproducirVideo(item) {
  configurarVideo(item.video);
  item.proyecto.classList.add("is-visible");
  item.proyecto.classList.add("is-playing");
  item.video.classList.add("is-active");

  let promesa = item.video.play();

  if (promesa) {
    promesa.catch(function () {
      item.video.muted = true;
    });
  }
}

function pausarVideo(item) {
  item.video.pause();
  item.proyecto.classList.remove("is-visible");
  item.proyecto.classList.remove("is-playing");
  item.video.classList.remove("is-active");
}


function estaEnPantalla(elemento) {
  let posicion = elemento.getBoundingClientRect();
  let altoPantalla = window.innerHeight;

  if (posicion.bottom > 80 && posicion.top < altoPantalla - 80) {
    return true;
  } else {
    return false;
  }
}
