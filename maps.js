const emojis = {
  "-": " ",
  O: "🚪",
  X: "💣",
  I: "🎁",
  PLAYER: "💀",
  BOMB_COLLISION: "💥",
  GAME_OVER: "👎",
  WIN: "🏆",
  LIVE: "❤",
};
const maps = [];
maps.push(`
  IXXXXXXXXX
  -XXXXXXXXX
  -XXXXXXXXX
  -XXXXXXXXX
  -XXXXXXXXX
  -XXXXXXXXX
  -XXXXXXXXX
  -XXXXXXXXX
  -XXXXXXXXX
  OXXXXXXXXX
`);
maps.push(`
  O--XXXXXXX
  X--XXXXXXX
  XX----XXXX
  X--XX-XXXX
  X-XXX--XXX
  X-XXXX-XXX
  XX--XX--XX
  XX--XXX-XX
  XXXX---IXX
  XXXXXXXXXX
  `);
maps.push(`
  I-----XXXX
  XXXXX-XXXX
  XX----XXXX
  XX-XXXXXXX
  XX-----XXX
  XXXXXX-XXX
  XX-----XXX
  XX-XXXXXXX
  XX-----OXX
  XXXXXXXXXX
`);
maps.push(`
  O--X---XXX
  XX-X-X-XXX
  XX---X-XXX
  XX--X--XXX
  X--X--XXXX
  --XX-XXXXI
  -X--------
  -XXXXX-XXX
  -------XXX
  XXXXXXXXXX
`);
maps.push(`
  XXXXXXXXXX
  X---------
  X-XXXXXXX-
  X-X-----X-
  X-X-XXX-X-
  X-X-XIX-XO
  X-X---X-X-
  X-XXXXX-X-
  X-------X-
  XXXXXXXX--
`);
