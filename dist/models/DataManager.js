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
    const renderer = new Renderer();
    const player = this.data.currentTeam.find((p) => p.id === playerId);
    $.get(`/player/${player.lastName}/${player.firstName}`, (res) => {
      player.stats = res;
      renderer.renderPlayerStats(player.stats, playerId);
    });
  };

  loadDreamTeam = () => {
    $.get('/dreamTeam', (res) => {
      this.data.dreamTeam = res;
    });
  };

  addToDreamTeam = (playerId) => {
    if (this.data.dreamTeam.find((p) => p.id === playerId)) {
      alert(`This Player is already in your Dream-Team`);
    } else {
      const player = this.data.currentTeam.find((p) => p.id === playerId);
      $.post('/roster', player, () => {});
    }
  };

  removeFromDreamTeam = (playerId) => {
    $.ajax({
      url: `/roster/${playerId}`,
      method: 'DELETE',
      success: () => {},
    });
  };
}
