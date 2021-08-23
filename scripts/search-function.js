//Búsqueda de los gifs
let offsetCount = 0;
const getSearch = async (search) => {
	cleanSuggestions();
	searchInput.value = search;
	navbarInput.value = search;
	outcomeTitle.innerHTML = search;
	
	if (offsetCount === 0) {
		outcomeCardCnt.innerHTML = '';
	}

	//Llamado de la búsqueda
	await fetch(`${searchUrl}?api_key=${apiKey}&q=${search}&offset=${offsetCount}&limit=12&rating=g`)
		.then((response) => response.json())
		.then((results) => {
			if (results.data == 0) {
				showErrorSearch();
			} else {
				showSearchGif(results);
			}
		})
		.catch((err) => console.log(err));
};

//Muestra el gif
const showSearchGif = (results) => {
	outcomeCnt.classList.remove("hidden");
	outcomeSeeMoreBtn.classList.remove("hidden");

	if (offsetCount === 0) {
		window.scrollTo({ top: 600, behavior: "smooth" });
	}

	if (results.data.length < 12) {
		outcomeSeeMoreBtn.style.display = "none";
	}

	for (let i = 0; i < results.data.length; i++) {
		const gifCnt = document.createElement('div');
		const title = results.data[i].title.replace("'", "´") 
		gifCnt.classList.add('gif-cnt');
		gifCnt.innerHTML = ` 
		<img class="gif-img" onclick="enlargeGif('${results.data[i].images.original.url}','${results.data[i].username}','${title}')" src="${results.data[i].images.original.url}" alt="${results.data[i].title}">
		<div class="gif-doing">
			<div class="gif-doing-btn">
				<div class="dobtn fav-do" onclick="addFavsGif('${results.data[i].images.original.url}','${results.data[i].username}','${title}')"></div>
				<div class="dobtn download-do" onclick="downloadGif('${results.data[i].images.original.url}','${title}')"></div>
				<div class="dobtn enlarge-do" onclick="enlargeGif('${results.data[i].images.original.url}','${results.data[i].username}','${title}')"></div>
			</div>
			<div class="gif-data">
				<p class="gif-data-user">${results.data[i].username}</p>
				<p class="gif-data-title">${results.data[i].title}</p>
			</div>
		</div>
		`;
		outcomeCardCnt.appendChild(gifCnt);
	}
};

//Muestra cuando la búsqueda no aparece
const showErrorSearch = () => {
	outcomeCnt.classList.remove("hidden");
	noOutcomeCnt.classList.remove("hidden");
	noOutcomeCnt.innerHTML = ` 
	<div class="error-cnt">
	<img class="error-search" src="./assets/icon-busqueda-sin-resultado.svg" alt="Imagen ilustrativa de una busqueda sin resultado" >
	<h4 class="error-search-text">Intenta con otra búsqueda.</h4>
	</div>
	`;
	outcomeSeeMoreBtn.style.display = "none";
};

//Boton de ver más
const seeMoreBtn = (e) => {
	e.preventDefault();
	offsetCount += 12;
	if (searchInput.value) {
		getSearch(searchInput.value);
	} else {
		getSearch(navbarInput.value);
	}
};

//Sugerencias de búsqueda
const getSuggestions = async () => {
	cleanSuggestions();
	suggestList.classList.remove("hidden");
	const userInput = searchInput.value;

	if (userInput.length >= 1) {

		try {
			await fetch(`${autocompleteUrl}?api_key=${apiKey}&q=${userInput}&limit=4&rating=g`)
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
const showSuggestions = (suggestions) => {
	for (let i = 0; i < suggestions.data.length; i++) {
		const suggestItem = document.createElement('li');
		suggestItem.classList.add("suggest-items");
		suggestItem.innerHTML = `
		<img class="suggest-search-btn" id="" src="./assets/icon-search-gray.svg" alt="Lupa de búsqueda" onclick="getSearch('${suggestions.data[i].name}')">
		<p class="suggest-search-text" onclick="getSearch('${suggestions.data[i].name}')">${suggestions.data[i].name}</p>`;
		suggestList.appendChild(suggestItem);
	}
};

//Limpia el contenedor y lo devuelve al incial 
const cleanResults = () => {
	outcomeCnt.classList.add("hidden");
	noOutcomeCnt.classList.add("hidden");
	outcomeSeeMoreBtn.style.display = "block";
	outcomeCardCnt.innerHTML = '';
	navbarInput.placeholder = "Busca GIFOS y más";
	searchInput.placeholder = "Busca GIFOS y más";
};

// Limpia las sugerencias de búsqueda
const cleanSuggestions = () => {
	suggestList.classList.add("hidden");
	suggestList.innerHTML = '';
};

//Buscador activo
const activeBar = () => {
	searchBtn .classList.remove("hidden");
	searchClose.classList.remove("hidden");
	searchIcon.classList.add("hidden");
	suggestionsCnt.classList.remove("hidden");
	searchCnt.classList.add("searchActive");
	suggestionsCnt.classList.add("searchActiveContainer");
};

const activeNavbar = () => {
	navbarBtn.classList.remove("hidden");
	navbarClose.classList.remove("hidden");
	navbarIcon.classList.add("hidden");
};


//Buscador inactivo
const setInactiveSearchBar = () => {
	navbarInput.value = '';
	searchInput.value = '';
	cleanResults();
	cleanSuggestions();
	suggestionsCnt.classList.add("hidden");
	searchIcon.classList.remove("hidden");
	searchClose.classList.add("hidden");
	searchBtn .classList.add("hidden");
	searchCnt.classList.remove("searchActive");
};

const inactiveNavbar = () => {
	navbarInput.value = '';
	searchInput.value = '';
	cleanResults();
	navbarIcon.classList.remove("hidden");
	navbarClose.classList.add("hidden");
	navbarBtn.classList.add("hidden");
};

//Eventos de la búsqueda principal
searchBtn .addEventListener("click", () => {
	getSearch(searchInput.value);
});
searchInput.addEventListener("keypress", (event) => {
	if (event.keyCode === 13) {
		getSearch(searchInput.value);
	}
});
searchInput.addEventListener("click", activeBar);
searchInput.addEventListener("input", activeBar);
searchInput.addEventListener("input", getSuggestions);
searchInput.addEventListener("input", cleanResults);
searchClose.addEventListener("click", setInactiveSearchBar);
outcomeSeeMoreBtn.addEventListener("click", seeMoreBtn);


//Eventos barra nav
navbarBtn.addEventListener("click", () => {
	getSearch(navbarInput.value);
});
navbarInput.addEventListener("keypress", (event) => {
	if (event.keyCode === 13) {
		getSearch(navbarInput.value);
	}
});
navbarInput.addEventListener("click", activeNavbar);
navbarInput.addEventListener("input", activeNavbar);
navbarClose.addEventListener("click", inactiveNavbar);
navbarInput.addEventListener("input", cleanResults);
