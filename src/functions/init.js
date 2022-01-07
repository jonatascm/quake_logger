const initGame = () => {
  games[`game_${++match}`] = {
    total_kills: 0,
    players: {},
    kills: {},
    kills_by_means: {},
  };
};

export default initGame;
