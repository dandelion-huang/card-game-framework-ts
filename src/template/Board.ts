import Stack from 'src/util/Stack'
import CardGame from './CardGame'
import Player from './players/Player'
import Card from './card/Card'

class Board<P extends Player<C>, C extends Card> {
  protected game: CardGame<P, C>
  private readonly cardStack: Stack<C> = new Stack()

  public constructor(game: CardGame<P, C>) {
    this.setGame(game)
  }

  public setGame(game: CardGame<P, C>): void {
    this.game = game
  }

  public getGame(): CardGame<P, C> {
    return this.game
  }

  public addCard(card: C): void {
    this.cardStack.push(card)
  }

  public setCards(cards: Array<C>): void {
    this.cardStack.set(cards)
  }

  public getCards(): Stack<C> {
    return this.cardStack
  }

  public getTopCard(): C {
    return this.cardStack.top()
  }

  public clearCards(): void {
    this.cardStack.clear()
  }
}

export default Board
