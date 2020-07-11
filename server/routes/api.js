const express = require('express');
const router = express.Router();
const urllib = require('urllib');

let teamToIDs = {
  lakers: '1610612747',
  warriors: '1610612744',
  heat: '1610612748',
  suns: '1610612756',
};

let dreamTeam = [];

//adding teams to list by IDs
router.put('/team', function (req, res) {
  for (team of req.body.teamsToAdd) {
    teamToIDs[team.teamName] = team.teamId;
  }
  res.send(teamToIDs);
});

//get team players
router.get('/teams/:teamName', function (request, response) {
  let teamId = teamToIDs[request.params.teamName];
  urllib.request('http://data.nba.net/10s/prod/v1/2018/players.json', function (
    err,
    data
  ) {
    if (err) {
      throw err;
    }
    let nbaData = JSON.parse(data).league.standard;
    let teamRawData = nbaData.filter((p) => p.teamId === teamId && p.isActive);
    let teamData = [];
    teamRawData.forEach((a) =>
      teamData.push({
        id: a.personId,
        firstName: a.firstName,
        lastName: a.lastName,
        pos: a.pos,
        jerseyNum: a.jersey,
        imgUrl: `https://nba-players.herokuapp.com/players/${a.lastName}/${a.firstName}`,
      })
    );
    response.send(teamData);
  });
});

//get player stats
router.get('/player/:lastName/:firstName', function (req, res) {
  let lastName = req.params.lastName;
  let firstName = req.params.firstName;
  urllib.request(
    `https://nba-players.herokuapp.com/players-stats/${lastName}/${firstName}`,
    function (err, data) {
      if (err) {
        throw err;
      }
      let allPlayerStats = JSON.parse(data);
      playerStats = {
        games_played: allPlayerStats.games_played,
        minutes_per_game: allPlayerStats.minutes_per_game,
        rebounds_per_game: allPlayerStats.rebounds_per_game,
        assists_per_game: allPlayerStats.assists_per_game,
        steals_per_game: allPlayerStats.steals_per_game,
        blocks_per_game: allPlayerStats.blocks_per_game,
      };
      res.send(playerStats);
    }
  );
});

//get dream team
router.get('/dreamTeam', function (req, res) {
  res.send(dreamTeam);
});

//add to dream team
router.post('/roster', function (req, res) {
  let player = req.body;
  dreamTeam.push(player);
  res.end();
});

//remove from dream team
router.delete('/roster/:id', function (req, res) {//doesnt work, get undifind
  let playerId = req.params.id;
  console.log(dreamTeam)
  indexOfPlayer = dreamTeam.find((p) => p.id == playerId);
  // console.log(indexOfPlayer)
  // dreamTeam.splice(1, 1);
  res.send(dreamTeam);
});

module.exports = router;
