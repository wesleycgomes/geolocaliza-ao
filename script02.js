

// Função que é chamada quando o usuário clica no botão para obter a localização
function getLocation() {
  // Verifica se a API de Geolocalização é suportada
  if ("geolocation" in navigator) {
      // Se suportado, tenta obter a localização
      navigator.geolocation.getCurrentPosition(
          function(position) {
              // Caso a permissão seja concedida, exibe as coordenadas
              const latitude = position.coords.latitude;
              const longitude = position.coords.longitude;

              // Exibe as coordenadas na tela
              document.getElementById('output').innerHTML = `
                  <p>Latitude: ${latitude}</p>
                  <p>Longitude: ${longitude}</p>
              `;

              // Inicializa o mapa com a posição do usuário
              initializeMap(latitude, longitude);
          },
          function(error) {
              // Caso ocorra algum erro (como permissão negada ou outro problema)
              let errorMessage = '';
              switch (error.code) {
                  case error.PERMISSION_DENIED:
                      errorMessage = 'Você negou a permissão para acessar a localização.';
                      break;
                  case error.POSITION_UNAVAILABLE:
                      errorMessage = 'A localização não está disponível.';
                      break;
                  case error.TIMEOUT:
                      errorMessage = 'A solicitação de localização expirou.';
                      break;
                  case error.UNKNOWN_ERROR:
                      errorMessage = 'Ocorreu um erro desconhecido.';
                      break;
              }
              // Exibe a mensagem de erro na tela
              document.getElementById('output').innerHTML = `<p style="color: red;">${errorMessage}</p>`;
          }
      );
  } else {
      // Se a API de geolocalização não for suportada
      document.getElementById('output').innerHTML = '<p style="color: red;">A geolocalização não é suportada pelo seu navegador.</p>';
  }
}

// Função para inicializar o mapa
function initializeMap(latitude, longitude) {
  var map = L.map('map').setView([latitude, longitude], 13); // Inicializa o mapa com as coordenadas

  // Adiciona as tiles do OpenStreetMap
  L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(map);

  // Adiciona um marcador na posição atual
  L.marker([latitude, longitude]).addTo(map)
      .bindPopup('Você está aqui')
      .openPopup();
}
