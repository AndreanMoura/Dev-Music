document.addEventListener('DOMContentLoaded', function () {
    const artistTracks = {
        "Black Sabbath": [
            "Black Sabbath - Loner.mp3",
            "Black Sabbath - Heaven and Hell.mp3",
            "Black Sabbath - War Pigs.mp3"
        ],
        "AC/DC": [
            "ACDC - Back In Black.mp3",
            "ACDC - Highway to Hell.mp3",
            "ACDC - Thunderstruck.mp3"
        ],
        // Adicione mais artistas e suas músicas aqui conforme necessário
    };

    const plList = document.querySelector('.music-list');
    const audioPlayer = document.getElementById('audioPlayer');

    // Função para adicionar músicas de um artista à lista de reprodução
    function addArtistTracks(artist) {
        const tracks = artistTracks[artist];
        plList.innerHTML = ''; // Limpa a lista de músicas antes de adicionar novas

        tracks.forEach(track => {
            const listItem = document.createElement('li');
            listItem.textContent = track;
            listItem.addEventListener('click', function() {
                const audioSource = `./musicas/${artist}/${track}`;
                playAudio(audioSource);
            });
            plList.appendChild(listItem);
        });
    }

    // Função para reproduzir áudio
    function playAudio(source) {
        audioPlayer.src = source;
        audioPlayer.play();
    }

    // Exemplo de como adicionar as músicas de um artista
    addArtistTracks("Black Sabbath");
});
