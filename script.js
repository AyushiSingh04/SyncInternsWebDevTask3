let nowplaying = document.querySelector(".nowplaying");
let trackart = document.querySelector(".trackart");
let trackname = document.querySelector(".trackname");
let trackartist = document.querySelector(".trackartist");
let playpausebtn = document.querySelector(".playpausetrack");
let nextbtn = document.querySelector(".nexttrack");
let prevbtn = document.querySelector(".prevtrack");
let seekslider = document.querySelector(".seekslider");
let volumeslider = document.querySelector(".volumeslider");
let currtime = document.querySelector(".currenttime");
let totalduration = document.querySelector(".totalduration");
let trackindex = 0;
let isPlaying = false;
let updateTimer;
let currtrack = document.createElement('audio');
let tracklist = [
  {
    name: "Blank Space",
    artist: "Taylor Swift",
    image: "https://pics.filmaffinity.com/Taylor_Swift_Blank_Space_Music_Video-582931533-large.jpg",
    path: "https://rr6---sn-gwpa-cive7.googlevideo.com/videoplayback?expire=1695917667&ei=A1IVZb2FF4GNkwb7wZOIBQ&ip=35.80.14.82&id=o-AHzWzkHVBK0P1VCjxFGH7JkdUIOssjqukLXTd05LCro6&itag=140&source=youtube&requiressl=yes&spc=UWF9f-O3hgrinDw4DZhHKLE4o13L7eo45H1vPYcyGQ&vprv=1&svpuc=1&mime=audio%2Fmp4&ns=GlAaQSUJLaDe4yInEsFWGLEP&gir=yes&clen=3755636&dur=232.013&lmt=1686340481783753&keepalive=yes&fexp=24007246,24350018&beids=24350018&c=WEB&txp=4532434&n=eDIvmiaODvRPfniAt&sparams=expire%2Cei%2Cip%2Cid%2Citag%2Csource%2Crequiressl%2Cspc%2Cvprv%2Csvpuc%2Cmime%2Cns%2Cgir%2Cclen%2Cdur%2Clmt&sig=AOq0QJ8wRAIgb37MmgvuKxOHoMt4k2UITs7W1gZDeDWZgc9FFlH1-TICIFBcAc5otYTtqPSevRQqM7xIbvDDojy5WtRwErnDhhLY&redirect_counter=1&rm=sn-nx5sr7e&req_id=2ef39a325f11a3ee&cms_redirect=yes&ipbypass=yes&mh=29&mip=2405:201:3002:fc3e:b5da:c91f:a4ff:614a&mm=31&mn=sn-gwpa-cive7&ms=au&mt=1695895805&mv=m&mvi=6&pcm2cms=yes&pl=47&lsparams=ipbypass,mh,mip,mm,mn,ms,mv,mvi,pcm2cms,pl&lsig=AG3C_xAwRQIgIx6zy1q-xGNYsW60h8AoOvtsLD6ogWfuw0x7AJ_RmjwCIQClmFfIYa-252nmCPzqcWNDzMUrIUYnSvwGVdBaAg6PAQ%3D%3D"

  },
  {
    name: "Night Changes",
    artist: "One Direction",
    image: "https://media.npr.org/assets/img/2012/03/22/1d_cd-cover_custom-afceb2b33b277ace0e8c92a0d65d409550bdcb24-s1100-c50.jpg",
    path: "https://files.freemusicarchive.org/storage-freemusicarchive-org/music/no_curator/Tours/Enthusiast/Tours_-_01_-_Enthusiast.mp3"
  },
  {
    name: "Baby",
    artist: "Justin Beiber",
    image: "https://upload.wikimedia.org/wikipedia/en/d/d1/Babycoverart.jpg",
    path: "https://files.freemusicarchive.org/storage-freemusicarchive-org/music/ccCommunity/Chad_Crouch/Arps/Chad_Crouch_-_Shipping_Lanes.mp3",
  },
];

function loadTrack(trackindex) {
  clearInterval(updateTimer);
  resetValues();
  currtrack.src = tracklist[trackindex].path;
  currtrack.load();
  trackart.style.backgroundImage = "url(" + tracklist[trackindex].image + ")";
  trackname.textContent = tracklist[trackindex].name;
  trackartist.textContent = tracklist[trackindex].artist;
  nowplaying.textContent = "PLAYING " + (trackindex + 1) + " OF " + tracklist.length;
  updateTimer = setInterval(seekUpdate, 1000);
  currtrack.addEventListener("ended", nextTrack);
}

function random_bg_color() {
  let red = Math.floor(Math.random() * 256) + 64;
  let green = Math.floor(Math.random() * 256) + 64;
  let blue = Math.floor(Math.random() * 256) + 64;
  let bgColor = "rgb(" + red + "," + green + "," + blue + ")";
  document.body.style.background = bgColor;
}


function resetValues() {
  currtime.textContent = "00:00";
  totalduration.textContent = "00:00";
  seekslider.value = 0;
}

function playpauseTrack() {
  if (!isPlaying) playTrack();
  else pauseTrack();
}

function playTrack() {
  currtrack.play();
  isPlaying = true;
  playpausebtn.innerHTML = '<i class="pause"></i>';
}

function pauseTrack() {
  currtrack.pause();
  isPlaying = false;
  playpausebtn.innerHTML = '<i class="play"></i>';;
}

function nextTrack() {
  if (trackindex < tracklist.length - 1)
    trackindex += 1;
  else trackindex = 0;
  loadTrack(trackindex);
  playTrack();
}

function prevTrack() {
  if (trackindex > 0)
    trackindex -= 1;
  else trackindex = tracklist.length;
  loadTrack(trackindex);
  playTrack();
}

function seekTo() {
  seekto = currtrack.duration * (seekslider.value / 100);
  currtrack.currentTime = seekto;
}

function setVolume() {
  currtrack.volume = volumeslider.value / 100;
}

function seekUpdate() {
  let seekPosition = 0;
  if (!isNaN(currtrack.duration)) {
    seekPosition = currtrack.currentTime * (100 / currtrack.duration);
    seekslider.value = seekPosition;
    let currentMinutes = Math.floor(currtrack.currentTime / 60);
    let currentSeconds = Math.floor(currtrack.currentTime - currentMinutes * 60);
    let durationMinutes = Math.floor(currtrack.duration / 60);
    let durationSeconds = Math.floor(currtrack.duration - durationMinutes * 60);
    if (currentSeconds < 10) { currentSeconds = "0" + currentSeconds; }
    if (durationSeconds < 10) { durationSeconds = "0" + durationSeconds; }
    if (currentMinutes < 10) { currentMinutes = "0" + currentMinutes; }
    if (durationMinutes < 10) { durationMinutes = "0" + durationMinutes; }
    currtime.textContent = currentMinutes + ":" + currentSeconds;
    totalduration.textContent = durationMinutes + ":" + durationSeconds;
  }
}

loadTrack(trackindex);