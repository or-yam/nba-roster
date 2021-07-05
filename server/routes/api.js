const express = require('express');
const router = express.Router();
const urllib = require('urllib');

const teamToIDs = {
  lakers: '1610612747',
  warriors: '1610612744',
  heat: '1610612748',
  suns: '1610612756',
};

let nba = {
  data: {},
};
let dreamTeam = [];

urllib.request('http://data.nba.net/10s/prod/v1/2018/players.json', function (err, data) {
  if (err) {
    console.log(err);
  }
  nba.data = JSON.parse(data).league.standard;
});

router.get('/teams/:teamName', function (request, response) {
  const teamId = teamToIDs[request.params.teamName];
  const teamData = nba.data.filter((p) => p.teamId === teamId && p.isActive);
  const filteredData = teamData.map((a) => ({
    id: a.personId,
    firstName: a.firstName,
    lastName: a.lastName,
    pos: a.pos,
    jerseyNum: a.jersey,
    dreamer:false,
    imgUrl: `https://nba-players.herokuapp.com/players/${a.lastName}/${a.firstName}`,
  }));
  response.send(filteredData);
});

router.get('/player/:lastName/:firstName', function (req, res) {
  const lastName = req.params.lastName;
  const firstName = req.params.firstName;
  urllib.request(
    `https://nba-players.herokuapp.com/players-stats/${lastName}/${firstName}`,
    function (err, data) {
      if (err) {
        throw err;
      }
      try {
        data = JSON.parse(data);
        filteredDataA = {
          games_played: data.games_played,
          minutes_per_game: data.minutes_per_game,
          rebounds_per_game: data.rebounds_per_game,
          assists_per_game: data.assists_per_game,
          steals_per_game: data.steals_per_game,
          blocks_per_game: data.blocks_per_game,
        };
      } catch (err) {
        data = 'N-A';
        filteredDataA = {
          games_played: data,
          minutes_per_game: data,
          rebounds_per_game: data,
          assists_per_game: data,
          steals_per_game: data,
          blocks_per_game: data,
        };
      }
      res.send(filteredDataA);
    }
  );
});

router.get('/dreamTeam', function (req, res) {
  res.send(dreamTeam);
});

router.post('/roster', function (req, res) {
  const player = req.body;
  player.dreamer = true;
  dreamTeam.push(player);
  res.end();
});

router.delete('/roster/:id', function (req, res) {
  const playerId = req.params.id;
  player = dreamTeam.find((p) => p.id === playerId);
  i = dreamTeam.indexOf(player)
  dreamTeam.splice(i,1)
  res.end();
});

router.put('/team', function (req, res) {
  for (team of req.body.teamsToAdd) {
    teamToIDs[team.teamName] = team.teamId;
  }
  res.send(teamToIDs);
});

module.exports = router;
