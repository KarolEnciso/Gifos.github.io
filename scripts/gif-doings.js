//Poner en favoritos
let favsGifs = [];
const addFavsGif = (gif, username, title) => {
	let gifObject = {
		username: username,
		title: title,
		gif: gif
	};

	favsGifs.push(gifObject);
	localStorage.setItem('favs-gifs', JSON.stringify(favsGifs));
	showFavsGifs();
};

//Muestra el container de los favs gifs
const showFavsCnt = () => {
	mainCnt.classList.add("hidden");
	misGifosCnt.classList.add("hidden");
	newGifSection.classList.add("hidden");
	favsCnt.classList.remove("hidden");
	window.scrollTo({ top: 0, behavior: "smooth" });
	showFavsGifs();

	if (favsGifs == 0 || favsGifs == null) {
		favsGapCnt.classList.remove("hidden");
		favsCardCnt.classList.add("hidden");
	} else {
		favsGapCnt.classList.add("hidden");
		favsCardCnt.classList.remove("hidden");
	}
};


//Muestra los favs gifs 
const showFavsGifs = () => {
	favsCardCnt.innerHTML = '';
	favsGifs = JSON.parse(localStorage.getItem('favs-gifs'));

	if (favsGifs == null) {
		favsGifs = [];
	} else {
		for (let i = 0; i < favsGifs.length; i++) {
			const gifCnt = document.createElement('div');
			gifCnt.classList.add('gif-cnt');
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
			favsCardCnt.appendChild(gifCnt);
		}
	}
};
menuFavs.addEventListener("click", showFavsCnt);


//Muestra la sección de mis gifos
const showMisGifosCnt = () => {
	misGifosCnt.classList.remove("hidden");
	mainCnt.classList.add("hidden");
	favsCnt.classList.add("hidden");
	newGifSection.classList.add("hidden");
	trendingGifsCnt.classList.remove("hidden");
	window.scrollTo({ top: 0, behavior: "smooth" });
	showMisGifos();

	if (newGifArray == 0 || newGifArray == null) {
		misGifosGapCnt.classList.remove("hidden");
		misGifosCardCnt.classList.add("hidden");
	} else {
		misGifosGapCnt.classList.add("hidden");
		misGifosCardCnt.classList.remove("hidden");
	}
};
menuGifos.addEventListener("click", showMisGifosCnt);

//Muestra los gifs en mis gifos
const showMisGifos = () => {
	misGifosCardCnt.innerHTML = '';
	newGifArray = JSON.parse(localStorage.getItem('mis-gifos'));
	console.log(newGifArray);

	if (newGifArray == null) {
		newGifArray = [];
	} else {
		for (let i = 0; i < newGifArray.length; i++) {
			try {
				fetch(`${getGifByIdUrl}?ids=${newGifArray[i]}&api_key=${apiKey}`)
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
					misGifosCardCnt.appendChild(gifCnt);
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
	let blob = await fetch(url).then((img) => img.blob());
	invokeSaveAsDialog(blob, title + '.gif');
};

//Enlarge gif 
const enlargeGif = (gif, username, title) => {
	enlargeGifCnt.classList.remove("hidden");
	enlargeGifCnt.classList.add('enlarged-gif');
	enlargeGifCnt.innerHTML = '';
	const enlargeCnt = document.createElement('div');
	enlargeCnt.classList.add('enlarge-gif-cnt');
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
	enlargeGifCnt.appendChild(enlargeCnt);
};

//Enlarge fav gif
const enlargeFavGif = (gif, username, title) => {
	enlargeGifCnt.classList.remove("hidden");
	enlargeGifCnt.classList.add('enlarged-gif');
	enlargeGifCnt.innerHTML = '';
	const enlargeCnt = document.createElement('div');
	enlargeCnt.classList.add('enlarge-gif-cnt');
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
	enlargeGifCnt.appendChild(enlargeCnt);
};

const enlargeClose = () => {
	enlargeGifCnt.classList.add("hidden");
	enlargeGifCnt.classList.remove('enlarged-gif');
};


//Remove de favs
const removeGif = (gif) => {
	let favsChanged = JSON.parse(localStorage.getItem('favs-gifs'));
	console.log(favsChanged);
	for (let i = 0; i < favsChanged.length; i++) {
		if (favsChanged[i].gif === gif) {
			favsChanged.splice(i, 1);
			localStorage.setItem(
				'favs-gifs', 
				JSON.stringify(favsChanged)
			);
			showFavsCnt();
			enlargeClose();
		}
	}
};

//Remove de mis gifos
const removeMyGifos = (gif) => {
	let miGifosChanged = JSON.parse(localStorage.getItem('mis-gifos'));
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
