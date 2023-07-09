import Player from 'src/template/players/Player'
import UnoCard from '../card/UnoCard'
import UnoCommandLineInterface from '../cli/UnoCommandLineInterface'
import UnoBoard from '../UnoBoard'

abstract class UnoPlayer extends Player<UnoCard> {
  protected readonly cli: UnoCommandLineInterface = new UnoCommandLineInterface()

  public isEmptyHanded(): boolean {
    return this.hand.isEmpty()
  }

  public async takeTurn(): Promise<void> {
    await this.playOrDrawCard()
  }

  protected async playOrDrawCard(): Promise<void> {
    const cardIndex = await this.selectCardOrDrawCard()
    if (cardIndex === -1) return this.drawCard()
    this.playCard(cardIndex)
  }

  private playCard(cardIndex: number): void {
    const playedCard = this.hand.play(cardIndex)
    this.game.getBoard().addCard(playedCard)
    const gameCli = this.game.getCli() as UnoCommandLineInterface
    gameCli.onCardSelected(this)
    gameCli.onTopCardUpdate(playedCard)
  }

  private drawCard(): void {
    const board = this.game.getBoard() as UnoBoard
    const gameCli = this.game.getCli() as UnoCommandLineInterface
    board.dealCardAsPunishment(this)
    gameCli.onPlayerHandUpdate(this)
    this.hand.sort()
  }

  protected abstract selectCardOrDrawCard(): Promise<number>
}

export default UnoPlayer
