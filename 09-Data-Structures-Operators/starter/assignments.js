// 👉🏻 CODING CHALLENGE 1
const game = {
  team1: 'Bayern Munich',
  team2: 'Borrussia Dortmund',
  players: [
    [
      'Neuer',
      'Pavard',
      'Martinez',
      'Alaba',
      'Davies',
      'Kimmich',
      'Goretzka',
      'Coman',
      'Muller',
      'Gnarby',
      'Lewandowski',
    ],
    [
      'Burki',
      'Schulz',
      'Hummels',
      'Akanji',
      'Hakimi',
      'Weigl',
      'Witsel',
      'Hazard',
      'Brandt',
      'Sancho',
      'Gotze',
    ],
  ],
  score: '4:0',
  scored: ['Lewandowski', 'Gnarby', 'Lewandowski', 'Hummels'],
  date: 'Nov 9th, 2037',
  odds: {
    team1: 1.33,
    x: 3.25,
    team2: 6.5,
  },
};

// (1)
const [players1, players2] = game.players;

// (2)
const [gk, ...fieldPlayers] = players1;

// (3)
const allPlayers = [...players1, ...players2];

// (4)
const players1Final = [...players1, 'Thiago', 'Coutinho', 'Perisic'];

// (5)
const { team1, x: draw, team2 } = game.odds;
// Jonas's answer:
// const {
//   odds: { team1, x: draw, team2 },
// } = game;

// (6)
function printGoals(...players) {
  for (const player of players) {
    console.log(`${player}`);
  }
  console.log(`Number of goals scored: ${players.length}`);
}
printGoals('Davies', 'Muller', 'Lewandowski', 'Kimmich');
printGoals(...game.scored);

// (7)
// My answer:
const winningTeam = team1 || team2;
// Jonas's answer:
// team1 < team2 && console.log(`Team 1 is more likely to win`);

// 👉🏻 CODING CHALLENGE 2
// (1)
for (let i = 0; i < game.scored.length; i++) {
  console.log(`Goal ${[i + 1]}: ${game.scored[i]}`);
}

// (2)
let sum = 0;
for (const odd of Object.values(game.odds)) {
  sum += odd;
}
console.log(sum / Object.keys(game.odds).length);

// (3)
for (const [team, odd] of Object.entries(game.odds)) {
  if (team === 'x') {
    console.log(`Odd of draw: ${odd}`);
  } else {
    console.log(`Odd of victory ${game[team]}: ${odd}`);
  }
}

// (4)
scorers = {};
for (const player of game.scored) {
  scorers[player] = game.scored.filter(name => name === player).length;
}
console.log(scorers);
