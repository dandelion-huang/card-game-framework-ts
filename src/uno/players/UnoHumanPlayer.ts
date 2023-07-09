import UnoPlayer from './UnoPlayer'
import UnoBoard from '../UnoBoard'

class UnoHumanPlayer extends UnoPlayer {
  protected async selectCardOrDrawCard(): Promise<number> {
    const board = this.game.getBoard() as UnoBoard
    const boardTopCard = board.getTopCard()
    return await this.cli.selectCard(this, boardTopCard)
  }
}

export default UnoHumanPlayer
