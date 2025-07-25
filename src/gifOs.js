let myGif = null;

let stream = null;
let recorder = null;
let elementHTMLVideo = null;

const elementHTMLGifWindowBody = document.getElementById(HTML_ELEMENT.CAPTURE_GIF.BODY);
const elementHTMLGifWindowFooter = document.getElementById(HTML_ELEMENT.CAPTURE_GIF.FOOTER);

const loadMyGifs = () => {

  let stored = JSON.parse(localStorage.getItem(STORAGE.My_GIFS));
  if (!stored) return;

  const elementHTML = document.getElementById('misGifs');
  elementHTML.innerHTML = '';

  stored.forEach(element => {

    elementHTML.innerHTML += gifSearch(element.id, element.uri);

  });

}

const configRecordVideo = async () => {

  stream = await navigator.mediaDevices.getUserMedia({
    video: { width: 1240, height: 720 }
  });

  recorder = new RecordRTCPromisesHandler(
    stream,
    {
      type: 'gif',
      framRate: 1,
      quality: 10,
      hidden: 240
    }
  );
}

const windowGifClose = () => {
  document.getElementById(HTML_ELEMENT.CAPTURE_GIF.WINDOW).remove();
}

const gifCapture = async () => {

  myGif = null;
  recorder.reset();

  windowGifBuild('capture');

  elementHTMLVideo = document.getElementById(HTML_ELEMENT.CAPTURE_GIF.VIDEO_SRC);
  elementHTMLVideo.srcObject = stream;
  elementHTMLVideo.play();

}

const gifRecord = () => {

  windowGifBuild('record');
  recorder.startRecording();

}

const gifStop = async () => {

  await recorder.stopRecording();
  const blob = await recorder.getBlob();
  const uri = URL.createObjectURL(blob);
  myGif = { blob, uri }

  windowGifBuild('stop');

  document
    .getElementById(HTML_ELEMENT.CAPTURE_GIF.IMG_SRC)
    .src = uri;

}

const gifUpload = async () => {

  windowGifBuild('upload');

  await giphyUploadGif(myGif.blob)
    .then(data => {

      let storedGifs = JSON.parse(localStorage.getItem(STORAGE.My_GIFS)) || [];

      myGif.id = data.id;
      myGif.uri = `https://media.giphy.com/media/${data.id}/giphy.gif`;

      storedGifs.push(myGif);

      localStorage.setItem(STORAGE.My_GIFS, JSON.stringify(storedGifs));

    });
    
  loadMyGifs();
  windowGifBuild('capture');

}

const windowGifBuild = (action) => {

  const window = {
    'capture': htmlCaptureGif,
    'record': htmlRecordGif,
    'stop': htmlStopGif,
    'repeat': htmlCaptureGif,
    'upload': htmlUploadGif
  }

  const { body, footer } = window[action]();

  if (body)
    elementHTMLGifWindowBody.innerHTML = body;

  if (footer)
    elementHTMLGifWindowFooter.innerHTML = footer;

  if (action === 'upload')
    elementHTMLGifWindowFooter.innerHTML = '';

}

(async () => {
  loadMyGifs();
  configRecordVideo();
})();