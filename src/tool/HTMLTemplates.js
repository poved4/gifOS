// Gif´s
const gifTrend = (title, uri) => {
  return `
    <figure class="col position-relative m-0 p-2 trend-gif">

      <figcaption class="d-flex justify-content-between position-absolute px-2 background-gradient">
        <span class="text-light fw-bold text-truncate"># ${title}</span>
        <img loading="lazy" src="img/buttonClose.svg" alt="close button">
      </figcaption>

      <img class="w-100 h-100" loading="lazy" src="${uri}" alt="${title}">

      <button class="position-absolute text-light p-2 btn-blue" onclick="buildSearchGif('${title}')">
        Ver más…
      </button>

    </figure>
  `;
}

const gifSearch = (title, uri) => {
  return `
    <figure class="position-relative m-0 p-2 results-gif">

      <img class="w-100 h-100" loading="lazy" src="${uri}" alt="${title}">

      <figcaption class="position-absolute px-2 background-gradient">
        <span class="text-light fw-bold text-truncate"># ${title}</span>
      </figcaption>

    </figure>
  `;
}

const researchButton = (title) => {
  return `
    <button
      class="py-1 px-2 me-2 text-light btn-blue"
      onclick="buildSearchGif('${title}')">
      # ${title}
    </button>
  `;
}

// templates for Capture Gif window
const htmlCaptureGif = () => {

  let body = `
    <video class="w-100 h-100 bg-black gif-window-border " id="gif-video">
      video stream not avaible.
    </video>
  `;

  let footer = `
    <div class="d-flex justify-content-end align-items-center">
      <div class="btn-group mx-3">

        <button type="button" class="px-3 py-2 btn-pink">
          <img loading="lazy" src="../img/camera.svg" alt="camera">
        </button>

        <button type="button" class="fw-bold px-4 py-2 btn-pink" onclick="gifRecord();">
          Capturar
        </button>

        </div>
    </div>
  `;

  return { body, footer }

}

const htmlRecordGif = () => {

  let body = null;

  let footer = `
    <div class="d-flex justify-content-between align-items-center">

      <div class="p-2 bg-white gif-timer">
        <span id="gif-timer">
          00:00:00:00
        </span>
      </div>

      <div class="btn-group mx-3">
        <button type="button" class="px-3 py-2 btn-red">
          <img loading="lazy" src="../img/recording.svg" alt="recording">
        </button>
        <button type="button" class="fw-bold px-4 py-2 btn-red" onclick="gifStop();">
          Listo
        </button>
      </div>

    </div>
  `;

  return { body, footer }

}

const htmlStopGif = () => {

  let body = `
    <figure class="w-100 h-100 m-0 gif-window-border">
      <img id="gif-img" class="w-100" src="" alt="my gif">
    </figure>
  `;

  let footer = `
    <div class="d-flex justify-content-end align-items-center">
      <button class="fw-bold px-4 py-1 me-4 btn-white" onclick="gifCapture();">Repetir Captura</button>
      <button class="fw-bold px-4 py-1 btn-soft-pink" onclick="gifUpload();">Subir Guifo</button>
    </div>
  `;

  return { body, footer }

}

const htmlUploadGif = () => {

  let body = `
    <div class="bg-light gif-window-border" style="height: 25rem;">
      <figure class="d-flex flex-column justify-content-center align-items-center w-100 h-100 m-0">
        
        <img src="../img/globe_img.png" alt="globe">

        <figcaption class="fw-bold text-truncate text-deep-violet">
          Estamos subiendo tu guifo…
        </figcaption>
      
      </figure>
    </div>
  `;

  let footer = null;

  return { body, footer }

}