import CardGame from 'src/template/CardGame'
import ShowdownPlayer from './players/ShowdownPlayer'
import ShowdownCard from './card/ShowdownCard'
import ShowdownAIPlayer from './players/ShowdownAIPlayer'
import AIPlayerInitNameStrategy from 'src/template/players/init-name/AIPlayerInitNameStrategy'
import ShowdownHumanPlayer from './players/ShowdownHumanPlayer'
import HumanPlayerInitNameStrategy from 'src/template/players/init-name/HumanPlayerInitNameStrategy'
import ShowdownDeck from './ShowdownDeck'
import ShowdownBoard from './ShowdownBoard'
import ShowdownCommandLineInterface from './cli/ShowdownCommandLineInterface'

class ShowdownGame extends CardGame<ShowdownPlayer, ShowdownCard> {
  private static readonly title = 'Showdown'
  private static readonly playersLimit: number = 4
  private static readonly initialHandSize: number = 13
  private static readonly roundLimit: number = 13
  protected readonly deck: ShowdownDeck = new ShowdownDeck()
  protected readonly board: ShowdownBoard = new ShowdownBoard(this)
  protected round: number = 1
  protected readonly cli: ShowdownCommandLineInterface = new ShowdownCommandLineInterface()

  protected findGameWinner(): ShowdownPlayer {
    const playerPoints = this.players.map((player) => player.getPoint())
    const winnerIndex = playerPoints.indexOf(Math.max(...playerPoints.asList()))
    return this.players.get(winnerIndex)
  }

  protected shouldEndGame(): boolean {
    return this.round > ShowdownGame.roundLimit
  }

  protected settleRound(): void {
    const roundWinner = this.findRoundWinner()
    roundWinner.addPoint()
    this.cli.onShowdown(roundWinner)
    this.board.clearCards()
    this.board.executeExchangeHands()
  }

  private findRoundWinner(): ShowdownPlayer {
    return this.board.showdown()
  }

  protected addAIPlayer(): void {
    const aiPlayer = new ShowdownAIPlayer(new AIPlayerInitNameStrategy())
    aiPlayer.joinGame(this)
  }

  protected addHumanPlayer(): void {
    const humanPlayer = new ShowdownHumanPlayer(new HumanPlayerInitNameStrategy())
    humanPlayer.joinGame(this)
  }

  protected getInitialHandSize(): number {
    return ShowdownGame.initialHandSize
  }

  protected getPlayersLimit(): number {
    return ShowdownGame.playersLimit
  }

  protected getTitle(): string {
    return ShowdownGame.title
  }
}

export default ShowdownGame
