const dataManager = new DataManager();
const renderer = new Renderer();


$('#load-btn').on('click', function () {
  let input = $('#input').val();
  dataManager.loadTeamPlayers(input);
});

$('#display-btn').on('click', function () {
  renderer.renderTeam(dataManager.data.currentTeam);
});

$('.main-container').on('click', '.player-img', function () {
  let playerId = $(this).closest('.player').attr('data-id');
  dataManager.loadPlayerStats(playerId);
});

$('.main-container').on('click', '.add-btn', function () {
  let playerId = $(this).closest('.player').attr('data-id');
  dataManager.addToDreamTeam(playerId);
});

$('#loadDream-btn').on('click', function () {
  dataManager.loadDreamTeam();
});

$('#dreamTeam-btn').on('click', function () {
  renderer.renderTeam(dataManager.data.dreamTeam);
});


function imgError(image) {
  image.onerror = '';
  image.src =
    'https://seeklogo.com/images/S/space-jam-logo-168E69A11F-seeklogo.com.jpg';
  return true;
}
