import { blue, red, magenta } from 'colorette'
import CommandLineInterface from 'src/template/cli/CommandLineInterface'
import UnoPlayer from '../players/UnoPlayer'
import UnoCard from '../card/UnoCard'
import UnoEnquirerStrategy from 'src/uno/cli/UnoEnquirerStrategy'
import SelectChoiceStrategy from 'src/template/cli/choice/SelectChoiceStrategy'

class UnoCommandLineInterface extends CommandLineInterface<UnoPlayer, UnoCard> {
  protected readonly enquirerStrategy: UnoEnquirerStrategy = new UnoEnquirerStrategy()

  public async selectCard(player: UnoPlayer, boardTopCard: UnoCard): Promise<number> {
    const cards = player.getHand().getCards()
    const cardName = await this.enquirerStrategy.select(
      new SelectChoiceStrategy(cards, boardTopCard),
      this.getPlayerSelectCardMessage(),
    )
    if (cardName === 'NO CHOICES AVAILABLE') return -1
    return cards.findIndex((card) => card.getName() === cardName)
  }

  public onPlayerHandUpdate(player: UnoPlayer): void {
    console.log(magenta(`[BROADCAST] ${player.getName()} has ${player.getHand().size()} cards in hand now.`))
  }

  public onNoCardCanBePlayed(player: UnoPlayer): void {
    console.log(red(`[BROADCAST] ${player.getName()} has no card can be played... Draw a card!`))
  }

  public onTopCardUpdate(card: UnoCard): void {
    console.log(blue(`[BROADCAST] Top card is now ${card.getName()}.`))
  }
}

export default UnoCommandLineInterface
