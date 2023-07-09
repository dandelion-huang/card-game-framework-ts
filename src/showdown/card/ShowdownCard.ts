import Card from 'src/template/card/Card'
import { ShowdownSuit, showdownSuitValue } from './ShowdownSuit'
import { ShowdownRank, showdownRankValue } from './ShowdownRank'

class ShowdownCard extends Card {
  private readonly suit: ShowdownSuit
  private readonly rank: ShowdownRank

  public constructor(suit: ShowdownSuit, rank: ShowdownRank) {
    super()
    this.suit = suit
    this.rank = rank
  }

  public toShowdownValue(): number {
    return showdownSuitValue[this.suit] + showdownRankValue[this.rank] * 100
  }

  public toSortValue(): number {
    return showdownSuitValue[this.suit] * 100 + showdownRankValue[this.rank]
  }

  public toString(): string {
    return `${this.suit} ${this.rank}`
  }
}

export default ShowdownCard
