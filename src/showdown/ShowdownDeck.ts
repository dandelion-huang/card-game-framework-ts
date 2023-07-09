import Deck from 'src/template/Deck'
import ShowdownCard from './card/ShowdownCard'
import { ShowdownSuit } from './card/ShowdownSuit'
import { ShowdownRank } from './card/ShowdownRank'

class ShowdownDeck extends Deck<ShowdownCard> {
  private static readonly initialSize: number = 52

  public constructor() {
    super()
    this.initialize()
  }

  private initialize(): void {
    const suits = Object.values(ShowdownSuit)
    const ranks = Object.values(ShowdownRank)
    suits.map((suit) => ranks.map((rank) => this.add(new ShowdownCard(suit, rank))))
  }

  public getInitialSize(): number {
    return ShowdownDeck.initialSize
  }
}

export default ShowdownDeck
