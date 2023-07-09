import Board from 'src/template/Board'
import UnoPlayer from './players/UnoPlayer'
import UnoCard from './card/UnoCard'
import UnoDeck from './UnoDeck'
import UnoGame from './UnoGame'
import UnoCommandLineInterface from './cli/UnoCommandLineInterface'

class UnoBoard extends Board<UnoPlayer, UnoCard> {
  private readonly deck: UnoDeck

  public constructor(game: UnoGame, deck: UnoDeck) {
    super(game)
    this.deck = deck
  }

  public dealCardAsPunishment(player: UnoPlayer): void {
    this.refreshDeck(this)
    const gameCli = this.game.getCli() as UnoCommandLineInterface
    gameCli.onNoCardCanBePlayed(player)
    player.addHandCard(this.deck.draw())
  }

  private refreshDeck(board: UnoBoard): void {
    if (this.shouldSkipRefreshDeck()) return
    this.deck.refresh(board)
  }

  private shouldSkipRefreshDeck(): boolean {
    return this.deck.isEmpty() === false
  }
}

export default UnoBoard
