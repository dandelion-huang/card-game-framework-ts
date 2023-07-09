import CardGame from 'src/template/CardGame'
import UnoPlayer from './players/UnoPlayer'
import UnoCard from './card/UnoCard'
import UnoAIPlayer from './players/UnoAIPlayer'
import AIPlayerInitNameStrategy from 'src/template/players/init-name/AIPlayerInitNameStrategy'
import UnoHumanPlayer from './players/UnoHumanPlayer'
import HumanPlayerInitNameStrategy from 'src/template/players/init-name/HumanPlayerInitNameStrategy'
import UnoDeck from './UnoDeck'
import UnoBoard from './UnoBoard'
import UnoCommandLineInterface from './cli/UnoCommandLineInterface'

class UnoGame extends CardGame<UnoPlayer, UnoCard> {
  private static readonly title = 'Uno'
  private static readonly playersLimit: number = 4
  private static readonly initialHandSize: number = 5
  protected readonly deck: UnoDeck = new UnoDeck()
  protected readonly board: UnoBoard = new UnoBoard(this, this.deck)
  protected round: number = -1
  protected readonly cli: UnoCommandLineInterface = new UnoCommandLineInterface()

  protected findGameWinner(): UnoPlayer {
    return this.players.find((player) => player.isEmptyHanded())!
  }

  protected shouldEndGame(turnPlayer: UnoPlayer): boolean {
    return turnPlayer.isEmptyHanded()
  }

  protected setupGameStartBoard(): void {
    const topCard = this.deck.draw()
    this.board.addCard(topCard)
    this.cli.onTopCardUpdate(topCard)
  }

  protected addAIPlayer(): void {
    const aiPlayer = new UnoAIPlayer(new AIPlayerInitNameStrategy())
    aiPlayer.joinGame(this)
  }

  protected addHumanPlayer(): void {
    const humanPlayer = new UnoHumanPlayer(new HumanPlayerInitNameStrategy())
    humanPlayer.joinGame(this)
  }

  protected getInitialHandSize(): number {
    return UnoGame.initialHandSize
  }

  protected getPlayersLimit(): number {
    return UnoGame.playersLimit
  }

  protected getTitle(): string {
    return UnoGame.title
  }
}

export default UnoGame
