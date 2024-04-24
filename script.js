let now_playing = document.querySelector('.now-playing');
let track_art = document.querySelector('.track-art');
let track_name = document.querySelector('.track-name');
let track_artist = document.querySelector('.track-artist');

let playpause_btn = document.querySelector('.playpause-track');
let next_btn = document.querySelector('.next-track');
let prev_btn = document.querySelector('.prev-track');

let seek_slider = document.querySelector('.seek_slider');
let volume_slider = document.querySelector('.volume_slider');
let curr_time = document.querySelector('.current-time');
let total_duration = document.querySelector('.total-duration');
let wave = document.getElementById('wave');
let randomIcon = document.querySelector('.fa-random');
let curr_track = document.createElement('audio');

let track_index = 0;
let isPlaying = false;
let isRandom = false;
let updateTimer;

// Seleciona o título da página
const pageTitle = document.querySelector('.page-title');

// Array de cores para a animação
const colors = ['#000000', '#4F4F4F', '#7d3cff', '#00a1ff', '#00ff68'];

let index = 0; // Índice da cor atual

// Função para alternar as cores letra por letra automaticamente
function changeColor() {
    const titleText = pageTitle.textContent; // Obtém o texto do título
    let coloredTitle = ''; // String para armazenar o título colorido

    // Itera sobre cada letra do título
    for (let i = 0; i < titleText.length; i++) {
        // Calcula o índice da cor usando o índice atual e o comprimento do array de cores
        const colorIndex = (index + i) % colors.length;
        // Obtém a cor atual
        const color = colors[colorIndex];
        // Adiciona a letra com a cor ao título colorido
        coloredTitle += `<span style="color: ${color};">${titleText[i]}</span>`;
    }

    // Define o título colorido na página
    pageTitle.innerHTML = coloredTitle;

    // Atualiza o índice de cor para a próxima iteração
    index = (index + 1) % colors.length;

    // Chama a função novamente após 0.2 segundos
    setTimeout(changeColor, 200); // Altera a cor a cada 0.2 segundos
}

// Chama a função para iniciar a animação
changeColor();



const music_list = [
    {
        img : 'img/vinil.png.jpg',
        name : 'Back in Black',
        artist : 'AC⚡DC',
        music : 'musicas/acdc/AC_DC - Back In Black.mp3'
    },
    {
        img : 'img/vinil.png.jpg',
        name : 'Dirty Deeds Done Dirt Cheap',
        artist : 'AC⚡DC',
        music : 'musicas/acdc/AC_DC - Dirty Deeds Done Dirt Cheap.mp3'
    },
    {
        img : 'img/vinil.png.jpg',
        name : 'Shoot to Thrill',
        artist :'AC⚡DC',
        music : 'musicas/acdc/AC_DC - Shoot to Thrill.mp3'
    },
    {
        img : 'img/vinil.png.jpg',
        name : 'T.N.T',
        artist : 'AC⚡DC',
        music : 'musicas/acdc/AC_DC - T.N.T..mp3'
    },
    {
        img : 'img/vinil.png.jpg',
        name : 'You Shook Me All Night Long',
        artist : 'AC⚡DC',
        music : 'musicas/acdc/AC_DC - You Shook Me All Night Long.mp3'
    },
    {
        img : 'img/vinil.png.jpg',
        name : 'Hells Bells',
        artist : 'AC⚡DC',
        music : 'musicas/acdc/AC_DC - Hells Bells (Live At River Plate, December 2009).mp3'
    },
    {
        img : 'img/vinil.png.jpg',
        name : 'Highway to Hell',
        artist : 'AC⚡DC',
        music : 'musicas/acdc/AC_DC - Highway to Hell (Live At River Plate, December 2009).mp3'
    },
    {
        img : 'img/vinil.png.jpg',
        name : 'Rock N Roll Train',
        artist : 'AC⚡DC',
        music : 'musicas/acdc/AC_DC - Rock N Roll Train.mp3'
    },
    {
        img : 'img/vinil.png.jpg',
        name : 'Children of the Grave',
        artist : 'Black Sabbath',
        music : 'musicas/black sabbath/Black Sabbath - Children of the Grave (2009 - Remaster).mp3'
    },
    {
        img : 'img/vinil.png.jpg',
        name : 'Heaven and Hell',
        artist : 'Black Sabbath',
        music : 'musicas/black sabbath/Black Sabbath - Heaven and Hell.mp3'
    },
    {
        img : 'img/vinil.png.jpg',
        name : 'Loner',
        artist : 'Black Sabbath',
        music : 'musicas/black sabbath/Black Sabbath - Loner.mp3'
    },
    {
        img : 'img/vinil.png.jpg',
        name : 'War pigs',
        artist : 'Black Sabbath',
        music : 'musicas/black sabbath/Black Sabbath - War pigs.mp3'
    }
    
];

loadTrack(track_index);

function loadTrack(track_index){
    clearInterval(updateTimer);
    reset();

    curr_track.src = music_list[track_index].music;
    curr_track.load();

    track_art.style.backgroundImage = "url(" + music_list[track_index].img + ")";
    track_name.textContent = music_list[track_index].name;
    track_artist.textContent = music_list[track_index].artist;
    now_playing.textContent = "Playing music " + (track_index + 1) + " of " + music_list.length;

    updateTimer = setInterval(setUpdate, 1000);

    curr_track.addEventListener('ended', nextTrack);
    random_bg_color();
}

function random_bg_color(){
    let hex = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e'];
    let a;

    function populate(a){
        for(let i=0; i<6; i++){
            let x = Math.round(Math.random() * 14);
            let y = hex[x];
            a += y;
        }
        return a;
    }
    let Color1 = populate('#');
    let Color2 = populate('#');
    var angle = 'to right';

    let gradient = 'linear-gradient(' + angle + ',' + Color1 + ', ' + Color2 + ")";
    document.body.style.background = gradient;
}
function reset(){
    curr_time.textContent = "00:00";
    total_duration.textContent = "00:00";
    seek_slider.value = 0;
}
function randomTrack(){
    isRandom ? pauseRandom() : playRandom();
}
function playRandom(){
    isRandom = true;
    randomIcon.classList.add('randomActive');
}
function pauseRandom(){
    isRandom = false;
    randomIcon.classList.remove('randomActive');
}
function repeatTrack(){
    let current_index = track_index;
    loadTrack(current_index);
    playTrack();
}
function playpauseTrack(){
    isPlaying ? pauseTrack() : playTrack();
}
function playTrack(){
    curr_track.play();
    isPlaying = true;
    track_art.classList.add('rotate');
    wave.classList.add('loader');
    playpause_btn.innerHTML = '<i class="fa fa-pause-circle fa-5x"></i>';
}
function pauseTrack(){
    curr_track.pause();
    isPlaying = false;
    track_art.classList.remove('rotate');
    wave.classList.remove('loader');
    playpause_btn.innerHTML = '<i class="fa fa-play-circle fa-5x"></i>';
}
function nextTrack(){
    if(track_index < music_list.length - 1 && isRandom === false){
        track_index += 1;
    }else if(track_index < music_list.length - 1 && isRandom === true){
        let random_index = Number.parseInt(Math.random() * music_list.length);
        track_index = random_index;
    }else{
        track_index = 0;
    }
    loadTrack(track_index);
    playTrack();
}
function prevTrack(){
    if(track_index > 0){
        track_index -= 1;
    }else{
        track_index = music_list.length -1;
    }
    loadTrack(track_index);
    playTrack();
}
function seekTo(){
    let seekto = curr_track.duration * (seek_slider.value / 100);
    curr_track.currentTime = seekto;
}
function setVolume(){
    curr_track.volume = volume_slider.value / 100;
}
function setUpdate(){
    let seekPosition = 0;
    if(!isNaN(curr_track.duration)){
        seekPosition = curr_track.currentTime * (100 / curr_track.duration);
        seek_slider.value = seekPosition;

        let currentMinutes = Math.floor(curr_track.currentTime / 60);
        let currentSeconds = Math.floor(curr_track.currentTime - currentMinutes * 60);
        let durationMinutes = Math.floor(curr_track.duration / 60);
        let durationSeconds = Math.floor(curr_track.duration - durationMinutes * 60);

        if(currentSeconds < 10) {currentSeconds = "0" + currentSeconds; }
        if(durationSeconds < 10) { durationSeconds = "0" + durationSeconds; }
        if(currentMinutes < 10) {currentMinutes = "0" + currentMinutes; }
        if(durationMinutes < 10) { durationMinutes = "0" + durationMinutes; }

        curr_time.textContent = currentMinutes + ":" + currentSeconds;
        total_duration.textContent = durationMinutes + ":" + durationSeconds;
    }
}