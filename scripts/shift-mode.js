//Cambia de modo (diurno - nocturno)

const shiftMode = () => { //funtion
	document.body.classList.toggle("darkMode");

	// Guarda la elección en el localStorage
	if (document.body.classList.contains("darkMode")) {
		localStorage.setItem("dark-mode", true);
		document.body.classList.add("darkMode");
		changeMode.textContent = "Modo Diurno"; //Ajustado
		logoImg.src = "./assets/logo-mobile-modo-noct.svg";//Ajustado
		menuNewgiftBtn.src = "./assets/CTA-crear-gifo-modo-noc.svg";//Ajustado
		menuBurger.src = "./assets/burger-modo-noct.svg";//Ajustado
		navbarIcon.src = "./assets/icon-search-modo-noct.svg";//Ajustado
		navbarClose.src = "./assets/close-modo-noc.svg";//Ajustado
		searchIcon.src = "./assets/icon-search-modo-noct.svg";//Ajustado
		searchClose.src = "./assets/close-modo-noct.svg";//Ajustado 
		leftBtn.src = "./assets/button-slider-left-md-noct.svg";//Ajustado 
		rightBtn.src = "./assets/button-slider-right-md-noct.svg";//Ajustado 
		cameraImg.src = "./assets/camara-modo-noc.svg";//Ajustado
		movieImg.src = "./assets/pelicula-modo-noc.svg";//Ajustado
	} else {
		localStorage.setItem("dark-mode", false);
		document.body.classList.remove("darkMode");
		changeMode.textContent = "Modo Nocturno";//Ajustado
		logoImg.src = "./assets/logo-mobile.svg";//Ajustado
		menuNewgiftBtn.src = "./assets/button-crear-gifo.svg";//Ajustado
		menuBurger.src = "./assets/burger.svg";//Ajustado
		navbarIcon.src = "./assets/icon-search.svg";//Ajustado
		navbarClose.src = "./assets/close.svg";//Ajustado
		searchIcon.src = "./assets/icon-search.svg";//Ajustado
		searchClose.src = "./assets/close.svg";//Ajustado 
		leftBtn.src = "./assets/button-slider-left.svg";//Ajustado 
		rightBtn.src = "./assets/button-Slider-right.svg";//Ajustado 
		cameraImg.src = "./assets/camara.svg";//Ajustado
		movieImg.src = "./assets/pelicula.svg";//Ajustado
	}
};

changeMode.addEventListener("click", shiftMode);//funtion