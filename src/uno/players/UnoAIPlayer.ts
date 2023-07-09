import UnoPlayer from './UnoPlayer'
import UnoBoard from '../UnoBoard'

class UnoAIPlayer extends UnoPlayer {
  protected async selectCardOrDrawCard(): Promise<number> {
    const board = this.game.getBoard() as UnoBoard
    const boardTopCard = board.getTopCard()
    const cards = this.hand.getCards()
    const filteredCards = cards.filter((card) => card.isPlayable(boardTopCard))
    if (filteredCards.isEmpty()) return -1
    const randomIndex = Math.floor(Math.random() * filteredCards.size())
    return cards.findIndex((card) => card === filteredCards.get(randomIndex))
  }
}

export default UnoAIPlayer
