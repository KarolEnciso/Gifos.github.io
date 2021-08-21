//Poner en favoritos
let favsGifs = [];//variable
const addFavsGif = (gif, username, title) => { //funtion
	let gifObject = { //object
		username: username,
		title: title,
		gif: gif
	};

	favsGifs.push(gifObject); //variable //object
	localStorage.setItem('favs-gifs', JSON.stringify(favsGifs)); //variable //class
	showFavsGifs();
};

//Muestra el container de los favs gifs
const showFavsCnt = () => { //funtion
	mainCnt.classList.add("hidden");//ajustado
	misGifosCnt.classList.add("hidden");//Ajustado
	newGifSection.classList.add("hidden");//AJustado
	favsCnt.classList.remove("hidden");//Ajustado
	window.scrollTo({ top: 0, behavior: "smooth" });
	showFavsGifs();

	if (favsGifs == 0 || favsGifs == null) { //variable
		favsGapCnt.classList.remove("hidden"); //Ajustado
		favsCardCnt.classList.add("hidden");//Ajustado
	} else {
		favsGapCnt.classList.add("hidden");//Ajustado
		favsCardCnt.classList.remove("hidden");//Ajustado
	}
};


//Muestra los favs gifs 
const showFavsGifs = () => { //funtion
	favsCardCnt.innerHTML = '';//Ajustado
	favsGifs = JSON.parse(localStorage.getItem('favs-gifs')); //variable //class

	if (favsGifs == null) { //variable
		favsGifs = []; //variable
	} else {
		for (let i = 0; i < favsGifs.length; i++) { //variable
			const gifCnt = document.createElement('div'); //variable
			gifCnt.classList.add('gif-cnt'); //variable
			gifCnt.innerHTML = ` 
			<img class="gif-img" onclick="enlargeFavGif('${favsGifs[i].gif}','${favsGifs[i].username}','${favsGifs[i].title}')" src="${favsGifs[i].gif}" alt="${favsGifs[i].title}">
			<div class="gif-doing">
				<div class="gif-doing-btn">
					<div class="dobtn remove-do" onclick="removeGif('${favsGifs[i].gif}')"></div>
					<div class="dobtn download-do" onclick="downloadGif('${favsGifs[i].gif}','${favsGifs[i].title}')"></div>
					<div class="dobtn enlarge-do" onclick="enlargeFavGif('${favsGifs[i].gif}','${favsGifs[i].username}','${favsGifs[i].title}')"></div>
				</div>
				<div class="gif-data">
					<p class="gif-data-user">${favsGifs[i].username}</p>
					<p class="gif-data-title">${favsGifs[i].title}</p>
				</div>
			</div>
			`;
			favsCardCnt.appendChild(gifCnt);//Ajustado
		}
	}
};
menuFavs.addEventListener("click", showFavsCnt);//Ajustada variable


//Muestra la sección de mis gifos
const showMisGifosCnt = () => { //function
	misGifosCnt.classList.remove("hidden");//Ajustado
	mainCnt.classList.add("hidden");//Ajustado
	favsCnt.classList.add("hidden");//Ajustado
	newGifSection.classList.add("hidden");//Ajustado
	trendingGifsCnt.classList.remove("hidden");//Ajustado
	window.scrollTo({ top: 0, behavior: "smooth" });
	showMisGifos();

	if (newGifArray == 0 || newGifArray == null) { //array
		misGifosGapCnt.classList.remove("hidden");//Ajustado
		misGifosCardCnt.classList.add("hidden");//Ajustado
	} else {
		misGifosGapCnt.classList.add("hidden");//Ajustado
		misGifosCardCnt.classList.remove("hidden");//Ajustado
	}
};
menuGifos.addEventListener("click", showMisGifosCnt);//Ajustada variable

//Muestra los gifs en mis gifos
const showMisGifos = () => { //funtion
	misGifosCardCnt.innerHTML = '';//ajustado
	newGifArray = JSON.parse(localStorage.getItem('mis-gifos')); //array
	console.log(newGifArray);

	if (newGifArray == null) {
		newGifArray = [];
	} else {
		for (let i = 0; i < newGifArray.length; i++) {
			try {
				fetch(`${getGifByIdUrl}?ids=${newGifArray[i]}&api_key=${apiKey}`) //url
				.then((response) => response.json())
				.then((newGifCreated) => {
					console.log(newGifCreated);
					console.log(typeof newGifCreated.data[0].id);

					const gifCnt = document.createElement('div');
					gifCnt.classList.add('gif-cnt');
					gifCnt.innerHTML = `
					<img class="gif-img" src="${newGifCreated.data[0].images.original.url}" alt="Gif Creado por el usuario">
					<div class="gif-doing">
						<div class="gif-doing-btn">
							<div class="dobtn remove-do" onclick="removeMyGifos('${newGifCreated.data[0].id}')"></div>
							<div class="dobtn download-do" onclick="downloadGif('${newGifCreated.data[0].images.original.url}','Gif')"></div>
							<div class="dobtn enlarge-do" onclick="enlargeFavGif('${newGifCreated.data[0].images.original.url}','User','Gif')"></div>
						</div>
						<div class="gif-data">
							<p class="gif-data-user">User</p>
							<p class="gif-data-title">Gif</p>
						</div>
					</div>
					`;
					misGifosCardCnt.appendChild(gifCnt);//Ajustado
				})
			} catch (err) {
				console.log(err);
			}
		}
	}
};


//Funciones de los gifs
//Download gif
const downloadGif = async (url, title) => {
	let blob = await fetch(url).then((img) => img.blob()); //variable
	invokeSaveAsDialog(blob, title + '.gif'); //variable
};

//Enlarge gif 
const enlargeGif = (gif, username, title) => { //const ajustado
	enlargeGifCnt.classList.remove("hidden"); //Ajustado
	enlargeGifCnt.classList.add('enlarged-gif');//Ajustado
	enlargeGifCnt.innerHTML = '';//Ajustado
	const enlargeCnt = document.createElement('div'); //variable
	enlargeCnt.classList.add('enlarge-gif-cnt'); //variable
	enlargeCnt.innerHTML = ` 
	<div class="close-btn" onclick="enlargeClose()"></div>
	<div>
		<img class="large-gif" src="${gif}" alt="${title}">
	</div>

	<div class="enlarge-gifs-doing">
		<div class="gif-data">
			<p class="gif-data-user">${username}</p>
			<p class="gif-data-title">${title}</p>
		</div>
		<div class="gif-btn-doing">
			<div class="largegif-btn-do largegif-favs" onclick="addFavsGif('${gif}', '${username}', '${title}')"></div>
			<div class="largegif-btn-do largegif-download" onclick="downloadGif('${gif}','${title}')"></div>
			</div>
	</div>`;
	enlargeGifCnt.appendChild(enlargeCnt);//AJustado //variable
};

//Enlarge fav gif
const enlargeFavGif = (gif, username, title) => { //funtion
	enlargeGifCnt.classList.remove("hidden");//Ajustado
	enlargeGifCnt.classList.add('enlarged-gif');//Ajustado
	enlargeGifCnt.innerHTML = '';//Ajustado
	const enlargeCnt = document.createElement('div'); //variable
	enlargeCnt.classList.add('enlarge-gif-cnt');//variable
	enlargeCnt.innerHTML = `
	<div class="close-btn" onclick="enlargeClose()"></div>

	<div>
		<img class="large-gif" src="${gif}" alt="${title}">
	</div>

	<div class="enlarge-gifs-doing">
		<div class="gif-data">
			<p class="gif-data-user">${username}</p>
			<p class="gif-data-title">${title}</p>
		</div>
		<div class="gif-btn-doing">
			<div class="largegif-btn-do largegif-remove" onclick="removeGif('${gif}')"></div>
			<div class="largegif-btn-do largegif-download" onclick="downloadGif('${gif}','${title}')"></div>
			</div>
	</div>`;
	enlargeGifCnt.appendChild(enlargeCnt);//Ajustado
};

const enlargeClose = () => { //funcion
	enlargeGifCnt.classList.add("hidden");//Ajustado
	enlargeGifCnt.classList.remove('enlarged-gif');//Ajustado
};


//Remove de favs
const removeGif = (gif) => { //funtion
	let favsChanged = JSON.parse(localStorage.getItem('favs-gifs')); //class //variable
	console.log(favsChanged);
	for (let i = 0; i < favsChanged.length; i++) {
		if (favsChanged[i].gif === gif) {
			favsChanged.splice(i, 1);
			localStorage.setItem(
				'favs-gifs', 
				JSON.stringify(favsChanged)
			); //class
			showFavsCnt();
			enlargeClose();
		}
	}
};

//Remove de mis gifos
const removeMyGifos = (gif) => { //funtion
	// event.preventDefault();
	let miGifosChanged = JSON.parse(localStorage.getItem('mis-gifos')); //variable
	console.log(miGifosChanged);
	for (let i = 0; i < miGifosChanged.length; i++) {
		if (miGifosChanged[i] == gif) {
			miGifosChanged.splice(i, 1);
			localStorage.setItem('mis-gifos', JSON.stringify(miGifosChanged));
			showMisGifosCnt();
			enlargeClose();
		}
	}
};
