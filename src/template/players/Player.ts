import CardGame from '../CardGame'
import Card from '../card/Card'
import Hand from '../Hand'
import PlayerInitNameStrategy from './init-name/PlayerInitNameStrategy'
import CommandLineInterface from '../cli/CommandLineInterface'

abstract class Player<C extends Card> {
  public static humanPlayerNumber = 1
  public static aiPlayerNumber = 1
  private readonly initNameStrategy: PlayerInitNameStrategy
  protected name: string
  protected game: CardGame<Player<C>, C>
  protected hand: Hand<C> = new Hand()
  protected cli: CommandLineInterface<Player<C>, C>

  public constructor(initNameStrategy: PlayerInitNameStrategy) {
    this.initNameStrategy = initNameStrategy
    this.initNameStrategy.initName(this)
  }

  public abstract takeTurn(): void

  public getCli(): CommandLineInterface<Player<C>, C> {
    return this.cli
  }

  public joinGame(game: CardGame<Player<C>, C>): void {
    this.game = game
    game.addPlayer(this)
  }

  public getGame(): CardGame<Player<C>, C> {
    return this.game
  }

  public addHandCard(card: C): void {
    this.hand.add(card)
  }

  public setHand(hand: Hand<C>): void {
    this.hand = hand
  }

  public getHand(): Hand<C> {
    return this.hand
  }

  public async nameItself(): Promise<void> {
    await this.cli.inputName(this)
  }

  public setName(name: string): void {
    this.name = name
  }

  public getName(): string {
    return this.name
  }

  public static addAIPlayerNumber(): void {
    Player.aiPlayerNumber++
  }

  public static addHumanPlayerNumber(): void {
    Player.humanPlayerNumber++
  }
}

export default Player
