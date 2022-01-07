export const clientConnect = (line) => {
  const position = line[2] - 2;

  //Parse the line if the name has space on it
  const lineWithName = line.reduce((text, value, i) =>
    i >= 3 ? `${text} ${value}` : ""
  );

  const playerName = lineWithName.split("\\")[1];

  let players = games[`game_${match}`].players;
  if (!players[position]) {
    players[position] = playerName;
    games[`game_${match}`].kills[playerName] = 0;
  } else if (players[position] != playerName) {
    //Replace player name in kills property
    games[`game_${match}`].kills[playerName] =
      games[`game_${match}`].kills[players[position]] ?? 0;
    delete games[`game_${match}`].kills[players[position]];
    players[position] = playerName;
  }
  games[`game_${match}`].players = players;
};

export const clientDisconnect = (line) => {
  const position = line[2] - 2;
  let players = games[`game_${match}`].players;
  delete games[`game_${match}`].kills[players[position]];
  delete players[position];
  games[`game_${match}`].players = players;
};
