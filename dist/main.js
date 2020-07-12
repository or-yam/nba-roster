const dataManager = new DataManager();
const renderer = new Renderer();

const imgError = (image) => {
  image.src = '../assets/img/alt-player.png';
};

$('#load-btn').on('click', function () {
  let input = $('#input').val();
  dataManager.loadTeamPlayers(input);
});

$('#display-btn').on('click', function () {
  renderer.renderTeam(dataManager.data.currentTeam);
});

$('#loadDream-btn').on('click', function () {
  dataManager.loadDreamTeam();
});

$('#dreamTeam-btn').on('click', function () {
  renderer.renderTeam(dataManager.data.dreamTeam);
});

$('.main-container').on('click', '.player-img', function () {
  let playerId = $(this).closest('.player').attr('data-id');
  dataManager.loadPlayerStats(playerId);
});

$('.main-container').on('click', '.add-btn', function () {
  let playerId = $(this).closest('.player').attr('data-id');
  dataManager.addToDreamTeam(playerId);
});

$('.main-container').on('click', '.rmv-btn', function () {
  let playerId = $(this).closest('.player').attr('data-id');
  dataManager.removeFromDreamTeam(playerId);
});
