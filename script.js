import songs from "./song.js";
import musicCart from "./slideBar.js";
import songSearchSugg from "./search.js";
let songsDiv = document.querySelector(".songs");
const songDisplay = () => {
  if (songs.length !== 0) {
    songsDiv.innerHTML = "";
    songs.forEach((song) => {
      let card = document.createElement("a");
      card.classList.add("song-card");
      card.dataset.id = song.id;
      card.innerHTML = `
        <a href="/detail.html?id=${song.id}">
            <img src=${song.img} alt="">
        </a>
        <div class="desc-btn">
          <div class="desc">
            <span>${song.title}</span>
            <span>${song.Artist}</span>
          </div>
          <button><i class="fa-solid fa-play"></i></button>
        </div>
      `;
      songsDiv.appendChild(card);
    });
  }
};



songSearchSugg();
songDisplay();
musicCart();
songSearchSugg();
