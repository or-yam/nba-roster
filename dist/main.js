$('#get-btn').on('click', function () {
  let input = $('#input').val();

  $.get(`/teams/${input}`, function (res) {
    res.forEach((a) =>
      $('body').append(
        `<div>${a.firsName}, ${a.lastName}, ${a.pos},${a.jerseyNum}</div><img src="https://nba-players.herokuapp.com/players/${a.lastName}/${a.firsName}" >`
      )
    );
  });
});
