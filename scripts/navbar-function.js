//Cambia modo del menú hamburguesa
const showMenu = () => {
	if (localStorage.getItem("dark-mode") === "true") {
		if (menuItems.classList.contains("hiddenMenu")) {
			menuItems.classList.remove("hiddenMenu");
			menuBurger.src = "./assets/close-modo-noct.svg";
		} else {
			menuItems.classList.add("hiddenMenu");
			menuBurger.src = "./assets/burger-modo-noct.svg";
		}
	} else {
		if (menuItems.classList.contains("hiddenMenu")) {
			menuItems.classList.remove("hiddenMenu");
			menuBurger.src = "./assets/close.svg";
		} else {
			menuItems.classList.add("hiddenMenu");
			menuBurger.src = "./assets/burger.svg";
		}
	}
};

//Despliega el menú hamburguesa
menuBurger.addEventListener("click", showMenu);
menuFavs.addEventListener("click", showMenu);
menuGifos.addEventListener("click", showMenu);

//Eventos del menu new gif button 
menuNewgiftBtn.addEventListener("click", () => {
	menuNewgiftBtn.src = "./assets/CTA-crear-gifo-active.svg";
});

menuNewgiftBtn.addEventListener("mouseover", () => {
	menuNewgiftBtn.src = "./assets/CTA-crear-gifo-hover.svg";
});

menuNewgiftBtn.addEventListener("mouseout", () => {
	menuNewgiftBtn.src = "./assets/button-crear-gifo.svg";
});

//Input de búsqueda en barra de navegación estática
function inactiveBar() {
	if (document.documentElement.scrollTop > 700) {
		if (window.innerWidth < 1024) {
			navbarCnt.classList.add("hiddenSearchBar");
		} else {
			navbarCnt.classList.remove("hiddenSearchBar");
		}
	} else {
		navbarCnt.classList.add("hiddenSearchBar");
	}
}

window.addEventListener("scroll", inactiveBar);

//Mostrar la sección de new gif
const showNewGif = () => {
	newGifSection.classList.remove("hidden");
	mainCnt.classList.add("hidden");
	favsCnt.classList.add("hidden");
	trendingGifsCnt.classList.add("hidden");
	misGifosCnt.classList.add("hidden");
	window.scrollTo({ top: 0, behavior: "smooth" });
};

menuNewGif.addEventListener("click", showNewGif);

//Mostrar la página principal
const showHomepage = () => {
	mainCnt.classList.remove("hidden");
	misGifosCnt.classList.add("hidden");
	favsCnt.classList.add("hidden");
	newGifSection.classList.add("hidden");
	trendingGifsCnt.classList.remove("hidden");
	window.scrollTo({ top: 0, behavior: "smooth" });
};

logoCnt.addEventListener("click", showHomepage);
