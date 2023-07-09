import ShowdownPlayer from './ShowdownPlayer'
import ShowdownGame from '../ShowdownGame'

class ShowdownHumanPlayer extends ShowdownPlayer {
  protected async selectCard(): Promise<number> {
    return await this.cli.selectCard(this)
  }

  protected async selectExchangee(): Promise<number> {
    const game = this.game as ShowdownGame
    return await this.cli.selectExchangee(game, this)
  }

  protected async selectIfExchangeHand(): Promise<boolean> {
    return await this.cli.decideIfExchangeHand(this)
  }
}

export default ShowdownHumanPlayer
