recordBtn.style.display = "none";
endBtn.style.display = "none";
uploadBtn.style.display = "none";
cover.style.display = "none";
let recorder;
let blob;
let form = new FormData();
let newGifArray = [];
let timer;
let hours = "00";
let minutes = "00";
let seconds = "00";

//Execute stream y record
const executeCam = async () => {
	newgifTitle.innerHTML = `¿Nos das acceso <br> a tu cámara?`;
	newgifText.innerHTML = `El acceso a tu camara será válido sólo <br> por el tiempo en el que estés creando el GIFO.`;
	startBtn.style.visibility = "hidden";
	stepOne.classList.add("step-active");

	await navigator.mediaDevices
		.getUserMedia({
			audio: false,
			video: {
				height: { max: 480 }
			}
		})
		.then((streamObject) => {
			newgifTitle.classList.add("hidden");
			newgifText.classList.add("hidden");
			stepOne.classList.remove("step-active");
			stepTwo.classList.add("step-active");
			startBtn.style.display = "none";
			recordBtn.style.display = "block";
			newgifVideo.classList.remove("hidden");
			newgifVideo.srcObject = streamObject;
			newgifVideo.play();

			recorder = RecordRTC(streamObject, {
				type: 'gif',
				frameRate: 1,
				quality: 10,
				width: 360,
				hidden: 240,
				onGifRecordingStarted: function () {
					console.log("started");
				}
			});
		})
		.catch((err) => console.log(err));
};
startBtn.addEventListener("click", executeCam);

//Crear el gifo
const newGifo = () => {
	console.log("Recording");
	recordBtn.style.display = "none";
	endBtn.style.display = "block";
	counterTime.classList.remove("hidden");
	newShot.classList.add("hidden");
	recorder.startRecording();
	timer = setInterval(timerWorking, 1000);
};
recordBtn.addEventListener("click", newGifo);


//Grabar gifo
const stopNewGif = () => {
	newgifVideo.classList.add("hidden");
	recordedVideo.classList.remove("hidden");
	recorder.stopRecording(() => {
		blob = recorder.getBlob();
		recordedVideo.src = URL.createObjectURL(blob);
		form.append('file', recorder.getBlob(), 'myGif.gif');
		console.log(form.get('file'));
	});

	endBtn.style.display = "none";
	uploadBtn.style.display = "block";
	counterTime.classList.add("hidden");
	newShot.classList.remove("hidden");

	clearInterval(timer);
	hours = "00";
	minutes = "00";
	seconds = "00";
	counterTime.innerText = `${hours}:${minutes}:${seconds}`;
};
endBtn.addEventListener("click", stopNewGif);


//Subir gifo y ponerlo en mis gifos
const uploadNewGif = async () => {
	cover.style.display = 'flex';
	stepTwo.classList.remove('step-active');
	stepThree.classList.add('step-active');
	newShot.classList.add("hidden");
	uploadBtn.style.visibility = "hidden";

	try {
		await fetch(`${uploadGifUrl}?api_key=${apiKey}`, {
			method: 'POST',
			body: form,
		})
			.then((response) => response.json())
			.then((myGif) => {
	
				let myGifoId = myGif.data.id
				console.log(myGif.data.id);
				coverIcon.src = './assets/check.svg';
				coverText.innerHTML = 'GIFO subido con éxito';
	
				let buttonsMyGif = document.createElement('div');
				buttonsMyGif.classList.add('cover-btns');
				buttonsMyGif.innerHTML = `<div class="btns cover-download" onclick="downloadNewGif('${myGifoId}')"></div> 
				<div class="btns cover-link" onclick="showMisGifosCnt()"></div>`;
				cover.appendChild(buttonsMyGif);
				newGifArray.push(myGifoId);
				console.log(newGifArray);
				localStorage.setItem('mis-gifos', JSON.stringify(newGifArray));
			})
	} catch (err) {
		console.log(err);
	}
};
uploadBtn.addEventListener("click", uploadNewGif);


//Repetir captura
const repeatShot = () => {
	recorder.clearRecordedData();
	stepTwo.classList.add('step-active');
	newShot.classList.add("hidden");
	recordBtn.style.display = 'block';
	uploadBtn.style.display = "none";
	newgifVideo.classList.remove("hidden");
	recordedVideo.classList.add("hidden");

	navigator.mediaDevices
		.getUserMedia({
			audio: false,
			video: {
				height: { max: 480 }
			}
		})
		.then((streamObject) => {
			newgifVideo.srcObject = streamObject;
			newgifVideo.play();

			recorder = RecordRTC(streamObject, {
				type: 'gif',
				frameRate: 1,
				quality: 10,
				width: 360,
				hidden: 240,
				onGifRecordingStarted: function () {
					console.log('started');
				}
			});
		})
		.catch((err) => console.log(err));
};
newShot.addEventListener("click", repeatShot);

//Descargar new gif
const downloadNewGif = async (myGifId) => {
	let blob = await fetch(
		`https://media.giphy.com/media/${myGifId}/giphy.gif`
	).then((img) => img.blob());
	invokeSaveAsDialog(blob, 'My-Gif.gif');
};

//Timer
function timerWorking() {
	seconds++;
	if (seconds < 10) seconds = `0` + seconds;
	if (seconds > 59) {
		seconds = `00`;
		minutes ++;
		if (minutes < 10) minutes = `0` + minutes;
	}
	if (minutes > 59) {
		minutes = `00`;
		hours++;
		if (hours < 10) hours = `0` + hours;
	}
	counterTime.innerHTML = `${hours}:${minutes}:${seconds}`;
}
