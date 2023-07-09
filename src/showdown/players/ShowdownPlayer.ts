import Player from 'src/template/players/Player'
import ShowdownCard from '../card/ShowdownCard'
import ShowdownBoard from '../ShowdownBoard'
import ShowdownExchangeHand from '../ShowdownExchangeHand'
import ShowdownCommandLineInterface from '../cli/ShowdownCommandLineInterface'

abstract class ShowdownPlayer extends Player<ShowdownCard> {
  protected exchangeHand: ShowdownExchangeHand | null
  protected isDecisionExchangeHandsUsed: boolean = false
  protected point: number = 0
  protected readonly cli: ShowdownCommandLineInterface = new ShowdownCommandLineInterface()

  public async takeTurn(): Promise<void> {
    await this.makeDecisionExchangeHand()
    await this.playCard()
  }

  private async playCard(): Promise<void> {
    const cardIndex = await this.selectCard()
    const playedCard = this.hand.play(cardIndex)
    this.game.getBoard().addCard(playedCard)
    this.game.getCli().onCardSelected(this)
  }

  protected abstract selectCard(): Promise<number>

  protected async makeDecisionExchangeHand(): Promise<void> {
    if (this.shouldSkipMakeDecisionExchangeHand()) return
    await this.selectExchangeHand()
  }

  protected async selectExchangeHand(): Promise<void> {
    const decision = await this.selectIfExchangeHand()
    if (decision === false) return
    const exchangeeIndex = await this.selectExchangee()
    const exchangee = this.game.getPlayers().get(exchangeeIndex) as ShowdownPlayer
    this.exchangeHandExecute(this, exchangee)
    this.toggleDecisionExchangeHandsUsed()
  }

  protected abstract selectExchangee(): Promise<number>

  protected abstract selectIfExchangeHand(): Promise<boolean>

  protected exchangeHandExecute(exchanger: ShowdownPlayer, exchangee: ShowdownPlayer) {
    const exchangeHand = new ShowdownExchangeHand(exchanger, exchangee)
    this.exchangeHand = exchangeHand
    const board = this.game.getBoard() as ShowdownBoard
    board.addExchangeHand(exchangeHand)
  }

  private toggleDecisionExchangeHandsUsed(): void {
    this.isDecisionExchangeHandsUsed = !this.isDecisionExchangeHandsUsed
  }

  protected shouldSkipMakeDecisionExchangeHand(): boolean {
    return this.isDecisionExchangeHandsUsed
  }

  public addPoint(): void {
    this.point++
  }

  public getPoint(): number {
    return this.point
  }
}

export default ShowdownPlayer
