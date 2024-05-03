// Array com os nomes das músicas
const nomesMusicas = [
    'Black Sabbath - Children of the Grave (2009 - Remaster)',
    'Black Sabbath - Heaven and Hell',
    // Adicione mais músicas conforme necessário
];

// Pasta onde as músicas estão localizadas
const pastaMusicas = 'musicas/black sabbath/';

// Variáveis para controlar o áudio
let audioPlayer = document.getElementById('audio-player');
let musicaAtualIndex = 0;

// Função para reproduzir a música
function reproduzirMusica(src) {
    audioPlayer.src = src;
    audioPlayer.play();
}

// Função para pausar a música
function pausarMusica() {
    audioPlayer.pause();
}

// Função para avançar para a próxima música
function proximaMusica() {
    musicaAtualIndex = (musicaAtualIndex + 1) % nomesMusicas.length;
    const proximaMusicaSrc = `${pastaMusicas}${nomesMusicas[musicaAtualIndex]}.mp3`;
    reproduzirMusica(proximaMusicaSrc);
}

// Função para retroceder para a música anterior
function musicaAnterior() {
    musicaAtualIndex = (musicaAtualIndex - 1 + nomesMusicas.length) % nomesMusicas.length;
    const musicaAnteriorSrc = `${pastaMusicas}${nomesMusicas[musicaAtualIndex]}.mp3`;
    reproduzirMusica(musicaAnteriorSrc);
}

// Carregar e exibir a lista de músicas
document.addEventListener('DOMContentLoaded', () => {
    const musicList = document.querySelector('.music-list ul');
    musicList.innerHTML = ''; // Limpa o conteúdo anterior, se houver

    // Para cada música, cria um item de lista na lista de músicas
    nomesMusicas.forEach((nome, index) => {
        const musicaSrc = `${pastaMusicas}${nome}.mp3`;
        const musicaItem = document.createElement('li');
        musicaItem.textContent = `Música ${index + 1}: ${nome}`;
        musicaItem.addEventListener('click', () => {
            reproduzirMusica(musicaSrc);
        });
        musicList.appendChild(musicaItem);
    });
});

// Event listener para o botão de play/pause
document.getElementById('play-btn').addEventListener('click', togglePlayPause);

// Event listener para o botão de stop
document.getElementById('stop-btn').addEventListener('click', pausarMusica);

// Event listener para o botão de anterior
document.getElementById('prev-btn').addEventListener('click', musicaAnterior);

// Event listener para o botão de próxima
document.getElementById('next-btn').addEventListener('click', proximaMusica);

// Função para alternar entre reproduzir e pausar a música
function togglePlayPause() {
    if (audioPlayer.paused) {
        audioPlayer.play();
    } else {
        audioPlayer.pause();
    }
}
