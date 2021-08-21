recordBtn.style.display = "none";//Ajustado
endBtn.style.display = "none";//Ajustado
uploadBtn.style.display = "none";//Ajustado
cover.style.display = "none";//Ajustado

let recorder;
let blob;
let form = new FormData();
let newGifArray = []; //Array
let timer;
let hours = "00";
let minutes = "00";
let seconds = "00";

//Execute stream y record
const executeCam = async () => { //funtion
	newgifTitle.innerHTML = `¿Nos das acceso <br> a tu cámara?`;//AJustado
	newgifText.innerHTML = `El acceso a tu camara será válido sólo <br> por el tiempo en el que estés creando el GIFO.`;//ajustado
	startBtn.style.visibility = "hidden";//Ajustado
	stepOne.classList.add("step-active");//ajustado

	await navigator.mediaDevices
		.getUserMedia({
			audio: false,
			video: {
				height: { max: 480 }
			}
		})
		.then((streamObject) => { //object
			newgifTitle.classList.add("hidden");//Ajustado
			newgifText.classList.add("hidden");//Ajustado
			stepOne.classList.remove("step-active");
			stepTwo.classList.add("step-active");//ajustado
			startBtn.style.display = "none";//ajustado
			recordBtn.style.display = "block";//ajustado
			newgifVideo.classList.remove("hidden");//Ajustado
			newgifVideo.srcObject = streamObject;//Ajustado //object
			newgifVideo.play();//Ajustado

			recorder = RecordRTC(streamObject, { //object
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
startBtn.addEventListener("click", executeCam);//ajustado //funtion

//Crear el gifo
const newGifo = () => { //funtion
	console.log("Recording");
	recordBtn.style.display = "none";//ajustado
	endBtn.style.display = "block";//Ajustado
	counterTime.classList.remove("hidden");//Ajustado
	newShot.classList.add("hidden");//Ajustado
	recorder.startRecording();
	timer = setInterval(timerWorking, 1000);
};
recordBtn.addEventListener("click", newGifo);//ajustado //funtion


//Grabar gifo
const stopNewGif = () => { //funtion
	newgifVideo.classList.add("hidden");//Ajustado
	recordedVideo.classList.remove("hidden");//AJustadp
	recorder.stopRecording(() => {
		blob = recorder.getBlob();
		recordedVideo.src = URL.createObjectURL(blob);//Ajustado
		form.append('file', recorder.getBlob(), 'myGif.gif');
		console.log(form.get('file'));
	});

	endBtn.style.display = "none";//ajustado
	uploadBtn.style.display = "block";//ajustado
	counterTime.classList.add("hidden");//Ajustado
	newShot.classList.remove("hidden");//Ajustado

	clearInterval(timer);
	hours = "00";
	minutes = "00";
	seconds = "00";
	counterTime.innerText = `${hours}:${minutes}:${seconds}`;//Ajustado
};
endBtn.addEventListener("click", stopNewGif);//ajustado //funtion


//Subir gifo y ponerlo en mis gifos
const uploadNewGif = async () => { //funtion
	cover.style.display = 'flex';//Ajustado
	stepTwo.classList.remove('step-active');//ajustado
	stepThree.classList.add('step-active');//ajustado
	newShot.classList.add("hidden");//Ajustado
	uploadBtn.style.visibility = "hidden";//Ajustado

	try {
		await fetch(`${uploadGifUrl}?api_key=${apiKey}`, { //url
			method: 'POST',
			body: form,
		})
			.then((response) => response.json())
			.then((myGif) => {
	
				let myGifoId = myGif.data.id
				console.log(myGif.data.id);
				coverIcon.src = './assets/check.svg';//Ajustado
				coverText.innerHTML = 'GIFO subido con éxito';//Ajustado
	
				let buttonsMyGif = document.createElement('div');
				buttonsMyGif.classList.add('cover-btns');
				buttonsMyGif.innerHTML = `<div class="btns cover-download" onclick="downloadNewGif('${myGifoId}')"></div> 
				<div class="btns cover-link" onclick="showMisGifosCnt()"></div>`;
				cover.appendChild(buttonsMyGif);//Ajustado
				newGifArray.push(myGifoId);
				console.log(newGifArray);
				localStorage.setItem('mis-gifos', JSON.stringify(newGifArray));
			})
	} catch (err) {
		console.log(err);
	}
};
uploadBtn.addEventListener("click", uploadNewGif);//ajustado //funtion


//Repetir captura
const repeatShot = () => { //funtion
	recorder.clearRecordedData();
	stepTwo.classList.add('step-active');//ajustado
	newShot.classList.add("hidden");//Ajustado
	recordBtn.style.display = 'block';//ajustado
	uploadBtn.style.display = "none";//ajustado
	newgifVideo.classList.remove("hidden");//Ajustado
	recordedVideo.classList.add("hidden");//Ajustado

	navigator.mediaDevices
		.getUserMedia({
			audio: false,
			video: {
				height: { max: 480 }
			}
		})
		.then((streamObject) => { //object
			newgifVideo.srcObject = streamObject;//Ajustado //object
			newgifVideo.play();//Ajustado

			recorder = RecordRTC(streamObject, { //object
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
newShot.addEventListener("click", repeatShot);//Ajustado //funtion


//Descargar new gif
const downloadNewGif = async (myGifId) => { //funtion
	let blob = await fetch(
		`https://media.giphy.com/media/${myGifId}/giphy.gif`
	).then((img) => img.blob());
	invokeSaveAsDialog(blob, 'My-Gif.gif');
};


//Timer
function timerWorking() { //funtion
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
	counterTime.innerHTML = `${hours}:${minutes}:${seconds}`;//Ajustado
}
