//Tremding words
//Llama las trending words
const getTrendWords = async () => {
	try {
		await fetch(`${trendingWordsUrl}?api_key=${apiKey}`)
		.then((response) => response.json())
		.then((trendWords) => {
			console.log(trendWords);
			showTrendWords(trendWords);
		});
	} catch (err) {
		console.log(err)
	}
};
getTrendWords();

//Muestra las trending words
const showTrendWords = (trendWords) => {
	for (let i = 0; i < 5; i++) {
		const trendWordItem = document.createElement("span");
		trendWordItem.classList.add("trending-word-item");
		trendWordItem.setAttribute(
			'onclick',
			`getSearch("${trendWords.data[i]}")`
		);
		trendWordItem.innerHTML = `${trendWords.data[i]}`;
		trendingWords.appendChild(trendWordItem);
	}
};

//Trending gifs 
//Ajusta las flechas según el modo
const changeArrows = () => {
	if (localStorage.getItem("dark-mode") === "true") {
		leftBtn.src = "./assets/button-slider-left-md-noct.svg";
		rightBtn.src = "./assets/button-slider-right-md-noct.svg";
	} else {
		leftBtn.src = "./assets/button-slider-left.svg";
		rightBtn.src = "./assets/Button-Slider-right.svg";
	}
};

leftBtn.addEventListener("mouseover", () => {
	leftBtn.src = "./assets/button-slider-left-hover.svg";
});
leftBtn.addEventListener("mouseout", changeArrows);


rightBtn.addEventListener("mouseover", () => {
	rightBtn.src = "./assets/Button-Slider-right-hover.svg";
});
rightBtn.addEventListener("mouseout", changeArrows);


//Trending gifos
const getTrendingGif = async () => {
	try {
		await fetch(`${trendingGifsUrl}?api_key=${apiKey}&limit=12&rating=g`)
		.then((response) => response.json())
		.then((results) => {
			console.log(results);
			showTrendingGif(results);
		})
	} catch (err) {
		console.log(err)
	}
};
getTrendingGif();

//Muestra los trendy gifs
const showTrendingGif = (results) => {
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
		trendingSlider.appendChild(gifCnt);
	}
};

const rigthBtnSlider = () => {
	trendingSlider.scrollLeft += 600;
};
rightBtn.addEventListener('click', rigthBtnSlider);

const leftBtnSlider = () => {
	trendingSlider.scrollLeft -= 600;
};
leftBtn.addEventListener('click', leftBtnSlider);

