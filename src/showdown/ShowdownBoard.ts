import ArrayList from 'src/util/ArrayList'
import Board from 'src/template/Board'
import ShowdownPlayer from './players/ShowdownPlayer'
import ShowdownCard from './card/ShowdownCard'
import ShowdownExchangeHand from './ShowdownExchangeHand'

class ShowdownBoard extends Board<ShowdownPlayer, ShowdownCard> {
  private exchangeHands: ArrayList<ShowdownExchangeHand> = new ArrayList()

  public executeExchangeHands(index: number = 0): void {
    if (this.shouldEndExecuteExchangeHands(index)) return
    this.exchangeHands.get(index++).execute()
    this.executeExchangeHands(index)
  }

  private shouldEndExecuteExchangeHands(index: number): boolean {
    return index === this.exchangeHands.size()
  }

  public addExchangeHand(exchangeHand: ShowdownExchangeHand) {
    this.exchangeHands.add(exchangeHand)
  }

  public showdown(): ShowdownPlayer {
    const cardPoints = this.getCards().map((card) => card.toShowdownValue())
    const winnerIndex = cardPoints.indexOf(Math.max(...cardPoints.asList()))
    return this.game.getPlayers().get(winnerIndex)
  }
}

export default ShowdownBoard
