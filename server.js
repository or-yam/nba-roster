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

let nbaData;

urllib.request('http://data.nba.net/10s/prod/v1/2018/players.json', function (
  err,
  data,
  res
) {
  if (err) {
    throw err;
  }
  nbaData = JSON.parse(data).league.standard;
});

app.get('/teams/:teamName', function (req, res) {
  let teamName = req.params.teamName;
  let teamId = teamToIDs[teamName];
  let playersData = nbaData.filter((p) => p.teamId === teamId && p.isActive);
  let relevantData = [];
  playersData.forEach((a) =>
    relevantData.push({
      firsName: a.firstName,
      lastName: a.lastName,
      pos: a.pos,
      jerseyNum: a.jersey,
    })
  );
  res.send(relevantData);
});

app.listen(port, function () {
  console.log(`Server is running on port ${port}`);
});
