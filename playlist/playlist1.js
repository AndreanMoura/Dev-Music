document.addEventListener('DOMContentLoaded', function () {
    const musicList = document.getElementById('musicList');

    // URL da pasta contendo as músicas do Black Sabbath
    const blackSabbathFolder = './playlist/musicas/black_sabbath/';

    // Função para carregar e exibir as músicas do Black Sabbath
    function loadBlackSabbathSongs() {
        fetch(blackSabbathFolder)
            .then(response => response.text())
            .then(data => {
                // Parse o HTML retornado como texto para obter uma lista de links
                const parser = new DOMParser();
                const htmlDocument = parser.parseFromString(data, 'text/html');
                const links = htmlDocument.querySelectorAll('a');

                // Limpa a lista atual de músicas
                musicList.innerHTML = '';

                // Adiciona cada música como um item de lista na lista de músicas
                links.forEach(link => {
                    const listItem = document.createElement('li');
                    const musicName = link.textContent;
                    listItem.textContent = musicName;
                    musicList.appendChild(listItem);
                });
            })
            .catch(error => console.error('Ocorreu um erro ao carregar as músicas do Black Sabbath:', error));
    }

    // Carrega e exibe as músicas do Black Sabbath quando a página é carregada
    loadBlackSabbathSongs();
});
