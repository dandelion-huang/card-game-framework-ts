import Deck from 'src/template/Deck'
import UnoBoard from './UnoBoard'
import UnoCard from './card/UnoCard'
import { UnoColor } from './card/UnoColor'
import { UnoNumber } from './card/UnoNumber'

class UnoDeck extends Deck<UnoCard> {
  private static readonly initialSize: number = 40

  public constructor() {
    super()
    this.initialize()
  }

  private initialize(): void {
    const colors = Object.values(UnoColor)
    const numbers = Object.values(UnoNumber)
    colors.map((color) => numbers.map((number) => this.add(new UnoCard(color, number))))
  }

  public refresh(board: UnoBoard): void {
    const topCard = board.getCards().pop()
    this.set(board.getCards().asList())
    board.setCards([topCard])
    this.shuffle()
  }

  public getInitialSize(): number {
    return UnoDeck.initialSize
  }
}

export default UnoDeck
