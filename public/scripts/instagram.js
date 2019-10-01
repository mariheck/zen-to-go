// jshint esversion: 6

const token = "";

const nbPhotos = 4;
const instaFeed = document.getElementById("insta-feed");
const srcElement = document.createElement("script");

const colAttribute = "col-3";
const targetLink = "_blank";

window.display = function (data) {
  for(var i in data.data ){
    instaFeed.innerHTML +=  "<li class=" + colAttribute + "><a href=" + data.data[i].link + " target=targetLink><img src=" + data.data[i].images.thumbnail.url + "></a></li>";
  }
};

srcElement.setAttribute("src", "https://api.instagram.com/v1/users/self/media/recent?access_token=" + token + "&count=" + nbPhotos + "&callback=display");

document.body.appendChild(srcElement);
