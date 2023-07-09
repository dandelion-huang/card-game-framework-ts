import Card from 'src/template/card/Card'
import { UnoColor, unoColorValue } from './UnoColor'
import { UnoNumber, unoNumberValue } from './UnoNumber'

class UnoCard extends Card {
  private readonly color: UnoColor
  private readonly number: UnoNumber

  public constructor(color: UnoColor, number: UnoNumber) {
    super()
    this.color = color
    this.number = number
  }

  public toSortValue(): number {
    return unoColorValue[this.color] * 100 + unoNumberValue[this.number]
  }

  public isPlayable(card: UnoCard): boolean {
    return this.color === card.color || this.number === card.number
  }

  public toString(): string {
    return `${this.color} ${this.number}`
  }
}

export default UnoCard
