import ShowdownPlayer from './ShowdownPlayer'

class ShowdownAIPlayer extends ShowdownPlayer {
  protected async selectCard(): Promise<number> {
    return Math.floor(Math.random() * this.hand.getCards().size())
  }

  protected async selectExchangee(): Promise<number> {
    const players = this.game.getPlayers()
    const choices = players.map((_player, index) => index).filter((index) => index !== players.indexOf(this))
    const randomIndex = Math.floor(Math.random() * choices.size())
    return choices.get(randomIndex)
  }

  protected async selectIfExchangeHand(): Promise<boolean> {
    // possibilities for YES/NO: 16%
    const randomNumber = Math.floor(Math.random() * 100)
    if (randomNumber > 83) return true
    return false
  }
}

export default ShowdownAIPlayer
