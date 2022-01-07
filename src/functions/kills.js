const countKills = (line) => {
  const killerIndex = line[2] - 2;
  const victimIndex = line[3] - 2;
  const mod = line.slice(-1).pop();

  const players = games[`game_${match}`].players;
  const victim = players[victimIndex];
  const killer = players[killerIndex];

  let totalKills = games[`game_${match}`].total_kills;
  let kills = games[`game_${match}`].kills;
  let modKills = games[`game_${match}`].kills_by_means;

  if (!modKills[mod]) {
    modKills[mod] = 1;
  } else {
    modKills[mod]++;
  }

  if (killer) {
    if (killer == victim) {
      kills[killer]--;
    } else {
      kills[killer]++;
    }
  }

  if (victim) {
    if (!killer) {
      kills[victim]--;
    }
  }

  totalKills++;

  games[`game_${match}`].total_kills = totalKills;
  games[`game_${match}`].kills = kills;
  games[`game_${match}`].kills_by_means = modKills;
};

export default countKills;
