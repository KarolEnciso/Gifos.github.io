//Búsqueda de los gifs
let offsetCount = 0; //variable
const getSearch = async (search) => {
	cleanSuggestions();
	searchInput.value = search;//Ajustado
	navbarInput.value = search;//Ajustado
	outcomeTitle.innerHTML = search;//Ajustado
	
	if (offsetCount === 0) { //variable
		outcomeCardCnt.innerHTML = ''; //Ajustado
	}

	//Llamado de la búsqueda
	await fetch(`${searchUrl}?api_key=${apiKey}&q=${search}&offset=${offsetCount}&limit=12&rating=g`) //url //variable
		.then((response) => response.json())
		.then((results) => {
			if (results.data == 0) {
				showErrorSearch();//funtion
			} else {
				showSearchGif(results); //funtion
			}
		})
		.catch((err) => console.log(err));
};

//Muestra el gif
const showSearchGif = (results) => { //funtion
	outcomeCnt.classList.remove("hidden");//Ajustado
	outcomeSeeMoreBtn.classList.remove("hidden"); //Ajustado

	if (offsetCount === 0) { //variable
		window.scrollTo({ top: 600, behavior: "smooth" });
	}

	if (results.data.length < 12) {
		outcomeSeeMoreBtn.style.display = "none";//Ajustado
	}

	for (let i = 0; i < results.data.length; i++) {
		const gifCnt = document.createElement('div');
		gifCnt.classList.add('gif-cnt');
		gifCnt.innerHTML = ` 
		<img class="gif-img" onclick="enlargeGif('${results.data[i].images.original.url}','${results.data[i].username}','${results.data[i].title}')" src="${results.data[i].images.original.url}" alt="${results.data[i].title}">
	
		<div class="gif-doing">
			<div class="gif-doing-btn">
				<div class="dobtn fav-do" onclick="addFavsGif('${results.data[i].images.original.url}','${results.data[i].username}','${results.data[i].title}')"></div>
				<div class="dobtn download-do" onclick="downloadGif('${results.data[i].images.original.url}','${results.data[i].title}')"></div>
				<div class="dobtn enlarge-do" onclick="enlargeGif('${results.data[i].images.original.url}','${results.data[i].username}','${results.data[i].title}')"></div>
			</div>
			<div class="gif-data">
				<p class="gif-data-user">${results.data[i].username}</p>
				<p class="gif-data-title">${results.data[i].title}</p>
			</div>
		</div>
		`;
		outcomeCardCnt.appendChild(gifCnt);//Ajustado
	}
};

//Muestra cuando la búsqueda no aparece
const showErrorSearch = () => { //funtion
	outcomeCnt.classList.remove("hidden");//Ajustado
	noOutcomeCnt.classList.remove("hidden");//Ajustado
	noOutcomeCnt.innerHTML = ` 
	<div class="error-cnt">
	<img class="error-search" src="./assets/icon-busqueda-sin-resultado.svg" alt="Imagen ilustrativa de una busqueda sin resultado" >
	<h4 class="error-search-text">Intenta con otra búsqueda.</h4>
	</div>
	`;//Ajustada variable (noOutcomeCnt)
	outcomeSeeMoreBtn.style.display = "none";//Ajustado
};

//Boton de ver más
const seeMoreBtn = (e) => { //funtion
	e.preventDefault();
	offsetCount += 12; //variable
	if (searchInput.value) { //Ajustado
		getSearch(searchInput.value);//Ajustado variable
	} else {
		getSearch(navbarInput.value);
	}
};

//Sugerencias de búsqueda
const getSuggestions = async () => { //funtion
	cleanSuggestions();
	suggestList.classList.remove("hidden");//Ajustado
	const userInput = searchInput.value;//Ajustado variable

	if (userInput.length >= 1) {

		try {
			await fetch(`${autocompleteUrl}?api_key=${apiKey}&q=${userInput}&limit=4&rating=g`) //url
			.then((response) => response.json())
			.then((suggestions) => {
				showSuggestions(suggestions);
			})
		} catch (err) {
			console.log(err)
		}
	}
};

//Muestra la sugerencia de búsqueda
const showSuggestions = (suggestions) => { //funtion
	for (let i = 0; i < suggestions.data.length; i++) {
		const suggestItem = document.createElement('li');
		suggestItem.classList.add("suggest-items");
		suggestItem.innerHTML = `
		<img class="suggest-search-btn" id="" src="./assets/icon-search-gray.svg" alt="Lupa de búsqueda" onclick="getSearch('${suggestions.data[i].name}')">
		<p class="suggest-search-text" onclick="getSearch('${suggestions.data[i].name}')">${suggestions.data[i].name}</p>`;
		suggestList.appendChild(suggestItem);//Ajustado
	}
};

//Limpia el contenedor y lo devuelve al incial 
const cleanResults = () => { //funtion
	outcomeCnt.classList.add("hidden");//Ajustado
	noOutcomeCnt.classList.add("hidden");//Ajustado
	outcomeSeeMoreBtn.style.display = "block";//Ajustado
	outcomeCardCnt.innerHTML = '';//Ajustado
	navbarInput.placeholder = "Busca GIFOS y más";//Ajustado
	searchInput.placeholder = "Busca GIFOS y más"; //Ajustado
};

// Limpia las sugerencias de búsqueda
const cleanSuggestions = () => { //funtion
	suggestList.classList.add("hidden");//Ajustado
	suggestList.innerHTML = '';//Ajustado
};

//Buscador activo
const activeBar = () => { //funtion
	searchBtn .classList.remove("hidden"); //Ajustado
	searchClose.classList.remove("hidden");//Ajustado
	searchIcon.classList.add("hidden");//Ajustado
	suggestionsCnt.classList.remove("hidden");//Ajustado
	searchCnt.classList.add("searchActive");//Ajustado variable
	suggestionsCnt.classList.add("searchActiveContainer");//Ajustado
};

const activeNavbar = () => {
	navbarBtn.classList.remove("hidden"); //Ajustado
	navbarClose.classList.remove("hidden");//Ajustado
	navbarIcon.classList.add("hidden");//Ajustado
};


//Buscador inactivo
const setInactiveSearchBar = () => {
	navbarInput.value = '';//Ajustado
	searchInput.value = '';//Ajustado
	cleanResults();
	cleanSuggestions();
	suggestionsCnt.classList.add("hidden");//Ajustado
	searchIcon.classList.remove("hidden");//ajustado
	searchClose.classList.add("hidden");
	searchBtn .classList.add("hidden");//Ajustado
	searchCnt.classList.remove("searchActive");//Ajustado variable
};

const inactiveNavbar = () => {
	navbarInput.value = '';//Ajustado
	searchInput.value = '';//Ajustado
	cleanResults();
	navbarIcon.classList.remove("hidden");//Ajustado
	navbarClose.classList.add("hidden");//Ajustado
	navbarBtn.classList.add("hidden"); //Ajustado
};



//Eventos de la búsqueda principal
searchBtn .addEventListener("click", () => { //Ajustado
	getSearch(searchInput.value);//Ajustado variable
});
searchInput.addEventListener("keypress", (event) => { //Ajustado
	if (event.keyCode === 13) {
		getSearch(searchInput.value);//Ajustado variable
	}
});
searchInput.addEventListener("click", activeBar);//Ajustado //funtion
searchInput.addEventListener("input", activeBar);//Ajustado // funtion
searchInput.addEventListener("input", getSuggestions);//Ajustado //input
searchInput.addEventListener("input", cleanResults);//Ajustado //funtion
searchClose.addEventListener("click", setInactiveSearchBar);//Ajustado
outcomeSeeMoreBtn.addEventListener("click", seeMoreBtn); //Ajustado //funtion


// --- Eventos de la navbar
navbarBtn.addEventListener("click", () => { //Ajustado
	getSearch(navbarInput.value);
});
navbarInput.addEventListener("keypress", (event) => { //Ajustado variable
	if (event.keyCode === 13) {
		getSearch(navbarInput.value);
	}
});
navbarInput.addEventListener("click", activeNavbar);//Ajustado //funtion
navbarInput.addEventListener("input", activeNavbar);//Ajustado //funtion
navbarClose.addEventListener("click", inactiveNavbar);//Ajustado
navbarInput.addEventListener("input", cleanResults);//Ajustado //funtion
