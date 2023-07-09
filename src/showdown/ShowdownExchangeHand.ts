import ShowdownPlayer from './players/ShowdownPlayer'
import ShowdownCommandLineInterface from './cli/ShowdownCommandLineInterface'

class ShowdownExchangeHand {
  private static readonly swapCooldown = 3
  private static readonly swapAgainCooldown = 0
  private countdown: number = 3
  private readonly exchanger: ShowdownPlayer
  private readonly exchangee: ShowdownPlayer

  public constructor(exchanger: ShowdownPlayer, exchangee: ShowdownPlayer) {
    this.exchanger = exchanger
    this.exchangee = exchangee
  }

  public execute(): void {
    if (this.shouldEndExecute()) return this.updateCountdown()
    const gameCli = this.exchanger.getGame().getCli() as ShowdownCommandLineInterface
    this.swapHand(this.exchanger, this.exchangee)
    if (this.isSwapCountdown()) {
      gameCli.onExchangeHandSwap(this)
    } else {
      gameCli.onExchangeHandSwapAgain(this)
    }
    this.updateCountdown()
  }

  private shouldEndExecute(): boolean {
    if (this.isSwapCountdown() === false && this.isSwapAgainCountdown() === false) return true
    return false
  }

  private isSwapAgainCountdown(): boolean {
    if (this.countdown === ShowdownExchangeHand.swapAgainCooldown) return true
    return false
  }

  private isSwapCountdown(): boolean {
    if (this.countdown === ShowdownExchangeHand.swapCooldown) return true
    return false
  }

  private swapHand(exchanger: ShowdownPlayer, exchangee: ShowdownPlayer): void {
    const tempHand = exchanger.getHand()
    exchanger.setHand(exchangee.getHand())
    exchangee.setHand(tempHand)
  }

  public updateCountdown(): void {
    this.countdown--
  }

  public getExchangee(): ShowdownPlayer {
    return this.exchangee
  }

  public getExchanger(): ShowdownPlayer {
    return this.exchanger
  }
}

export default ShowdownExchangeHand
