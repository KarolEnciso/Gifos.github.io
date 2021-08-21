//Tremding words
//Llama las trending words
const getTrendWords = async () => { //funtion
	try {
		await fetch(`${trendingWordsUrl}?api_key=${apiKey}`) //url
		.then((response) => response.json())
		.then((trendWords) => { //callback
			console.log(trendWords);//callback
			showTrendWords(trendWords);//funtion //callback
		});
	} catch (err) {
		console.log(err)
	}
};
getTrendWords();//funtion

//Muestra las trending words
const showTrendWords = (trendWords) => { //funtion //callback
	for (let i = 0; i < 5; i++) {
		const trendWordItem = document.createElement("span");//variable
		trendWordItem.classList.add("trending-word-item");//variable //class
		trendWordItem.setAttribute(//variable
			'onclick',
			`getSearch("${trendWords.data[i]}")` //callback
		);
		trendWordItem.innerHTML = `${trendWords.data[i]}`; //callback //variable
		trendingWords.appendChild(trendWordItem);//Ajustado //variable
	}
};


//Trending gifs 
//Ajusta las flechas según el modo
const changeArrows = () => { //funtion
	if (localStorage.getItem("dark-mode") === "true") {
		leftBtn.src = "./assets/button-slider-left-md-noct.svg"; //Ajustado
		rightBtn.src = "./assets/button-slider-right-md-noct.svg"; //Ajustado
	} else {
		leftBtn.src = "./assets/button-slider-left.svg";//Ajustado
		rightBtn.src = "./assets/Button-Slider-right.svg"; //Ajustado
	}
};

leftBtn.addEventListener("mouseover", () => { //Ajustado
	leftBtn.src = "./assets/button-slider-left-hover.svg"; //ajustado
});
leftBtn.addEventListener("mouseout", changeArrows);//Ajustado //funtion


rightBtn.addEventListener("mouseover", () => { //Ajustado
	rightBtn.src = "./assets/Button-Slider-right-hover.svg"; //AJustado
});
rightBtn.addEventListener("mouseout", changeArrows);//Ajustado //funtion



//Trending gifos
const getTrendingGif = async () => {
	try {
		await fetch(`${trendingGifsUrl}?api_key=${apiKey}&limit=12&rating=g`)//url
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
		trendingSlider.appendChild(gifCnt);//Ajustado
	}
};

const rigthBtnSlider = () => {
	trendingSlider.scrollLeft += 600;//Ajustado
};
rightBtn.addEventListener('click', rigthBtnSlider);//Ajustado

const leftBtnSlider = () => {
	trendingSlider.scrollLeft -= 600; //Ajustado
};
leftBtn.addEventListener('click', leftBtnSlider);//Ajustado

