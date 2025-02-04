import songs from "./song.js";
const musicCart = () => {
  let main = document.querySelector("main");
  let aside = document.querySelector("aside");
  let playlistBtn = document.querySelector(".aside-icon");
  let playClick = false;
  let songList = JSON.parse(localStorage.getItem("list")) || [];
  
  playlistBtn.addEventListener("click", () => {
    main.classList.toggle("main-width");
    aside.classList.toggle("aside-width");
    playlistBtn.innerHTML = playClick
      ? '<i class="fa-solid fa-music"></i>'
      : '<i class="fa-solid fa-x"></i>';
    playClick = !playClick;
  });

  let mob_menu = document.querySelector(".music-cart");
  mob_menu.addEventListener("click", () => {
    main.classList.toggle("main-width");
    aside.classList.toggle("aside-width");
    playClick = false;
    playlistBtn.innerHTML = '<i class="fa-solid fa-x"></i>';
  });

  const showInList = (songList) => {
    let cntAside = document.querySelector('.aside-list-container');
    cntAside.innerHTML = "";
    if (songList.length > 0) {
      songList.forEach(song => {
        let div = document.createElement('div');
        div.classList.add('songs-list');
        let idxSong = songs.findIndex(value => value.id == song.id);
        let selectedFav = songs[idxSong];
        div.innerHTML = `
          <a href="/detail.html?id=${song.id}">
            <img src=${selectedFav.img} alt="" width="60px">
            <div class="list-song-desc">
              <span>${selectedFav.title}</span>
              <span>${selectedFav.Artist}</span>
            </div>
          </a>
          <button class="deleteBtn" data-id=${selectedFav.id}><i class="fa-solid fa-trash"></i></button>
        `;
        cntAside.appendChild(div);
      });
    }
  };
  
  const favSonglist = (eltId) => {
    if (!songList.some(song => song.id === eltId)) {
      songList.push({ id: eltId });
      localStorage.setItem("list", JSON.stringify(songList));
    }
    showInList(songList);
  };
  
  const deleteSong = (eltId) => {
    songList = songList.filter(song => song.id !== eltId);
    localStorage.setItem("list", JSON.stringify(songList));
    showInList(songList);
  };
  
  document.addEventListener('click', (e) => {
    let target = e.target;
    if (target.classList.contains('fa-heart') || target.parentElement.classList.contains('addtofav')) {
      let eltId = target.parentElement.dataset.id;
      favSonglist(eltId);
    }
    if (target.classList.contains('fa-trash')) {
      let eltId = target.parentElement.dataset.id;
      deleteSong(eltId);
    }
  });

  document.addEventListener('click', (e) => {
    if (e.target.classList.contains('playBtn')) {
      let tarElem = e.target.dataset.id;
      console.log(tarElem);
    }
  });

  showInList(songList);
};

export default musicCart;