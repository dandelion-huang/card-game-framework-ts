const cardGame = require('./dist/cardGame')

//

/**
 * two games below
 * uncomment the preferred one and enjoy :)
 */

// showdown
// const { ShowdownGame: Game } = cardGame

// uno
// const { UnoGame: Game } = cardGame

//

const game = new Game()
game.start()
