# Quake Logger - Software Engineer Test

Project made with NodeJS that reads a Quake Log and compute the players and kills.

## Some extra considerations:

1. If the players quits the game before it finishes, his name will not appear in the grouped information.
2. If the player change his name the kill points will remain with him.
3. If the players kills himself, his kill points will be decreased.

## Execute command:

```bash
npm start [file-path]

Eg: npm start logs/qgames.log
```

Output sample in _output/game.json_
