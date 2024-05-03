// Array de músicas
const musicas = [
    {
        nome: 'Back in Black',
        artista: 'AC⚡DC',
        src: 'musicas/acdc/AC_DC - Back In Black.mp3'
    },
    {
        nome: 'Children of the Grave',
        artista: 'Black Sabbath',
        src: 'musicas/black sabbath/Black Sabbath - Children of the Grave (2009 - Remaster).mp3'
    },
    {
        nome: 'Bohemian Rhapsody',
        artista: 'Queen',
        src: 'musicas/queen/Queen - Bohemian Rhapsody.mp3' // corrected src
    },
    {
        nome: 'Sweet Child O Mine',
        artista: 'Guns n Roses',
        src: 'musicas/Guns n roses/Guns n Roses - Sweet Child O Mine.mp3'
    }
    // Adicione mais músicas aqui
];

// Função para exibir algumas músicas selecionadas na seção "Melhores Músicas"
function exibirMelhoresMusicas() {
    const musicContainer = document.getElementById('music-container');
    musicContainer.innerHTML = ''; // Limpa o conteúdo anterior, se houver

    // Lista de índices das músicas selecionadas
    const melhoresIndices = [0, 1, 2, 3]; // corrected indices

    // Adiciona as músicas selecionadas ao contêiner
    melhoresIndices.forEach(index => {
        const musica = musicas[index];
        const musicaDiv = document.createElement('div');
        musicaDiv.innerHTML = `
            <h3 class="music-title" data-src="${musica.src}">${musica.nome} - ${musica.artista}</h3>
        `;
        musicContainer.appendChild(musicaDiv);
    });

    // Adiciona event listener para os títulos das músicas
    const musicTitles = document.querySelectorAll('.music-title');
    musicTitles.forEach(title => {
        title.addEventListener('click', () => {
            const src = title.getAttribute('data-src');
            reproduzirMusica(src);
        });
    });
}

// Função para reproduzir a música
function reproduzirMusica(src) {
    const audioPlayer = document.getElementById('myAudio');
    audioPlayer.src = src;
    audioPlayer.play();
}

// Chama a função para exibir as melhores músicas quando o DOM estiver pronto
document.addEventListener('DOMContentLoaded', exibirMelhoresMusicas);
// Índice da música atual
let musicaAtualIndex = 0;

// Elementos do reprodutor de áudio
const audioPlayer = document.getElementById('myAudio');
const playPauseBtn = document.getElementById('play-pause-btn');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');
const volumeSlider = document.getElementById('volume-slider');

// Função para atualizar o botão de reproduzir/pausar
function atualizarBotaoPlayPause() {
    if (audioPlayer.paused) {
        playPauseBtn.innerHTML = '<i class="fa fa-play"></i>';
    } else {
        playPauseBtn.innerHTML = '<i class="fa fa-pause"></i>';
    }
}

// Função para reproduzir ou pausar a música
function togglePlayPause() {
    if (audioPlayer.paused) {
        audioPlayer.play();
    } else {
        audioPlayer.pause();
    }
    atualizarBotaoPlayPause();
}

// Função para avançar para a próxima música
function nextMusica() {
    musicaAtualIndex = (musicaAtualIndex + 1) % musicas.length;
    carregarMusica(musicas[musicaAtualIndex]);
}

// Função para retroceder para a música anterior
function prevMusica() {
    musicaAtualIndex = (musicaAtualIndex - 1 + musicas.length) % musicas.length;
    carregarMusica(musicas[musicaAtualIndex]);
}

// Função para carregar e reproduzir uma música
function carregarMusica(musica) {
    audioPlayer.src = musica.src;
    audioPlayer.play();
    atualizarBotaoPlayPause();
}

// Função para ajustar o volume do áudio
function adjustVolume() {
    audioPlayer.volume = volumeSlider.value / 100;
}

// Adicionando event listeners aos botões e controles deslizantes
playPauseBtn.addEventListener('click', togglePlayPause);
nextBtn.addEventListener('click', nextMusica);
prevBtn.addEventListener('click', prevMusica);
volumeSlider.addEventListener('input', adjustVolume);

// Chamada inicial para carregar e reproduzir a primeira música
carregarMusica(musicas[musicaAtualIndex]);
