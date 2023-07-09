import { blue, magenta } from 'colorette'
import CommandLineInterface from 'src/template/cli/CommandLineInterface'
import ShowdownPlayer from '../players/ShowdownPlayer'
import ShowdownCard from '../card/ShowdownCard'
import ShowdownExchangeHand from '../ShowdownExchangeHand'
import ShowdownGame from '../ShowdownGame'
import ShowdownEnquirerStrategy from 'src/showdown/cli/ShowdownEnquirerStrategy'
import DecideChoiceStrategy from 'src/template/cli/choice/DecideChoiceStrategy'
import SelectChoiceStrategy from 'src/template/cli/choice/SelectChoiceStrategy'

class ShowdownCommandLineInterface extends CommandLineInterface<ShowdownPlayer, ShowdownCard> {
  protected readonly enquirerStrategy: ShowdownEnquirerStrategy = new ShowdownEnquirerStrategy()

  public async selectCard(player: ShowdownPlayer): Promise<number> {
    const cards = player.getHand().getCards()
    const cardName = await this.enquirerStrategy.select(
      new SelectChoiceStrategy(cards),
      this.getPlayerSelectCardMessage(),
    )
    return cards.findIndex((card) => card.getName() === cardName)
  }

  public async selectExchangee(game: ShowdownGame, exchanger: ShowdownPlayer): Promise<number> {
    const players = game.getPlayers()
    const filteredPlayers = players.filter((player) => player !== exchanger)
    const playerName = await this.enquirerStrategy.select(
      new SelectChoiceStrategy(filteredPlayers),
      this.getPlayerSelectExchangeeMessage(),
    )
    return players.findIndex((player) => player.getName() === playerName)
  }

  public async decideIfExchangeHand(player: ShowdownPlayer): Promise<boolean> {
    return await this.enquirerStrategy.decide(
      new DecideChoiceStrategy(),
      this.getPlayerDecideExchangeHandMessage(player.getName()),
    )
  }

  private getPlayerSelectExchangeeMessage(): string {
    return '[SYSTEM] Select the player you want to exchange hand with:'
  }

  private getPlayerDecideExchangeHandMessage(playerName: string): string {
    return `[SYSTEM] Do ${playerName} want to exchange hand with any other player?`
  }

  public onShowdown(winner: ShowdownPlayer): void {
    console.log(blue(`[SYSTEM] ${winner.getName()} is the winner of the round!`))
  }

  public onExchangeHandSwapAgain(exchangeHand: ShowdownExchangeHand) {
    const exchangerName = exchangeHand.getExchanger().getName()
    const exchangeeName = exchangeHand.getExchangee().getName()
    console.log(magenta(`[BROADCAST] ${exchangerName} and ${exchangeeName} exchange their hands again.`))
  }

  public onExchangeHandSwap(exchangeHand: ShowdownExchangeHand) {
    const exchangerName = exchangeHand.getExchanger().getName()
    const exchangeeName = exchangeHand.getExchangee().getName()
    console.log(magenta(`[BROADCAST] ${exchangerName} and ${exchangeeName} exchange their hands.`))
  }
}

export default ShowdownCommandLineInterface
