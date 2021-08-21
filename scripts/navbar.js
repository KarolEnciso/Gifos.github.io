//Cambia modo del menú hamburguesa
const showMenu = () => { //funtion
	if (localStorage.getItem("dark-mode") === "true") {
		if (menuItems.classList.contains("hiddenMenu")) { //Ajustado variable
			menuItems.classList.remove("hiddenMenu");//Ajustado variable
			menuBurger.src = "./assets/close-modo-noct.svg";//Ajustado
		} else {
			menuItems.classList.add("hiddenMenu");//Ajustado variable
			menuBurger.src = "./assets/burger-modo-noct.svg";//Ajustado
		}
	} else {
		if (menuItems.classList.contains("hiddenMenu")) { //Ajustado variable
			menuItems.classList.remove("hiddenMenu");//Ajustado variable
			menuBurger.src = "./assets/close.svg";//Ajustado
		} else {
			menuItems.classList.add("hiddenMenu");//Ajustado variable
			menuBurger.src = "./assets/burger.svg";//Ajustado
		}
	}
};

//Despliega el menú hamburguesa
menuBurger.addEventListener("click", showMenu);//Ajustado variable //funtion
menuFavs.addEventListener("click", showMenu);//Ajustado variable //funtion
menuGifos.addEventListener("click", showMenu);

//Eventos del menu new gif button 
menuNewgiftBtn.addEventListener("click", () => { //Ajustado
	menuNewgiftBtn.src = "./assets/CTA-crear-gifo-active.svg";//Ajustado
});

menuNewgiftBtn.addEventListener("mouseover", () => { //Ajustado
	menuNewgiftBtn.src = "./assets/CTA-crear-gifo-hover.svg"; //Ajustado
});

menuNewgiftBtn.addEventListener("mouseout", () => { //Ajustado
	menuNewgiftBtn.src = "./assets/button-crear-gifo.svg"; //Ajustado
});

//Input de búsqueda en barra de navegación estática
function inactiveBar() { //funtion
	if (document.documentElement.scrollTop > 700) {
		if (window.innerWidth < 1024) {
			navbarCnt.classList.add("hiddenSearchBar");//Se ajustó la variable
		} else {
			navbarCnt.classList.remove("hiddenSearchBar");//Se ajustó la variable
		}
	} else {
		navbarCnt.classList.add("hiddenSearchBar");//Se ajustó la variable
	}
}

window.addEventListener("scroll", inactiveBar); //funtion

//Mostrar la sección de new gif
const showNewGif = () => { //funtion
	newGifSection.classList.remove("hidden");//Ajustado
	mainCnt.classList.add("hidden");//Ajustado
	favsCnt.classList.add("hidden");//Ajustado
	trendingGifsCnt.classList.add("hidden");//Ajustado
	misGifosCnt.classList.add("hidden");//Ajustado
	window.scrollTo({ top: 0, behavior: "smooth" });
};

menuNewGif.addEventListener("click", showNewGif);//Ajustado variable //funtion

//Mostrar la página principal
const showHomepage = () => { //funtion
	mainCnt.classList.remove("hidden");//Ajustado
	misGifosCnt.classList.add("hidden");//Ajustado
	favsCnt.classList.add("hidden");//Ajustado
	newGifSection.classList.add("hidden");//Ajustado
	trendingGifsCnt.classList.remove("hidden");//Ajustado
	window.scrollTo({ top: 0, behavior: "smooth" });
};

logoCnt.addEventListener("click", showHomepage);//Ajustado //funtion
