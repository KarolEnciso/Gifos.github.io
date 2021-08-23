//Cambia de modo (diurno - nocturno)
const shiftMode = () => {
	document.body.classList.toggle("darkMode");
	if (document.body.classList.contains("darkMode")) {
		localStorage.setItem("dark-mode", true);
		document.body.classList.add("darkMode");
		changeMode.textContent = "Modo Diurno";
		logoImg.src = "./assets/logo-mobile-modo-noct.svg";
		menuNewgiftBtn.src = "./assets/CTA-crear-gifo-modo-noc.svg";
		menuBurger.src = "./assets/burger-modo-noct.svg";
		navbarIcon.src = "./assets/icon-search-modo-noct.svg";
		navbarClose.src = "./assets/close-modo-noct.svg";
		searchIcon.src = "./assets/icon-search-modo-noct.svg";
		searchClose.src = "./assets/close-modo-noct.svg"; 
		leftBtn.src = "./assets/button-slider-left-md-noct.svg";
		rightBtn.src = "./assets/button-slider-right-md-noct.svg";
		cameraImg.src = "./assets/camara-modo-noc.svg";
		movieImg.src = "./assets/pelicula-modo-noc.svg";
	} else {
		localStorage.setItem("dark-mode", false);
		document.body.classList.remove("darkMode");
		changeMode.textContent = "Modo Nocturno";
		logoImg.src = "./assets/logo-mobile.svg";
		menuNewgiftBtn.src = "./assets/button-crear-gifo.svg";
		menuBurger.src = "./assets/burger.svg";
		navbarIcon.src = "./assets/icon-search.svg";
		navbarClose.src = "./assets/close.svg";
		searchIcon.src = "./assets/icon-search.svg";
		searchClose.src = "./assets/close.svg";
		leftBtn.src = "./assets/button-slider-left.svg";
		rightBtn.src = "./assets/button-Slider-right.svg";
		cameraImg.src = "./assets/camara.svg";
		movieImg.src = "./assets/pelicula.svg";
	}
};
changeMode.addEventListener("click", shiftMode);