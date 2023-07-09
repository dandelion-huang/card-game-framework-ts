import { yellow, blue, magenta } from 'colorette'
import * as figlet from 'figlet'
import ArrayList from 'src/util/ArrayList'
import { stringBooleanMap } from 'src/util/objectMap'
import Player from '../players/Player'
import Card from '../card/Card'
import EnquirerStrategy from './EnquirerStrategy'

abstract class CommandLineInterface<P extends Player<C>, C extends Card> {
  protected readonly enquirerStrategy: EnquirerStrategy

  public async inputName(player: P): Promise<void> {
    const trimmedName = await this.enquirerStrategy.input(this.getInputPlayerNameMessage(player))
    if (trimmedName === '') return
    player.setName(trimmedName)
  }

  public async inputHumanPlayersNumber(): Promise<number> {
    let humanPlayersNubmer = 1
    const playersNubmerString = await this.enquirerStrategy.input(this.getInputHumanPlayersNumberMessage())
    if (playersNubmerString !== '') {
      humanPlayersNubmer = parseInt(playersNubmerString)
      this.checkIfHumanPlayersNumberValid(humanPlayersNubmer)
    }
    return humanPlayersNubmer
  }

  public printGameOver(): void {
    console.log(blue(figlet.textSync('Game Over')))
  }

  public checkIfPlayersNamesUnique(players: ArrayList<P>): void {
    const maps: stringBooleanMap = {}
    players.forEach((player) => {
      if (maps[player.getName()]) {
        throw new Error('Player names must be unique.')
      }
      maps[player.getName()] = true
    })
  }

  private checkIfHumanPlayersNumberValid(humanPlayersNumber: number): void {
    if (humanPlayersNumber < 1 || humanPlayersNumber > 4) {
      throw new Error('Human players number must be between 1 and 4.')
    }
  }

  public printGameTitle(gameTitle: string): void {
    this.clearConsole()
    console.log(blue(figlet.textSync(gameTitle)))
  }

  public clearConsole(): void {
    console.clear()
  }

  protected getPlayerSelectCardMessage(): string {
    return '[SYSTEM] Select a card and play:'
  }

  private getInputPlayerNameMessage(player: P): string {
    return `[SYSTEM] Give ${player.getName()} a name: (or just press enter)`
  }

  private getInputHumanPlayersNumberMessage(): string {
    return '[SYSTEM] How many human players are going to join the game? (1-4, default: 1)'
  }

  public onGameWinnerDecide(winner: P): void {
    console.log(yellow(`[BROADCAST] ${winner.getName()} wins!`))
  }

  public onCardSelected(player: Player<C>) {
    console.log(`[BROADCAST] ${player.getName()} played a card.`)
  }

  public onRoundStart(round: number): void {
    console.log(yellow(`[BROADCAST] Round: ${round}`))
  }

  public onPlayerNameItselfEnd(player: P): void {
    console.log(magenta(`[BROADCAST] ${player.getName()} enter the game hall.`))
  }
}

export default CommandLineInterface
