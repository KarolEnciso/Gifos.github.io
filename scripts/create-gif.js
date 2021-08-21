/*
? click en COMENZAR --> 
	* Se "activa" el STEP 1 (stepOne cambia de estilos) ----> LISTO
	* Cambia el titulo(newgifTitle) ----> LISTO
	* Cambia el texto (newgifText) ----> LISTO
	* Pide el permiso, sale el cartel emergente ----> LISTO
	* Desaparece el botón ($buttons). ----> LISTO
	* Una vez que acepta, aparece el botón GRABAR  ----> LISTO
		* Cambia STEP 2 (stepOne cambia de estilos ----> LISTO
		* Aparece la previsualización del video ----> LISTO

? click en GRABAR
	* Aparece botón FINALIZAR ----> LISTO
	* Aparece el timer ----> LISTO
	* Empieza a grabar ----> LISTO

? click en FINALIZAR
	* Cambia a botón SUBIR GIFO ----> LISTO
	* Cambia a STEP 3 ----> LISTO
	* Apaprece REPETIR CAPTURA ----> LISTO
	* Aparece el gif YA GRABADO ----> LISTO

? click en SUBIR GIFO
	* SUBIENDO GIFO 
		* función que suba el gif y cambie esto? :
		Aparece SOBRE EL VIDEO el overlay ----> LISTO

	* GIFO SUBIDO CON ESITO 
		* 1. Cambia el texto e ícono ----> LISTO
		* 2. Se envía a MIS GIFOS----> LISTO
		* 3. Al overlay le aparecen los botones.----> LISTO

? click en REPETIR CAPTURA
	* Vuelve al estado 2? Grabar? ----> LISTO
	* Acá habría que resetear textos del bottón a comenzar ----> LISTO

*/
recordBtn.style.display = "none";//Ajustado
endBtn.style.display = "none";//Ajustado
uploadBtn.style.display = "none";//Ajustado
cover.style.display = "none";//Ajustado

let recorder;
let gifdown;
let form = new FormData();
let newGifArray = []; //Array

// seteo del timer
let timer;
let hours = '00';
let minutes = '00';
let seconds = '00';

// TODO función que ejecuta la cámara y se setea la API
const getStreamAndRecord = async () => {
	newgifTitle.innerHTML = `¿Nos das acceso <br> a tu cámara?`;//AJustado
	newgifText.innerHTML = `El acceso a tu camara será válido sólo <br> por el tiempo en el que estés creando el GIFO.`;//ajustado
	startBtn.style.visibility = 'hidden';//Ajustado
	stepOne.classList.add('step-active');//ajustado

	await navigator.mediaDevices
		.getUserMedia({
			audio: false,
			video: {
				height: { max: 480 }
			}
		})
		.then((mediaStreamObj) => {
			newgifTitle.classList.add('hidden');//Ajustado
			newgifText.classList.add('hidden');//Ajustado
			stepOne.classList.remove('step-active');
			stepTwo.classList.add('step-active');//ajustado
			startBtn.style.display = 'none';//ajustado
			recordBtn.style.display = 'block';//ajustado
			newgifVideo.classList.remove('hidden');//Ajustado
			newgifVideo.srcObject = mediaStreamObj;//Ajustado
			newgifVideo.play();//Ajustado

			recorder = RecordRTC(mediaStreamObj, {
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

// Cuando clickea comenzar, se ejecuta la cámara y se setea la API
startBtn.addEventListener('click', getStreamAndRecord);//ajustado

// TODO función para empezar
const createGifo = () => {
	console.log('está grabando');
	recordBtn.style.display = 'none';//ajustado
	endBtn.style.display = 'block';//Ajustado
	counterTime.classList.remove('hidden');//Ajustado
	newShot.classList.add('hidden');//Ajustado
	recorder.startRecording();
	timer = setInterval(timerActive, 1000);
};

recordBtn.addEventListener('click', createGifo);//ajustado

// TODO función para parar la grabación
const stopCreatingGif = () => {
	newgifVideo.classList.add('hidden');//Ajustado
	recordedVideo.classList.remove('hidden');//AJustadp
	recorder.stopRecording(() => {
		gifdown = recorder.getBlob();
		recordedVideo.src = URL.createObjectURL(gifdown);//Ajustado

		form.append('file', recorder.getBlob(), 'myGif.gif');
		console.log(form.get('file'));
	});

	endBtn.style.display = 'none';//ajustado
	uploadBtn.style.display = 'block';//ajustado
	counterTime.classList.add('hidden');//Ajustado
	newShot.classList.remove('hidden');//Ajustado

	// acá debería limpiar y volver a setear el cronómetro
	clearInterval(timer);
	hours = '00';
	minutes = '00';
	seconds = '00';
	counterTime.innerText = `${hours}:${minutes}:${seconds}`;//Ajustado
};

endBtn.addEventListener('click', stopCreatingGif);//ajustado

// TODO función para subir a Giphy y almacenar el gif en Mis gifos
const uploeadCreatedGif = async () => {
	cover.style.display = 'flex';//Ajustado
	stepTwo.classList.remove('step-active');//ajustado
	stepThree.classList.add('step-active');//ajustado
	newShot.classList.add('hidden');//Ajustado
	uploadBtn.style.visibility = 'hidden';//Ajustado

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
				buttonsMyGif.classList.add('overlay__buttons');
				buttonsMyGif.innerHTML = `<div class="btns downloadOverlay" onclick="downloadCreatedGif('${myGifoId}')"></div> 
				<div class="btns linkOverlay" onclick="showMisGifosCnt(event)"></div>`;
				cover.appendChild(buttonsMyGif);//Ajustado
	
				newGifArray.push(myGifoId);
				console.log(newGifArray);
	
				localStorage.setItem('mis-gifos', JSON.stringify(newGifArray));
			})
	} catch (err) {
		console.log(err);
	}
};

uploadBtn.addEventListener('click', uploeadCreatedGif);//ajustado

// TODO función para repetir
const repeatRecordingGif = (event) => {
	event.preventDefault();
	recorder.clearRecordedData();
	stepTwo.classList.add('step-active');//ajustado
	newShot.classList.add('hidden');//Ajustado
	recordBtn.style.display = 'block';//ajustado
	uploadBtn.style.display = 'none';//ajustado
	newgifVideo.classList.remove('hidden');//Ajustado
	recordedVideo.classList.add('hidden');//Ajustado

	navigator.mediaDevices
		.getUserMedia({
			audio: false,
			video: {
				height: { max: 480 }
			}
		})
		.then((mediaStreamObj) => {
			newgifVideo.srcObject = mediaStreamObj;//Ajustado
			newgifVideo.play();//Ajustado

			recorder = RecordRTC(mediaStreamObj, {
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
newShot.addEventListener('click', repeatRecordingGif);//Ajustado

// TODO función para descargar el gif creado
const downloadCreatedGif = async (myGifId) => {
	let gifdown = await fetch(
		`https://media.giphy.com/media/${myGifId}/giphy.gif`
	).then((img) => img.blob());
	invokeSaveAsDialog(gifdown, 'My-Gif.gif');
};

// TODO función para el timer
function timerActive() {
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
