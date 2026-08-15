const audio = new Audio();
audio.volume = 0.5;

const songNameEl = document.getElementById('songname');
const skipBtn = document.getElementById('skip');
const playPauseBtn = document.getElementById('playpause');

let songs = [];
let currentIndex = 0;

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

async function loadSongs() {
    const response = await fetch('./music/manifest.json');
    const data = await response.json();
    songs = shuffle(data);
    loadTrack(currentIndex);
}

function loadTrack(index) {
    const song = songs[index];
    audio.src = song.file;
    songNameEl.textContent = song.title;
}

function playCurrent() {
    audio.play()
        .then(() => { playPauseBtn.textContent = 'pause'; })
        .catch(err => console.error('Playback failed:', err));
}

function playNext() {
    currentIndex++;
    if (currentIndex >= songs.length) {
        currentIndex = 0;
        shuffle(songs);
    }
}