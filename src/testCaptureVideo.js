/* ---Vars--- */
let form = new FormData();
const apiKey = 'K5rZZsf7Ywd7hBttsBwU2RZn3odQfNBK';
const endPointUpload= "https://upload.giphy.com/v1/gifs";

/* ---Grupo General--- */
const video = document.getElementById('video');
const capture = document.getElementById('capture');
const uploading = document.getElementById('uploading');
const InfoCapture = document.getElementById("InfoCapture");

/* ---Buttons--- */
const timer = document.getElementById('timer');
const ShowGif = document.getElementById("ShowGif");
const endClass = document.getElementById('endClass');
const cancelBtn = document.getElementById('cancelBtn');
const stopClass = document.getElementById('stopClass');
const startClass = document.getElementById('startClass');

/* ---Mains Methods--- */
let recorder = navigator.mediaDevices.getUserMedia({
    video: { width: 1240, height: 720 }
}).then(async function(stream) {
    video.srcObject = stream;
    video.play();
    recorder = RecordRTC(stream, {
        type: 'gif',
        framRate: 1,
        quality: 10,
        hidden: 240,
    });
});

function stopRecordingCallback() {
    video.src = video.srcObject = null;
    video.muted = false;
    video.volume = 1;
    video.src = URL.createObjectURL(recorder.getBlob());
    recorder.camera.stop();
    recorder.destroy();
    recorder = null;
}

function startVideo() 
{
    recorder.startRecording();
    console.log('---startVideo');
    timer.style.display = "block";
    startClass.style.visibility = "hidden";
    stopClass.style.visibility = "visible";
}

async function stopVideo() {
    timer.style.display = "none";
    stopClass.style.visibility = "hidden";
    endClass.style.visibility = "visible";
    
    setTimeout(() => {
        recorder.stopRecording(async res => 
        {
            const blob = await recorder.getBlob();
            const bloob = URL.createObjectURL(blob);
            form.append('api_key', apiKey);
            form.append('file', blob);
            ShowGif.src = bloob; 

            video.style.display = "none";
            ShowGif.style.display = "block";
        });
    }, 1000);
}

function repetVideo() {
    recorder.reset();
    video.style.display = "block";
    ShowGif.style.display = "none";
    endClass.style.visibility = "hidden";
    startClass.style.visibility = "visible";
}

function uploadGif() 
{
    video.style.display = "none";  
    ShowGif.style.display = "none";
    uploading.style.display = "block";
    endClass.style.visibility = "hidden";

    fetch(endPointUpload, {
        method: 'POST', // or 'PUT'
        body: form, // data can be `string` or {object}!
    })
    .then(res => res.json())
    .then(datar => {
        // you can access your data heres
        urlgif = `http://api.giphy.com/v1/gifs?api_key=${apiKey}&ids=${datar.data.id}`;

        fetch(urlgif).then(res => res.json())
        .then(data =>
        {
            video.style.display = "block";
            uploading.style.display = "none";
            let urlGifCreated = `https://media.giphy.com/media/${data.data[0].id}/giphy.gif`;
            let count = 0;
            while (localStorage.getItem('gif' + count)) { count++; }
            localStorage.setItem('gif' + count, urlGifCreated);
            
            div = document.getElementById('misGifs');
            div.innerHTML += `<img class="ShowGif" src="${urlGifCreated}" alt="GifCreate">`;
        }); 
    })
    .catch(console.error);
}

function InfoCaptureCancel() {
    capture.style.display = "none";
    InfoCapture.style.display = "none";
}

function InfoCaptureGoVideo() {
    capture.style.display = "block";
    InfoCapture.style.display = "none";
}

function StartJS() {
    timer.style.display = "none";
    capture.style.display = "none";
    ShowGif.style.display = "none";
    uploading.style.display = "none";
    InfoCapture.style.display = "block";
    endClass.style.visibility = "hidden";
    cancelBtn.style.visibility = "hidden";
    stopClass.style.visibility = "hidden";
    startClass.style.visibility = "visible";

    let count = 0;
    div = document.getElementById('misGifs');

    while (localStorage.getItem('gif' + count)) 
    {
        let urlGf = localStorage.getItem('gif' + count); 
        div.innerHTML += `<img id="ShowGif" src="${urlGf}" alt="GifCreate">`;
        count++;
    }
}
StartJS();