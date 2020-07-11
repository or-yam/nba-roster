class DataManager {
  constructor() {
    this.data = {
      currentTeam: [],
      dreamTeam: [],
    };
  }

  loadTeamPlayers = (teamName) => {
    $.get(`/teams/${teamName}`, (res) => {
      this.data.currentTeam = res;
    });
  };

  loadPlayerStats = (playerId) => {
    const renderer = new Renderer(); // to render stats with one click
    const player = this.data.currentTeam.find((p) => p.id === playerId);
    $.get(`/player/${player.lastName}/${player.firstName}`, (res) => {
      console.log(player);
      console.log(res);
      player.stats = res;
      renderer.renderPlayerStats(player.stats, playerId);
    });
    //add error handler or remove all shitty players from data-base
  };

  addToDreamTeam = (playerId) => {
    this.loadDreamTeam();
    if (this.data.dreamTeam.find((p) => p.id === playerId)) {
      alert(`This Player is already in your Dream-Team`);
    } else {
      const player = this.data.currentTeam.find((p) => p.id === playerId);
      $.post('/roster', player, (res) => {});
    }
  };

  loadDreamTeam = () => {
    $.get('/dreamTeam', (res) => {
      this.data.dreamTeam = res;
    });
  };
}
