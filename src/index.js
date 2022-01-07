import fs from "fs";
import es from "event-stream";

import initGame from "./functions/init";
import { clientConnect, clientDisconnect } from "./functions/client";
import countKills from "./functions/kills";

/*Global variables*/
global.match = 0;
global.games = {};
/*end global variables*/

const GameEvents = {
  InitGame: initGame,
  ClientUserinfoChanged: clientConnect,
  Kill: countKills,
  ClientDisconnect: clientDisconnect,
};

const runLogger = async (line) => {
  const brokeLine = line.trim().split(" ");
  if (brokeLine.length > 2) {
    const command = brokeLine[1].slice(0, -1);
    GameEvents[command]?.(brokeLine);
  }
};

(function () {
  const path = process.argv.slice(2)[0];
  var s = fs
    .createReadStream(path)
    .pipe(es.split())
    .pipe(
      es
        .mapSync(async (line) => {
          s.pause();
          await runLogger(line);
          s.resume();
        })
        .on("error", function (err) {
          console.log("Error:", err);
        })
        .on("end", function () {
          //Convert games players object to array
          Object.keys(games).map(
            (gamesKey) =>
              (games[gamesKey].players = Object.keys(
                games[gamesKey].players
              ).map((playersKey) => games[gamesKey].players[playersKey]))
          );
          console.log(JSON.stringify(games, null, 2));
          fs.writeFile(
            "output/game.json",
            JSON.stringify(games, null, 2),
            function (err) {
              if (err) {
                console.log(err);
              }
            }
          );
        })
    );
})();
