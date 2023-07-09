import ArrayList from 'src/util/ArrayList'
import Player from './players/Player'
import Card from './card/Card'
import Deck from './Deck'
import Board from './Board'
import CommandLineInterface from './cli/CommandLineInterface'
import { sleep } from 'src/utils/helper'

abstract class CardGame<P extends Player<C>, C extends Card> {
  protected readonly players: ArrayList<P> = new ArrayList()
  protected abstract readonly deck: Deck<C>
  protected abstract readonly board: Board<P, C>
  protected abstract round: number
  protected abstract readonly cli: CommandLineInterface<P, C>

  public async start(): Promise<void> {
    this.printTitle()
    await sleep(1000)
    this.addHumanPlayers(await this.inputHumanPlayersNumber())
    this.fillAIPlayers()
    await this.namePlayers()
    this.cli.checkIfPlayersNamesUnique(this.players)
    this.shuffleDeck()
    this.dealCards()
    this.sortPlayersHand()
    this.setupGameStartBoard()
    await this.nextTurn()
    this.congratulateGameWinner(this.findGameWinner())
    await sleep(1000)
    this.printEndTitle()
  }

  private printEndTitle(): void {
    this.cli.printGameOver()
  }

  private congratulateGameWinner(player: P) {
    this.cli.onGameWinnerDecide(player)
  }

  protected abstract findGameWinner(): P

  private async nextTurn(turn: number = 0): Promise<void> {
    if (this.isRoundBased() && this.shouldEndRound(turn - this.players.size())) {
      this.cli.onRoundStart(this.round)
      await sleep(250)
    }
    const turnPlayer = this.players.get(turn++ % this.players.size())
    await turnPlayer.takeTurn()
    await sleep(250)
    if (this.isRoundBased() && this.shouldEndRound(turn)) {
      this.settleRound()
      this.addRound()
      await sleep(250)
    }
    if (this.shouldEndGame(turnPlayer)) return
    await this.nextTurn(turn)
  }

  protected abstract shouldEndGame(turnPlayer?: P): boolean

  protected settleRound(): void {
    // hook
  }

  private isRoundBased(): boolean {
    return this.round !== -1 // is not round-based
  }

  protected setupGameStartBoard(): void {
    // hook
  }

  private sortPlayersHand(index: number = 0): void {
    if (this.shouldEndRound(index)) return
    this.players.get(index++).getHand().sort()
    this.sortPlayersHand(index)
  }

  private dealCards(index: number = 0): void {
    if (this.shouldEndDealCards()) return
    this.players.get(index++).addHandCard(this.deck.draw())
    this.dealCards(index % this.players.size())
  }

  protected shouldEndDealCards(): boolean {
    return this.deck.size() === this.deck.getInitialSize() - this.players.size() * this.getInitialHandSize()
  }

  private shuffleDeck(): void {
    this.deck.shuffle()
  }

  private async namePlayers(index: number = 0): Promise<void> {
    if (this.shouldEndRound(index)) return
    const player = this.players.get(index)
    await player.nameItself()
    this.cli.onPlayerNameItselfEnd(player)
    await this.namePlayers(++index)
  }

  protected shouldEndRound(index: number): boolean {
    return index !== 0 && index % this.players.size() === 0
  }

  private fillAIPlayers(): void {
    if (this.shouldEndFillPlayers(this.getPlayersLimit())) return
    this.addAIPlayer()
    this.fillAIPlayers()
  }

  protected abstract addAIPlayer(): void

  private async inputHumanPlayersNumber(): Promise<number> {
    return await this.cli.inputHumanPlayersNumber()
  }

  private addHumanPlayers(humanPlayersNumber: number): void {
    if (this.shouldEndFillPlayers(humanPlayersNumber)) return
    this.addHumanPlayer()
    this.addHumanPlayers(humanPlayersNumber)
  }

  protected abstract addHumanPlayer(): void

  private shouldEndFillPlayers(playersNumber: number): boolean {
    return this.players.size() === playersNumber
  }

  protected printTitle(): void {
    this.cli.printGameTitle(this.getTitle())
  }

  public getCli(): CommandLineInterface<P, C> {
    return this.cli
  }

  private addRound(): void {
    this.round++
  }

  public getBoard(): Board<P, C> {
    return this.board
  }

  public addPlayer(player: P): void {
    this.players.add(player)
  }

  public getPlayers(): ArrayList<P> {
    return this.players
  }

  protected abstract getInitialHandSize(): number

  protected abstract getPlayersLimit(): number

  protected abstract getTitle(): string
}

export default CardGame
