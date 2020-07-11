class Renderer {
  
  renderTeam = (teamData) => {
    const source = $('#player-template').html();
    const template = Handlebars.compile(source);
    const newHTML = template(teamData);
    $('.main-container').empty().append(newHTML);
  };

  renderPlayerStats = (playerStats, playerId) => {
    const source = $('#stats-template').html();
    const template = Handlebars.compile(source);
    const newHTML = template(playerStats);
    $(`.player[data-id=${playerId}]`)
      .find('.player-img')
      .empty()
      .append(newHTML);
  };
}
