import songs from "./song.js";
import musicCart from "./slideBar.js";
import songSearchSugg from "./search.js";

const similarSuggestion = (idx) =>{
  let songSimilarSec = document.querySelector('.songs-similar');
  songSimilarSec.innerHTML=null;
  songs.filter(value => value.id != songs[idx].id).forEach(songSuggestion =>{
    let divSong = document.createElement('div');
    divSong.classList.add('song-suggest');
    divSong.innerHTML = `
    <a href = /detail.html?id=${songSuggestion.id}>
       <img src=${songSuggestion.img} alt="" width="60px">
                <div class="song-suggest-title-artist">
                  <span>${songSuggestion.title}</span>
                  <span>${songSuggestion.Artist}</span>
                </div>
    </a>
                <button class="addtofav" data-id = ${songSuggestion.id}>
                 <i class="fa-solid fa-heart"></i>
                </button>
    `
    songSimilarSec.appendChild(divSong);
  }) 
}

const playSection =(idx)=>{
  let currentDuration = document.querySelector('.current-duration');
  let durationSong = document.querySelector('.total-duration');
  function playSong() {
    songPlay = true;  
    audioPlay.play();
    playPause.innerHTML = '<i class="fa-solid fa-pause"></i>';
  }
  
  function pauseSong() {
    songPlay = false;        
    audioPlay.pause();
    playPause.innerHTML = '<i class="fa-solid fa-play"></i>';
  }

  function back(){
    idx--;
    if(idx < 0) idx=songs.length -1;
    insertSong(idx);
    playSong();
  }

  function forward(){
    idx++;
    if(idx > songs.length -1) idx=0;
    insertSong(idx);
    playSong();
  }

  function updateMusicTime(){
    const {currentTime,duration} = audioPlay;
    let cntWidth = (currentTime/duration)*100;
    progress.style.width=`${cntWidth}%`;

    let currentMin = Math.floor(currentTime/60);
    let currentSec = Math.floor(currentTime%60);
    currentDuration.innerText=`${currentMin}:${currentSec < 10 ? "0" : ""}${currentSec}`;

    if(duration){
      let durationMin = Math.floor(duration/60);
      let durationSec = Math.floor(duration%60);
      durationSong.innerText = `${durationMin}:${durationSec < 10 ? "0":""}${durationSec}`;
    }   
    if(cntWidth === 100){
      forward();
    } 
  }

  function updateContainer(e) {
    let cntWidth = document.querySelector('.song-play-cnt').clientWidth;
    const clientClick = e.offsetX;
    const duration = audioPlay.duration;
    audioPlay.currentTime =(clientClick/cntWidth)*duration;
  }

  let progress = document.querySelector('.inc-play-cnt');
  let playPause = document.querySelector('.pause_play');
  let backSong = document.querySelector('.back_song');
  let nextSong = document.querySelector('.next_song');
  let audioPlay = document.querySelector('audio');
  let songPlay = false; 
  
  backSong.addEventListener('click',back)
  nextSong.addEventListener('click',forward)
  playPause.addEventListener('click', () => songPlay ? pauseSong() : playSong());
  audioPlay.addEventListener('timeupdate',updateMusicTime);
  document.querySelector('.song-play-cnt').addEventListener('click',updateContainer);

  // playSong();
  
}

const insertSong = (idx) =>{
  let song = songs[idx];
  let songPlaysec = document.querySelector('.song-play');
  songPlaysec.innerHTML = `
   <div class="img">
              <img src=${song.img} alt="" width="300px" height="300px">
            </div>
            <div class="song-playBtn-sec">
              <div class="title-artist-song-play">
                <h3>${song.title}</h3>
                <span>${song.Artist}</span>
              </div>
              <audio src=${song.src}></audio>
              <div class="duration-song">
                <span class="current-duration"></span>
                <span class="total-duration"></span>
              </div>
              <div class="song-play-cnt">
                <div class="inc-play-cnt"></div>
              </div>
              <div class="song-play-pause-btn">
                <button class="back_song"><i class="fa-solid fa-backward-step"></i></button>
                <button class="pause_play"><i class="fa-solid fa-play"></i></button>
                <button class="next_song"><i class="fa-solid fa-forward-step"></i></button>
              </div>
              <button class="addtofav" data-id=${song.id}><i class="fa-solid fa-heart"></i></button>
    </div>`
    similarSuggestion(idx);
    playSection(idx);
} 

const init = () =>{
  const songId = new URLSearchParams(window.location.search).get("id");
  const idx = songs.findIndex(value => value.id == songId);
  insertSong(idx);
  // songSearchSugg();
}
init();
musicCart();
