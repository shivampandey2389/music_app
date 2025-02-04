import songs from "./song.js";

function songSearchSugg() {
  let songInp = document.getElementById('songInput');
  let suggestionBox = document.getElementById('suggestion');

  if (!songInp || !suggestionBox) {
    console.error("songInput or suggestion element not found!");
    return;
  }

  songInp.addEventListener('keyup', () => {
    let songInputVal = songInp.value.trim().toLowerCase();
    suggestionBox.innerHTML = '';

    if (songInputVal.length === 0) return;

    let filterSong = songs.filter(song => song.title.toLowerCase().includes(songInputVal));

    filterSong.forEach(song => {
      let div = document.createElement('div');
      div.classList.add('suggestion-song');
      div.innerHTML = `
        <a href="/detail.html?id=${song.id}">
          <img src="${song.img}" alt="${song.title}" width="50px">
          <div class="song-sugg-des">
            <span>${song.title}</span>
            <span>${song.Artist}</span>
          </div>
        </a>
      `;
      suggestionBox.appendChild(div);
    });
  });
}

document.addEventListener("DOMContentLoaded", songSearchSugg);

export default songSearchSugg;
