$('#get-btn').on('click', function () {
  let input = $('#input').val();

  $.get(`/teams/${input}`, function (res) {
    const source = $('#player-template').html();
    const template = Handlebars.compile(source);
    const newHTML = template(res);
    $('.main-container').empty().append(newHTML);
  });
});
