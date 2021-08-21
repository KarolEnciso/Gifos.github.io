//Eventos social media (Footer) 

imgFacebook.addEventListener("mouseover", function(){
    imgFacebook.src = "./assets/icon_facebook_hover.svg";
}
);
imgFacebook.addEventListener("mouseleave", () => {
  changeSrc(imgFacebook, "./assets/icon_facebook.svg")
});


imgTwitter.addEventListener("mouseover", function(){
    imgTwitter.src = "./assets/icon-twitter-hover.svg";
}
);
imgTwitter.addEventListener("mouseleave", () => {
  changeSrc(imgTwitter, "./assets/icon-twitter.svg")
});


imgInstagram.addEventListener("mouseover", function(){
    imgInstagram.src = "./assets/icon_instagram-hover.svg";
}
);
imgInstagram.addEventListener("mouseleave", () => {
  changeSrc(imgInstagram, "./assets/icon_instagram.svg")
}
);

//función para cambiar la src de la imagen
function changeSrc (image, file){
  image.setAttribute("src", file)
};
