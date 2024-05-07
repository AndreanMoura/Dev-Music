document.addEventListener('DOMContentLoaded', function () {
    let audioPlayer = document.getElementById('audioPlayer');
    let playButton = document.querySelector('.play-button');
    let pauseButton = document.querySelector('.pause-button');
    let stopButton = document.querySelector('.stop-button');
    let skipForwardButton = document.querySelector('.skip-forward-button');
    let skipBackwardButton = document.querySelector('.skip-backward-button');
    let muteButton = document.querySelector('.mute-button');
    let seekControl = document.getElementById('seekControl');
    let currentTimeDisplay = document.getElementById('currentTime');
    let durationDisplay = document.getElementById('duration');

    // Carregar e exibir as músicas
    function loadMusicList() {
        // Carregar o arquivo JSON de músicas
        fetch('musicas.json')
            .then(response => response.json())
            .then(data => {
                const musicas = data.musicas;

                const musicList = document.querySelector('.music-list');

                // Iterar sobre cada música e criar um elemento de lista
                musicas.forEach(musica => {
                    const listItem = document.createElement('li');
                    const link = document.createElement('a');
                    link.href = '#';
                    link.textContent = musica.nome;
                    link.onclick = function(event) {
                        event.preventDefault(); // Impedir que o link seja seguido
                        const audioSource = musica.caminho;
                        playAudio(audioSource);
                    };
                    listItem.appendChild(link);
                    musicList.appendChild(listItem);
                });
            })
            .catch(error => console.error('Erro ao carregar as músicas:', error));
    }

    // Função para reproduzir áudio
    function playAudio(source) {
        audioPlayer.src = source;
        audioPlayer.play();
    }

    // Evento de clique no botão de play
    playButton.addEventListener('click', function() {
        audioPlayer.play();
    });

    // Evento de clique no botão de pausa
    pauseButton.addEventListener('click', function() {
        audioPlayer.pause();
    });

    // Evento de clique no botão de parar
    stopButton.addEventListener('click', function() {
        audioPlayer.pause();
        audioPlayer.currentTime = 0;
    });

    // Evento de clique no botão de avançar
    skipForwardButton.addEventListener('click', function() {
        audioPlayer.currentTime += 10; // Avança 10 segundos
    });

    // Evento de clique no botão de retroceder
    skipBackwardButton.addEventListener('click', function() {
        audioPlayer.currentTime -= 10; // Retrocede 10 segundos
    });

    // Evento de clique no botão de mudo
    muteButton.addEventListener('click', function() {
        audioPlayer.muted = !audioPlayer.muted;
    });

    // Evento de alteração do controle de busca
    seekControl.addEventListener('input', function() {
        const seekTo = audioPlayer.duration * (seekControl.value / 100);
        audioPlayer.currentTime = seekTo;
    });

    // Atualiza o controle de busca conforme a reprodução do áudio
    audioPlayer.addEventListener('timeupdate', function() {
        const newPosition = audioPlayer.currentTime * (100 / audioPlayer.duration);
        seekControl.value = newPosition;
        updateCurrentTime();
    });

    // Função para atualizar o tempo atual do áudio
    function updateCurrentTime() {
        const currentMinutes = Math.floor(audioPlayer.currentTime / 60);
        const currentSeconds = Math.floor(audioPlayer.currentTime - currentMinutes * 60);
        const durationMinutes = Math.floor(audioPlayer.duration / 60);
        const durationSeconds = Math.floor(audioPlayer.duration - durationMinutes * 60);
        currentTimeDisplay.innerText = `${currentMinutes}:${currentSeconds < 10 ? '0' + currentSeconds : currentSeconds}`;
        durationDisplay.innerText = `${durationMinutes}:${durationSeconds < 10 ? '0' + durationSeconds : durationSeconds}`;
    }

    // Carregar e exibir a lista de músicas ao carregar a página
    loadMusicList();
});
