const express = require('express');
const urllib = require('urllib');
const path = require('path');
const app = express();
const port = 3000;

app.use(express.static(path.join(__dirname, 'dist')));
app.use(express.static(path.join(__dirname, 'node_modules')));

const teamToIDs = {
  lakers: '1610612747',
  warriors: '1610612744',
  heat: '1610612748',
  suns: '1610612756',
};

app.get('/teams/:teamName', function (request, response) {
  let teamName = request.params.teamName;
  let teamId = teamToIDs[teamName];
  urllib.request('http://data.nba.net/10s/prod/v1/2018/players.json', function (
    err,
    data,
    res
  ) {
    if (err) {
      throw err;
    }
    let nbaData = JSON.parse(data).league.standard;
    let playersData = nbaData.filter((p) => p.teamId === teamId && p.isActive);
    let relevantData = [];
    playersData.forEach((a) =>
      relevantData.push({
        firstName: a.firstName,
        lastName: a.lastName,
        pos: a.pos,
        jerseyNum: a.jersey,
        imgUrl: `https://nba-players.herokuapp.com/players/${a.lastName}/${a.firstName}`,
      })
    );
    response.send(relevantData);
  });
});

app.listen(port, function () {
  console.log(`Server is running on port ${port}`);
});
