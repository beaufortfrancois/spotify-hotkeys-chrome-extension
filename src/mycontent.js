// updates title of tab to name of song and artist
//only tested on player.spotify
function setTitle() {
    document.title=document.getElementById("main").contentDocument.querySelector("span>a").innerText + " - " + document.getElementById("main").contentDocument.querySelector("p.artist").innerText;
}
var interval = setInterval(setTitle, 3000);
